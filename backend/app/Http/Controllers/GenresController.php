<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Genre;

class GenresController extends Controller
{
    public function index(){
        return response()->json(Genre::all());
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|unique:genres'
        ]);

        $genre = Genre::create([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Genre Berhasil dibuat',
            'data' => $genre
        ]);
    }
}
