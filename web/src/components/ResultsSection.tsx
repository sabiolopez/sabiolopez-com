"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrap } from "./SectionWrap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MetricProps {
    value: string;
    label: string;
    description: string;
    index: number;
}

function MetricCard({ value, label, description, index }: MetricProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group flex flex-col space-y-4 pt-6 border-t border-border hover:border-accent transition-colors duration-500"
        >
            <span className="text-5xl md:text-6xl lg:text-7xl leading-none font-medium tracking-tighter text-ink-primary group-hover:text-accent transition-colors duration-500 break-words">
                {value}
            </span>
            <div className="space-y-2 mt-4 md:mt-6">
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-ink-primary font-semibold">
                    {label}
                </p>
                <p className="text-sm md:text-base text-ink-secondary font-light leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

export interface Metric {
    value: string;
    label: string;
    description: string;
}

export interface ResultsSectionProps {
    variant?: "light" | "dark";
    title?: React.ReactNode;
    results?: Metric[];
}

const DEFAULT_RESULTS: Metric[] = [
    {
        value: "+687%",
        label: "Crescimento",
        description: "Aumento no tráfego direcionado especificamente para captação de Leads B2B."
    },
    {
        value: "+13%",
        label: "Retenção",
        description: "Melhora no tempo médio de engajamento nas páginas reformuladas."
    },
    {
        value: "2M",
        label: "Usuários",
        description: "A base de usuários ativos saltou para 2 milhões durante o período de rollout."
    },
    {
        value: "6",
        label: "Mercados",
        description: "Rollout simultâneo em 6 mercados globais com melhora direta na conversão final."
    }
];

export function ResultsSection({
    title,
    results = DEFAULT_RESULTS,
    variant = "light"
}: ResultsSectionProps) {
    return (
        <SectionWrap variant="light" className="relative py-24 md:py-32 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="space-y-16 md:space-y-24">
                    {/* Header */}
                    <div className="space-y-4 max-w-3xl">
                        <div className="h-px w-16 bg-accent" />
                        <h2 className="text-3xl md:text-4xl md:leading-tight lg:text-5xl font-bold tracking-tighter text-ink-primary">
                            {typeof title === "string" ? title : "Resultados"}
                        </h2>
                    </div>

                    {/* Metrics Grid */}
                    <div className={cn(
                        "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12",
                        results.length === 1 ? "lg:grid-cols-1" :
                        results.length === 2 ? "lg:grid-cols-2" :
                        results.length === 3 ? "lg:grid-cols-3" :
                        "lg:grid-cols-4"
                    )}>
                        {results.map((metric, index) => (
                            <MetricCard
                                key={index}
                                value={metric.value}
                                label={metric.label}
                                description={metric.description}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrap>
    );
}
