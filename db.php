<?php
$DB_HOST = getenv('DB_HOST') ?: "localhost";
$DB_PORT = (int)(getenv('DB_PORT') ?: 3307);
$DB_NAME = getenv('DB_NAME') ?: "recycle_ai";
$DB_USER = getenv('DB_USER') ?: "root";
$DB_PASS = getenv('DB_PASS') ?: "";

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $DB_PORT);

if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
