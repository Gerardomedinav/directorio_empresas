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
        // Validación de seguridad: solo mostrar si está publicada
        if (!$empresa->publicado) {
            abort(404);
        }

        // Sumar visita (usando el campo de tu migración)
        $empresa->increment('visitas');

        return Inertia::render('Empresas/Show', [
            'empresa' => $empresa->load('categoria')
        ]);
    }
}