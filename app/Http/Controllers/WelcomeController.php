<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class WelcomeController extends Controller
{
    public function index()
    {
        // Traemos todas las categorías ordenadas por el campo 'orden'
        $categorias = Categoria::orderBy('orden', 'asc')->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'categorias' => $categorias, // <--- AQUÍ PASAMOS LOS DATOS REALES
        ]);
    }
}