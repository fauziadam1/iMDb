<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index()
    {
        return response()->json(Film::all());
    }

    public function store(Request $request)
    {
        if (!$request->user() || $request->user()->admin !== true) {
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan admin'
            ], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'trailer' => 'nullable|string',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:10240',
            'release_year' => 'nullable|integer|digits:4|min:1800|max:' . date('Y'),
            'duration' => 'nullable|integer|min:1|max:600',
            'age_rating' => 'required|in:SU,BO,13+,17+,R,D',
            'casting' => 'nullable|array',
            'casting.*' => 'exists:castings,id',
            'genre' => 'nullable|array',
            'genre.*' => 'exists:genres,id'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('films', 'public');
        }

        $film = Film::create([
            'title' => $request->title,
            'trailer' => $request->trailer,
            'description' => $request->description,
            'age_rating' => $request->age_rating,
            'image' => $imagePath,
            'release_year' => $request->release_year ? (int)$request->release_year : null,
            'duration' => $request->duration ? (int)$request->duration : null,
            'user_id' => $request->user()->id,
        ]);

        if ($request->filled('genre')) {
            $film->genres()->attach($request->genre);
        }

        if ($request->filled('casting')) {
            $film->castings()->attach($request->casting);
        }

        return response()->json([
            'message' => 'Film berhasil dibuat',
            'data' => $film->load(['genres', 'castings'])
        ], 201);
    }

    public function update(Request $request, $id)
    {
        if ($request->user()->admin !== true) {
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan admin'
            ], 403);
        };

        $film = Film::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'trailer' => 'sometimes|nullable|string',
            'description' => 'sometimes|required|string',
            'image' => 'sometimes|nullable|string',
            'age_rating' => 'sometimes|required|in:SU,BO,13+,17+,R,D',
            'casting' => 'sometimes|nullable|array',
            'casting.*' => 'exists:castings,id',
            'genre' => 'sometimes|nullable|array',
            'genre.*' => 'exists:genres,id'
        ]);

        $data = $request->only([
            'title',
            'trailer',
            'description',
            'image',
            'age_rating',
        ]);

        if ($request->has('genre')) {
            $film->genres()->sync($request->genre ?? []);
        }

        if ($request->has('casting')) {
            $film->castings()->sync($request->casting ?? []);
        }

        $film->update($data);

        return response()->json([
            'message' => 'Film berhasil diupdate',
            'data' => $film->load(['genres', 'castings'])
        ], 200);
    }

    public function delete(Request $request, $id)
    {
        if ($request->user()->admin != true) {
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan admin'
            ], 403);
        };

        $film = Film::findOrFail($id);

        $film->delete();

        return response()->json([
            'message' => 'Film berhasil dihapus'
        ], 201);
    }
}
