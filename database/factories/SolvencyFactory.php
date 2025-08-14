<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Solvency>
 */
class SolvencyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'extend_to' => fake()->text($maxNbChars = 100), // Fecha futura
            'specs' => fake()->text($maxNbChars = 100), // Texto aleatorio de 200 caracteres
            'user_id' => fake()->numberBetween($min = 2, $max = 10), // Relación con User (creará un User si no existe)
            'company_id' => fake()->numberBetween($min = 2, $max = 11), // Relación con Company
            'taxpayer_id' => fake()->numberBetween($min = 2, $max = 25), // Relación con Taxpayer
            'created_at' => now(),
            'updated_at' => now(),
            
        ];
    }
}
