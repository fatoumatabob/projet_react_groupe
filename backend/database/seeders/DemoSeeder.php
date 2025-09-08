<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Article;
use Illuminate\Support\Facades\Hash;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        $me = User::firstOrCreate(
            ['username' => 'me'],
            ['name' => 'Moi', 'phone' => '770000000', 'password' => Hash::make('password')]
        );

        $ami = User::firstOrCreate(
            ['username' => 'ami'],
            ['name' => 'Ami', 'phone' => '771111111', 'password' => Hash::make('password')]
        );

        // amitié dans les 2 sens
        $me->friends()->syncWithoutDetaching([$ami->id]);
        $ami->friends()->syncWithoutDetaching([$me->id]);

        Article::factory()->create([
            'user_id' => $me->id,
            'title' => 'Mon article privé',
            'content' => '…',
            'is_public' => false,
        ]);

        Article::factory()->create([
            'user_id' => $ami->id,
            'title' => 'Article public de mon ami',
            'content' => 'Salut !',
            'is_public' => true,
        ]);
    }
}
