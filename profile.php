<?php

session_start();
if(!isset($_SESSION['user_id'])) {
    header("Location: index.html");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Профиль</title>
</head>
<body>
    <h1>Добро пожаловать, <?php echo $_SESSION['username']; ?></h1>
    <a href="logout.php">Выйти</a>
</body>
</html>