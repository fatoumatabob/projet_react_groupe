<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'full_name' => 'Demo User',
            'username' => 'demo',
            'phone' => '770000000',
            'password' => Hash::make('secret'),
        ]);

        Article::create([
            'user_id' => $user->id,
            'title' => 'Bienvenue',
            'content' => 'Article de démonstration',
            'is_public' => true,
            'allow_comments' => true,
        ]);
    }
}
