<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Carousel;

class CarouselSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Carousel::create([
            'link'=>'/donasi/1',
            'foto'=>'carousel1.JPG',
        ]);

        Carousel::create([
            'link'=>'/donasi/1',
            'foto'=>'carousel2.JPG',
        ]);

        Carousel::create([
            'link'=>'/donasi/1',
            'foto'=>'carousel3.JPG',
        ]);
    }
}
