"use client";

import { useTranslations } from "next-intl";
import { SectionWrap } from "./SectionWrap";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function ContactSection() {
    const t = useTranslations("HomePage.contact");

    return (
        <SectionWrap id="contact" variant="dark" className="border-t border-border/10 overflow-hidden relative">
            {/* Ambient Background Movement */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.03, 0.07, 0.03],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px]"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start py-12 md:py-32 relative z-10">
                <div className="md:col-span-12 lg:col-span-7 space-y-12">
                    <div className="space-y-6">
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="hero-tag"
                        >
                            LET&apos;S TALK
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="section-title -ml-[0.03em]"
                        >
                            {t("title_main")} <br className="md:hidden" />
                            <span className="hero-title-accent block mt-2 opacity-60">{t("title_accent")}</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-body-lg text-ink-secondary max-w-xl leading-relaxed text-pretty"
                    >
                        {t("description")}
                    </motion.p>

                    {/* Chat Topics Tags - Refined with hover effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="space-y-4 pt-4"
                    >
                        <span className="block text-label-caps text-ink-tertiary/60">{t("chat_topics_label")}</span>
                        <div className="flex flex-wrap gap-3">
                            {(t.raw("chat_topics") as string[]).map(topic => (
                                <span
                                    key={topic}
                                    className="tag-chip !bg-white/5 !border-white/10 !text-ink-secondary hover:!bg-accent/10 hover:!text-accent hover:!border-accent/30 transition-all cursor-default"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Mentoring Card - Preserved in backlog.md for future re-activation */}
                </div>

                <div className="md:col-span-12 lg:col-span-5 space-y-16 lg:pl-12 lg:pt-12">
                    <div className="space-y-8">
                        <span className="block text-label-caps text-ink-tertiary/60">{t("social_label")}</span>
                        <div className="flex flex-col gap-8">
                            <motion.a
                                href={`mailto:${t("email")}`}
                                whileHover={{ x: 10 }}
                                className="group flex flex-col gap-2 w-fit"
                            >
                                <span className="text-detail-caps text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">Email</span>
                                <div className="flex items-center gap-6 text-h1 font-sans font-medium border-b border-border/20 pb-4 group-hover:border-accent transition-all">
                                    <span className="text-ink-primary group-hover:text-ink-primary transition-colors">{t("email")}</span>
                                    <ArrowUpRight className="w-6 h-6 text-accent opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </div>
                            </motion.a>

                            <motion.a
                                href={t("linkedin_url")}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ x: 10 }}
                                className="group flex flex-col gap-2 w-fit"
                            >
                                <span className="text-detail-caps text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">LinkedIn</span>
                                <div className="flex items-center gap-6 text-h1 font-sans font-medium border-b border-border/20 pb-4 group-hover:border-accent transition-all">
                                    <span className="text-ink-primary group-hover:text-ink-primary transition-colors">{t("linkedin_label")}</span>
                                    <ArrowUpRight className="w-6 h-6 text-accent opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </div>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrap>
    );
}
