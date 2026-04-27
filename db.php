<?php

$DB_HOST = "localhost";
$DB_PORT = 3307;            
$DB_NAME = "recycle_ai";   
$DB_USER = "root";         
$DB_PASS = "";              

/* إنشاء الاتصال */
$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME, $DB_PORT);

/* فحص الاتصال */
if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "error"   => "فشل الاتصال بقاعدة البيانات: " . $conn->connect_error
    ]));
}

$conn->set_charset("utf8mb4");
?>