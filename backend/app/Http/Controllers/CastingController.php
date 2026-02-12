<?php

namespace App\Http\Controllers;

use App\Models\Casting;
use Illuminate\Http\Request;

class CastingController extends Controller
{
    public function index()
    {
        $cast = Casting::with('films')->get();
        return response()->json($cast);
    }

    public function store(Request $request)
    {
        if ($request->user()->admin != true) {
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan admin'
            ], 403);
        }
        ;

        $request->validate([
            'name' => 'required|string|unique:castings,name',
        ]);

        $cast = Casting::create([
            'name' => $request->name,
        ]);

        if ($request->filled('film')) {
            $cast->films()->attach($request->films);
        }

        return response()->json([
            'message' => 'Casting berhasil dibuat',
            'data' => $cast
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $cast = Casting::findOrFail($id);

        if ($request->user()->admin !== true) {
            return response()->json([
                'message' => 'Anda tidak punya akses'
            ], 403);
        }

        $request->validate([
            'name' => 'sometimes|required|string|unique:castings,name'
        ]);

        $data = $request->only([
            'name'
        ]);

        $cast->update($data);

        return response()->json([
            'message' => 'Casting berhasil diupdate',
            'data' => $cast
        ], 200);
    }

    public function delete(Request $request, $id)
    {
        if ($request->user()->admin !== true) {
            return response()->json([
                'message' => 'Anda tidak punya akses'
            ], 403);
        }

        $cast = Casting::findOrFail($id);

        $cast->delete();

        return response()->json([
            'message' => 'Casting berhasil dihapus'
        ], 204);
    }
}
