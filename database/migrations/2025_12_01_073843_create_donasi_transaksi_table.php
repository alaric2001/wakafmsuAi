<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donasi_transaksi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_donasi');
            $table->foreign('id_donasi')->references('id')->on('donasi')->onDelete('cascade');
            $table->string('nama')->default('Hamba Allah');
            $table->integer('phone')->nullable();
            $table->string('email')->nullable();
            $table->integer('price');
            $table->enum('status', ['unpaid', 'paid'])->default('unpaid');
            // $table->string('snap_token')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donasi_transaksi');
    }
};
