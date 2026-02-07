<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function index(){
        return response()->json(Rating::all());
    }

    public function store(Request $request){
        $request->validate([
            'rating' => 'required|numeric|min:0|max:10',
            'film_id' => 'required|exists:films,id'
        ]);

        $rating = Rating::create([
            'rating' => $request->rating,
            'film_id' => $request->film_id,
            'user_id' => $request->user()->id
        ]);

        return response()->json([
            'message' => 'Rating berhasil dibuat',
            'data' => $rating
        ], 201);     
    }
}
