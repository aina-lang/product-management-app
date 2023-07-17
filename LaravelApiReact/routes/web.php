<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
/*
Route::get('/', function () {
    return view('welcome');
});
*/


// Route::apiResource('/', ProductController::class);
// Route::apiResource('products', ProductController::class);
use App\Models\Product;



Route::get('/',function(){
    return response(Product::all(),200);
});

Route::get('products',function(){
    return response(Product::all(),200);
});