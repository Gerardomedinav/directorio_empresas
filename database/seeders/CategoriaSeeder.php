<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;
use Illuminate\Support\Str;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Definimos un array con las categorías base para Formosa
        $categorias = [
            [
                'nombre' => 'Gastronomía',
                'descripcion' => 'Restaurantes, bares, heladerías y locales de comida rápida.',
                'icono' => '🍔',
                'menu' => 1, // Aparecerá en el Navbar
                'orden' => 1
            ],
            [
                'nombre' => 'Tecnología',
                'descripcion' => 'Venta de hardware, servicio técnico y desarrollo de software.',
                'icono' => '💻',
                'menu' => 1,
                'orden' => 2
            ],
            [
                'nombre' => 'Servicios',
                'descripcion' => 'Electricistas, plomeros, contadores y servicios profesionales.',
                'icono' => '🛠️',
                'menu' => 1,
                'orden' => 3
            ],
            [
                'nombre' => 'Comercio',
                'descripcion' => 'Tiendas de ropa, calzado, marroquinería y bazares.',
                'icono' => '🛍️',
                'menu' => 1,
                'orden' => 4
            ],
            [
                'nombre' => 'Salud y Bienestar',
                'descripcion' => 'Farmacias, centros médicos, gimnasios y estéticas.',
                'icono' => '🏥',
                'menu' => 0, // Solo se verá en la sección "Explorar"
                'orden' => 5
            ]
        ];

        foreach ($categorias as $cat) {
            Categoria::create([
                'nombre'      => $cat['nombre'],
                'slug'        => Str::slug($cat['nombre']), // Convierte "Salud y Bienestar" en "salud-y-bienestar"
                'descripcion' => $cat['descripcion'],
                'icono'       => $cat['icono'],
                'imagen'      => null, // Por ahora nulo como dice tu migración
                'menu'        => $cat['menu'],
                'orden'       => $cat['orden'],
            ]);
        }
    }
}