<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GenresController;

Route::middleware(['auth:sanctum'])->group(function(){
    Route::put('/edit/{id}', [AuthController::class, 'update']);
    Route::get('/logout/{id}', [AuthController::class, 'logout']);

    Route::get('/genres', [GenresController::class, 'index']);
    Route::post('/genre', [GenresController::class, 'store']);
    Route::put('/genre/{id}', [GenresController::class, 'update']);
    Route::delete('/genre/{id}', [GenresController::class, 'delete']);
});

Route::post('/users', [AuthController::class, 'index']);
Route::post('/register', [AuthController::class, 'store']);
Route::post('/register/admin', [AuthController::class, 'admin']);
Route::post('/login', [AuthController::class, 'login']);