import React from "react";
import { SectionWrap } from "./SectionWrap";
import { CASE_STUDIES_DATA } from "@/data/case-studies-data";

interface Learning {
    title: string;
    description: string;
}

interface LearningsSectionProps {
    title?: string;
    learnings?: Learning[];
    projectSlug?: string;
    locale?: string;
}

function LearningItem({ title, description, index }: Learning & { index: number }) {
    return (
        <div
            className="group space-y-4 border-l border-border pl-8 py-2 md:py-0 hover:border-accent transition-colors duration-500"
            style={{
                animation: `fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both`,
                animationDelay: `${index * 100}ms`,
            }}
        >
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-ink-primary tracking-tight group-hover:text-accent transition-colors">
                    {title}
                </h3>
            </div>
            <p className="text-base leading-relaxed text-ink-secondary font-light">
                {description}
            </p>
        </div>
    );
}

/**
 * Learnings Section
 * Supports robust fallback from CASE_STUDIES_DATA if MDX props are missing.
 */
export function LearningsSection({
    title,
    learnings = [],
    projectSlug,
    locale = "pt"
}: LearningsSectionProps) {

    // Determine data source: MDX props or centralized fallback
    let displayLearnings = learnings;
    let displayTitle = title;

    if ((!displayLearnings || displayLearnings.length === 0) && projectSlug) {
        const fallbackData = CASE_STUDIES_DATA[projectSlug]?.[locale as 'pt' | 'en']?.learnings;
        if (fallbackData && fallbackData.items.length > 0) {
            displayLearnings = fallbackData.items;
            if (!displayTitle) displayTitle = fallbackData.title;
        }
    }

    // Default title if still missing
    if (!displayTitle) displayTitle = "O que esse projeto me ensinou";

    if (!displayLearnings || displayLearnings.length === 0) return null;

    return (
        <SectionWrap variant="light" className="relative py-24 md:py-32 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="space-y-16">

                    {/* Header */}
                    <div className="space-y-4">
                        <div className="h-px w-16 bg-accent" />
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-ink-primary">
                            {displayTitle}
                        </h2>
                    </div>

                    {/* Learnings List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {displayLearnings.map((item, index) => (
                            <LearningItem key={index} {...item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrap>
    );
}
