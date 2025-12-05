<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;

// --- PUBLIC ROUTES ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);

// --- PROTECTED ROUTES (Harus Login) ---
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // User: Booking & History
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/my-bookings', [BookingController::class, 'userBookings']);

    // --- ADMIN ROUTES ---
    // Gunakan string 'is_admin' yang sudah didaftarkan di bootstrap/app.php
    Route::middleware('is_admin')->group(function () {
        
        // Manajemen Ruang
        Route::post('/rooms', [RoomController::class, 'store']);
        Route::put('/rooms/{id}', [RoomController::class, 'update']);
        Route::delete('/rooms/{id}', [RoomController::class, 'destroy']);

        // Manajemen Booking
        Route::get('/admin/bookings', [BookingController::class, 'index']);
        Route::put('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
        Route::get('/reports', [BookingController::class, 'report']);
    });
});