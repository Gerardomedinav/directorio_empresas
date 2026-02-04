<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Empresa extends Model
{
    use HasFactory;

    // Campos que permitimos llenar mediante Eloquent
    protected $fillable = [
        'nombre',
        'email',
        'descripcion',
        'telefono',
        'direccion',
        'web',
        'facebook',
        'instagram',
        'X',
        'youtube',
        'ticktock',
        'logo',
        'imagen',
        'publicado',
        'orden',
        'visitas',
        'categoria_id',
        'user_id'
    ];

    /**
     * Una empresa pertenece a una categoría (N:1).
     */
    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }

    /**
     * Una empresa pertenece a un usuario (N:1).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}