<?php

use App\Http\Controllers\CarouselController;
use App\Http\Controllers\DonasiController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentCallbackController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', [DonasiController::class, 'index']);

Route::resource('donasi', DonasiController::class)->except('index');
Route::resource('carousels', CarouselController::class);

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

// Route::get('/', function(){
//     return Inertia::render('user/Home');
// });

Route::get('/donasi/{id}/pay', function ($id) {
    return Inertia\Inertia::render('user/Pay', [
        'donasiId' => $id
    ]);
})->name('donasi.pay');

Route::post('/checkout', [PaymentController::class, 'checkout'])->name('checkout');
// // Route untuk GET (halaman checkout dengan data yang sudah ada)
// Route::get('/checkout/{order_id}', [PaymentController::class, 'showCheckout'])->name('checkout.show');

Route::post('/payment/success', [PaymentController::class, 'success']);
Route::post('/payment/pending', [PaymentController::class, 'pending']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
