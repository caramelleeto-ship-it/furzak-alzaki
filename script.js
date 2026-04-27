/* ============================================================
   📍 سكربت صفحة locations.html
   - تبديل بين تبويبتي التسليم والاستلام
   - البحث ضمن المراكز
   - إظهار/إخفاء نموذج إضافة مركز
   - معالجة إرسال النموذج
   ============================================================ */

/* تبديل التبويبات */
function switchTab(tab) {
  const tabDelivery = document.getElementById('tabDelivery');
  const tabPickup = document.getElementById('tabPickup');
  const deliveryList = document.getElementById('deliveryList');
  const pickupList = document.getElementById('pickupList');
  const toggleBtn = document.getElementById('toggleFormBtn');

  if (tab === 'delivery') {
    tabDelivery.classList.add('active');
    tabPickup.classList.remove('active');
    deliveryList.classList.remove('hidden');
    pickupList.classList.add('hidden');
    if (toggleBtn) toggleBtn.innerHTML = '➕ إضافة مركز تسليم';
  } else {
    tabPickup.classList.add('active');
    tabDelivery.classList.remove('active');
    pickupList.classList.remove('hidden');
    deliveryList.classList.add('hidden');
    if (toggleBtn) toggleBtn.innerHTML = '➕ إضافة مركز استلام';
  }

  /* إعادة تشغيل البحث على القائمة الجديدة */
  filterLocations();
}

/* البحث في المراكز */
function filterLocations() {
  const query = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  const activeList = document.querySelector('#deliveryList:not(.hidden), #pickupList:not(.hidden)');
  if (!activeList) return;

  const cards = activeList.querySelectorAll('.location-card');
  cards.forEach(card => {
    const text = (card.dataset.search || '').toLowerCase();
    if (!query || text.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/* إظهار / إخفاء نموذج إضافة مركز */
function toggleForm() {
  const form = document.getElementById('addForm');
  const btn = document.getElementById('toggleFormBtn');
  const isHidden = form.classList.contains('hidden');

  if (isHidden) {
    form.classList.remove('hidden');
    btn.innerHTML = '✖️ إخفاء النموذج';
  } else {
    form.classList.add('hidden');
    const isPickup = document.getElementById('tabPickup').classList.contains('active');
    btn.innerHTML = isPickup ? '➕ إضافة مركز استلام' : '➕ إضافة مركز تسليم';
  }
}

/* معالجة إرسال النموذج */
function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const success = document.getElementById('formSuccess');

  /* إخفاء النموذج وإظهار رسالة النجاح */
  form.classList.add('hidden');
  success.classList.remove('hidden');

  /* بعد 3 ثواني نعيد كل شي ونغلق النموذج */
  setTimeout(() => {
    form.reset();
    form.classList.remove('hidden');
    success.classList.add('hidden');
    toggleForm();
  }, 3000);
}