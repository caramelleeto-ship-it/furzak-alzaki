<?php
/* ============================================================
   💾 حفظ نتيجة التصنيف في قاعدة البيانات
   ============================================================
   يُستقبل من classify.html عبر POST:
   - category   : نوع النفاية (مثل: plastic)
   - confidence : نسبة الثقة (0-100)
   ============================================================ */

header('Content-Type: application/json; charset=utf-8');
require_once 'db.php';

/* قراءة البيانات من POST */
$category   = trim($_POST['category']   ?? '');
$confidence = floatval($_POST['confidence'] ?? 0);

/* تحقق أساسي */
if ($category === '') {
    echo json_encode([
        "success" => false,
        "error"   => "فئة النفاية مطلوبة"
    ]);
    exit;
}

/* تجهيز جملة الإدراج (Prepared Statement لحماية ضد SQL Injection) */
$stmt = $conn->prepare(
    "INSERT INTO predictions (category, accuracy, created_at)
     VALUES (?, ?, NOW())"
);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "error"   => "فشل تجهيز الجملة: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("sd", $category, $confidence);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "id"      => $stmt->insert_id,
        "message" => "تم حفظ النتيجة بنجاح"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error"   => "فشل حفظ النتيجة: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
