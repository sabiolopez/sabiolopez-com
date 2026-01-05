"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { SectionWrap } from "./SectionWrap";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
    LayoutTemplate,
    TrendingUp,
    Sparkles,
    Palette,
    LucideIcon
} from "lucide-react";

type CategoryKey = "saas_b2b" | "product_design" | "product_growth" | "ai_design";

const STACK_ICONS: Record<string, string> = {
    "GA": "/assets/expertise/growth/Analytics-GA.svg",
    "Datadog": "/assets/expertise/growth/Analytics-Datadog.svg",
    "Miro": "/assets/expertise/design/Discov-Miro.svg",
    "Jira": "/assets/expertise/saas/Agil-Jira.svg",
    "Figma": "/assets/expertise/design/Design-Figma.svg",
    "Framer": "/assets/expertise/design/Design-Framer.svg",
    "Maze": "/assets/expertise/design/Discov-Maze.svg",
    "Dovetail": "/assets/expertise/design/Discov-dovetail.svg",
    "Hotjar": "/assets/expertise/growth/Analytics-hotjar.svg",
    "Optimizely": "/assets/expertise/growth/Analytics-Optimizely.svg",
    "ChatGPT": "/assets/expertise/ai/AI-Chatgpt.svg",
    "Claude": "/assets/expertise/ai/AI-Claude.svg",
    "Perplexity": "/assets/expertise/ai/AI-Perplexity.svg",
    "GitHub": "/assets/expertise/ai/Dev-Github.svg",
    "Webflow": "/assets/expertise/ai/Dev-Webflow.svg",
    "Windsurf": "/assets/expertise/ai/Dev-Windsurf.svg",
    "Amplitude": "/assets/expertise/growth/Analytics-GA.svg", // Fallback to GA if missing
};

const CATEGORY_ICONS: Record<CategoryKey, LucideIcon> = {
    saas_b2b: LayoutTemplate,
    product_design: Palette,
    product_growth: TrendingUp,
    ai_design: Sparkles,
};

const ROTATION_INTERVAL = 7000; // 7 seconds
const RESUME_DELAY = 10000; // 10 seconds of inactivity to resume

export function ExpertiseTabs() {
    const t = useTranslations("HomePage.expertise");
    const [activeTab, setActiveTab] = useState<CategoryKey>("saas_b2b");
    const [isPaused, setIsPaused] = useState(false);
    // eslint-disable-next-line react-hooks/purity
    const lastInteractionRef = useRef<number>(Date.now());
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.3 });
    const [hasBeenViewed, setHasBeenViewed] = useState(false);

    useEffect(() => {
        if (isInView && !hasBeenViewed) {
            setActiveTab("saas_b2b");
            setHasBeenViewed(true);
        }
    }, [isInView, hasBeenViewed]);

    const categories = useMemo<CategoryKey[]>(() => ["saas_b2b", "product_design", "product_growth", "ai_design"], []);

    useEffect(() => {
        let isMounted = true;
        let timerId: NodeJS.Timeout;

        const startRotation = () => {
            if (!isInView || isPaused || !isMounted) return;

            timerId = setTimeout(() => {
                if (!isMounted) return;
                setActiveTab((prev) => {
                    const currentIndex = categories.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % categories.length;
                    return categories[nextIndex];
                });
                startRotation();
            }, ROTATION_INTERVAL);
        };

        if (isInView && !isPaused) {
            startRotation();
        }

        return () => {
            isMounted = false;
            if (timerId) clearTimeout(timerId);
        };
    }, [isInView, isPaused, categories]);

    useEffect(() => {
        if (!isPaused) return;

        const checkInactivity = setInterval(() => {
            if (Date.now() - lastInteractionRef.current > RESUME_DELAY) {
                setIsPaused(false);
            }
        }, 1000);

        return () => clearInterval(checkInactivity);
    }, [isPaused]);

    const handleTabClick = (key: CategoryKey) => {
        setActiveTab(key);
        setIsPaused(true);
        // eslint-disable-next-line react-hooks/purity
        lastInteractionRef.current = Date.now();
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        lastInteractionRef.current = Date.now();
    };

    return (
        <SectionWrap id="expertise" className="py-24 lg:py-40">
            <div ref={containerRef}>
                <div className="mb-16 lg:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="section-title"
                    >
                        {t("title")}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Sidebar Navigation - Responsive Variation */}
                    <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 lg:gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scroll-smooth no-scrollbar justify-center lg:justify-start">
                        {categories.map((key) => (
                            <button
                                key={key}
                                onClick={() => handleTabClick(key)}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className={`relative group flex items-center justify-center lg:justify-between p-4 lg:p-6 transition-all duration-500 rounded-lg overflow-hidden flex-shrink-0 min-w-[72px] md:min-w-[180px] lg:min-w-0 ${activeTab === key
                                    ? "bg-surface-elevated shadow-lg border-l-4 lg:border-l-4 border-accent"
                                    : "border-l-4 border-transparent hover:bg-surface-elevated/40"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-md transition-colors ${activeTab === key ? "bg-accent/10 text-accent" : "bg-ink-tertiary/5 text-ink-tertiary"
                                        }`}>
                                        {(() => {
                                            const Icon = CATEGORY_ICONS[key];
                                            return <Icon size={20} />;
                                        })()}
                                    </div>
                                    <div className="hidden md:flex flex-col items-start gap-1">
                                        <span className={`text-[10px] font-mono tracking-widest hidden lg:block ${activeTab === key ? "text-accent" : "text-ink-tertiary"
                                            }`}>
                                            {t("ui.expertise_label")}
                                        </span>
                                        <span className={`text-sm lg:text-lg font-bold tracking-tight transition-colors ${activeTab === key ? "text-ink-primary" : "text-ink-tertiary group-hover:text-ink-secondary"
                                            }`}>
                                            {t(`categories.${key}.tab_name`)}
                                        </span>
                                    </div>
                                </div>

                                <div className="hidden lg:flex flex-col items-end">
                                    <span className={`text-2xl font-bold tracking-tighter ${activeTab === key ? "text-ink-primary" : "text-ink-tertiary/40"
                                        }`}>
                                        {t(`categories.${key}.years`)}
                                    </span>
                                    <span className={`text-[8px] font-mono uppercase tracking-widest ${activeTab === key ? "text-ink-tertiary" : "text-ink-tertiary/30"
                                        }`}>
                                        {t("ui.years_label")}
                                    </span>
                                </div>

                                {/* Progress bar for auto-rotation */}
                                {activeTab === key && !isPaused && isInView && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-[2px] bg-accent"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: ROTATION_INTERVAL / 1000, ease: "linear" }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div
                        className="lg:col-span-8 h-full"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="bg-surface-elevated border border-border/50 rounded-xl p-6 lg:p-14 shadow-2xl backdrop-blur-md flex flex-col gap-8 lg:gap-10 h-full"
                            >
                                <div className="space-y-6">
                                    <div className="inline-block px-3 py-1 rounded bg-accent/5 border border-accent/10">
                                        <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em]">
                                            {t(`categories.${activeTab}.label`)}
                                        </span>
                                    </div>
                                    <h3 className="text-h2 font-bold tracking-tight text-ink-primary leading-tight">
                                        {t(`categories.${activeTab}.title`)}
                                    </h3>
                                    <p className="text-body-lg text-ink-secondary leading-relaxed max-w-xl">
                                        {t(`categories.${activeTab}.description`)}
                                    </p>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                                        <h4 className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest">
                                            {t("ui.processes_label")}
                                        </h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        {(t.raw(`categories.${activeTab}.processes`) as string[]).map((process: string) => (
                                            <span
                                                key={process}
                                                className="px-4 py-2 bg-canvas border border-border/60 text-[11px] font-medium text-ink-secondary rounded-md hover:border-accent/40 transition-colors uppercase tracking-wide"
                                            >
                                                {process}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {t(`categories.${activeTab}.stack`) && (
                                    <div className="mt-auto pt-8 border-t border-border/50 flex flex-col sm:flex-row sm:items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-ink-tertiary">/</span>
                                            <span className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest">Stack</span>
                                        </div>
                                        <div className="flex flex-wrap gap-8 items-center">
                                            {t(`categories.${activeTab}.stack`).split(" · ").map((tool: string) => (
                                                <div
                                                    key={tool}
                                                    className="group/tool relative flex items-center justify-center"
                                                >
                                                    {STACK_ICONS[tool] ? (
                                                        <div className="relative h-6 w-12">
                                                            <Image
                                                                src={STACK_ICONS[tool]}
                                                                alt={tool}
                                                                fill
                                                                className="object-contain opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                                                                title={tool}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm font-medium text-ink-secondary/70 hover:text-accent transition-colors cursor-default">
                                                            {tool}
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </SectionWrap>
    );
}

