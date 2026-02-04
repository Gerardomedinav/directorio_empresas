import React from "react";

export default function GradientBackground({ children, backdropBlurAmount = "none", className = "" }) {
    const blurClasses = {
        none: "",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
        "2xl": "backdrop-blur-2xl",
        "3xl": "backdrop-blur-3xl",
    };

    return (
        <div className={`relative min-h-screen w-full overflow-hidden ${className}`}>
            {/* Capa de esferas animadas (Fondo con colores más intensos) */}
            <div className="fixed inset-0 z-0 bg-slate-50">
                {/* Esfera Azul - Más opaca y menos desenfoque */}
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/40 blur-[80px] animate-pulse"></div>
                
                {/* Esfera Indigo/Violeta - Movimiento lento */}
                <div className="absolute bottom-[10%] right-[-5%] w-[55%] h-[55%] rounded-full bg-indigo-600/40 blur-[90px] animate-bounce [animation-duration:15s]"></div>
                
                {/* Esfera Cian - Para dar brillo central */}
                <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] rounded-full bg-cyan-400/30 blur-[70px] animate-pulse [animation-delay:2s]"></div>
            </div>

            {/* Capa de contenido: Si usas 'none' o 'sm', el fondo se verá mucho más nítido */}
            <div className={`relative z-10 min-h-screen w-full ${blurClasses[backdropBlurAmount] || ""}`}>
                {children} 
            </div>
        </div>
    );
}