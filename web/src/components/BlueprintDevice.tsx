"use client";

import React from "react";

interface BlueprintDeviceProps {
    src: string;
    alt?: string;
}

export function BlueprintDevice({ src, alt = "Interface Preview" }: BlueprintDeviceProps) {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden">

            {/* Background Architectural Strokes */}
            <div className="absolute inset-x-0 -top-24 -bottom-24 pointer-events-none select-none">
                <div className="absolute inset-0 opacity-[0.15] md:opacity-[0.2]">
                    <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1440px] h-full text-ink-primary/30"
                        viewBox="0 0 1200 800"
                        fill="none"
                    >
                        <defs>
                            <mask id="blueprint-mask-final">
                                <rect x="0" y="0" width="1200" height="800" fill="url(#mask-grad-final)" />
                            </mask>
                            <radialGradient id="mask-grad-final" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="white" stopOpacity="1" />
                                <stop offset="80%" stopColor="white" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <g mask="url(#blueprint-mask-final)">
                            <path d="M600 50 L1000 350 L1000 750 L200 750 L200 350 Z" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 8" />
                            <path d="M600 50 L600 750" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                            <path d="M200 350 L1000 350" stroke="currentColor" strokeWidth="1" />

                            {/* Decorative dimension markers */}
                            <g stroke="currentColor" strokeWidth="0.5">
                                <path d="M150 350 L150 750" />
                                <path d="M140 350 L160 350" />
                                <path d="M140 750 L160 750" />
                            </g>
                        </g>
                        <g fill="currentColor" className="font-mono text-[8px] uppercase tracking-widest opacity-40">
                            <text x="220" y="340">structural_axis_ref</text>
                            <text x="920" y="740">blueprint_final_v.08</text>
                        </g>
                    </svg>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 z-10">
                <div className="flex flex-col items-center">

                    {/* Standard Wide Mockup Container - Restored to max-w-5xl */}
                    <div className="relative w-full max-w-5xl mx-auto group">

                        {/* Architectural Stroke - Outer Frame Labels (Centered) */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 font-mono text-[9px] text-ink-tertiary uppercase tracking-widest flex gap-6 whitespace-nowrap">
                            <span className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                                module: notebook_v.Redesign
                            </span>
                        </div>
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-mono text-[9px] text-ink-tertiary uppercase tracking-widest flex gap-4 whitespace-nowrap">
                            <span>blueprint_ref: 08-GP-22</span>
                        </div>

                        {/* The Notebook Mockup (Restored Aspect Ratio) */}
                        <div className="relative aspect-[16/10] bg-white border border-border/80 shadow-[0_48px_110px_-24px_rgba(0,0,0,0.15)] ring-1 ring-black/5">

                            {/* Screen Border */}
                            <div className="absolute inset-4 border border-border/40 bg-white overflow-y-auto overflow-x-hidden flex items-start justify-center custom-scrollbar">

                                {/* Content - Using updated high-res image and crisp rendering */}
                                <div className="w-full relative min-h-full">
                                    <img
                                        src={src}
                                        alt={alt}
                                        className="w-full h-auto object-top"
                                        style={{
                                            imageRendering: 'auto', // Now using high-res, standard auto rendering is best
                                            WebkitFontSmoothing: 'antialiased',
                                            transform: 'translateZ(0)',
                                            backfaceVisibility: 'hidden'
                                        }}
                                    />
                                </div>

                                {/* Premium Glass/Glint Effect */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/10 opacity-30" />

                                {/* Technical Corner Accents inside screen */}
                                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-accent/40 pointer-events-none" />
                                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-accent/40 pointer-events-none" />
                                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-accent/40 pointer-events-none" />
                                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-accent/40 pointer-events-none" />
                            </div>

                            {/* Camera Component */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-ink-primary/20 rounded-full" />
                                <div className="w-1 h-1 bg-ink-primary/10 rounded-full" />
                            </div>

                            {/* Base of Notebook (Bottom Lip) */}
                            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[104%] h-5 bg-white border border-border border-t-0 rounded-b-2xl shadow-xl">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-border/20 rounded-b-sm" />
                                {/* Detail label */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[7px] text-ink-tertiary/60 tracking-tight">
                                    structural_integrity_check: pass // status_ok
                                </div>
                            </div>
                        </div>

                        {/* External Stroke Elements (Dimension Lines) */}
                        <div className="absolute -top-16 -left-16 w-32 h-px bg-accent/30" />
                        <div className="absolute -top-16 -left-16 w-px h-32 bg-accent/30" />

                        <div className="absolute -bottom-16 -right-16 w-64 h-px bg-border/40" />
                        <div className="absolute -bottom-16 -right-16 w-px h-64 bg-border/40" />
                    </div>
                </div>
            </div>
        </section>
    );
}
