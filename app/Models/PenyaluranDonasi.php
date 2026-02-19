<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenyaluranDonasi extends Model
{
    use HasFactory;
    protected $table = 'penyaluran_donasi';
    protected $guarded = [];

    public function donasi()
    {
        return $this->belongsTo(Donasi::class, 'id_donasi');
    }
}
