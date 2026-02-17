<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\PenyaluranDonasi;
use App\Models\Donasi;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(CarouselSeeder::class);
        $this->call(DonasiSeeder::class);

        // User::factory(10)->create();
        PenyaluranDonasi::factory(50)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@mail.com',
            'password' => Hash::make('123'),
        ]);
    }
}
