<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/posts')->group(function () {
    Route::post('/createpost', [\App\Http\Controllers\PostsController::class, 'create']);
    Route::get('/getposts', [\App\Http\Controllers\PostsController::class, 'get']);
    Route::post('/createcomment/{postId}', [\App\Http\Controllers\CommentsController::class, 'create']);
});
