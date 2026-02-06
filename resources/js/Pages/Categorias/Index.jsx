import React, { useState } from 'react'; // Importamos useState
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import GradientBackground from '@/components/ui/gradient-background';
import CategoriaGrid from '@/Components/CategoriaGrid';

export default function Index({ auth, categoria, empresas, categorias }) {
    const [busqueda, setBusqueda] = useState('');

    // Lógica de filtrado dinámico por nombre
    const empresasFiltradas = empresas.data.filter(emp => 
        emp.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <>
            <Head title={`Rubro ${categoria.nombre} - Formosa`} />
            
            <GradientBackground backdropBlurAmount="xl" className="min-h-screen bg-white/10 pb-20">
                <div className="relative z-10 text-gray-900 font-sans">
                    
                    <Navbar auth={auth} categorias={categorias} />

                    <div className="max-w-7xl mx-auto px-6 pt-16">
                        
                        {/* CABECERA DINÁMICA */}
                        <div className="text-center mb-12">
                            <motion.span 
                                initial={{ scale: 0, rotate: -20 }} 
                                animate={{ scale: 1, rotate: 0 }}
                                className="text-7xl block mb-6 drop-shadow-lg"
                            >
                                {categoria.icono || '🏢'}
                            </motion.span>
                            <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                                {categoria.nombre}
                            </h1>
                            <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                        </div>

                        {/* BUSCADOR DENTRO DE LA CATEGORÍA */}
                        <div className="max-w-md mx-auto mb-16 relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input 
                                type="text"
                                placeholder={`Buscar en ${categoria.nombre}...`}
                                className="w-full pl-14 pr-6 py-4 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl focus:ring-4 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-gray-800 font-bold"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>

                        {/* GRID DE RESULTADOS */}
                        <div className="min-h-[400px]">
                            {empresasFiltradas.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                    <AnimatePresence>
                                        {empresasFiltradas.map((emp, index) => (
                                            <motion.div 
                                                key={emp.id}
                                                layout // Animación de reordenamiento suave
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Link 
                                                    href={`/empresas/${emp.id}`} 
                                                    className="group block bg-white/60 backdrop-blur-2xl rounded-[3rem] p-6 border border-white shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 h-full"
                                                >
                                                    <div className="relative overflow-hidden rounded-[2.2rem] mb-6 aspect-video">
                                                        <img 
                                                            src={emp.imagen || '/storage/default.jpg'} 
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                            alt={emp.nombre} 
                                                        />
                                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-blue-700 px-4 py-1.5 rounded-2xl text-xs font-black shadow-sm">
                                                            👁 {emp.visitas}
                                                        </div>
                                                    </div>
                                                    
                                                    <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                                                        {emp.nombre}
                                                    </h3>
                                                    <p className="text-gray-600 line-clamp-2 text-sm mb-6 font-medium leading-relaxed">
                                                        {emp.descripcion}
                                                    </p>
                                                    
                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                                        <span className="text-blue-600 font-black text-xs uppercase tracking-widest">Ver detalle ➔</span>
                                                        <span className="text-gray-400 text-[10px] font-bold uppercase">{emp.direccion || 'Formosa'}</span>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    className="text-center py-20 bg-white/40 backdrop-blur-xl rounded-[3.5rem] border border-white shadow-inner"
                                >
                                    <p className="text-2xl font-bold text-gray-400">No hay coincidencias para "{busqueda}"</p>
                                </motion.div>
                            )}
                        </div>

                        {/* PAGINACIÓN CON ESTILO GLASS */}
                        {/* Nota: Solo se muestra si no hay búsqueda activa para no confundir con los resultados filtrados en JS */}
                        {busqueda === '' && empresas.links.length > 3 && (
                            <div className="mt-20 flex justify-center flex-wrap gap-3">
                                {empresas.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-5 py-3 rounded-2xl font-black transition-all duration-300 text-sm ${
                                            link.active 
                                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-110' 
                                            : 'bg-white/70 text-gray-600 hover:bg-blue-50 border border-white'
                                        } ${!link.url && 'opacity-30 cursor-not-allowed pointer-events-none'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <CategoriaGrid categorias={categorias} />
            </GradientBackground>
            <Footer />
        </>
    );
}