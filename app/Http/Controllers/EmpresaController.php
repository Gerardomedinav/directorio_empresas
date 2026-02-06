<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmpresaController extends Controller
{
    /**
     * Retorna la lista de empresas (Usado por tu API en Welcome.jsx)
     */
    public function index()
    {
        $empresas = Empresa::where('publicado', 1)->with('categoria')->get();
        return response()->json(['data' => $empresas]);
    }

    /**
     * Muestra la vista de detalle de una empresa específica
     */
public function show(Empresa $empresa)
{
    return Inertia::render('Empresas/Show', [
        'empresa' => $empresa->load('categoria'),
        'relacionadas' => Empresa::where('categoria_id', $empresa->categoria_id)->where('id', '!=', $empresa->id)->get(),
        'categorias' => \App\Models\Categoria::all(), // Para el Navbar
        'todas_las_empresas' => Empresa::where('publicado', 1)->get(['id', 'nombre', 'imagen']) // Para el buscador dinámico
    ]);
}
public function porCategoria(Categoria $categoria)
{
    $empresas = Empresa::where('categoria_id', $categoria->id)
        ->where('publicado', 1)
        ->with('categoria')
        ->paginate(9); // 9 empresas por página (cuadrícula de 3x3)

    return Inertia::render('Categorias/Index', [
        'categoria' => $categoria,
        'empresas' => $empresas,
        'categorias' => Categoria::all(), // Para que el Navbar siga funcionando
    ]);
}
}