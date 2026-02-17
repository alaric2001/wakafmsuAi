<?php

namespace App\Http\Controllers;

use App\Models\Donasi;
use App\Models\PenyaluranDonasi;
use App\Models\Carousel; 
use App\Http\Requests\StoreDonasiRequest;
use App\Http\Requests\UpdateDonasiRequest;

use Inertia\Inertia;

class DonasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_donasi = Donasi::all();
        $data_carousel = Carousel::all();

        return Inertia::render('user/Home', [ // <-- Gunakan Inertia::render()
            'data_donasi' => $data_donasi,
            'data_carousel' => $data_carousel,
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
    public function store(StoreDonasiRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Donasi $donasi)
    {
        // Eager load relasi 'penyaluranDonasi'
        $donasi->load('penyaluranDonasi');
        
        return Inertia::render('user/DetailDonasi', ['donasi' => $donasi]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Donasi $donasi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDonasiRequest $request, Donasi $donasi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donasi $donasi)
    {
        //
    }
}
