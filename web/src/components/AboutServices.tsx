"use client";

import { useTranslations } from "next-intl";
import { SectionWrap } from "./SectionWrap";
import { Layout, Target, Cpu, TrendingUp, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type ExpertiseKey = "saas" | "design" | "growth" | "ai";

const CAROUSEL_INTERVAL = 8000; // 8 seconds per tab

interface ExpertiseItem {
    key: ExpertiseKey;
    icon: LucideIcon;
}

export function AboutServices() {
    const t = useTranslations("HomePage");
    const s = useTranslations("HomePage.collaboration");
    const [active, setActive] = useState<ExpertiseKey>("saas");
    const [isPaused, setIsPaused] = useState(false);

    const expertiseItems = useMemo<ExpertiseItem[]>(() => [
        { key: "saas", icon: Layout },
        { key: "design", icon: Target },
        { key: "growth", icon: TrendingUp },
        { key: "ai", icon: Cpu }
    ], []);

    const nextTab = useCallback(() => {
        const currentIndex = expertiseItems.findIndex(item => item.key === active);
        const nextIndex = (currentIndex + 1) % expertiseItems.length;
        setActive(expertiseItems[nextIndex].key);
    }, [active, expertiseItems]);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextTab, CAROUSEL_INTERVAL);
        return () => clearInterval(timer);
    }, [nextTab, isPaused]);

    return (
        <div className="space-y-0">
            {/* Expertise Section - Sidebar Layout */}
            <SectionWrap variant="light" id="expertise" className="py-24 overflow-hidden">
                <div className="mb-16">
                    <h2 className="text-h1 flex flex-wrap items-baseline gap-x-4">
                        <span>Minhas</span>
                        <span className="text-ink-secondary font-light">expertises.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Sidebar Area - Vertical on desktop, Stacked on mobile */}
                    <div className="lg:col-span-4 flex flex-col gap-px bg-border/5 border border-border/10 rounded-lg overflow-hidden backdrop-blur-md">
                        {expertiseItems.map(({ key, icon: Icon }) => {
                            const isActive = active === key;
                            const metrics = t.raw(`expertise.${key}.metrics`) as { value: string, label: string }[];
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActive(key)}
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                    className={cn(
                                        "relative group flex items-center justify-between p-6 lg:p-8 transition-all duration-500 text-left",
                                        isActive
                                            ? "bg-canvas/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] z-10"
                                            : "bg-surface/10 hover:bg-surface/40 backdrop-blur-sm"
                                    )}
                                >
                                    <div className="flex items-center gap-4 lg:gap-6">
                                        <div className={cn(
                                            "w-10 h-10 flex items-center justify-center transition-all duration-500 rounded-full",
                                            isActive ? "bg-accent/10 text-accent scale-110" : "text-ink-tertiary group-hover:text-ink-secondary"
                                        )}>
                                            <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                                        </div>
                                        <h3 className={cn(
                                            "text-lg lg:text-xl font-bold uppercase tracking-tight transition-all duration-500",
                                            isActive ? "text-ink-primary" : "text-ink-tertiary group-hover:text-ink-secondary"
                                        )}>
                                            {t(`expertise.${key}.title`)}
                                        </h3>
                                    </div>

                                    <div className="flex flex-col items-end leading-none">
                                        <span className={cn(
                                            "text-xl lg:text-2xl font-black tracking-tighter transition-all duration-500",
                                            isActive ? "text-accent" : "text-ink-tertiary"
                                        )}>
                                            {metrics[0].value}
                                        </span>
                                        <span className="text-[9px] font-sans font-extrabold text-ink-tertiary/60 uppercase tracking-widest mt-1">
                                            {t("expertise.years_label")}
                                        </span>
                                    </div>

                                    {/* Active Indicator - Side Bar with Gradient */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-accent to-accent/40"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Area - Detailed Card with Glassmorphism */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-canvas border border-border shadow-2xl relative flex flex-col min-h-[480px] rounded-lg overflow-hidden"
                            >
                                <div className="p-8 lg:p-14 space-y-12 flex-grow">
                                    {/* Description and Detailed Context */}
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-[10px] font-black text-accent uppercase tracking-widest leading-none rounded-[2px]">
                                                Contexto Estratégico
                                            </span>
                                        </div>
                                        <div className="space-y-6">
                                            <h4 className="text-2xl lg:text-[40px] font-bold text-ink-primary leading-[1.1] tracking-tight">
                                                {t(`expertise.${active}.description`)}
                                            </h4>
                                            <p className="text-xl lg:text-2xl text-ink-secondary leading-relaxed font-medium max-w-3xl">
                                                {t(`expertise.${active}.detailed`)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Processes & Frameworks */}
                                    <div className="space-y-6 border-t border-border/40 pt-12">
                                        <div className="flex items-center gap-3 text-ink-tertiary">
                                            <div className="w-1.5 h-1.5 rounded-full bg-border" />
                                            <span className="text-[11px] font-extrabold uppercase tracking-widest">
                                                {t(`expertise.${active}.process_label`)}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2.5">
                                            {(t.raw(`expertise.${active}.best_for`) as string[]).map(tag => (
                                                <span key={tag} className="px-3.5 py-1.5 bg-surface/40 border border-border/60 text-[10px] font-bold text-ink-secondary uppercase tracking-tight rounded-sm hover:border-accent/40 transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Stack Section - More prominent */}
                                <div className="p-8 lg:px-14 lg:py-10 border-t border-border flex flex-col md:flex-row md:items-center gap-8 lg:gap-14 bg-surface/10 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 text-[11px] font-black text-ink-tertiary uppercase tracking-widest whitespace-nowrap">
                                        <span className="text-accent/60 opacity-60">/</span>
                                        <span>Stack</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-8 lg:gap-14 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-out">
                                        {(t.raw(`expertise.${active}.systems`) as { id: string, icon: string, name: string }[]).slice(0, 6).map((system) => (
                                            <div key={system.id} className="relative w-7 h-7 lg:w-9 lg:h-9 group/tool">
                                                <Image
                                                    src={system.icon}
                                                    alt={system.name}
                                                    title={system.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/tool:opacity-100 transition-opacity bg-ink-primary text-canvas text-[8px] px-1.5 py-0.5 whitespace-nowrap rounded-sm pointer-events-none">
                                                    {system.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </SectionWrap>

            {/* Service: Design de Sistemas & Portais */}
            <SectionWrap variant="light" className="py-32 border-b border-border">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-5 space-y-8">
                        <span className="text-label-caps text-accent">01 — Services</span>
                        <h2 className="text-h1">
                            {s("projects.title")}
                        </h2>
                        <div className="space-y-4">
                            <h3 className="text-xl text-ink-secondary font-medium">{s("projects.subtitle")}</h3>
                            <p className="text-body text-ink-secondary max-w-md">
                                {s("projects.description")}
                            </p>
                        </div>
                        <a href="#contact" className="cta-link">
                            Request Proposal <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="md:col-span-7 aspect-video bg-surface-elevated border border-border overflow-hidden relative group">
                        {/* Conceptual visualization for System Design */}
                        <div className="absolute inset-0 p-12 flex flex-col justify-center">
                            <div className="space-y-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                <div className="h-px w-full bg-ink-primary" />
                                <div className="h-px w-3/4 bg-ink-primary" />
                                <div className="h-px w-1/2 bg-ink-primary" />
                                <div className="h-px w-full bg-ink-primary" />
                            </div>
                            <div className="absolute top-12 right-12 text-detail-caps text-ink-tertiary">Architectural_Intelligence // V1.0</div>
                        </div>
                    </div>
                </div>
            </SectionWrap>

            {/* Service: Mentoria & Liderança Técnica */}
            <SectionWrap variant="light" className="py-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-7 order-2 md:order-1 aspect-video bg-surface-elevated border border-border relative flex items-center justify-center overflow-hidden">
                        {/* Conceptual visualization for Mentorship */}
                        <div className="text-detail-caps text-ink-tertiary absolute top-8 left-8">MENTORSHIP_FLUX // 2024</div>
                        <div className="relative w-48 h-48 border border-accent/20 rounded-full flex items-center justify-center">
                            <div className="w-32 h-32 border border-accent/40 rounded-full flex items-center justify-center">
                                <div className="w-16 h-16 border border-accent/60 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-5 order-1 md:order-2 space-y-8">
                        <span className="text-label-caps text-accent">02 — Services</span>
                        <h2 className="text-h1">
                            {s("mentorship.title")}
                        </h2>
                        <div className="space-y-4">
                            <h3 className="text-xl text-ink-secondary font-medium">{s("mentorship.subtitle")}</h3>
                            <p className="text-body text-ink-secondary max-w-md">
                                {s("mentorship.description")}
                            </p>
                        </div>
                        <a href="#contact" className="cta-link">
                            Expand Strategic Reach <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </SectionWrap>
        </div>
    );
}
