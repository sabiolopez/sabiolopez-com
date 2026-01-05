"use client";

import { useTranslations } from "next-intl";
import { SectionWrap } from "./SectionWrap";
import { motion } from "framer-motion";
import Image from "next/image";

type ActingAreaKey = "research" | "strategy" | "systems" | "processes" | "growth" | "ai" | "execution"

export function ActingAreas() {
    const t = useTranslations("HomePage.acting_areas");

    const areas: ActingAreaKey[] = [
        "research",
        "strategy",
        "systems",
        "processes",
        "growth",
        "ai",
        "execution"
    ];

    const imageMap: Record<ActingAreaKey, string> = {
        research: "/assets/areas/research_v2.jpg",
        strategy: "/assets/areas/strategy_v2.png",
        systems: "/assets/areas/systems_v2.jpg",
        processes: "/assets/areas/processes_v2.jpg",
        growth: "/assets/areas/growth_v2.jpg",
        ai: "/assets/areas/ai_v2.jpg",
        execution: "/assets/areas/execution_v3.jpg"
    };

    return (
        <SectionWrap variant="light" id="acting-areas" className="py-24 lg:py-40 border-t border-border/50">
            {/* Section Header */}
            <div className="mb-20 lg:mb-24 max-w-4xl">
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-label-caps text-accent mb-6 block"
                >
                    {t("label")}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="section-title text-balance"
                >
                    {t("title_main")} <br />
                    <span className="hero-title-accent block mt-4">{t("title_accent")}</span>
                </motion.h2>
            </div>

            {/* Compact Index-style List */}
            <div className="flex flex-col">
                {areas.map((key, index) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                            duration: 0.7,
                            delay: index * 0.05,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="group flex flex-col sm:flex-row items-start gap-8 lg:gap-14 py-12 lg:py-16 border-b border-border/40 last:border-0"
                    >
                        {/* Square Image Box - Left */}
                        <div className="relative flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 overflow-hidden bg-surface-elevated border border-border/40 group-hover:border-accent/30 transition-all duration-500">
                            <Image
                                src={imageMap[key]}
                                alt={t(`items.${key}.title`)}
                                fill
                                sizes="(max-width: 768px) 128px, 192px"
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.05]"
                            />
                            <div className="absolute inset-0 bg-ink-primary/5 group-hover:bg-ink-primary/0 transition-colors duration-500" />
                        </div>

                        {/* Content Box - Right */}
                        <div className="flex-grow space-y-6 pt-1">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-ink-tertiary">0{index + 1}</span>
                                    <div className="h-px w-6 bg-border/60" />
                                    <h3 className="text-h2 font-bold tracking-tight text-ink-primary leading-tight group-hover:text-accent transition-colors duration-300">
                                        {t(`items.${key}.title`)}
                                    </h3>
                                </div>
                                <p className="text-body text-ink-secondary leading-relaxed max-w-xl group-hover:text-ink-primary transition-colors duration-500">
                                    {t(`items.${key}.description`)}
                                </p>
                            </div>

                            {/* Tags - Standardized chips */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {t(`items.${key}.tags`).split(" · ").map((tag) => (
                                    <span
                                        key={tag}
                                        className="tag-chip px-2 py-0.5 text-[9px] border-border/40 bg-surface/10 group-hover:border-accent/20 group-hover:text-ink-primary transition-all duration-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrap>
    );
}
