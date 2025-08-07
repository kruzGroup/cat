<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobtitlesRequest;
use App\Http\Requests\UpdateJobtitlesRequest;
use App\Models\Jobtitles;
use Inertia\Inertia;

class JobtitlesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('config/jobtitles/index');
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
    public function store(StoreJobtitlesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Jobtitles $jobtitles)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jobtitles $jobtitles)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobtitlesRequest $request, Jobtitles $jobtitles)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jobtitles $jobtitles)
    {
        //
    }
}
