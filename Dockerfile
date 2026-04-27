FROM php:8.2-cli

# تثبيت mysqli
RUN docker-php-ext-install mysqli

# نسخ كل الملفات
WORKDIR /app
COPY . /app/

# إنشاء مجلد uploads مع صلاحيات الكتابة
RUN mkdir -p /app/uploads && chmod 777 /app/uploads

# تشغيل خادم PHP على المنفذ اللي يحدده Railway
CMD php -S 0.0.0.0:${PORT:-8080} -t /app