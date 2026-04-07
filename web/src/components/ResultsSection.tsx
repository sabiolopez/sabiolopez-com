import React from "react";
import { SectionWrap } from "./SectionWrap";
import { CASE_STUDIES_DATA } from "@/data/case-studies-data";

export interface Metric {
    value: string;
    label: string;
    description: string;
}

export interface ResultsSectionProps {
    variant?: "light" | "dark";
    title?: string;
    results?: Metric[];
    projectSlug?: string;
    locale?: string;
}

function MetricCard({ value, label, description, index }: Metric & { index: number }) {
    return (
        <div
            className="group flex flex-col space-y-4 pt-6 border-t border-border hover:border-accent transition-colors duration-500"
            style={{
                animation: `fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both`,
                animationDelay: `${index * 100}ms`,
            }}
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
        </div>
    );
}

const cols: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
};

/**
 * Results Section
 * Displays key project metrics. 
 * Supports robust fallback from CASE_STUDIES_DATA if MDX props are missing.
 */
export function ResultsSection({
    title,
    results = [],
    variant = "light",
    projectSlug,
    locale = "pt"
}: ResultsSectionProps) {
    
    // Determine data source: MDX props or centralized fallback
    let displayResults = results;
    let displayTitle = title;

    if ((!displayResults || displayResults.length === 0) && projectSlug) {
        const fallbackData = CASE_STUDIES_DATA[projectSlug]?.[locale as 'pt' | 'en']?.results;
        if (fallbackData && fallbackData.items.length > 0) {
            displayResults = fallbackData.items;
            if (!displayTitle) displayTitle = fallbackData.title;
        }
    }

    // Default title if still missing
    if (!displayTitle) displayTitle = "Resultados";

    if (!displayResults || displayResults.length === 0) return null;

    const colClass = cols[displayResults.length] ?? "lg:grid-cols-4";

    return (
        <SectionWrap variant="light" className="relative py-24 md:py-32 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="space-y-16 md:space-y-24">
                    {/* Header */}
                    <div className="space-y-4 max-w-3xl">
                        <div className="h-px w-16 bg-accent" />
                        <h2 className="text-3xl md:text-4xl md:leading-tight lg:text-5xl font-bold tracking-tighter text-ink-primary">
                            {displayTitle}
                        </h2>
                    </div>

                    {/* Metrics Grid */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12 ${colClass}`}>
                        {displayResults.map((metric, index) => (
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
