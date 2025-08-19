<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;


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

    protected function avatarUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                // Si existe un avatar en storage
                if ($this->avatar && Storage::exists($this->avatar)) {
                    return Storage::url($this->avatar);
                }
                return null;
            }
        );
    }

    /**
     * Iniciales para el avatar
     */
    protected function avatarInitials(): Attribute
    {
        return Attribute::make(
            get: function () {
                $fullName = $this->full_name;
                $names = explode(' ', $fullName);
                
                if (count($names) >= 2) {
                    return strtoupper(mb_substr($names[0], 0, 1) . mb_substr(end($names), 0, 1));
                }
                
                return $fullName ? strtoupper(mb_substr($fullName, 0, 2)) : 'US';
            }
        );
    }

    /**
     * Determina si el avatar es una imagen
     */
    protected function isAvatarImage(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->avatar && Storage::exists($this->avatar)
        );
    }

    /**
     * Color de fondo para avatar con iniciales
     */
    protected function avatarColor(): Attribute
{
    return Attribute::make(
        get: function () {
            // Paleta de colores variados (puedes personalizarla)
            $colors = [
                'hover:border-blue-600 border-blue-800 bg-blue-100 text-blue-800',
                'hover:border-green-600 border-green-800 bg-green-100 text-green-800',
                'hover:border-indigo-600 border-indigo-800 bg-indigo-100 text-indigo-800',
                'hover:border-cyan-600 border-cyan-800 bg-cyan-100 text-cyan-800',
                'hover:border-pink-600 border-pink-800 bg-pink-100 text-pink-800',
                'hover:border-purple-600 border-purple-800 bg-purple-100 text-purple-800',
                'hover:border-yellow-600 border-yellow-800 bg-yellow-100 text-yellow-800',
                'hover:border-teal-600 border-teal-800 bg-teal-100 text-teal-800',
                'hover:border-rose-600 border-rose-800 bg-rose-100 text-rose-800',
                'hover:border-amber-600 border-amber-800 bg-amber-100 text-amber-800',
            ];
            
            // Selecciona un color basado en el ID para consistencia
            // (si no hay ID, usa un índice aleatorio)
            $index = $this->id ? ($this->id % count($colors)) : rand(0, count($colors) - 1);
            
            return $colors[$index];
        }
    );
}
public function scopeSearch(Builder $query, $value):void
{
    if ($value) {
        $query->where('name', 'LIKE', "%{$value}%")
              ->orWhere('lastname', 'LIKE', "%{$value}%")
              ->orWhere('username', 'LIKE', "%{$value}%")
              ->orWhere('email', 'LIKE', "%{$value}%");
    }
}
}
