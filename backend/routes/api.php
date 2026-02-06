<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GenresController;

Route::middleware(['auth:sanctum'])->group(function(){
    Route::put('/edit/{id}', [AuthController::class, 'update']);
    Route::get('/logout/{id}', [AuthController::class, 'logout']);

    Route::post('/genre', [GenresController::class, 'store']);
});

Route::post('/users', [AuthController::class, 'index']);
Route::post('/register', [AuthController::class, 'store']);
Route::post('/register/admin', [AuthController::class, 'admin']);
Route::post('/login', [AuthController::class, 'login']);