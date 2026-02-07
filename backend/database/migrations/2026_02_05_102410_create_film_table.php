<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('description');
            $table->string('trailer')->nullable();
            $table->string('image')->nullable();
            $table->year('release_year')->nullable();
            $table->integer('duration')->nullable();
            $table->enum('age_rating', ['SU', 'BO', '13+', '17+', 'R', 'D']);
            $table->timestamps();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
