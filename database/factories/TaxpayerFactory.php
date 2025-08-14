<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Taxpayer>
 */
class TaxpayerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_number' => fake()->numerify('####-####'),
            'name' => fake()->name(),
            'lastname' => fake()->lastname(),
            'dui' => '0'.fake()->numberBetween($min = 0000000, $max = 9999999).'-'.fake()->numberBetween($min = 0, $max = 9),
            'gender' => fake()->randomElement(['hombre','mujer']),
            'address_home' => fake()->address(),
            'address_bill' => fake()->address(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
