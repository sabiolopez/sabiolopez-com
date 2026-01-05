"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { SectionWrap } from "./SectionWrap";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface Project {
    id: string;
    cover: string;
}

interface CaseData {
    tag: string;
    front_title: string;
    back_text: string;
    chips: string[];
}

const CASES = [
    {
        id: "edenred",
        cover: "/assets/work/case_edenred.jpg",
    },
    {
        id: "qive",
        cover: "/assets/work/case_qive.jpg",
    },
    {
        id: "gympass_redesign",
        cover: "/assets/work/case_gympass_geo.jpg",
    },
    {
        id: "gympass_geo",
        cover: "/assets/work/case_gympass_redesign.png",
    },
    {
        id: "cma_brasil",
        cover: "/assets/work/case_cma_brasil.jpg",
    },
    {
        id: "portfolio",
        cover: "/assets/work/case_portfolio.jpg",
    },
];

export function WorkGrid() {
    const t = useTranslations("HomePage.work");

    return (
        <SectionWrap id="work" variant="dark" className="py-24 lg:py-40">
            {/* Section Header */}
            <div className="flex items-baseline justify-between border-b border-white/10 mb-20 lg:mb-24 pb-12">
                <div className="space-y-4">
                    <h2 className="section-title">
                        {t("title")}
                    </h2>
                </div>
            </div>

            {/* Cases Grid - 3 Columns with generous gaps for whitespace */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-20 lg:gap-y-32">
                {CASES.map((project) => (
                    <ProjectCard key={project.id} project={project} t={t} />
                ))}
            </div>
        </SectionWrap>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProjectCard({ project, t }: { project: Project, t: any }) {
    const caseData = t.raw(`cases.${project.id}`) as CaseData;

    return (
        <Link href="/project-wip" className="block h-full group">
            <motion.div
                className="flex flex-col h-full border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500 p-6 lg:p-8"
                initial="initial"
                whileHover="hover"
                animate="initial"
            >
                {/* Image Container - The "Hero" of the card */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#1A1A1A] mb-8 lg:mb-10">
                    <motion.div
                        className="absolute inset-0 z-0"
                        variants={{
                            initial: { scale: 1 },
                            hover: { scale: 1.05 }
                        }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Image
                            src={project.cover}
                            alt={caseData.tag}
                            fill
                            className="object-cover transition-all duration-1000 ease-out grayscale group-hover:grayscale-0"
                            priority={project.id === "edenred" || project.id === "qive"}
                        />
                        {/* Subtle Overlay to ensure high-end feel */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                    </motion.div>

                    {/* Arrow indicator on image hover */}
                    <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10">
                        <motion.div
                            variants={{
                                initial: { opacity: 0, scale: 0.8, rotate: -45 },
                                hover: { opacity: 1, scale: 1, rotate: 0 }
                            }}
                            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center text-black shadow-xl"
                        >
                            <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6" />
                        </motion.div>
                    </div>
                </div>

                {/* Content Section - Minimalist & Geometric */}
                <div className="flex flex-col flex-grow space-y-4 lg:space-y-6">
                    {/* Taxonomy info in Mono font */}
                    <div className="flex items-center gap-3">
                        <span className="text-detail-caps text-accent font-bold">
                            {caseData.tag}
                        </span>
                    </div>

                    <div className="space-y-3 lg:space-y-4">
                        <h3 className="text-h2 font-bold tracking-tight text-white leading-[1.1] group-hover:text-accent transition-colors duration-300">
                            {caseData.front_title}
                        </h3>

                        {/* Brief description for immediate scanning */}
                        <p className="text-white/60 text-body-sm line-clamp-3 max-w-[95%] leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                            {caseData.back_text}
                        </p>
                    </div>

                    {/* Tags - Grouped with description for Gestalt */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {caseData.chips.map((chip) => (
                            <span key={chip} className="tag-chip px-2 py-0.5 border-white/5 bg-white/5 text-white/30 group-hover:text-white transition-all duration-500">
                                {chip}
                            </span>
                        ))}
                    </div>

                    {/* Standardized CTA */}
                    <div className="mt-auto pt-8">
                        <div className="cta-link text-white/80 group-hover:text-accent group-hover:border-accent transition-all duration-300">
                            {t("read_more")}
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
