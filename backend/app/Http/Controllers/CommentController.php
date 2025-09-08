<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Article $article)
    {
        return $article->comments()->latest()->get();
    }

    public function store(Request $request, Article $article)
    {
        $request->validate([
            'content' => 'required|string'
        ]);

        return $article->comments()->create([
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);
    }

    public function destroy(Article $article, Comment $comment)
    {
        // L’auteur du commentaire ou l’auteur de l’article peut supprimer
        if ($comment->user_id !== auth()->id() && $article->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $comment->delete();
        return response()->json(['message' => 'Commentaire supprimé']);
    }
}
