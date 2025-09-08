<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FriendRequest;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    

    public function index(Request $request)
    {
        try {
            $user = $request->user(); // récupère l'utilisateur authentifié
            $friends = $user->friends()->get(); // ou ta logique pour récupérer les amis
            return response()->json($friends);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    

    public function sendRequest(Request $request)
    {
        $user = User::where('username', $request->username)
                    ->orWhere('phone', $request->username)
                    ->firstOrFail();

        return FriendRequest::create([
            'from_id' => auth()->id(),
            'to_id' => $user->id,
        ]);
    }

    public function acceptRequest($id)
    {
        $req = FriendRequest::findOrFail($id);

        if ($req->to_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        auth()->user()->friends()->attach($req->from_id);
        $req->delete();

        return response()->json(['message' => 'Ami ajouté !']);
    }

    public function removeFriend($id)
    {
        auth()->user()->friends()->detach($id);
        return response()->json(['message' => 'Ami supprimé !']);
    }
}

