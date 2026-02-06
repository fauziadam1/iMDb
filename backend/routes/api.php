<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware(['auth:sanctum'])->group(function(){
    Route::put('/edit/{id}', [AuthController::class, 'update']);
    Route::get('/logout/{id}', [AuthController::class, 'logout']);
});

Route::post('/users', [AuthController::class, 'index']);
Route::post('/register', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);