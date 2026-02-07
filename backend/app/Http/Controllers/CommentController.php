<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Comment::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'film_id' => 'required|exists:films,id',
            'comment' => 'required'
        ]);

        $comment = Comment::create([
            'film_id' => $request->film_id,
            'comment' => $request->comment,
            'user_id' => $request->user()->id,
        ]);

        if (!$request->user()) {
            return response()->json([
                'message' => 'Login terlebih dahulu'
            ]);
        };

        return response()->json([
            'message' => 'Komentar berhasil dikirim',
            'data' => $comment
        ], 201);
    }

    public function delete(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        if (!$request->user()->admin && $request->user()->id !== $comment->user_id) {
            return response()->json([
                'message' => 'Anda tidak punya akses'
            ], 403);
        };

        $comment->delete();

        return response()->json([
            'message' => 'Komentar berhasil dihapus',
        ]. 204);
    }
}
