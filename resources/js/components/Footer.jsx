import React from 'react';

// Si ShineEffect es un componente separado, asegúrate de importarlo correctamente
// Si no, puedes omitirlo o integrarlo aquí
const ShineEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-[shine_8s_infinite] skew-x-12" />
    </div>
);

export default function Footer() {
    return (
        <footer className="relative bg-white/20 backdrop-blur-md border-t border-white/30 py-16 overflow-hidden mt-auto">
            {/* Efecto de brillo de fondo */}
            <ShineEffect />
            
            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                {/* Logo o Marca en el Footer */}
                <div className="mb-6">
                    <span className="text-2xl font-black text-blue-700">FORMOSA</span>
                    <span className="text-gray-400 font-light ml-1 uppercase tracking-[0.3em] text-xs">Directorio</span>
                </div>

                {/* Texto solicitado */}
                <p className="text-gray-900 font-black text-lg mb-2">
                    Directorio de Empresas Formoseñas
                </p>
                
                <p className="text-gray-600 font-medium">
                    © 2026 - Gerardo Medina - Primera Cohorte de Programación Universitaria UTN Formosa
                </p>

               
            </div>
        </footer>
    );
}