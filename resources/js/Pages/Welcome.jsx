import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ThreeDImageCarousel from "../components/ui/three-d-image-carousel";
import GradientBackground from '../components/ui/gradient-background';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar'; 
import EmpresaCard from '../components/EmpresaCard'; 
import CategoriaGrid from '@/Components/CategoriaGrid';

export default function Welcome({ auth }) {
    const [listaCategorias, setListaCategorias] = useState([]);
    const [listaEmpresas, setListaEmpresas] = useState([]); 

    useEffect(() => {
        axios.get('/api/v1/categorias').then(res => setListaCategorias(res.data.data));
        axios.get('/api/v1/empresas').then(res => setListaEmpresas(res.data.data || []));
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

    return (
        <>
            <Head title="Directorio Formosa" />
            
            <GradientBackground backdropBlurAmount="xl" className="bg-white/10">
                <div className="relative z-10 text-gray-900 font-sans selection:bg-blue-500 selection:text-white">
                    
                    <Navbar auth={auth} categorias={listaCategorias} />

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

                    <section className="py-24 bg-white/5 border-y border-white/10">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Empresas Destacadas</h2>
                                <p className="text-gray-600 mt-2 font-medium">Descubre lo mejor de nuestra provincia</p>
                            </div>

                            {listaEmpresas.length > 0 ? (
                                <EmpresaCard empresas={listaEmpresas} />
                            ) : (
                                <div className="h-[400px] flex items-center justify-center text-gray-400">Cargando empresas...</div>
                            )}
                        </div>
                    </section>

                    <CategoriaGrid categorias={listaCategorias} />

                    <Footer />
                </div>
            </GradientBackground>
        </>
    );
}