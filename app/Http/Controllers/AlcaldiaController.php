<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlcaldiaRequest;
use App\Http\Requests\UpdateAlcaldiaRequest;
use App\Models\Alcaldia;
use Inertia\Inertia;

class AlcaldiaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('config/alcaldias/index');
        
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
    public function store(StoreAlcaldiaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Alcaldia $alcaldia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alcaldia $alcaldia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAlcaldiaRequest $request, Alcaldia $alcaldia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alcaldia $alcaldia)
    {
        //
    }
}
