<?php

use App\Http\Controllers\Api\Admin\CategoriaController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\EmpresaController;
use App\Http\Controllers\Api\FrontController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Client\EmpresaController as EmpresaClientController;




route::prefix('v1')->group(function () {
    //public routes
    //::public
    // Ruta para obtener el listado de categorías
    Route::get('/categorias', [FrontController::class, 'categorias']);
    route::get('/public/{slug}', [FrontController::class, 'categoria']);
    Route::get('/empresas', [FrontController::class, 'empresas']);
   
});


Route::get('/user', function (Request $request) {
    return $request->user();
    //::rol client
    route::apiResource('/client/empresa', EmpresaController::class);
    //::rol admin
    route::apiResource('/admin/empresa', EmpresaClientController::class);
    //::rol user
    route::apiResource('/admin/user', UserController::class);
    route::apiResource('/admin/categoria', CategoriaController::class);
})->middleware('auth:sanctum');

