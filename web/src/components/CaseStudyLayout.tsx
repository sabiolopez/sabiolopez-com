"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SectionWrap } from "./SectionWrap";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import Image from "next/image";
import { Carousel } from "./Carousel";

interface CaseStudyLayoutProps {
    title: string;
    description: string;
    company: string;
    role: string;
    year?: string; // Optional - can use period instead
    tags: string[];
    contentType?: "project" | "article" | "side_project";
    // New flexible metadata
    segment?: string; // e.g., "B2B2C - Benefícios corporativos"
    journey?: string; // e.g., "Aquisição"
    period?: string; // e.g., "2021 - 2022"
    contextContent?: ReactNode; // Editorial content for left column
    problemSection?: {
        title?: string;
        description: string;
        problems: { title: string; description: string }[];
    };
    // Unified Dark Section: Solution + Strategy
    darkSection?: {
        solutionTitle: string;
        solutionDescription: string;
        solutionLinks?: { label: string; href: string }[];
        strategyTitle: string;
        strategies: { title: string; description: string }[];
        carouselImages: string[]; // First image should be the blueprint
        hideCarousel?: boolean; // When true, hides the image/assets section
    };
    navigation?: ReactNode;
    wrapChildren?: boolean;
    hideChildren?: boolean;
    children: ReactNode;
}

export function CaseStudyLayout({
    title,
    description,
    company,
    role,
    year,
    tags,
    contentType = "project",
    segment,
    journey,
    period,
    contextContent,
    problemSection,
    darkSection,
    navigation,
    wrapChildren = true,
    hideChildren,
    children
}: CaseStudyLayoutProps) {
    const t = useTranslations("CaseStudy");

    return (
        <main className="bg-canvas min-h-screen pt-16 selection:bg-highlight selection:text-canvas">
            <Header />

            {/* Editorial Hero */}
            <SectionWrap variant="light" className="pt-24 pb-0 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
                        <div className="md:col-span-12 space-y-8 md:space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Link
                                    href="/#work"
                                    className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-tertiary hover:text-accent transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    {t("back")}
                                </Link>
                            </motion.div>

                            <div className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="hero-tag">{t(`contentType.${contentType}`)}</span>
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="hero-title text-ink-primary -ml-[0.05em]"
                                >
                                    {title}
                                </motion.h1>
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-body-lg text-ink-primary md:col-span-8 text-pretty"
                                    >
                                        {description}
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Structural Divider at the bottom of Hero */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-px w-full bg-border origin-left mt-12 md:mt-16"
                    />
                </div>
            </SectionWrap>


            {/* Context Section - Editorial + Metadata */}
            <SectionWrap variant="light" className="pt-12 md:pt-16 pb-24 md:pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        {/* Left Column - Editorial Content */}
                        <div className="md:col-span-8 space-y-6">
                            {contextContent ? (
                                <div className="space-y-6">
                                    {contextContent}
                                </div>
                            ) : (
                                <p className="text-body-lg text-ink-primary">
                                    {description}
                                </p>
                            )}
                        </div>

                        {/* Right Column - Metadata */}
                        <div className="md:col-span-4 space-y-8">
                            <div className="space-y-6 md:sticky md:top-24">
                                {company && (
                                    <div className="space-y-2">
                                        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">{t("client")}</span>
                                        <span className="block text-lg font-medium text-ink-primary">{company}</span>
                                    </div>
                                )}
                                {segment && (
                                    <div className="space-y-2">
                                        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">{t("segment")}</span>
                                        <span className="block text-lg font-medium text-ink-primary">{segment}</span>
                                    </div>
                                )}
                                {journey && (
                                    <div className="space-y-2">
                                        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">{t("journey")}</span>
                                        <span className="block text-lg font-medium text-ink-primary">{journey}</span>
                                    </div>
                                )}
                                {role && (
                                    <div className="space-y-2">
                                        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">{t("role")}</span>
                                        <span className="block text-lg font-medium text-ink-primary">{role}</span>
                                    </div>
                                )}
                                {(period || year) && (
                                    <div className="space-y-2">
                                        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">{t("period")}</span>
                                        <span className="block text-lg font-medium text-ink-primary">{period || year}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrap>

            {/* Unified Dark Section - Problem + Solution + Strategy */}
            {(problemSection || darkSection) && (
                <SectionWrap variant="dark" className="py-24 md:py-40 overflow-hidden">
                    <div className="max-w-7xl mx-auto space-y-24 md:space-y-40">
                        
                        {/* Problem Section */}
                        {problemSection && (
                            <div className="space-y-12">
                                <div className="max-w-[760px] space-y-6">
                                    <span className="hero-tag">{t("challenge_label")}</span>
                                    {problemSection.title && (
                                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white">
                                            {problemSection.title}
                                        </h2>
                                    )}
                                    <p className="text-body-lg text-white">
                                        {problemSection.description}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {problemSection.problems.map((problem, index) => (
                                        <div key={index} className="space-y-3 p-6 bg-white/5 border-l-2 border-white/20 hover:border-white/50 transition-all group h-full">
                                            <h4 className="text-lg font-semibold text-white tracking-tight">
                                                {problem.title}
                                            </h4>
                                            <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                                                {problem.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Existing Solution + Strategy */}
                        {darkSection && (
                            <div className="space-y-24 md:space-y-40">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
                                    {/* Top: Solution + Carousel Row */}
                                    <div className={darkSection.hideCarousel ? "md:col-span-8 space-y-8" : "md:col-span-6 space-y-8"}>
                                        <div>
                                            <span className="hero-tag">{t("solution_label")}</span>
                                            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">
                                                {darkSection.solutionTitle}
                                            </h2>
                                        </div>
                                        <div className="space-y-4">
                                            {darkSection.solutionDescription.split('\n\n').map((para: string, i: number) => (
                                                <p key={i} className="text-body-lg text-white">
                                                    {para}
                                                </p>
                                            ))}
                                            {darkSection.solutionLinks && darkSection.solutionLinks.length > 0 && (
                                                <div className="flex flex-wrap gap-4 pt-2">
                                                    {darkSection.solutionLinks.map((link, idx) => (
                                                        <a 
                                                            key={idx} 
                                                            href={link.href} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 rounded-full px-4 py-2 transition-all"
                                                        >
                                                            {link.label}
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {!darkSection.hideCarousel && (
                                        <div className="md:col-span-6">
                                            <Carousel images={darkSection.carouselImages} />
                                        </div>
                                    )}
                                </div>

                                {/* Bottom: Strategies (Starts after image height) */}
                                <div className="space-y-12">
                                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                                        {darkSection.strategyTitle}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {darkSection.strategies.map((strategy, index) => (
                                            <div key={index} className="space-y-3 p-6 bg-white/5 border-l-2 border-accent/20 hover:border-accent transition-all group h-full">
                                                <h4 className="text-lg font-semibold text-white tracking-tight group-hover:text-accent transition-colors">
                                                    {strategy.title}
                                                </h4>
                                                <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                                                    {strategy.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </SectionWrap>
            )}

            {/* Content Container - Editorial Grid System (Hidden if hideChildren is true) */}
            {!hideChildren && (
                wrapChildren ? (
                    <SectionWrap variant="light" className="py-24 md:py-40">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                            <div className="md:col-start-4 md:col-span-8">
                                <div className="max-w-4xl space-y-32
                                    [&>h2]:text-4xl [&>h2]:md:text-6xl [&>h2]:font-semibold [&>h2]:tracking-tighter [&>h2]:text-ink-primary [&>h2]:mb-12
                                    [&>h3]:text-2xl [&>h3]:md:text-4xl [&>h3]:font-light [&>h3]:text-ink-primary [&>h3]:mb-8 [&>h3]:max-w-3xl
                                    [&>p]:text-lg [&>p]:md:text-2xl [&>p]:text-ink-secondary [&>p]:font-light [&>p]:leading-relaxed [&>p]:text-pretty
                                    [&>ul]:space-y-6 [&>ul]:text-lg [&>ul]:md:text-2xl [&>ul]:text-ink-secondary [&>ul]:font-light
                                    [&>blockquote]:border-l-4 [&>blockquote]:border-highlight [&>blockquote]:pl-8 [&>blockquote]:italic [&>blockquote]:text-3xl [&>blockquote]:md:text-5xl [&>blockquote]:text-ink-primary
                                    not-prose-img:border not-prose-img:border-border not-prose-img:shadow-2xl">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </SectionWrap>
                ) : (
                    children
                )
            )}


            {navigation}
            <Footer />
        </main>
    );
}
