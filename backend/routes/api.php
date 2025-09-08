<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\FeedController;



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/friends', [FriendController::class, 'index']);
});


// ------------------- AUTH ROUTES -------------------
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/auth/verify-otp', [AuthController::class, 'verifyOtp']);

// ------------------- PROTECTED ROUTES -------------------
Route::middleware('auth:sanctum')->group(function () {

    // Articles
    Route::get('/articles', [ArticleController::class, 'index']);
    Route::post('/articles', [ArticleController::class, 'store']);

    // Comments
    Route::get('/articles/{article}/comments', [CommentController::class, 'index']);
    Route::post('/articles/{article}/comments', [CommentController::class, 'store']);
    Route::delete('/articles/{article}/comments/{comment}', [CommentController::class, 'destroy']);

    // Feed
    Route::get('/feed', [FeedController::class, 'index']);

    // Friends
    Route::get('/friends', [FriendController::class, 'index']);
    Route::post('/friends/request', [FriendController::class, 'sendRequest']);
    Route::patch('/friends/accept/{id}', [FriendController::class, 'acceptRequest']);
    Route::delete('/friends/{id}', [FriendController::class, 'removeFriend']);
});
