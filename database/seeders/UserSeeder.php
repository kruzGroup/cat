<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        DB::table('users')->insert([
                'name' => 'Francisco',
                'lastname' => 'Cruz',
                'username' => 'francisco.cruz',
                'email' => 'francisco.cruz@cat.gob.sv',
                'email_verified_at' => now(),
                'password' => Hash::make('naho'),
                'status' => 'active',
                'gender' => 'hombre',
                'avatar' => 'public/users/frankyKruz.png',
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
        ]);
        User::factory(9)->create();
    }
}
