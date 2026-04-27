/* ====================================================
   فرزك الذكي - أكواد صفحة الاستلام والتسليم
   Locations page logic — tabs, search, add-center form
   ==================================================== */

// بيانات مراكز التسليم (تستلم نفاياتك حين تأتي إليها)
const DELIVERY = [
  {
    city: 'تبوك',
    name: 'مركز تبوك للتدوير البيئي',
    address: 'حي الورود، طريق الملك خالد، تبوك',
    hours: 'السبت - الخميس: 8 ص - 9 م',
    phone: '+966 14 422 0000',
    accepts: ['بلاستيك', 'ورق', 'كرتون', 'معدن'],
  },
  {
    city: 'تبوك',
    name: 'نقطة جامعة تبوك للفرز',
    address: 'جامعة تبوك، الحرم الجامعي، الفناء الرئيسي',
    hours: 'الأحد - الخميس: 8 ص - 4 م',
    accepts: ['ورق', 'بلاستيك', 'زجاج'],
  },
  {
    city: 'الرياض',
    name: 'مركز سبيرو لإعادة التدوير',
    address: 'حي العليا، طريق الملك فهد، الرياض',
    hours: 'السبت - الخميس: 9 ص - 10 م',
    phone: '+966 11 200 5500',
    accepts: ['بلاستيك', 'ورق', 'كرتون', 'معدن', 'زجاج'],
  },
  {
    city: 'الرياض',
    name: 'نقطة الفرز - حديقة الملك سلمان',
    address: 'حديقة الملك سلمان، حي الملز، الرياض',
    hours: 'يوميًا: 6 ص - 12 ص',
    accepts: ['بلاستيك', 'زجاج', 'معدن'],
  },
  {
    city: 'جدة',
    name: 'مركز جدة للنفايات الصلبة',
    address: 'حي الصفا، شارع الأمير سلطان، جدة',
    hours: 'السبت - الخميس: 8 ص - 8 م',
    phone: '+966 12 660 1100',
    accepts: ['بلاستيك', 'كرتون', 'معدن'],
  },
  {
    city: 'الدمام',
    name: 'مركز الشرقية للتدوير',
    address: 'المنطقة الصناعية الثانية، الدمام',
    hours: 'السبت - الخميس: 7 ص - 5 م',
    phone: '+966 13 833 4400',
    accepts: ['معدن', 'بلاستيك', 'كرتون'],
  },
  {
    city: 'المدينة المنورة',
    name: 'مركز المدينة لإعادة التدوير',
    address: 'حي قباء، طريق الملك عبدالله، المدينة',
    hours: 'السبت - الخميس: 8 ص - 9 م',
    phone: '+966 14 866 7700',
    accepts: ['ورق', 'بلاستيك', 'زجاج', 'معدن'],
  },
];

// بيانات خدمات الاستلام (تأتي إليك)
const PICKUP = [
  {
    city: 'تبوك',
    name: 'خدمة استلام تبوك المنزلية',
    address: 'تغطية كامل أحياء تبوك',
    hours: 'السبت - الخميس: 9 ص - 6 م',
    phone: '+966 50 100 2030',
    accepts: ['بلاستيك', 'ورق', 'كرتون', 'معدن'],
  },
  {
    city: 'الرياض',
    name: 'تدوير - استلام منزلي',
    address: 'خدمة منزلية لجميع أحياء الرياض',
    hours: 'يوميًا: 8 ص - 8 م',
    phone: '+966 50 555 0011',
    accepts: ['بلاستيك', 'ورق', 'كرتون', 'زجاج'],
  },
  {
    city: 'جدة',
    name: 'خدمة جدة الخضراء للاستلام',
    address: 'خدمة منزلية شاملة لجدة وضواحيها',
    hours: 'السبت - الخميس: 9 ص - 7 م',
    phone: '+966 55 888 1212',
    accepts: ['بلاستيك', 'كرتون', 'معدن'],
  },
  {
    city: 'الدمام',
    name: 'استلام الشرقية البيئي',
    address: 'الدمام، الخبر، والظهران',
    hours: 'السبت - الخميس: 8 ص - 5 م',
    phone: '+966 56 700 4400',
    accepts: ['معدن', 'بلاستيك', 'كرتون'],
  },
];

// الحالة العامة للصفحة
let currentMode = 'delivery';
let currentQuery = '';

// عناصر DOM
const tabs = document.querySelectorAll('.tab-card');
const searchInput = document.getElementById('search-input');
const grid = document.getElementById('locations-grid');
const emptyState = document.getElementById('empty-results');
const toggleFormBtn = document.getElementById('toggle-form-btn');
const toggleFormText = document.getElementById('toggle-form-text');
const formCard = document.getElementById('add-form-card');
const cancelFormBtn = document.getElementById('cancel-form-btn');
const formTitle = document.getElementById('form-title');
const addForm = document.getElementById('add-form');
const formSuccess = document.getElementById('form-success');

// تبديل بين خانة التسليم والاستلام
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    currentMode = tab.dataset.mode;
    updateFormLabels();
    render();
  });
});

// البحث
searchInput.addEventListener('input', (e) => {
  currentQuery = e.target.value.trim();
  render();
});

// إظهار/إخفاء نموذج إضافة مركز
toggleFormBtn.addEventListener('click', () => {
  formCard.classList.toggle('open');
  toggleFormText.textContent = formCard.classList.contains('open')
    ? 'إخفاء النموذج'
    : `إضافة مركز ${currentMode === 'delivery' ? 'تسليم' : 'استلام'}`;
});

cancelFormBtn.addEventListener('click', () => {
  formCard.classList.remove('open');
  toggleFormText.textContent = `إضافة مركز ${currentMode === 'delivery' ? 'تسليم' : 'استلام'}`;
});

// إرسال النموذج (بدون قاعدة بيانات - فقط رسالة نجاح)
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addForm.style.display = 'none';
  formSuccess.style.display = 'block';
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    addForm.reset();
    addForm.style.display = 'block';
    formSuccess.style.display = 'none';
    formCard.classList.remove('open');
    toggleFormText.textContent = `إضافة مركز ${currentMode === 'delivery' ? 'تسليم' : 'استلام'}`;
  }, 2500);
});

function updateFormLabels() {
  const word = currentMode === 'delivery' ? 'تسليم' : 'استلام';
  formTitle.textContent = `إضافة مركز ${word} جديد`;
  toggleFormText.textContent = formCard.classList.contains('open')
    ? 'إخفاء النموذج'
    : `إضافة مركز ${word}`;
}

// عرض المراكز
function render() {
  const data = currentMode === 'delivery' ? DELIVERY : PICKUP;
  const q = currentQuery;
  const filtered = data.filter((loc) => {
    if (!q) return true;
    return (
      loc.name.includes(q) ||
      loc.city.includes(q) ||
      loc.address.includes(q) ||
      loc.accepts.some((a) => a.includes(q))
    );
  });

  grid.innerHTML = '';
  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  filtered.forEach((loc) => {
    const iconName = currentMode === 'delivery' ? 'recycle' : 'truck';
    const acceptsLabel = currentMode === 'delivery' ? 'يستقبل:' : 'يستلم:';

    const card = document.createElement('div');
    card.className = 'location-card';
    card.innerHTML = `
      <div class="location-icon"><i data-lucide="${iconName}"></i></div>
      <div class="location-body">
        <div class="location-city">${escapeHtml(loc.city)}</div>
        <div class="location-name">${escapeHtml(loc.name)}</div>

        <div class="location-info">
          <i data-lucide="map-pin" class="icon" style="width:16px;height:16px;"></i>
          <span>${escapeHtml(loc.address)}</span>
        </div>
        <div class="location-info">
          <i data-lucide="clock" class="icon" style="width:16px;height:16px;"></i>
          <span>${escapeHtml(loc.hours)}</span>
        </div>
        ${loc.phone ? `
          <div class="location-info" dir="ltr">
            <i data-lucide="phone" class="icon" style="width:16px;height:16px;"></i>
            <span>${escapeHtml(loc.phone)}</span>
          </div>
        ` : ''}

        <div class="accepts-row">
          <div class="accepts-label">${acceptsLabel}</div>
          ${loc.accepts.map((a) => `<span class="accept-chip">${escapeHtml(a)}</span>`).join('')}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // إعادة إنشاء الأيقونات للبطاقات الجديدة
  if (window.lucide) window.lucide.createIcons();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// أول عرض عند التحميل
document.addEventListener('DOMContentLoaded', () => {
  render();
  updateFormLabels();
});
