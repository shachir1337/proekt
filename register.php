<?php
require 'config.php';

header('Content-Type: application/json');
$response = ['success' => false];

try {
    $required = [
        'fullname' => 'Имя',
        'email' => 'Email',
        'password' => 'Пароль',
        'confirmpassword' => 'Подтверждение пароля'
    ];

    // Проверка наличия всех полей
    foreach ($required as $field => $name) {
        if (!isset($_POST[$field]) || trim($_POST[$field]) === '') {
            throw new Exception("Поле {$name} обязательно для заполнения");
        }
    }

    // Валидация email
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    if (!$email) {
        throw new Exception("Некорректный формат email");
    }

    // Проверка существования пользователя
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        throw new Exception("Email уже зарегистрирован");
    }

    // Валидация пароля
    if ($_POST['password'] !== $_POST['confirmpassword']) {
        throw new Exception("Пароли не совпадают");
    }

    if (strlen($_POST['password']) < 8) {
        throw new Exception("Пароль должен содержать минимум 8 символов");
    }

    // Дополнительные проверки сложности
    if (!preg_match('/[A-ZА-ЯЁ]/u', $_POST['password'])) {
        throw new Exception("Добавьте минимум одну заглавную букву");
    }

    // Хеширование и сохранение
    $hash = password_hash($_POST['password'], PASSWORD_ARGON2ID);
    $stmt = $pdo->prepare("INSERT INTO users (...) VALUES (...)");
    $stmt->execute([...]);

    $response['success'] = true;
} catch (Exception $e) {
    http_response_code(400);
    $response['error'] = $e->getMessage();
}

echo json_encode($response);