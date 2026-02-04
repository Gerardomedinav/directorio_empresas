<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crear los roles si no existen
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $clientRole = Role::firstOrCreate(['name' => 'client']);

        // 2. Crear el usuario Administrador
        // Usamos firstOrCreate para que no te dé error si vuelves a ejecutar el seeder
        $admin = User::firstOrCreate(
            ['email' => 'admin@gmail.com'], // Buscamos por email
            [
                'name' => 'Admin',
                'password' => Hash::make('12345678'), // Cambia esta contraseña
            ]
        );

        // 3. Asignar el rol de admin al usuario
        // syncRoles es mejor que assignRole en seeders porque evita duplicados
        $admin->syncRoles([$adminRole]);

        $this->command->info('Usuario admin creado: admin@directorio.com');
    }
}