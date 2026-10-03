"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

export interface ImageCompareSliderProps {
    title?: string;
    // Flat string props (MDX friendly)
    beforeImageSrc?: string;
    beforeAlt?: string;
    beforeLabel?: string;
    afterImageSrc?: string;
    afterAlt?: string;
    afterLabel?: string;

    // Nested object props (alternative API)
    beforeImage?: {
        src: string;
        alt?: string;
        label?: string;
    };
    afterImage?: {
        src: string;
        alt?: string;
        label?: string;
    };
    initialPosition?: number;
}

/**
 * Before & After Image Compare Slider
 * Allows interactive side-by-side comparison of two images using a draggable slider handle.
 */
export function ImageCompareSlider({
    title = "Evolução do Fluxo — Antes & Depois",
    beforeImageSrc,
    beforeAlt,
    beforeLabel,
    afterImageSrc,
    afterAlt,
    afterLabel,
    beforeImage,
    afterImage,
    initialPosition = 50,
}: ImageCompareSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Normalize image sources and labels
    const srcBefore = beforeImageSrc || beforeImage?.src || "";
    const altBefore = beforeAlt || beforeImage?.alt || "Fluxo Antes";
    const labelBefore = beforeLabel || beforeImage?.label || "Antes";

    const srcAfter = afterImageSrc || afterImage?.src || "";
    const altAfter = afterAlt || afterImage?.alt || "Fluxo Depois";
    const labelAfter = afterLabel || afterImage?.label || "Depois";

    const updateSliderPosition = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        setSliderPosition(percentage);
    }, []);

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        updateSliderPosition(e.clientX);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handlePointerMove = (e: PointerEvent) => {
            updateSliderPosition(e.clientX);
        };

        const handlePointerUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging, updateSliderPosition]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            setSliderPosition((prev) => Math.max(0, prev - 2));
        } else if (e.key === "ArrowRight") {
            setSliderPosition((prev) => Math.min(100, prev + 2));
        }
    };

    if (!srcBefore || !srcAfter) {
        return null;
    }

    return (
        <section className="py-16 md:py-24" style={{ backgroundColor: "#F9F9F7" }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-8">
                    {/* Section Label / Header */}
                    <div className="flex items-center gap-4">
                        <div className="h-px w-8 bg-accent flex-shrink-0" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-tertiary">
                            {title}
                        </span>
                    </div>

                    {/* Compare Container */}
                    <div
                        ref={containerRef}
                        className="relative group mx-auto max-w-4xl overflow-hidden rounded-lg shadow-sm border border-black/5 select-none touch-none cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-accent/40"
                        onPointerDown={handlePointerDown}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                        role="slider"
                        aria-valuenow={sliderPosition}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={title}
                    >
                        {/* Base / Background Image ("Before") */}
                        <div className="relative w-full aspect-[16/10] bg-neutral-100">
                            <Image
                                src={srcBefore}
                                alt={altBefore}
                                fill
                                sizes="(max-width: 1024px) 100vw, 896px"
                                className="object-contain"
                                priority
                            />
                            {/* "Antes" Label Badge */}
                            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                                <span className="px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase bg-black/60 text-white backdrop-blur-md rounded-full shadow-sm">
                                    {labelBefore}
                                </span>
                            </div>
                        </div>

                        {/* Top / Overlay Image ("After") - Clipped */}
                        <div
                            className="absolute inset-0 z-20 overflow-hidden"
                            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                        >
                            <div className="relative w-full h-full bg-neutral-100">
                                <Image
                                    src={srcAfter}
                                    alt={altAfter}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 896px"
                                    className="object-contain"
                                    priority
                                />
                                {/* "Depois" Label Badge */}
                                <div className="absolute top-4 right-4 z-10 pointer-events-none">
                                    <span className="px-3 py-1 text-xs font-mono font-medium tracking-wider uppercase bg-black/60 text-white backdrop-blur-md rounded-full shadow-sm">
                                        {labelAfter}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Draggable Divider Handle Line */}
                        <div
                            className="absolute top-0 bottom-0 z-30 pointer-events-none transition-shadow"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            {/* Vertical Line */}
                            <div className="absolute top-0 bottom-0 -left-px w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" />

                            {/* Circular Handle Knob */}
                            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-black shadow-xl border border-black/10 flex items-center justify-center transition-transform group-hover:scale-105">
                                <ChevronsLeftRight className="w-5 h-5 text-neutral-800" />
                            </div>
                        </div>
                    </div>

                    {/* Mobile / Accessibility Hint */}
                    <div className="text-center">
                        <p className="font-mono text-[11px] text-ink-tertiary">
                            Arraste para os lados para comparar os fluxos
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
