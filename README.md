# wakafmsu
antigravity
Web Donasi &amp; Wakaf Masjid Syamsul 'Ulum

db->mysql

php artisan migrate --seed

php artisan serve

npm run dev

npm install react-slick slick-carousel

php artisan make:model NamaModel -rsm (resource controller, model, seeder. ,migration)

eror composer update:
hapus folder vendor & composer.lock, composer install

php artisan route:list

->except('index') karena pakai Route::get('/', [DonasiController::class, 'index']);

setiap ada halam tsx bawaan seperti login dan register, harus diubah dulu ke jsx
Controller juga harus disesuaikan
composer require tightenco/ziggy
npm install ziggy-js
tambah @routes di app.blade

BUAT MIDTRANS
composer require midtrans/midtrans-php

MIDTRANS_MERCHANT_ID=XXXXXX
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxx
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxx
MIDTRANS_IS_PRODUCTION=false

php artisan config:clear

Buat Midtrans Config (config/midtrans.php)

php artisan make:controller PaymentController
php artisan make:model DonasiPayment
php artisan make:controller PaymentCallbackController