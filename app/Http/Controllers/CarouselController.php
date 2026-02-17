<?php

namespace App\Http\Controllers;

use App\Models\Carousel;
use App\Models\Donasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarouselController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data_carousel = Carousel::all();
        return inertia('user/Home', ['data_carousel' => $data_carousel]);
    }

    public function adminIndex()
    {
        $carousels = Carousel::latest()->get();
        // Assuming Donasi model exists and has a title to select
        $donationPrograms = Donasi::select('id', 'nama')->get()->map(function ($program) {
            return [
                'value' => '/donasi/' . $program->id,
                'label' => $program->nama,
            ];
        });

        return Inertia::render('admin/AdminCarousel', [
            'carousels' => $carousels,
            'donationPrograms' => $donationPrograms
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'link' => 'required|string',
        ]);

        $filename = null;
        if ($request->hasFile('foto')) {
            // Store in public/images/carousel
            $file = $request->file('foto');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/carousel'), $filename);
        }

        Carousel::create([
            'foto' => $filename,
            'link' => $request->link,
        ]);

        return redirect()->back()->with('success', 'Carousel created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Carousel $carousel)
    {
        $request->validate([
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'link' => 'required|string',
        ]);

        $filename = $carousel->foto;
        if ($request->hasFile('foto')) {
            // Delete old image if exists
            if ($carousel->foto && file_exists(public_path('images/carousel/' . $carousel->foto))) {
                unlink(public_path('images/carousel/' . $carousel->foto));
            }

            // Store new image
            $file = $request->file('foto');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/carousel'), $filename);
        }

        $carousel->update([
            'foto' => $filename,
            'link' => $request->link,
        ]);

        return redirect()->back()->with('success', 'Carousel updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carousel $carousel)
    {
        if ($carousel->foto && file_exists(public_path('images/carousel/' . $carousel->foto))) {
            unlink(public_path('images/carousel/' . $carousel->foto));
        }

        $carousel->delete();

        return redirect()->back()->with('success', 'Carousel deleted successfully.');
    }
}
