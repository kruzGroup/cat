<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {                   
        $perPage = $request->input('perPage', 5);

            return Inertia::render('config/users/index', [
            'users' => User::search($request->search)
                ->when($request->input('status') === 'active', function ($query) {
                    $query->where('status', 'active');
                })
                ->when($request->input('status') === 'inactive', function ($query) {
                    $query->where('status', 'inactive');
                })
                ->latest()
                ->paginate($perPage)
                ->through(fn ($user) => [
                    'id' => $user->id,
                    'company_name' => $user->full_name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'status' => $user->status,
                    'statusDisplay' => $user->status === 'active' ? 'Activo' : 'Inactivo',
                    'created_at' => Carbon::parse($user->created_at)->format('d/m/y'),
                    'created_at_diffForHumans' => Carbon::parse($user->created_at)->diffForHumans(),
                    'statusColor' => $user->status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    'avatar_url' => $user->avatar ? Storage::url('public/'.$user->avatar) : null,
                    'avatar_initials' => $user->avatar_initials,
                    'is_avatar_image' => $user->is_avatar_image,
                    'avatar_color' => $user->avatar_color,
                    'created_at_diffForHumans' => $user->created_at->diffForHumans(),
                ])
                ->withQueryString(),
                'filters' => [
                    'search' => $request->search,
                    'perPage' => $perPage,
                    'status' => $request->status,
                ]          
        ]);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('config/users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        // La validación ya se realizó automáticamente
        $validated = $request->validated();

        return ($validated);
        try {
            // Crear el usuario
            $validated = $request->validated();

            User::create($validated);

            return redirect()->route('users.index')->with('toast', [
                'type' => 'success', 
                'message' => 'Usuario creado correctamente.'
            ]);
        } catch (\Exception $e) {
            return back()->with('toast', [
                'type' => 'error', 
                'message' => 'Error al crear el usuario: ' . $e->getMessage()
            ]);
        }

            
            

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            // Verificar si el usuario intenta eliminarse a sí mismo
            if ($user->id === auth()->id()) {
                return back()->with('toast', [
                    'type' => 'error', 
                    'message' => 'No puedes eliminar tu propio usuario.'
                ]);
            }
            
            // Eliminar el usuario
            $user->delete();
            
            return back()->with('toast', [
                'type' => 'success', 
                'message' => 'Usuario eliminado correctamente del sistema.'
            ]);
            
        } catch (\Exception $e) {
            return back()->with('toast', [
                'type' => 'error', 
                'message' => 'Error al eliminar el usuario: ' . $e->getMessage()
            ]);
        }
    }
}
