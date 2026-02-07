<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Request $request){
        if ($request->user()->admin != true) {
            return response()->json([
                'message' => 'Anda tidak punya akses'
            ]);
        }

        return response()->json(Comment::all());
    }

    public function store(Request $request){
    
        $request->validate([
            'film_id' => 'required|exists:films,id',
            'comment' => 'required'
        ]);

        $comment = Comment::create([
            'film_id' => $request->film_id,
            'comment' => $request->comment,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([$comment]);
    }

    public function delete(Request $request, $id){
        $comment = Comment::findOrFail();

        if (!$request->user()->admin && $request->user()->id !== $comment->user_id ) {
            return response()->json([
                'message' => 'Anda tidak punya akses'
            ]);
        };

        $comment->delete();
    }
}
