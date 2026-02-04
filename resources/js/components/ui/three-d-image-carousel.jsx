import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThreeDImageCarousel = ({ slides, autoplay = false, delay = 5, itemCount = 3 }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (autoplay) {
            const timer = setInterval(() => {
                setIndex((prev) => (prev + 1) % slides.length);
            }, delay * 1000);
            return () => clearInterval(timer);
        }
    }, [autoplay, delay, slides.length]);

    const getPos = (i) => {
        const diff = (i - index + slides.length) % slides.length;
        if (diff === 0) return "center";
        if (diff === 1) return "right";
        if (diff === slides.length - 1) return "left";
        return "hidden";
    };

    const variants = {
        center: { x: "0%", scale: 1, zIndex: 5, opacity: 1 },
        left: { x: "-50%", scale: 0.8, zIndex: 3, opacity: 0.6 },
        right: { x: "50%", scale: 0.8, zIndex: 3, opacity: 0.6 },
        hidden: { scale: 0.5, opacity: 0, zIndex: 0 },
    };

    return (
        <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false}>
                {slides.map((slide, i) => {
                    const pos = getPos(i);
                    if (pos === "hidden") return null;

                    return (
                        <motion.div
                            key={slide.id}
                            initial="hidden"
                            animate={pos}
                            variants={variants}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute w-[300px] h-[200px] sm:w-[400px] sm:h-[250px]"
                        >
                            <img
                                src={slide.src}
                                alt="Empresa"
                                className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white"
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default ThreeDImageCarousel;