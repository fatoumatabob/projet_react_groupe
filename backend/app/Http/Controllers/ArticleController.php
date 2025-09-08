<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    //

    public function index()
    {
        return Article::where('user_id', Auth::id())->get();
    }

    


    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'is_public' => 'boolean',
            'allow_comments' => 'boolean',
            'scheduled_at' => 'nullable|date',
        ]);

        $data['user_id'] = Auth::id();
        return Article::create($data);
    }

    public function show(Article $article)
    {
        return $article;
    }

    public function update(Request $request, Article $article)
    {
        if ($article->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $article->update($request->all());
        return $article;
    }

    public function destroy(Article $article)
    {
        if ($article->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $article->delete();
        return response()->json(['message' => 'Supprimé']);
    }
    

}
