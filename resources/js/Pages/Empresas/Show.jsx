import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientBackground from '@/components/ui/gradient-background';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar'; // Importamos el componente modular

export default function Show({ auth, empresa, relacionadas = [], todas_las_empresas = [], categorias = [] }) {
    const [busqueda, setBusqueda] = useState('');
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false);

    // Lógica del buscador dinámico
    const resultados = (busqueda.length > 1 && Array.isArray(todas_las_empresas))
        ? todas_las_empresas.filter(e => e.nombre?.toLowerCase().includes(busqueda.toLowerCase())).slice(0, 5)
        : [];

    if (!empresa) return <div className="p-20 text-center font-sans">Cargando...</div>;

    return (
        <>
            <Head title={`${empresa.nombre} - Directorio Formosa`} />
            
            <GradientBackground backdropBlurAmount="xl" className="min-h-screen bg-white/10 pb-20">
                <div className="relative z-10 text-gray-900 font-sans">
                    
                    {/* NAVBAR MODULARIZADO */}
                    <Navbar auth={auth} categorias={categorias} />

                    {/* SECCIÓN DE BÚSQUEDA (DEBAJO DEL NAV) */}
                    <div className="w-full bg-gradient-to-b from-white/40 to-transparent py-10 px-6">
                        <div className="max-w-xl mx-auto relative">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                    <span className="text-xl">🔍</span>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="¿Buscas otra empresa? Escribe el nombre aquí..."
                                    className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-3xl shadow-2xl focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-lg font-medium text-gray-800"
                                    value={busqueda}
                                    onChange={(e) => {
                                        setBusqueda(e.target.value);
                                        setMostrarBusqueda(true);
                                    }}
                                />
                            </div>

                            {/* RESULTADOS DEL BUSCADOR */}
                            <AnimatePresence>
                                {mostrarBusqueda && resultados.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        className="absolute top-full left-0 right-0 mt-3 bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white overflow-hidden z-50"
                                    >
                                        {resultados.map(res => (
                                            <Link 
                                                key={res.id} 
                                                href={`/empresas/${res.id}`}
                                                className="flex items-center gap-4 p-4 hover:bg-blue-50 transition border-b border-gray-50 last:border-none"
                                                onClick={() => { setBusqueda(''); setMostrarBusqueda(false); }}
                                            >
                                                <img src={res.imagen || '/storage/default.jpg'} className="size-12 rounded-2xl object-cover shadow-sm" alt="" />
                                                <div>
                                                    <p className="font-black text-gray-800 leading-none">{res.nombre}</p>
                                                    <p className="text-xs text-blue-600 font-bold mt-1 uppercase">Ver perfil</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto px-6">
                        {/* CARD PRINCIPAL DE LA EMPRESA SELECCIONADA */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="bg-white/80 backdrop-blur-3xl rounded-[3.5rem] p-8 md:p-12 shadow-2xl border border-white"
                        >
                            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start text-left">
                                <div className="flex-none w-[320px] h-[320px] relative">
                                    <img src={empresa.imagen || '/storage/default.jpg'} className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border-4 border-white" alt={empresa.nombre} />
                                    <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-3xl shadow-xl font-black text-center min-w-[100px]">
                                        <p className="text-[10px] uppercase opacity-80 leading-none">Visitas</p>
                                        <p className="text-xl">{empresa.visitas || 0}</p>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-6">
                                    <span className="bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">{empresa.categoria?.nombre || 'General'}</span>
                                    <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">{empresa.nombre}</h1>
                                    <p className="text-2xl text-gray-600 font-medium italic leading-relaxed">"{empresa.descripcion}"</p>
                                    
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <div className="flex-1 bg-white/50 p-6 rounded-3xl border border-white flex items-center gap-4">
                                            <span className="text-3xl">📍</span>
                                            <div>
                                                <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Dirección</p>
                                                <p className="text-lg font-bold text-gray-800">{empresa.direccion || 'Formosa'}</p>
                                            </div>
                                        </div>
                                        {empresa.telefono && (
                                            <div className="flex-1 bg-white/50 p-6 rounded-3xl border border-white flex items-center gap-4">
                                                <span className="text-3xl">📞</span>
                                                <div>
                                                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Teléfono</p>
                                                    <p className="text-lg font-bold text-gray-800">{empresa.telefono}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* REDES SOCIALES */}
                        <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-xl">
                                <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest">Redes Sociales</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {empresa.facebook && <a href={empresa.facebook} target="_blank" className="bg-[#1877F2] text-white p-4 rounded-2xl font-bold text-center hover:scale-105 transition-all shadow-md">Facebook</a>}
                                    {empresa.instagram && <a href={empresa.instagram} target="_blank" className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white p-4 rounded-2xl font-bold text-center hover:scale-105 transition-all shadow-md">Instagram</a>}
                                    {empresa.youtube && <a href={empresa.youtube} target="_blank" className="bg-red-600 text-white p-4 rounded-2xl font-bold text-center hover:scale-105 transition-all shadow-md">YouTube</a>}
                                    {empresa.ticktock && <a href={empresa.ticktock} target="_blank" className="bg-black text-white p-4 rounded-2xl font-bold text-center hover:scale-105 transition-all shadow-md">TikTok</a>}
                                </div>
                            </div>
                            <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-xl flex flex-col justify-center">
                                <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-widest">🌐 Sitio Web</h3>
                                {empresa.web ? (
                                    <a href={empresa.web} target="_blank" className="text-blue-600 font-black text-2xl hover:underline break-all">{empresa.web.replace(/(^\w+:|^)\/\//, '')}</a>
                                ) : (
                                    <p className="text-gray-400 font-bold italic">No disponible</p>
                                )}
                            </div>
                        </div>

                        {/* RELACIONADAS */}
                        {relacionadas.length > 0 && (
                            <div className="mt-24">
                                <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Más en <span className="text-blue-600">{empresa.categoria?.nombre}</span></h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {relacionadas.map(rel => (
                                        <Link key={rel.id} href={`/empresas/${rel.id}`} className="group bg-white/40 p-6 rounded-[2.5rem] border border-white shadow-xl hover:bg-white transition-all">
                                            <img src={rel.imagen || '/storage/default.jpg'} className="w-full h-44 object-cover rounded-[1.8rem] mb-4 group-hover:scale-95 transition-transform shadow-md" alt="" />
                                            <h4 className="text-xl font-black text-gray-800">{rel.nombre}</h4>
                                            <p className="text-blue-600 font-bold text-xs mt-1 uppercase tracking-widest">Ver Perfil ➔</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </GradientBackground>
            <Footer />
        </>
    );
}