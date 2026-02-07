<?php

namespace App\Http\Controllers;

use App\Models\Casting;
use Illuminate\Http\Request;

class CastingController extends Controller
{
    public function index()
    {
        return response()->json(Casting::all());
    }

    public function store(Request $request)
    {
        if ($request->user()->admin != true) {
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan admin'
            ]);
        };

        $request->validate([
            'name' => 'required|string|unique:castings,name',
        ]);

        $cast = Casting::create([
            'name' => $request->name,
        ]);

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
            ]);
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
        ]);
    }

    public function delete(Request $request, $id)
    {
        if ($request->user()->admin !== true) {
            return response()->json([
                'message' => 'Anda tidak punya akses'
            ]);
        }

        $cast = Casting::findOrFail($id);

        $cast->delete();

        return response()->json([
            'message' => 'Casting berhasil dihapus'
        ]);
    }
}
