<?php

namespace App\Http\Controllers;

use App\Models\Solvency;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSolvencyRequest;
use App\Http\Requests\UpdateSolvencyRequest;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class SolvencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)        

    {
        $perPage = $request->input('perPage', 25);

            return Inertia::render('units/cat-empresas/solvencies/index', [
            'solvencies' => Solvency::search($request->search)
                ->when($request->input('status') === 'active', function ($query) {
                    $query->where('status', 'active');
                })
                ->when($request->input('status') === 'inactive', function ($query) {
                    $query->where('status', 'inactive');
                })
                ->latest()
                ->paginate($perPage)
                ->through(fn ($solv) => [
                    'id' => $solv->id,
                    'company_name' => $solv->company->name,
                    'taxpayer_name' => $solv->taxpayer->name,
                    'nit' => $solv->company->nit,
                    'status' => $solv->company->status,
                    'statusDisplay' => $solv->company->status === 'active' ? 'Activo' : 'Inactivo',
                    'created_at' => Carbon::parse($solv->created_at)->format('d/m/y'),
                    'created_at_diffForHumans' => Carbon::parse($solv->created_at)->diffForHumans(),
                    'statusColor' => $solv->company->status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    'avatar_url' => $solv->company->avatar ? Storage::url('public/'.$solv->avatar) : null,
                    'avatar_initials' => $solv->company->avatar_initials,
                    'is_avatar_image' => $solv->company->is_avatar_image,
                    'avatar_color' => $solv->avatar_color,
                    'created_at_diffForHumans' => $solv->created_at->diffForHumans(),
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSolvencyRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Solvency $solvency)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Solvency $solvency)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSolvencyRequest $request, Solvency $solvency)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Solvency $solvency)
    {
        //
    }

        public function generateSolvencyPdf($id)
    {
        $solvency = Solvency::with('user')->find($id); // Ajusta relaciones según tu DB
        $pdf = Pdf::loadView('solvencies.pdf', compact('solvency'));
        
        return $pdf->download("solvencia-{$solvency->id}.pdf");
    }
}
