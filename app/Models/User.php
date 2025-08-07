<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'lastname',
        'username',
        'email',
        'password',
        'status',
        'gender',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'status' => 'string',
            'gender' => 'string',
        ];
    }

    // Opcional: Accesor para nombre completo
    public function getFullNameAttribute()
    {
        return "{$this->name} {$this->lastname}";
    }

    /**
     * URL del avatar o iniciales
     */
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
                // Colores para género femenino
            $femaleColors = [
                'hover:border-pink-600 border-pink-800 bg-pink-100 text-pink-800',
                'hover:border-purple-600 border-purple-800 bg-purple-100 text-purple-800',
                'hover:border-red-600  border-red-800 bg-red-100 text-red-800',
                'hover:border-rose-600 border-rose-800 bg-rose-100 text-rose-800'
            ];
            
            // Colores para género masculino
            $maleColors = [
                'hover:border-blue-600 border-blue-800 bg-blue-100 text-blue-800',
                'hover:border-green-600 border-green-800 bg-green-100 text-green-800',
                'hover:border-indigo-600 border-indigo-800 bg-indigo-100 text-indigo-800',
                'hover:border-cyan-600 border-cyan-800 bg-cyan-100 text-cyan-800'
            ];
            
            // Colores por defecto (para casos no especificados)
            $defaultColors = [
                'hover:border-gray-600 border-gray-800 bg-gray-100 text-gray-800',
                'hover:border-yellow-600 border-yellow-800 bg-yellow-100 text-yellow-800',
                'hover:border-teal-600 border-teal-800 bg-teal-100 text-teal-800'
            ];
            
            // Seleccionar paleta de colores según género
            $palette = match($this->gender) {
                'mujer' => $femaleColors,
                'hombre' => $maleColors,
                default => $defaultColors
            };
            
            // Seleccionar color basado en el ID para consistencia
            return $palette[$this->id % count($palette)];
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
