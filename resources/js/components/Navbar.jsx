import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Navbar({ auth, categorias }) {
    const [isOpen, setIsOpen] = useState(false);

    const ShineEffect = () => (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <motion.div
                initial={{ left: "-150%" }}
                animate={{ left: "150%" }}
                transition={{ repeat: Infinity, duration: 2.0, repeatDelay: 1.5, ease: "linear" }}
                className="absolute top-0 w-1/4 h-full bg-gradient-to-r from-transparent via-blue-400/40 to-transparent skew-x-[-35deg] shadow-[0_0_50px_rgba(59,130,246,0.6)]"
            />
        </div>
    );

    return (
        <nav className="bg-white/40 backdrop-blur-md border-b border-white/20 sticky top-0 z-[100] shadow-sm">
            <ShineEffect />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between h-16 items-center">
                    
                      {/* LOGO */}

                    <div className="flex-shrink-0 flex items-center gap-2">

                        <Link href="/" className="flex items-center gap-2">

                            <span className="text-2xl font-bold text-blue-700">Formosa</span>

                            <span className="text-xl font-light text-gray-500 uppercase tracking-widest">Directorio</span>

                        </Link>

                    </div>

                    {/* MENÚ CENTRAL (Desktop) */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link 
                            href="/" 
                            className="text-blue-600 font-black hover:text-blue-800 transition uppercase text-xs tracking-widest"
                        >
                            Inicio
                        </Link>

                        {categorias?.map((cat) => (
                            <Link 
                                key={cat.id} 
                                href={`/categorias/${cat.id}`} 
                                className="text-gray-700 hover:text-blue-600 font-semibold transition text-sm"
                            >
                                {cat.nombre}
                            </Link>
                        ))}
                    </div>

                    {/* BOTONES DE ACCESO (Desktop) + BOTÓN HAMBURGUESA (Mobile) */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition text-sm">
                                    Mi Panel
                                </Link>
                            ) : (
                                <Link href={route('login')} className="text-gray-700 hover:text-blue-600 font-bold transition text-sm">
                                    Ingresar
                                </Link>
                            )}
                        </div>

                        {/* Toggle Móvil */}
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* MENÚ DESPLEGABLE MÓVIL */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/90 backdrop-blur-xl border-b border-white/20 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2 shadow-inner">
                            <Link 
                                href="/" 
                                className="block px-3 py-3 rounded-xl text-blue-600 font-black uppercase text-xs tracking-widest bg-blue-50"
                                onClick={() => setIsOpen(false)}
                            >
                                Inicio
                            </Link>
                            
                            <p className="px-3 pt-4 pb-1 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Rubros</p>
                            
                            {categorias?.map((cat) => (
                                <Link 
                                    key={cat.id} 
                                    href={`/categorias/${cat.id}`} 
                                    className="block px-3 py-3 rounded-xl text-gray-700 font-bold hover:bg-white hover:text-blue-600 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {cat.nombre}
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-gray-100 mt-4">
                                {auth?.user ? (
                                    <Link 
                                        href={route('dashboard')} 
                                        className="block w-full text-center bg-blue-600 text-white px-4 py-3 rounded-xl font-bold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Mi Panel
                                    </Link>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        <Link 
                                            href={route('login')} 
                                            className="text-center py-3 text-gray-700 font-bold border border-gray-200 rounded-xl"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Ingresar
                                        </Link>
                                        <Link 
                                            href={route('register')} 
                                            className="text-center py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Registrar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}