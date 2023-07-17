<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\ProductController;
// Route::get('/',function(){
//     return response(Product::all(),200);
// });

// Route::get('products',function(){
//     return response(Product::all(),200);
// });
Route::apiResource('/', ProductController::class);
 Route::apiResource('products', ProductController::class);