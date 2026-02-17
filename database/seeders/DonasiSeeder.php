<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Donasi;
use Faker\Factory as Faker;

class DonasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        Donasi::create([
            'nama'=>'Perbaikan Mobil Operasional',
            'target_donasi'=>$faker->numberBetween(10000000, 100000000),
            'open_donasi'=>$faker->dateTimeBetween('now', '+1 year'),
            'deskripsi'=> $faker->paragraph(3),
            'foto'=>'carousel1.JPG',
            'status_post'=>$faker->randomElement(['post', 'hide']),
        ]);

        Donasi::create([
            'nama'=>'Pendidikan Anak Yatim',
            'target_donasi'=>$faker->numberBetween(10000000, 100000000),
            'open_donasi'=>$faker->date(),
            'deskripsi'=> $faker->paragraph(3),
            'foto'=>'LogoMSUBulat.png',
            'status_post'=>$faker->randomElement(['post', 'hide']),
        ]);

        Donasi::create([
            'nama'=>'Pembangunan Masjid',
            'target_donasi'=>$faker->numberBetween(10000000, 100000000),
            'open_donasi'=>$faker->date(),
            'deskripsi'=> $faker->paragraph(3),
            'foto'=>'carousel2.JPG',
            'status_post'=>$faker->randomElement(['post', 'hide']),
        ]);

        Donasi::create([
            'nama'=>'Buka Puasa Bersama',
            'target_donasi'=>$faker->numberBetween(10000000, 100000000),
            'open_donasi'=>$faker->date(),
            'deskripsi'=> $faker->paragraph(3),
            'foto'=>'okeh.jpg',
            'status_post'=>$faker->randomElement(['post', 'hide']),
        ]);

        Donasi::create([
            'nama'=>'Sedekah Faqir Miskin',
            'target_donasi'=>$faker->numberBetween(10000000, 100000000),
            'open_donasi'=>$faker->date(),
            'deskripsi'=> $faker->paragraph(3),
            'foto'=>'carousel3.JPG',
            'status_post'=>$faker->randomElement(['post', 'hide']),
        ]);

        Donasi::create([
            'nama'=>'Bantuan Medis Lansia',
            'target_donasi'=>$faker->numberBetween(10000000, 100000000),
            'open_donasi'=>$faker->date(),
            'deskripsi'=> $faker->paragraph(3),
            'foto'=>'carousel1.JPG',
            'status_post'=>$faker->randomElement(['post', 'hide']),
        ]);

        Donasi::create([
            'nama'=>'Perbaikan Mobil Operasional',
            'target_donasi'=>$faker->numberBetween(10000000, 100000000),
            'open_donasi'=>$faker->dateTimeBetween('now', '+1 year'),
            'deskripsi'=> $faker->paragraph(3),
            'foto'=>'carousel1.JPG',
            'status_post'=>$faker->randomElement(['post', 'hide']),
        ]);

        Donasi::create([
            'nama'=>'Pendidikan Anak Yatim',
            'target_donasi'=>$faker->numberBetween(10000000, 100000000),
            'open_donasi'=>null,
            'deskripsi'=> $faker->paragraph(3),
            'foto'=>'LogoMSUBulat.png',
            'status_post'=>$faker->randomElement(['post', 'hide']),
        ]);

        Donasi::create([
            'nama'=>'Pembangunan Masjid',
            'target_donasi'=>$faker->numberBetween(10000000, 100000000),
            'open_donasi'=>null,
            'deskripsi'=> $faker->paragraph(3),
            'foto'=>'carousel2.JPG',
            'status_post'=>$faker->randomElement(['post', 'hide']),
        ]);

        Donasi::create([
            'nama'=>'Buka Puasa Bersama',
            'target_donasi'=>$faker->numberBetween(10000000, 100000000),
            'open_donasi'=>null,
            'deskripsi'=> $faker->paragraph(3),
            'foto'=>'okeh.jpg',
            'status_post'=>$faker->randomElement(['post', 'hide']),
        ]);
    }
}
