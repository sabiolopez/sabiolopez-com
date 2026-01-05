"use client";

import { useTranslations } from "next-intl";
import { SectionWrap } from "./SectionWrap";
import { motion } from "framer-motion";

export function AboutHero() {
    const t = useTranslations("About.hero");

    return (
        <SectionWrap className="pt-12 pb-24 border-b border-border min-h-[70vh] flex flex-col justify-end">
            <div className="space-y-12 md:space-y-16">
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="hero-tag">{t("ui.profile_strategy")}</span>
                    </motion.div>
                    <motion.h1
                        initial={{ y: "40%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="hero-title max-w-5xl leading-[1.1]"
                    >
                        {t("title_main")} <br className="hidden md:block" />
                        <span className="hero-title-accent">{t("title_accent")}</span>
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px w-full bg-border origin-left"
                />

                <div className="flex flex-col md:flex-row gap-8 md:gap-32 items-start">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-utility-caps text-ink-secondary max-w-[200px] leading-relaxed"
                    >
                        <span className="text-ink-primary font-bold">{t("ui.professional_summary")}</span> <br />
                        <span className="text-ink-tertiary">{t("ui.career_length")}</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="md:col-span-12 lg:col-span-10"
                    >
                        <p className="text-body-lg text-ink-primary max-w-xl leading-relaxed text-pretty">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>
            </div>
        </SectionWrap>
    );
}
