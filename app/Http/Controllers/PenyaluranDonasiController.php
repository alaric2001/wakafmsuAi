<?php

namespace App\Http\Controllers;

use App\Models\PenyaluranDonasi;
use Illuminate\Http\Request;

class PenyaluranDonasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function adminIndex()
    {
        $penyaluran = PenyaluranDonasi::with('donasi')->latest()->get();
        $donasi_programs = \App\Models\Donasi::select('id', 'nama')->get(); // For dropdown

        return \Inertia\Inertia::render('admin/AdminPenyaluran', [
            'penyaluran' => $penyaluran,
            'donasiPrograms' => $donasi_programs
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
    public function store(Request $request)
    {
        $request->validate([
            'id_donasi' => 'required|exists:donasi,id',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $filename = null;
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/penyaluran'), $filename);
        }

        PenyaluranDonasi::create([
            'id_donasi' => $request->id_donasi,
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'foto' => $filename,
        ]);

        return redirect()->back()->with('success', 'Penyaluran donasi berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PenyaluranDonasi $penyaluranDonasi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PenyaluranDonasi $penyaluranDonasi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PenyaluranDonasi $penyaluran)
    {
        $request->validate([
            'id_donasi' => 'required|exists:donasi,id',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $filename = $penyaluran->foto;
        if ($request->hasFile('foto')) {
            if ($penyaluran->foto && file_exists(public_path('images/penyaluran/' . $penyaluran->foto))) {
                unlink(public_path('images/penyaluran/' . $penyaluran->foto));
            }
            $file = $request->file('foto');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/penyaluran'), $filename);
        }

        $penyaluran->update([
            'id_donasi' => $request->id_donasi,
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'foto' => $filename,
        ]);

        return redirect()->back()->with('success', 'Penyaluran donasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PenyaluranDonasi $penyaluran)
    {
        if ($penyaluran->foto && file_exists(public_path('images/penyaluran/' . $penyaluran->foto))) {
            unlink(public_path('images/penyaluran/' . $penyaluran->foto));
        }

        $penyaluran->delete();
        return redirect()->back()->with('success', 'Penyaluran donasi berhasil dihapus.');
    }
}
