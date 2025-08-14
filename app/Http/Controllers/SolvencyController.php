<?php

namespace App\Http\Controllers;

use App\Models\Solvency;
use App\Http\Requests\StoreSolvencyRequest;
use App\Http\Requests\UpdateSolvencyRequest;
use Inertia\Inertia;

class SolvencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('units/cat-empresas/solvencies/index');
        
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
}
