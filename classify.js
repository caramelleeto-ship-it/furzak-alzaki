/* ====================================================
   فرزك الذكي - أكواد صفحة التصنيف
   Classification page logic — image upload + AI analysis
   ==================================================== */

/**
 * 🔧 رابط السيرفر (Backend API)
 * هذا هو رابط الخادم الذي يقوم بتحليل الصور باستخدام الذكاء الاصطناعي.
 * عدّليه إذا غيّرتِ مكان تشغيل الخادم.
 */
const API_BASE_URL = 'https://a1d4f35f-db0e-4d9b-962a-5e1052852b4f-00-1nrfog8snceqn.riker.replit.dev';

// عناصر الواجهة
const fileInput = document.getElementById('file-input');
const uploadArea = document.getElementById('upload-area');
const previewContainer = document.getElementById('preview-container');
const previewImg = document.getElementById('preview-img');
const removeBtn = document.getElementById('remove-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const analyzeText = document.getElementById('analyze-text');

const emptyResult = document.getElementById('empty-result');
const loadingResult = document.getElementById('loading-result');
const errorResult = document.getElementById('error-result');
const errorMessage = document.getElementById('error-message');
const resultContent = document.getElementById('result-content');

const resCategory = document.getElementById('res-category');
const resItem = document.getElementById('res-item');
const resConfidence = document.getElementById('res-confidence');
const resTime = document.getElementById('res-time');
const resTip = document.getElementById('res-tip');

let currentBase64 = null;
let currentMime = null;

// فتح نافذة اختيار الملف عند الضغط على المنطقة
uploadArea.addEventListener('click', () => fileInput.click());

// معالجة اختيار الملف
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  handleFile(file);
});

function handleFile(file) {
  hideAllResults();
  emptyResult.style.display = 'block';

  if (!file.type.startsWith('image/')) {
    showError('يرجى اختيار ملف صورة صالح');
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showError('حجم الصورة كبير جدًا. الحد الأقصى 10 ميغابايت.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    previewImg.src = dataUrl;
    currentBase64 = dataUrl.split(',')[1];
    currentMime = file.type;

    uploadArea.style.display = 'none';
    previewContainer.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

// زر إزالة الصورة
removeBtn.addEventListener('click', resetUpload);

function resetUpload() {
  currentBase64 = null;
  currentMime = null;
  fileInput.value = '';
  previewImg.src = '';
  previewContainer.style.display = 'none';
  uploadArea.style.display = 'block';
  hideAllResults();
  emptyResult.style.display = 'block';
}

// زر التحليل
analyzeBtn.addEventListener('click', async () => {
  if (!currentBase64) return;

  hideAllResults();
  loadingResult.style.display = 'block';
  analyzeBtn.disabled = true;
  analyzeText.textContent = 'جاري التحليل...';

  try {
    const response = await fetch(`${API_BASE_URL}/api/classify-waste`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageBase64: currentBase64,
        mimeType: currentMime,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || 'فشل التحليل');
    }

    const data = await response.json();
    showResult(data);
  } catch (err) {
    const msg = err && err.message ? err.message : 'حدث خطأ غير متوقع';
    showError(msg);
  } finally {
    analyzeBtn.disabled = false;
    analyzeText.textContent = 'تحليل الصورة';
  }
});

function showResult(data) {
  hideAllResults();
  resultContent.style.display = 'block';

  resCategory.textContent = data.categoryArabic || data.category || '-';
  resItem.textContent = data.itemName ? `العنصر المكتشف: ${data.itemName}` : '';
  resConfidence.textContent = `${Math.round((data.confidence || 0) * 100)}%`;
  resTime.textContent = `${((data.elapsedMs || 0) / 1000).toFixed(1)} ث`;
  resTip.textContent = data.tipArabic || '';
}

function showError(msg) {
  hideAllResults();
  errorMessage.textContent = msg;
  errorResult.style.display = 'flex';
}

function hideAllResults() {
  emptyResult.style.display = 'none';
  loadingResult.style.display = 'none';
  errorResult.style.display = 'none';
  resultContent.style.display = 'none';
}
