<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaksi', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique(); // Contoh: TR-MSU-2024032701
            $table->foreignId('id_donasi')->constrained('donasi');
            $table->foreignId('id_user')->nullable()->constrained('users'); // Nullable jika donatur anonim
            $table->string('nama_donatur')->nullable();
            $table->bigInteger('amount');
            $table->string('status_pembayaran')->default('pending');
            $table->string('snap_token')->nullable();
            $table->string('payment_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksis');
    }
};
