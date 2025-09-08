<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Le schéma des utilisateurs contient déjà ces colonnes dans la migration initiale.
        // On ajoute uniquement si elles n'existent pas (en environnement legacy).
        if (!Schema::hasColumn('users', 'username') || !Schema::hasColumn('users', 'phone')) {
            Schema::table('users', function (Blueprint $table) {
                if (!Schema::hasColumn('users', 'username')) {
                    $table->string('username')->unique()->after('full_name');
                }
                if (!Schema::hasColumn('users', 'phone')) {
                    $table->string('phone')->unique()->after('username');
                }
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'username') || Schema::hasColumn('users', 'phone')) {
            Schema::table('users', function (Blueprint $table) {
                if (Schema::hasColumn('users', 'username')) {
                    $table->dropColumn('username');
                }
                if (Schema::hasColumn('users', 'phone')) {
                    $table->dropColumn('phone');
                }
            });
        }
    }
};
