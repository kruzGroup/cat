<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solvency extends Model
{
    /** @use HasFactory<\Database\Factories\SolvencyFactory> */
    use HasFactory;

    protected $fillable = [
        'extend_to',
        'specs',
        'user_id',
        'company_id',
        'taxpayer_id',
    ];

    // Relación con User (Una Solvencia pertenece a un Usuario)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con Company (Una Solvencia pertenece a una Compañía)
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    // Relación con Taxpayer (Una Solvencia pertenece a un Contribuyente)
    public function taxpayer()
    {
        return $this->belongsTo(Taxpayer::class);
    }
}
