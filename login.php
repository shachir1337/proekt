<?php
require 'config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ['success' => false, 'error' => ''];
    
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $password = trim($_POST['password']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['error'] = 'Некорректный email';
    } else {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user) {
            $response['error'] = 'Пользователь не найден';
        } elseif (!password_verify($password, $user['password'])) {
            $response['error'] = 'Неверный пароль';
        } else {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $response['success'] = true;
        }
    }

    if (!isset($_SESSION['attempts'])) {
        $_SESSION['attempts'] = 0;
    }
    
    if ($_SESSION['attempts'] >= 5) {
        $response['error'] = 'Превышено число попыток. Попробуйте через 15 минут.';
    } else {
        $_SESSION['attempts']++;
    }

    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>