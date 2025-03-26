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