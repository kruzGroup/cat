<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('companies')->insert([
            'name' => 'KruzGroup',
            'description' => 'descripcion para kruzGroup',
            'address' => 'Col. San Juan Bosco, Pje 2, Pol. B, Lote 17',
            'nit' => '1123-200276-101-8',
            'legal_rep' => 'Francisco Kruz Batres',
            'status' => 'active',
            'gender' => 'hombre',
            'created_at' => now(),
            'updated_at' => now(),
            'taxpayer_id' => 1,
        ]);

        Company::factory(9)->create();
    }
}
