<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClosingRequest;
use App\Http\Requests\UpdateClosingRequest;
use App\Models\Closing;
use Inertia\Inertia;

class ClosingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('forms/closings/index');
        
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
    public function store(StoreClosingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Closing $closing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Closing $closing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClosingRequest $request, Closing $closing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Closing $closing)
    {
        //
    }
}
