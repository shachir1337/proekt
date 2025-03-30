$(function() {
	$(".btn").click(function() {
		$(".form-signin").toggleClass("form-signin-left");
    $(".form-signup").toggleClass("form-signup-left");
    $(".frame").toggleClass("frame-long");
    $(".signup-inactive").toggleClass("signup-active");
    $(".signin-active").toggleClass("signin-inactive");
    $(".forgot").toggleClass("forgot-left");   
    $(this).removeClass("idle").addClass("active");
	});
});

$(function() {
	$(".btn-signup").click(function() {
  $(".nav").toggleClass("nav-up");
  $(".form-signup-left").toggleClass("form-signup-down");
  $(".success").toggleClass("success-left"); 
  $(".frame").toggleClass("frame-short");
	});
});

$(function() {
	$(".btn-signin").click(function() {
  $(".btn-animate").toggleClass("btn-animate-grow");
  $(".welcome").toggleClass("welcome-left");
  $(".cover-photo").toggleClass("cover-photo-down");
  $(".frame").toggleClass("frame-short");
  $(".profile-photo").toggleClass("profile-photo-down");
  $(".btn-goback").toggleClass("btn-goback-up");
  $(".forgot").toggleClass("forgot-fade");
	});
});

// Регистрация
$('.btn-signup').click(function(e) {
    e.preventDefault();
    
    $.ajax({
        type: 'POST',
        url: 'register.php',
        data: $('.form-signup').serialize(),
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                $('.success').addClass('success-left');
            } else {
                $.each(response.errors, function(key, value) {
                    $(`[name="${key}"]`).addClass('invalid');
                    $(`<div class="error-message">${value}</div>`)
                        .insertAfter($(`[name="${key}"]`));
                });
            }
        }
    });
});

// Вход
$('.btn-signin').click(function(e) {
    e.preventDefault();
    
    $.ajax({
        type: 'POST',
        url: 'login.php',
        data: $('.form-signin').serialize(),
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                window.location.href = 'profile.php';
            } else {
                $('.login-error').remove();
                $(`<div class="login-error" style="color:red; margin-top:20px;">
                    ${response.error}
                   </div>`).insertBefore('.btn-animate');
            }
        }
    });
});

// Валидация пароля в реальном времени
$('input[name="password"]').on('input', function() {
    const password = $(this).val();
    const regex = /^(?=.*\d)(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ]).{8,}$/;
    
    if (!regex.test(password)) {
      $(this).addClass('invalid');
      showError('Пароль должен содержать минимум 8 символов, цифру и буквы разного регистра');
    } else {
      $(this).removeClass('invalid');
    }
  });
  
  // Проверка совпадения паролей
  $('input[name="confirmpassword"]').on('input', function() {
    if ($(this).val() !== $('input[name="password"]').val()) {
      $(this).addClass('invalid');
      showError('Пароли не совпадают');
    } else {
      $(this).removeClass('invalid');
    }
  });
  
  // Валидация email
  $('input[type="email"]').on('input', function() {
    const email = $(this).val();
    const regex = /^[a-z0-9._%+-]+@[a-z-]+\.[a-z]{2,}$/i;
    
    if (!regex.test(email)) {
      $(this).addClass('invalid');
      showError('Некорректный формат email');
    } else {
      $(this).removeClass('invalid');
    }
  });
  
  function showError(message) {
    $('.error-message').remove();
    $('<div class="error-message" style="color:red; margin-top:5px;">'+message+'</div>')
      .insertAfter($(this));
  }

//   cookie
$(document).ready(function() {
    // Функции для работы с cookies
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length);
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    // Автозаполнение формы при наличии cookies
    const savedUsername = getCookie('username');
    const savedPassword = getCookie('password');
    if (savedUsername && savedPassword) {
        $('input[name="username"]').val(savedUsername);
        $('input[name="password"]').val(savedPassword);
        $('#checkbox').prop('checked', true);
    }

    // Обработчик для кнопки "Войти"
    $('.btn-signin').click(function(e) {
        e.preventDefault();
        
        const username = $('input[name="username"]').val();
        const password = $('input[name="password"]').val();
        const rememberMe = $('#checkbox').is(':checked');

        // Сохранение в cookies
        if (rememberMe) {
            setCookie('username', username, 7);
            setCookie('password', password, 7);
        } else {
            deleteCookie('username');
            deleteCookie('password');
        }

        // Здесь должна быть логика авторизации
        console.log('Процесс входа...');
    });

    // Обработчик для кнопки "Регистрация"
    $('.btn-signup').click(function() {
        // Очистка cookies при регистрации
        deleteCookie('username');
        deleteCookie('password');
    });
});

// API времени

function initTime() {
    const $time = $('.time');
    const $date = $('.date');
    
    function update() {
        const now = new Date();
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        const dateOptions = {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        };
        
        $time.text(now.toLocaleTimeString('ru-RU', timeOptions));
        $date.text(now.toLocaleDateString('ru-RU', dateOptions));
    }
    
    // Плавное появление
    $('.time-wrapper').css({opacity: 0})
                      .delay(1000)
                      .animate({opacity: 1}, 800);
    
    // Обновление каждую секунду
    update();
    setInterval(update, 1000);
}

// Вызвать функцию при загрузке
$(document).ready(initTime);

// Гамбургер-меню
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Закрытие меню при клике вне области
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});
// Закрытие меню при скролле
window.addEventListener('scroll', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
});

// Адаптивная высота шапки
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Определяем текущую страницу
    const currentPath = window.location.pathname;
    let currentPage = currentPath.split('/').pop().split('?')[0];

    // Обработка главной страницы
    if (currentPage === "" || currentPage === "/") currentPage = "index.html";

    // Находим и отмечаем активную ссылку
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        const linkPath = link.getAttribute('href').split('?')[0];
        if (linkPath === currentPage) {
            link.classList.add('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.animate__animated');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = 1;
            el.classList.add('animate__fadeInUp');
        }, index * 200);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.sidebar-button');
    const contentWrapper = document.querySelector('.content-wrapper');

    // Автоматическая активация при загрузке
    buttons[0].classList.add('active');
    contentWrapper.classList.add('active');

    // Обработчик для других кнопок
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            contentWrapper.classList.toggle('active', this === buttons[0]);
        });
    });


});