"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CASE_STUDIES_DATA } from "@/data/case-studies-data";

export interface ProcessImage {
    src: string;
    alt: string;
    caption?: string;
}

export interface ProcessImagesCarouselProps {
    images?: ProcessImage[];
    title?: string;
    autoPlayDelay?: number;
    projectSlug?: string;
    locale?: string;
}

/**
 * Project Assets Carousel
 * Displays a slider of project process images or assets.
 * Supports robust fallback from CASE_STUDIES_DATA if MDX props fail to serialize.
 */
export function ProcessImagesCarousel({
    images = [],
    title,
    autoPlayDelay = 4000,
    projectSlug,
    locale = "pt"
}: ProcessImagesCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [isPaused, setIsPaused] = useState(false);

    // Determine data source: MDX props or centralized fallback
    let displayImages = images;
    let displayTitle = title;

    if ((!displayImages || displayImages.length === 0) && projectSlug) {
        const fallbackData = CASE_STUDIES_DATA[projectSlug]?.[locale as 'pt' | 'en']?.carousel;
        if (fallbackData && fallbackData.images.length > 0) {
            displayImages = fallbackData.images;
            if (!displayTitle) displayTitle = fallbackData.title;
        }
    }

    // Default title if still missing
    if (!displayTitle) displayTitle = "Processo de Design — Imagens";

    const handleNext = useCallback(() => {
        if (!displayImages || displayImages.length === 0) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, [displayImages]);

    const handlePrev = useCallback(() => {
        if (!displayImages || displayImages.length === 0) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    }, [displayImages]);

    // Auto-play
    useEffect(() => {
        if (isPaused || !displayImages || displayImages.length <= 1) return;
        const timer = setInterval(handleNext, autoPlayDelay);
        return () => clearInterval(timer);
    }, [isPaused, displayImages, autoPlayDelay, handleNext]);

    if (!displayImages || displayImages.length === 0) {
        return null;
    }

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
    };

    return (
        <section className="py-16 md:py-24" style={{ backgroundColor: '#F9F9F7' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-8">

                    {/* Section Label */}
                    <div className="flex items-center gap-4">
                        <div className="h-px w-8 bg-accent flex-shrink-0" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-tertiary">
                            {displayTitle}
                        </span>
                    </div>

                    {/* Carousel — constrained width, centered */}
                    <div
                        className="relative group mx-auto max-w-4xl"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Image Slide Area */}
                        <div
                            className="relative w-full overflow-hidden border border-border aspect-[4/3]"
                            style={{ backgroundColor: '#F9F9F7' }}
                        >
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={displayImages[currentIndex].src}
                                        alt={displayImages[currentIndex].alt}
                                        fill
                                        quality={100}
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 896px"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            {displayImages.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrev}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                                                   p-2 bg-white/90 border border-border text-ink-secondary
                                                   backdrop-blur-sm transition-all duration-200
                                                   hover:text-accent hover:border-accent
                                                   opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                        aria-label="Imagem anterior"
                                    >
                                        <ChevronLeft size={16} strokeWidth={1.5} />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                                                   p-2 bg-white/90 border border-border text-ink-secondary
                                                   backdrop-blur-sm transition-all duration-200
                                                   hover:text-accent hover:border-accent
                                                   opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                        aria-label="Próxima imagem"
                                    >
                                        <ChevronRight size={16} strokeWidth={1.5} />
                                    </button>
                                </>
                            )}

                            {/* Counter — top right */}
                            {displayImages.length > 1 && (
                                <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 bg-white/90 border border-border backdrop-blur-sm">
                                    <span className="font-mono text-[10px] text-ink-tertiary tracking-widest">
                                        {String(currentIndex + 1).padStart(2, "0")} / {String(displayImages.length).padStart(2, "0")}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Caption + Progress row */}
                        <div className="mt-3 flex items-center justify-between gap-4">
                            {/* Caption */}
                            <AnimatePresence mode="wait">
                                {displayImages[currentIndex].caption ? (
                                    <motion.span
                                        key={`caption-${currentIndex}`}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-tertiary"
                                    >
                                        {displayImages[currentIndex].caption}
                                    </motion.span>
                                ) : (
                                    <span />
                                )}
                            </AnimatePresence>

                            {/* Progress indicators */}
                            {displayImages.length > 1 && (
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                    {displayImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setDirection(index > currentIndex ? 1 : -1);
                                                setCurrentIndex(index);
                                            }}
                                            aria-label={`Ir para imagem ${index + 1}`}
                                            className="relative h-px flex-shrink-0 transition-all duration-500"
                                            style={{ width: index === currentIndex ? 24 : 12 }}
                                        >
                                            <motion.div
                                                className="absolute inset-0"
                                                animate={{
                                                    backgroundColor:
                                                        index === currentIndex
                                                            ? "var(--color-accent)"
                                                            : "var(--color-border-strong)",
                                                    opacity: index === currentIndex ? 1 : 0.4,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
