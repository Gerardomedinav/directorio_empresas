<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre',50);
            $table->string('email',50)->unique();
            $table->text('descripcion')->nullable();
            $table->string('telefono',20)->nullable();
            $table->string('direccion',100)->nullable();    
            $table->string('web',100)->nullable();
            $table->string('facebook',100)->nullable();
            $table->string('instagram',100)->nullable();
            $table->string('X',100)->nullable();
            $table->string('youtube',100)->nullable();
            $table->string('ticktock',100)->nullable();
            $table->string('logo',100)->nullable();
            $table->string('imagen',100)->nullable();
            $table->boolean('publicado')->default(0);
            $table->integer('orden')->default(1);
            $table->integer('visitas')->default(0);
            $table->foreignId('categoria_id')->constrained('categorias')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
