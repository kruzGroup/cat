<?php

namespace Database\Seeders;

use App\Models\Solvency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SolvencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('solvencies')->insert([
                'extend_to' => 'Efectos Legales',
                'specs' => 'REVISAR EN SISTEMA - NO SE ENCUENTRA REGISTRADO EN ESTA UNIDAD',
                'user_id' => '1',
                'company_id' => '1',
                'taxpayer_id' => '1',                
                'created_at' => now(),
                'updated_at' => now(),
        ]);
        Solvency::factory(9)->create();        
    }
}
