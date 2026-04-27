<?php
require_once 'db.php';
header('Content-Type: text/plain; charset=utf-8');

$queries = [
    "CREATE TABLE IF NOT EXISTS files (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        file_name VARCHAR(255) NOT NULL,
        file_type VARCHAR(50),
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4",

    "CREATE TABLE IF NOT EXISTS predictions (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        file_id INT(11),
        waste_type VARCHAR(100),
        prediction_result VARCHAR(100),
        accuracy DECIMAL(5,2),
        FOREIGN KEY (file_id) REFERENCES files(id)
    ) CHARACTER SET utf8mb4"
];

foreach ($queries as $i => $sql) {
    if ($conn->query($sql)) {
        echo "✅ Query " . ($i + 1) . " executed successfully\n";
    } else {
        echo "❌ Error in query " . ($i + 1) . ": " . $conn->error . "\n";
    }
}

echo "\n🎉 Done! Tables ready.\n";
echo "\n⚠️ احذفي هذا الملف بعد التشغيل من GitHub.\n";

$conn->close();
?>
