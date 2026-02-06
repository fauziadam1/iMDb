<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;

class FilmController extends Controller
{
    public function index(){
        return response()->json(Film::all());
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'trailer' => 'required|string',
            'description' => 'required|text',
            'genre' => 'required|string|max:100',
            'age' => 'required|string|max:100'
        ]);

        $film = Film::create([
            ''
        ]);
    }
}
