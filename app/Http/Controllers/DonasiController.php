<?php

namespace App\Http\Controllers;

use App\Models\Donasi;
use App\Models\PenyaluranDonasi;
use App\Models\Carousel;
use App\Http\Requests\StoreDonasiRequest;
use App\Http\Requests\UpdateDonasiRequest;
use Illuminate\Http\Request;

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

    public function adminIndex()
    {
        $donasi = Donasi::latest()->get();
        return Inertia::render('admin/AdminDonasi', ['donasi' => $donasi]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'target_donasi' => 'required|numeric',
            'open_donasi' => 'nullable|date',
            'deskripsi' => 'required|string',
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status_post' => 'required|in:post,hide',
        ]);

        $filename = null;
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/donasi'), $filename);
        }

        Donasi::create([
            'nama' => $request->nama,
            'target_donasi' => $request->target_donasi,
            'open_donasi' => $request->open_donasi,
            'deskripsi' => $request->deskripsi,
            'foto' => $filename,
            'status_post' => $request->status_post,
        ]);

        return redirect()->back()->with('success', 'Donasi berhasil ditambahkan.');
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
    public function update(Request $request, Donasi $donasi)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'target_donasi' => 'required|numeric',
            'open_donasi' => 'nullable|date',
            'deskripsi' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status_post' => 'required|in:post,hide',
        ]);

        $filename = $donasi->foto;
        if ($request->hasFile('foto')) {
            if ($donasi->foto && file_exists(public_path('images/donasi/' . $donasi->foto))) {
                unlink(public_path('images/donasi/' . $donasi->foto));
            }
            $file = $request->file('foto');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/donasi'), $filename);
        }

        $donasi->update([
            'nama' => $request->nama,
            'target_donasi' => $request->target_donasi,
            'open_donasi' => $request->open_donasi,
            'deskripsi' => $request->deskripsi,
            'foto' => $filename,
            'status_post' => $request->status_post,
        ]);

        return redirect()->back()->with('success', 'Donasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donasi $donasi)
    {
        if ($donasi->foto && file_exists(public_path('images/donasi/' . $donasi->foto))) {
            unlink(public_path('images/donasi/' . $donasi->foto));
        }

        $donasi->delete();
        return redirect()->back()->with('success', 'Donasi berhasil dihapus.');
    }
}
