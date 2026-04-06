"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Layers, ArrowRight } from "lucide-react";

export function ArchitectureDiagram() {
    return (
        <div className="my-20 p-8 lg:p-12 bg-canvas border border-border space-y-12 not-prose">
            <div className="flex flex-col items-center text-center space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">System_Migration.map</span>
                <h3 className="text-2xl font-bold text-ink-primary italic uppercase tracking-tight">O Fim da Fragmentação</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-11 items-center gap-8">
                {/* Chaos Side */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="font-mono text-[9px] uppercase text-ink-tertiary mb-2 px-2 border-l border-ink-tertiary/30">Legacy: Descentralizado</div>
                    <div className="grid grid-cols-3 gap-3">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0.3 }}
                                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                                transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                                className="aspect-square bg-surface border border-border flex items-center justify-center"
                            >
                                <span className="font-mono text-[8px] text-ink-tertiary uppercase">CMS_{i + 1}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Transition Arrow */}
                <div className="lg:col-span-3 flex flex-col items-center justify-center space-y-4">
                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ArrowRight className="w-8 h-8 text-accent" />
                    </motion.div>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-ink-tertiary text-center">Standardization <br /> Framework</span>
                </div>

                {/* Order Side */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="font-mono text-[9px] uppercase text-accent mb-2 px-2 border-l border-accent">New: Design as Systems</div>
                    <div className="relative aspect-video bg-surface-elevated border border-accent/30 p-4 flex flex-col justify-center gap-2">
                        {/* Layers representation */}
                        <div className="h-6 bg-accent/20 border border-accent/40 w-full flex items-center px-3">
                            <span className="font-mono text-[8px] uppercase text-accent">Global_Tech_Layer (Fixed)</span>
                        </div>
                        <div className="h-6 bg-ink-tertiary/10 border border-border w-full flex items-center px-3">
                            <span className="font-mono text-[8px] uppercase text-ink-secondary">UX_Architecture (Fixed)</span>
                        </div>
                        <div className="h-10 bg-canvas border border-dashed border-border w-full flex items-center px-3 justify-between">
                            <span className="font-mono text-[8px] uppercase text-ink-tertiary italic">Local_Content (Flexible)</span>
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-accent/40"></span>
                                <span className="w-1.5 h-1.5 bg-accent/40"></span>
                                <span className="w-1.5 h-1.5 bg-accent/40"></span>
                            </div>
                        </div>

                        {/* Decorative scanline */}
                        <motion.div
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[1px] bg-accent/20 z-10 pointer-events-none"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-border/30 flex justify-between items-center">
                <div className="flex gap-12">
                    <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-ink-tertiary" />
                        <span className="font-mono text-[9px] text-ink-secondary uppercase tracking-wider">10 Markets Unified</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4 text-ink-tertiary" />
                        <span className="font-mono text-[9px] text-ink-secondary uppercase tracking-wider">Modular Localization</span>
                    </div>
                </div>
                <span className="font-mono text-[8px] text-ink-tertiary uppercase">Ref: Arch_Intel_2022</span>
            </div>
        </div>
    );
}
