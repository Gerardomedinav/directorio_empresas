import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from '@inertiajs/react'; // Importamos Link de Inertia

export default function EmpresaCard({ empresas }) {
    
    useEffect(() => {
        const loadFlyonUI = async () => {
            const { HSStaticMethods } = await import("flyonui/flyonui");
            setTimeout(() => {
                HSStaticMethods.autoInit();
            }, 500);
        };
        
        if (empresas && empresas.length > 0) {
            loadFlyonUI();
        }
    }, [empresas]);

    if (!empresas || empresas.length === 0) return null;

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
            <div 
                id="carousel-destacados" 
                data-carousel='{ 
                    "loadingClasses": "opacity-0", 
                    "isAutoPlay": true, 
                    "isInfinite": true, 
                    "speed": 4000 
                }' 
                className="relative w-full"
            >
                <div className="carousel relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black/10">
                    <div className="carousel-body h-[450px] transition-opacity duration-300">
                        {empresas.map((emp) => (
                            <div key={emp.id} className="carousel-slide">
                                <div className="flex size-full justify-center relative">
                                    <img
                                        src={emp.imagen || 'https://via.placeholder.com/800x450'}
                                        className="size-full object-cover"
                                        alt={emp.nombre}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 text-white">
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="max-w-2xl text-left"
                                        >
                                            <h3 className="text-4xl font-black mb-2 drop-shadow-lg">{emp.nombre}</h3>
                                            <p className="text-lg opacity-90 line-clamp-1 drop-shadow-md mb-4">{emp.descripcion}</p>
                                            
                                            {/* ENLACE VER EMPRESA */}
                                            <Link 
                                                href={`/empresas/${emp.id}`} 
                                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95 w-fit"
                                            >
                                                Ver empresa
                                                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BOTONES DE NAVEGACIÓN */}
                    <button type="button" data-carousel-prev="#carousel-destacados" className="carousel-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 size-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/30 transition-all text-white">
                        <span className="text-2xl">❮</span>
                    </button>
                    <button type="button" data-carousel-next="#carousel-destacados" className="carousel-next absolute right-4 top-1/2 -translate-y-1/2 z-10 size-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/30 transition-all text-white">
                        <span className="text-2xl">❯</span>
                    </button>
                </div>

                {/* MINIATURAS */}
                <div className="carousel-pagination flex justify-center gap-4 py-2 overflow-x-auto">
                    {empresas.map((emp, index) => (
                        <button
                            key={`thumb-${emp.id}`}
                            type="button"
                            data-carousel-target="#carousel-destacados"
                            data-carousel-slide={index + 1}
                            className="carousel-pagination-item flex-shrink-0 focus:outline-none"
                        >
                            <img 
                                src={emp.imagen || 'https://via.placeholder.com/150'} 
                                alt={emp.nombre}
                                className="w-24 h-16 md:w-28 md:h-20 object-cover rounded-xl border-4 border-transparent opacity-40 grayscale transition-all duration-300 [.active_&]:!opacity-100 [.active_&]:!grayscale-0 [.active_&]:border-blue-500 [.active_&]:scale-105 shadow-lg"
                                style={{ opacity: undefined }}
                            />
                        </button>
                    ))}
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .carousel-pagination-item.active img {
                    opacity: 1 !important;
                    filter: grayscale(0) !important;
                    border-color: #3b82f6 !important;
                }
            `}} />
        </div>
    );
}