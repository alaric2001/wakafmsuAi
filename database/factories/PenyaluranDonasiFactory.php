<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PenyaluranDonasi;
use Faker\Factory as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PenyaluranDonasi>
 */
class PenyaluranDonasiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul' => $this->faker->sentence(3),
            'id_donasi' => $this->faker->numberBetween(1, 10),
            'deskripsi' => $this->faker->paragraph(3),
            'foto' => $this->faker->randomElement(['carousel2.JPG', 'update1.jpeg', 'update2.jpeg', 'update3.jpeg', 'update4.jpg']),
        ];
    }
}
