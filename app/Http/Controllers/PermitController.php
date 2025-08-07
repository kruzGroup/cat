<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermitRequest;
use App\Http\Requests\UpdatePermitRequest;
use App\Models\Permit;
use Inertia\Inertia;

class PermitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('forms/permits/index');
        
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
    public function store(StorePermitRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Permit $permit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permit $permit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermitRequest $request, Permit $permit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permit $permit)
    {
        //
    }
}
