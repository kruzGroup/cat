<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaxpayerRequest;
use App\Http\Requests\UpdateTaxpayerRequest;
use App\Models\Taxpayer;
use Inertia\Inertia;

class TaxpayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('units/cat-empresas/taxpayers/index');
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
    public function store(StoreTaxpayerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Taxpayer $taxpayer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Taxpayer $taxpayer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaxpayerRequest $request, Taxpayer $taxpayer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Taxpayer $taxpayer)
    {
        //
    }
}
