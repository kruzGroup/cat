<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100', 'min:2'],
            'lastname' => ['required', 'string', 'max:100', 'min:2'],
            'username' => [
                'required',
                'string',
                'max:50',
                'min:3',
                'alpha_dash', // Only letters, numbers, dashes and underscores
                Rule::unique('users')->ignore($this->user),
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->user),
            ],
            'password' => [
                'required',
                'string',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
            'password_confirmation' => ['required', 'string'],
            'status' => ['required', 'string'],
            'gender' => ['required', 'string', 'in:male,female,other,unspecified'],
            'avatar' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,webp',
                'max:5120', // 5MB
                'dimensions:max_width=2000,max_height=2000',
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio',
            'name.min' => 'El nombre debe tener al menos 2 caracteres',
            'lastname.required' => 'El apellido es obligatorio',
            'username.required' => 'El nombre de usuario es obligatorio',
            'username.alpha_dash' => 'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos',
            'username.unique' => 'Este nombre de usuario ya está en uso',
            'email.required' => 'El correo electrónico es obligatorio',
            'email.email' => 'Debe ingresar un correo electrónico válido',
            'email.unique' => 'Este correo electrónico ya está registrado',
            'password.required' => 'La contraseña es obligatoria',
            'password.confirmed' => 'Las contraseñas no coinciden',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres',
            'password.letters' => 'La contraseña debe contener al menos una letra',
            'password.mixedCase' => 'La contraseña debe contener al menos una letra mayúscula y una minúscula',
            'password.numbers' => 'La contraseña debe contener al menos un número',
            'password.symbols' => 'La contraseña debe contener al menos un símbolo',
            'password.uncompromised' => 'La contraseña no debe haber sido expuesta en una filtración de datos',
            'password_confirmation.required' => 'La confirmación de la contraseña es obligatoria',
            'avatar.image' => 'El archivo debe ser una imagen válida',
            'avatar.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg o webp',
            'avatar.max' => 'La imagen no debe pesar más de 5MB',
            'avatar.dimensions' => 'La imagen no debe exceder los 2000px de ancho o alto',
        ];
    }
}
