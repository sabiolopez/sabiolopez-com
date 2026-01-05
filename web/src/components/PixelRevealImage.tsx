"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface PixelRevealImageProps {
    src: string;
    gridSize?: number; // Number of columns
}

export const PixelRevealImage: React.FC<PixelRevealImageProps> = ({
    src,
    gridSize = 24, // Slightly denser grid for a more technical feel
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [columns] = useState(gridSize);
    const [rows] = useState(Math.round(gridSize * 1.25));

    const [activeCells, setActiveCells] = useState<Record<number, number>>({});

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const posX = e.clientX - rect.left;
        const posY = e.clientY - rect.top;

        const cellWidth = rect.width / columns;
        const cellHeight = rect.height / rows;

        const colIndex = Math.floor(posX / cellWidth);
        const rowIndex = Math.floor(posY / cellHeight);

        const now = Date.now();
        const updates: Record<number, number> = {};
        const radius = 3.5; // Larger radius for more "reveal" area

        for (let r = -Math.ceil(radius); r <= Math.ceil(radius); r++) {
            for (let c = -Math.ceil(radius); c <= Math.ceil(radius); c++) {
                const targetRow = rowIndex + r;
                const targetCol = colIndex + c;

                if (targetRow >= 0 && targetRow < rows && targetCol >= 0 && targetCol < columns) {
                    const distance = Math.sqrt(r * r + c * c);
                    if (distance <= radius) {
                        const index = targetRow * columns + targetCol;
                        updates[index] = now;
                    }
                }
            }
        }

        setActiveCells(prev => ({ ...prev, ...updates }));
    }, [columns, rows]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const threshold = 1500; // Faster reset for a more transient feel

            setActiveCells(prev => {
                const next = { ...prev };
                let changed = false;
                for (const index in next) {
                    if (now - next[Number(index)] > threshold) {
                        delete next[Number(index)];
                        changed = true;
                    }
                }
                return changed ? next : prev;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const cells = Array.from({ length: columns * rows });

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full aspect-[4/5] bg-canvas overflow-hidden border border-border group select-none"
        >
            {/* Architectural Background Layer (Blueprint Style) */}
            <div className="absolute inset-0 bg-surface-elevated">
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-highlight" />
                        </pattern>
                        <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-ink-tertiary" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <rect width="100%" height="100%" fill="url(#dots)" opacity="0.3" />

                    {/* Abstract Architectural Elements */}
                    <motion.path
                        d="M 20,20 L 100,100 M 100,20 L 20,100"
                        stroke="currentColor"
                        strokeWidth="0.2"
                        className="text-highlight"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.circle
                        cx="50%" cy="50%" r="40%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.1"
                        className="text-ink-tertiary"
                        strokeDasharray="5,5"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    />
                </svg>

                {/* Floating Meta-tags (technical aesthetic) */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-20 font-mono text-[8px] text-ink-tertiary pointer-events-none">
                    <div className="flex justify-between uppercase tracking-widest">
                        <span>system_design_v3.0</span>
                        <span>logical_flow.map</span>
                    </div>
                    <div className="flex justify-between uppercase tracking-widest">
                        <span>architectural_intelligence</span>
                        <span>coord: 40.7128° N, 74.0060° W</span>
                    </div>
                </div>
            </div>

            {/* Grid of pixels (The Photo with Treatment) */}
            <div
                className="absolute inset-0 grid z-10"
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`
                }}
            >
                {cells.map((_, i) => {
                    const x = i % columns;
                    const y = Math.floor(i / columns);
                    const isActive = !!activeCells[i];

                    return (
                        <div
                            key={i}
                            className="relative w-full h-full overflow-hidden"
                        >
                            <motion.div
                                initial={{ opacity: 1 }}
                                animate={{
                                    opacity: isActive ? 0.05 : 1, // Let a tiny bit of image through
                                }}
                                transition={{
                                    opacity: {
                                        duration: isActive ? 0.1 : 1.2,
                                        ease: "easeOut"
                                    }
                                }}
                                className="absolute inset-0 bg-cover bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${src})`,
                                    backgroundSize: `${columns * 100}% ${rows * 100}%`,
                                    backgroundPosition: `${(x / (columns - 1)) * 100}% ${(y / (rows - 1)) * 100}%`,
                                    filter: "grayscale(1) contrast(1.1) brightness(0.9)", // TREATMENT APPLIED HERE
                                }}
                            />

                            {/* Proximity Grid Lines */}
                            <div className="absolute inset-0 border-[0.5px] border-border/10 pointer-events-none" />
                        </div>
                    );
                })}
            </div>

            {/* Target Markers */}
            <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-highlight/40 pointer-events-none z-20" />
            <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-highlight/40 pointer-events-none z-20" />
            <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-highlight/40 pointer-events-none z-20" />
            <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-highlight/40 pointer-events-none z-20" />

            {/* Technical Label */}
            <div className="absolute bottom-8 left-8 px-3 py-1 bg-canvas/60 backdrop-blur-md border border-border pointer-events-none z-20">
                <span className="font-mono text-[9px] text-ink-tertiary uppercase tracking-[0.2em]">Cognitive Blueprint · Reveal v3.0</span>
            </div>
        </div>
    );
};

