import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ThreeDImageCarousel from "../components/ui/three-d-image-carousel";
import GradientBackground from '../components/ui/gradient-background';
// IMPORTACIÓN CORREGIDA:
import EmpresaCard from '../components/EmpresaCard'; 

export default function Welcome({ auth }) {
    const [listaCategorias, setListaCategorias] = useState([]);
    const [listaEmpresas, setListaEmpresas] = useState([]); 

    // 1. CARGA DE DATOS Y FILTRADO POR PUBLICADO
    useEffect(() => {
        // Cargar Categorías
        axios.get('/api/v1/categorias').then(res => setListaCategorias(res.data.data));
        
        // Cargar Empresas y filtrar solo las publicadas
        axios.get('/api/v1/empresas').then(res => {
            const todasLasEmpresas = res.data.data || [];
            // Filtramos por el campo 'publicado' según tu migración
            const empresasPublicadas = todasLasEmpresas.filter(emp => emp.publicado == 1);
            setListaEmpresas(empresasPublicadas);
        });
    }, []);

    const slides = [
        { id: 1, src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800", href: "#" },
        { id: 2, src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800", href: "#" },
        { id: 3, src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800", href: "#" },
        { id: 4, src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800", href: "#" },
        { id: 5, src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800", href: "#" },
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 60, filter: "blur(5px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
    };

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
        <>
            <Head title="Directorio Formosa" />
            
            <GradientBackground backdropBlurAmount="xl" className="bg-white/10">
                <div className="relative z-10 text-gray-900 font-sans selection:bg-blue-500 selection:text-white">
                    
                    {/* NAVBAR */}
                    <nav className="bg-white/40 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-sm overflow-hidden">
                        <ShineEffect />
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="flex justify-between h-16 items-center">
                                <div className="flex-shrink-0 flex items-center gap-2">
                                    <span className="text-2xl font-bold text-blue-700">Formosa</span>
                                    <span className="text-xl font-light text-gray-500 uppercase tracking-widest">Directorio</span>
                                </div>
                                <div className="hidden md:flex space-x-8">
                                    {listaCategorias?.map((cat) => (
                                        <a key={cat.id} href={`#${cat.slug}`} className="text-gray-700 hover:text-blue-600 font-semibold transition">{cat.nombre}</a>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4">
                                    {auth.user ? (
                                        <Link href={route('dashboard')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg">Mi Panel</Link>
                                    ) : (
                                        <div className="flex gap-4 items-center">
                                            <Link href={route('login')} className="text-gray-700 hover:text-blue-600 font-bold transition">Ingresar</Link>
                                            <Link href={route('register')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-blue-200">Registrar Empresa</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>

                    <header className="py-20 overflow-hidden">
                        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center lg:text-left lg:grid lg:grid-cols-2 lg:items-center">
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                                <h1 className="text-6xl font-black tracking-tighter text-gray-900 sm:text-7xl leading-none">
                                    Impulsa tu <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">negocio</span>
                                </h1>
                                <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">Conectamos el talento de la primera cohorte con las empresas locales de Formosa.</p>
                                <div className="mt-10">
                                    <Link href={route('register')} className="bg-white/80 backdrop-blur-sm text-blue-600 border border-blue-100 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-110 transition-all inline-block">Sumar mi Empresa</Link>
                                </div>
                            </motion.div>
                            <div className="mt-16 lg:mt-0">
                                <ThreeDImageCarousel slides={slides} autoplay={true} delay={4} itemCount={3} />
                            </div>
                        </div>
                    </header>

                    {/* SECCIÓN EMPRESAS: Solo mostrará las que tengan publicado = 1 */}
                    <section className="py-24 bg-white/5 border-y border-white/10">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Empresas Destacadas</h2>
                                <p className="text-gray-600 mt-2 font-medium">Descubre lo mejor de nuestra provincia</p>
                            </div>

                            {listaEmpresas.length > 0 ? (
                                <EmpresaCard empresas={listaEmpresas} />
                            ) : (
                                <div className="h-[400px] flex items-center justify-center text-gray-400 italic">
                                    No hay empresas destacadas publicadas actualmente.
                                </div>
                            )}
                        </div>
                    </section>

                    <section id="explorar" className="py-24">
                        <div className="max-w-7xl mx-auto px-6 text-center">
                            <motion.h2 initial="hidden" whileInView="visible" variants={fadeInUp} className="text-4xl font-black text-gray-900 mb-16 tracking-tight">Explora por Rubro</motion.h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {listaCategorias?.map((cat, index) => (
                                    <motion.div key={cat.id} initial="hidden" whileInView="visible" transition={{ delay: index * 0.1 }} variants={fadeInUp} className="relative group cursor-pointer">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                                        <div className="relative bg-white/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/50 shadow-xl group-hover:-translate-y-2 transition-all">
                                            <div className="text-5xl mb-6">{cat.icono}</div>
                                            <h3 className="text-xl font-bold text-gray-800 uppercase tracking-tighter">{cat.nombre}</h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <footer className="relative bg-white/20 backdrop-blur-md border-t border-white/30 py-16 overflow-hidden">
                        <ShineEffect />
                        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                            <p className="text-gray-900 font-black text-lg mb-2">Directorio de Empresas Formoseñas</p>
                            <p className="text-gray-600 font-medium">© 2026 - Primera Cohorte de Programación Universitaria</p>
                        </div>
                    </footer>
                </div>
            </GradientBackground>
        </>
    );
}