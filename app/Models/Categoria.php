<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categoria extends Model
{
    use HasFactory;

    // Laravel 11/12 por defecto no crea timestamps si no los pones en la migración.
    // Como en tu migración NO pusiste $table->timestamps(), debemos avisar al modelo:
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'slug',
        'descripcion',
        'icono',
        'imagen',
        'menu',
        'orden'
    ];

    /**
     * Una categoría tiene muchas empresas vinculadas.
     */
    public function empresas(): HasMany
    {
        return $this->hasMany(Empresa::class);
    }
}