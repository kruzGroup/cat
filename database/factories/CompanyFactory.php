<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'nit' => fake()->numberBetween($min = 0000, $max = 9999).'-'.fake()->numberBetween($min = 000000, $max = 999999).'-'.fake()->numberBetween($min = 000, $max = 999).'-'.fake()->numberBetween($min = 0, $max = 9),
            'address' => fake()->address(),
            'description' => fake()->text($maxNbChars = 190),
            'legal_rep' => fake()->name($gender = 'male'|'female'),
            'created_at' => now(),
            'updated_at' => now(),
            'taxpayer_id' => fake()->numberBetween($min = 1, $max = 11),
        ];
    }
}
