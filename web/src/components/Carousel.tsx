"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
    images: string[];
}

export function Carousel({ images }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Detect when the carousel enters the viewport
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Reset to first image every time the section comes into view
                    setCurrentIndex(0);
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Auto-play only when visible and not paused
    useEffect(() => {
        if (!isVisible || isPaused || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // 5 second delay

        return () => clearInterval(interval);
    }, [isVisible, isPaused, images.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="absolute inset-0 overflow-hidden bg-white/5 border border-white/10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={handlePrev}
                    className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={handleNext}
                    className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all"
                    aria-label="Next slide"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Indicators with Progress Animation */}
            <div className="absolute bottom-6 left-6 flex gap-2">
                {images.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`h-1 transition-all duration-500 ${index === currentIndex ? "bg-accent" : "bg-white/20"
                            }`}
                        initial={{ width: 8 }}
                        animate={{
                            width: index === currentIndex ? 32 : 8,
                            opacity: index === currentIndex ? 1 : 0.5
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                ))}
            </div>
        </div>
    );
}
