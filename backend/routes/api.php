<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CastingController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\GenresController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::put('/edit/{id}', [AuthController::class, 'update']);
    Route::get('/logout/{id}', [AuthController::class, 'logout']);

    Route::post('/genre', [GenresController::class, 'store']);
    Route::put('/genre/{id}', [GenresController::class, 'update']);
    Route::delete('/genre/{id}', [GenresController::class, 'delete']);

    Route::post('/film', [FilmController::class, 'store']);
    Route::put('/film/{id}', [FilmController::class, 'update']);
    Route::delete('/film/{id}', [FilmController::class, 'delete']);

    Route::post('/comment', [CommentController::class, 'store']);
    Route::delete('/comment/{id}', [CommentController::class, 'delete']);

    Route::post('/cast', [CastingController::class, 'store']);
    Route::put('/cast/{id}', [CastingController::class, 'update']);
    Route::delete('/cast/{id}', [CastingController::class, 'delete']);
});

Route::post('/register', [AuthController::class, 'store']);
Route::post('/register/admin', [AuthController::class, 'admin']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/films', [FilmController::class, 'index']);
Route::get('/users', [AuthController::class, 'index']);
Route::get('/casts', [CastingController::class, 'index']);
Route::get('/genres', [GenresController::class, 'index']);
