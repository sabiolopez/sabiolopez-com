"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface ProcessImagePair {
    title: string;
    caption?: string;
    wireframeSrc: string;
    wireframeAlt: string;
    finalSrc: string;
    finalAlt: string;
}

export interface ProcessCarouselImage {
    src: string;
    alt: string;
    label: string;
}

export interface ProcessImagePairsProps {
    images?: ProcessCarouselImage[];
    title?: string;
    wireframeLabel?: string;
    finalLabel?: string;
    pairs?: ProcessImagePair[];
    autoPlayDelay?: number;
}

/** Shared single-image carousel for process images or wireframe/final sequences. */
export function ProcessImagePairs({
    title = "Do wireframe ao high fidelity",
    wireframeLabel = "Wireframe",
    finalLabel = "High fidelity",
    pairs = [],
    images: suppliedImages,
    autoPlayDelay = 3000,
}: ProcessImagePairsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
    const locale = useLocale();
    const labels = locale === "en"
        ? { previous: "Previous image", next: "Next image", goTo: "Go to image", pause: "Pause slideshow", play: "Play slideshow" }
        : { previous: "Imagem anterior", next: "Próxima imagem", goTo: "Ir para imagem", pause: "Pausar apresentação", play: "Reproduzir apresentação" };
    const images = suppliedImages ?? [
        ...pairs.map((pair) => ({ src: pair.wireframeSrc, alt: pair.wireframeAlt, label: wireframeLabel })),
        ...pairs.map((pair) => ({ src: pair.finalSrc, alt: pair.finalAlt, label: finalLabel })),
    ];
    const imageCount = images.length;

    useEffect(() => {
        if (imageCount <= 1 || isPaused || isHovered || hasFocus) return;
        // Respect reduced-motion preferences; manual controls remain available.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const timer = window.setTimeout(() => {
            setCurrentIndex((index) => (index + 1) % imageCount);
        }, autoPlayDelay);
        return () => window.clearTimeout(timer);
    }, [currentIndex, imageCount, isPaused, isHovered, hasFocus, autoPlayDelay]);

    if (imageCount === 0) return null;
    const activeIndex = currentIndex % imageCount;
    const goTo = (index: number) => setCurrentIndex((index + imageCount) % imageCount);
    const buttonClass = "flex h-11 w-11 items-center justify-center border border-border hover:text-accent focus-visible:outline-2 focus-visible:outline-accent";

    return (
        <section className="py-16 md:py-24" style={{ backgroundColor: "#F9F9F7" }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-8 bg-accent flex-shrink-0" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-tertiary">{title}</span>
                    </div>

                    <div
                        className="mx-auto max-w-4xl space-y-3"
                        role="region"
                        aria-label={title}
                        aria-roledescription="carousel"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onFocusCapture={() => setHasFocus(true)}
                        onBlurCapture={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                                event.preventDefault();
                                goTo(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
                            }
                        }}
                    >
                        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-black/5 shadow-sm bg-neutral-100">
                            {images.map((slide, index) => (
                                <div
                                    key={`${slide.src}-${index}`}
                                    aria-hidden={index !== activeIndex}
                                    className="absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none"
                                    style={{ opacity: index === activeIndex ? 1 : 0 }}
                                >
                                    <Image
                                        src={slide.src}
                                        alt={slide.alt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 896px"
                                        className="object-contain"
                                    />
                                    <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase bg-black/60 text-white backdrop-blur-md rounded-full shadow-sm pointer-events-none">
                                        {slide.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {imageCount > 1 && (
                            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center justify-between gap-1 sm:justify-start">
                                    {images.map((slide, index) => (
                                        <button
                                            key={`${slide.src}-${index}`}
                                            type="button"
                                            onClick={() => goTo(index)}
                                            aria-label={`${labels.goTo} ${index + 1}`}
                                            aria-current={index === activeIndex ? "true" : undefined}
                                            className="flex h-11 w-8 items-center justify-center focus-visible:outline-2 focus-visible:outline-accent"
                                        >
                                            <span className={`h-1 w-6 ${index === activeIndex ? "bg-accent" : "bg-black/20"}`} />
                                        </button>
                                    ))}
                                    <span className="ml-2 font-mono text-xs text-ink-secondary">{activeIndex + 1} / {imageCount}</span>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button type="button" onClick={() => setIsPaused(!isPaused)} aria-label={isPaused ? labels.play : labels.pause} className={buttonClass}>
                                        {isPaused ? <Play size={16} /> : <Pause size={16} />}
                                    </button>
                                    <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label={labels.previous} className={buttonClass}>
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label={labels.next} className={buttonClass}>
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
