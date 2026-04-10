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
        Schema::create('donasi', function (Blueprint $table) {
            $table->id();
            $table->string('nama');

            // Menggunakan unsigned agar tidak ada nominal negatif
            $table->unsignedBigInteger('target_donasi');
            $table->unsignedBigInteger('collected')->default(0);

            $table->date('open_donasi')->nullable();
            $table->text('deskripsi');
            $table->string('foto')->nullable();

            // Tambahkan default agar tidak error jika tidak diisi saat create
            $table->enum('status_post', ['post', 'hide'])->default('hide');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donasis');
    }
};
