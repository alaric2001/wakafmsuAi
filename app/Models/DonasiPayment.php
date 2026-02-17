<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DonasiPayment extends Model
{
    protected $table = 'donasi_transaksi';
    protected $guarded = [];

    public function donasi()
    {
        return $this->belongsTo(Donasi::class);
    }
}
