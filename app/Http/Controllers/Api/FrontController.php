<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\Request;
use App\Models\Categoria;
use Illuminate\Http\JsonResponse;

class FrontController extends Controller
{
    /**
     * Devuelve todas las categorías para el consumo de la API.
     */
  public function categorias(): JsonResponse
{
    // Quitamos el where('menu', 1) para que traiga TODO
    $categorias = Categoria::orderBy('orden', 'asc')
                    ->get(['id', 'nombre', 'slug', 'icono']);

    return response()->json([
        'success' => true,
        'data' => $categorias
    ], 200);
}

    public function empresas()
{
    $empresas = Empresa::where('publicado', 1)
                ->orderBy('orden', 'asc')
                ->with('categoria:id,nombre') // Traemos el nombre de la categoría
                ->paginate(8); // Paginación de 8 en 8

    return response()->json($empresas);
}

    public function categoria($slug)
    {
        // Tu lógica actual para ver una categoría específica...
    }
}