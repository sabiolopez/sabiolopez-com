"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useReducedMotion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { SectionWrap } from "./SectionWrap";

type CategoryKey = "saas_b2b" | "product_design" | "product_growth" | "ai_design";

const CATEGORIES: CategoryKey[] = ["saas_b2b", "product_design", "product_growth", "ai_design"];
const COUNT_DURATION = 1200;
const SPOTLIGHT_BLEED_X = 48;
const SPOTLIGHT_BLEED_Y = 96;

function parseYears(raw: string) {
    const match = raw.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) return { prefix: "", value: 0, suffix: raw, parsed: false };
    return { prefix: match[1], value: parseInt(match[2], 10), suffix: match[3], parsed: true };
}

function CountUp({ raw, active }: { raw: string; active: boolean }) {
    const reduceMotion = useReducedMotion();
    const { prefix, value, suffix, parsed } = parseYears(raw);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!active || !parsed || reduceMotion) return;
        let frame: number;
        const start = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - start) / COUNT_DURATION, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.round(value * eased));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [active, parsed, reduceMotion, value]);

    if (!parsed) return <>{raw}</>;
    const shown = reduceMotion ? value : current;
    return (
        <>
            {prefix}
            {shown}
            {suffix}
        </>
    );
}

export function ExperienceHighlights() {
    const t = useTranslations("HomePage.expertise");
    const gridRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(gridRef, { once: true, amount: 0.3 });
    const reduceMotion = useReducedMotion();
    const [hovered, setHovered] = useState<CategoryKey | null>(null);
    const [gridHovered, setGridHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
    // The spotlight layer extends beyond the grid (see SPOTLIGHT_BLEED_*), so coordinates are offset.
    const spotlightBackground = useMotionTemplate`radial-gradient(circle 400px at calc(${springX}px + ${SPOTLIGHT_BLEED_X}px) calc(${springY}px + ${SPOTLIGHT_BLEED_Y}px), color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%)`;
    const spotlightEnabled = !reduceMotion;

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
    };

    return (
        <SectionWrap id="expertise" className="pt-24 lg:pt-40 pb-12 lg:pb-20">
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

            <div
                ref={gridRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setGridHovered(true)}
                onMouseLeave={() => {
                    setGridHovered(false);
                    setHovered(null);
                }}
                className="relative grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-x-10"
            >
                {spotlightEnabled && (
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute -inset-x-12 -inset-y-24 z-0 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
                        style={{ background: spotlightBackground }}
                        animate={{ opacity: gridHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    />
                )}
                {CATEGORIES.map((key, index) => {
                    const isActive = hovered === key;
                    const isDimmed = hovered !== null && !isActive;
                    return (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : undefined}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative z-10"
                        >
                            <div
                                tabIndex={0}
                                onMouseEnter={() => setHovered(key)}
                                onFocus={() => setHovered(key)}
                                onBlur={() => setHovered(null)}
                                className={`flex flex-col gap-4 border-t pt-6 outline-none transition-[opacity,border-color] duration-300 focus-visible:ring-1 focus-visible:ring-accent/40 ${isActive ? "border-accent" : "border-border"
                                    } ${isDimmed ? "opacity-45" : "opacity-100"}`}
                            >
                                <div
                                    className={`flex items-baseline gap-2 transition-transform duration-300 ${isActive && !reduceMotion ? "-translate-y-1" : ""
                                        }`}
                                >
                                    <span className="text-display font-bold tracking-tighter text-ink-primary tabular-nums">
                                        <CountUp raw={t(`categories.${key}.years`)} active={isInView} />
                                    </span>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
                                        {t("ui.years_label")}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg lg:text-xl font-bold tracking-tight text-ink-primary">
                                        {t(`categories.${key}.tab_name`)}
                                    </h3>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink-tertiary">
                                        {t(`categories.${key}.label`)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrap>
    );
}
