<?php

namespace App\Http\Controllers;

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
}