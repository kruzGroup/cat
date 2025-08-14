<?php

namespace Database\Seeders;

use App\Models\Solvency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SolvencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Solvency::factory(9)->create();
        
    }
}
