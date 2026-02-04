import { Link } from '@inertiajs/react';
import GradientBackground from '@/components/ui/gradient-background';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <GradientBackground backdropBlurAmount="none">
            <div className="flex min-h-screen flex-col items-center justify-center p-6">
                
                {/* Logo con entrada desde arriba */}
                <motion.div 
                    initial={{ opacity: 0, y: -50 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Link href="/" className="flex items-center gap-2 mb-10">
                        <span className="text-4xl font-black text-blue-700 tracking-tighter drop-shadow-xl">FORMOSA</span>
                        <span className="text-2xl font-light text-blue-400 uppercase tracking-widest drop-shadow-md">Directorio</span>
                    </Link>
                </motion.div>

                {/* --- CARD CON ENTRADA ÉPICA --- */}
                <motion.div 
                    initial={{ 
                        opacity: 0, 
                        scale: 0.6,    // Empieza pequeña
                        y: 100,        // Viene desde abajo
                        filter: "blur(20px)" // Empieza muy borrosa
                    }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: 0, 
                        filter: "blur(0px)" // Se aclara al llegar
                    }}
                    transition={{ 
                        duration: 1.2, 
                        ease: [0.16, 1, 0.3, 1], // Curva tipo "spring" elegante
                        delay: 0.2 
                    }}
                    className="relative z-10 w-full max-w-md 
                               bg-white/10 backdrop-blur-3xl 
                               px-10 py-12 shadow-[0_25px_60px_rgba(0,0,0,0.5)] 
                               border border-white/30 rounded-[3rem]
                               overflow-hidden" 
                >
                    {/* Brillo (Shine) que se activa después de la entrada */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <motion.div
                            initial={{ left: "-150%" }}
                            animate={{ left: "150%" }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 2.5, 
                                repeatDelay: 4,
                                delay: 1.5 // El primer brillo ocurre DESPUÉS de que la card se asiente
                            }}
                            className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg]"
                        />
                    </div>

                    {/* CONTENIDO */}
                    <div className="relative z-20">
                        {children}
                    </div>
                </motion.div>
                
                <footer className="mt-10 text-white/50 text-sm font-medium">
                    Primera Cohorte de Programación - Formosa 2026
                </footer>
            </div>
        </GradientBackground>
    );
}