<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\OtpCode;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Inscription
    public function register(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|min:2',
            'username' => 'required|string|min:3|unique:users,username',
            'phone' => 'required|string|unique:users,phone',
            'password' => 'required|string|min:6|confirmed', // 'password_confirmation' attendu
        ]);

        $user = User::create([
            'full_name' => $validated['full_name'],
            'username' => $validated['username'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
        ]);

        // Pour dev, OTP fixe "1111"
        OtpCode::create([
            'user_id' => $user->id,
            'code' => '1111',
            'expires_at' => now()->addMinutes(10),
        ]);

        return response()->json(['message' => 'Inscription réussie.', 'user' => $user], 201);
    }

    // Connexion
    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('phone', $request->phone)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Téléphone ou mot de passe incorrect.'], 401);
        }

        // Générer token
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    // Vérification OTP
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'code' => 'required|string',
        ]);

        $otp = OtpCode::where('user_id', $request->user_id)
            ->where('code', $request->code)
            ->latest()
            ->first();

        if (!$otp || now()->greaterThan($otp->expires_at)) {
            return response()->json(['message' => 'Code OTP invalide ou expiré.'], 422);
        }

        return response()->json(['message' => 'OTP vérifié.']);
    }

    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json(['message' => 'Déconnecté.']);
    }

    
}