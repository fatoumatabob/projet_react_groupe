<?php
namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FeedController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié'], 401);
        }

        // IDs des amis
       
        $friendIds = $user->friends()->pluck('users.id')->toArray();

        // Blocages (A bloque B OU B bloque A)
        $blockedMeIds = DB::table('blocks')->where('blocked_id', $user->id)->pluck('blocker_id')->toArray() ?? [];
        $iBlockedIds  = DB::table('blocks')->where('blocker_id', $user->id)->pluck('blocked_id')->toArray() ?? [];
        $blockedIds = DB::table('blocks')->where('blocker_id', auth()->id())->pluck('blocked_id');


        $now = now();

        $query = Article::query()
            ->with(['user:id,username']) // charger l’auteur minimal
            ->where(function ($q) use ($user, $friendIds) {
                $q->where('user_id', $user->id)
                  ->orWhereIn('user_id', $friendIds);
            })
            ->where(function ($q) use ($user) {
                $q->where('user_id', $user->id)
                  ->orWhere('is_public', true);
            })
            ->whereNotIn('user_id', array_unique(array_merge($blockedMeIds, $iBlockedIds)))
            ->where(function ($q) use ($now) {
                $q->whereNull('scheduled_for')
                  ->orWhere('scheduled_for', '<=', $now);
            })
            ->orderByDesc('scheduled_for')
            ->orderByDesc('created_at');

        // Pagination
        $feed = $query->paginate(10)->through(function ($a) {
            return [
                'id' => $a->id,
                'title' => $a->title,
                'content' => $a->content,
                'is_public' => (bool) $a->is_public,
                'allow_comments' => (bool) $a->allow_comments,
                'created_at' => $a->created_at,
                'published_at' => $a->scheduled_for ?? $a->created_at,
                'user_id' => $a->user_id,
                'author' => [
                    'id' => $a->user->id ?? null,
                    'username' => $a->user->username ?? null,
                ],
            ];
        });

        return response()->json($feed);
    }
}
