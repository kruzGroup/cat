<?php

namespace Database\Seeders;

use App\Models\Taxpayer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaxpayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('taxpayers')->insert([
            'account_number' => '2006-0655',
            'name' => 'Matilde de los Angeles',
            'lastname' => 'Sosa de Cruz',
            'dui' => '02782369-2',
            'gender' => 'mujer',
            'address_home' => 'Colonia San Juan Bosco 2, Pje. 2, Usulutan Este, Usulutan',
            'address_bill' => 'Mercado de Frutas, Puesto 503, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '1976-2002',
            'name' => 'Francisco Antonio',
            'lastname' => 'Cruz Sosa',
            'dui' => '02472365-4',
            'gender' => 'hombre',
            'address_home' => 'Colonia San Juan Bosco 2, Pje. 2, Usulutan Este, Usulutan',
            'address_bill' => 'Colonia San Juan Bosco 2, Pje. 2, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2013-0771',
            'name' => 'Fredy Alexander',
            'lastname' => 'Mijango Alemán',
            'dui' => '02433365-4',
            'gender' => 'hombre',
            'address_home' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'address_bill' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2006-0366',
            'name' => 'Carlos Amilcar',
            'lastname' => 'Argueta Martínez',
            'dui' => '03847291-5',
            'gender' => 'hombre',
            'address_home' => 'Col. Cruz, Usulutan Este, Usulutan',
            'address_bill' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '1999-0220',
            'name' => 'German Armando',
            'lastname' => 'Villegas',
            'dui' => '03843391-5',
            'gender' => 'hombre',
            'address_home' => 'Barrio El Carmen, Usulutan Este, Usulutan',
            'address_bill' => 'Barrio El Carmen, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2010-1555',
            'name' => 'Roger Napoleón',
            'lastname' => 'Nieto Zelaya',
            'dui' => '02847163-9',
            'gender' => 'hombre',
            'address_home' => 'Caserío Los Angeles, Usulutan Este, Usulutan',
            'address_bill' => 'Caserío Los Angeles, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2010-1555',
            'name' => 'Mario Ernesto',
            'lastname' => 'González',
            'dui' => '03716492-8',
            'gender' => 'hombre',
            'address_home' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'address_bill' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2012-0247',
            'name' => 'Isaías Enoc',
            'lastname' => 'Vásquez Bermúdez',
            'dui' => '02227163-9',
            'gender' => 'hombre',
            'address_home' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'address_bill' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2012-0723',
            'name' => 'Roger Astul',
            'lastname' => 'Baires López',
            'dui' => '03787492-8',
            'gender' => 'hombre',
            'address_home' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'address_bill' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2014-0889',
            'name' => 'José Vicente',
            'lastname' => 'Ruiz Cantarero',
            'dui' => '07139584-2',
            'gender' => 'hombre',
            'address_home' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'address_bill' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2006-0090',
            'name' => 'Hilda del Carmen',
            'lastname' => 'Sibrian Villalobos',
            'dui' => '01234567-8',
            'gender' => 'mujer',
            'address_home' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'address_bill' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2006-0090',
            'name' => 'Suleyma Liset',
            'lastname' => 'Rodríguez de Zavala',
            'dui' => '03847165-9',
            'gender' => 'mujer',
            'address_home' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'address_bill' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2003-0077',
            'name' => 'Ana Stella',
            'lastname' => 'Cabezas Rodríguez',
            'dui' => '04582913-7',
            'gender' => 'mujer',
            'address_home' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'address_bill' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('taxpayers')->insert([
            'account_number' => '2006-0076',
            'name' => 'Vidal',
            'lastname' => 'Solórzano Ticas',
            'dui' => '02454365-5',
            'gender' => 'hombre',
            'address_home' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'address_bill' => 'Cantón La Peña, Usulutan Este, Usulutan',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Taxpayer::factory(12)->create();
    }
}
