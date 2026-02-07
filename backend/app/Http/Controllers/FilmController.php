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
            'image' => 'nullable|string',
            'age_rating' => 'required|in:SU,BO,13+,17+,R,D',
            'genre' => 'nullable|array',
            'genre.*' => 'exists:genres,id'
        ]);


        $film = Film::create([
            'title' => $request->title,
            'trailer' => $request->trailer,
            'description' => $request->description,
            'age_rating' => $request->age_rating,
            'image' => $request->image,
            'user_id' => $request->user()->id,
        ]);

        if ($request->filled('genre')) {
            $film->genres()->attach($request->genre);
        }

        return response()->json([
            'message' => 'Film berhasil dibuat',
            'data' => $film->load('genres')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        if ($request->user() || $request->user()->admin !== true) {
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

        $film->update($data);

        return response()->json([
            'message' => 'Film berhasil diupdate',
            'data' => $film->load('genres')
        ]);
    }

    public function delete(Request $request, $id)
    {
        if ($request->user() || $request->user()->admin != true) {
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan admin'
            ], 403);
        };

        $film = Film::findOrFail($id);

        $film->delete();

        return response()->json([
            'message' => 'Film berhasil dihapus'
        ]);
    }
}
