<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenresController extends Controller
{
    public function index(){
        return response()->json(Genre::all());
    }

    public function store(Request $request){
        if ($request->user()->admin != true) {
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan admin'
            ], 403);
        };

        $request->validate([
            'name' => 'required|string|unique:genres,name'
        ]);

        $genre = Genre::create([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Genre Berhasil dibuat',
            'data' => $genre
        ]);
    }

    public function update(Request $request, $id){
        $genre = Genre::findOrFail($id);

        if ($request->user()->admin != true){
            return response()->json([
                'message' => 'Akses ditolak. Anda bukan admin'
            ]);
        }

    
        $request->validate([
            'name' => 'sometimes|required|string|unique:genres,name'
        ]);

        $data = $request->only([
            'name'
        ]);

        $genre->update($data);

        return response()->json([
            'message' => 'Genre berhasil diupdate',
            'data' => $genre
        ]);
    }

    public function delete(Request $request, $id){
        $genre = Genre::findOrFail($id);

        $genre->delete();

        return response()->json([
            'message' => 'Genre berhasil dihapus'
        ]);
    }
}
