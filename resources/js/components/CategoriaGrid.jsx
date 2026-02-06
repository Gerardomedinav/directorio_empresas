import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function CategoriaGrid({ categorias }) {
    // Duplicamos las categorías para crear el efecto de bucle infinito sin saltos
    const duplicatedCategorias = [...categorias, ...categorias, ...categorias];

    return (
        <section id="explorar" className="py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                    Explora por Rubro
                </h2>
                <p className="text-gray-600 mt-2 font-medium">Navega de forma dinámica por todas las opciones</p>
            </div>

            {/* CONTENEDOR DE LA CINTA */}
            <div className="relative flex overflow-hidden py-10 group">
                <motion.div
                    className="flex flex-nowrap gap-10"
                    animate={{
                        x: ['0%', '-33.33%'], // Se desplaza hasta cubrir una tanda completa
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Ajusta la velocidad aquí (más segundos = más lento)
                            ease: "linear",
                        },
                    }}
                    // Pausa la cinta cuando el usuario pasa el mouse para que pueda hacer clic tranquilo
                    whileHover={{ transition: { duration: 0 } }} 
                >
                    {duplicatedCategorias.map((cat, index) => (
                        <div key={`${cat.id}-${index}`} className="flex-none w-[280px]">
                            <Link href={`/categorias/${cat.id}`}>
                                <motion.div 
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="relative group cursor-pointer"
                                >
                                    {/* Sombra proyectada */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-10 group-hover:opacity-40 transition duration-500"></div>
                                    
                                    <div className="relative bg-white/60 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/80 shadow-xl flex flex-col items-center justify-center h-full hover:bg-white transition-all">
                                        <div className="text-5xl mb-4 drop-shadow-lg">
                                            {cat.icono}
                                        </div>
                                        <h3 className="text-md font-black text-gray-800 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                                            {cat.nombre}
                                        </h3>
                                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[10px] font-black text-blue-500 uppercase">Ver Rubro ➔</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}