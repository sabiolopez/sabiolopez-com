"use client";

import { useTranslations } from "next-intl";
import { SectionWrap } from "./SectionWrap";
import { motion } from "framer-motion";

export function Hero() {
    const t = useTranslations("HomePage.hero");

    return (
        <SectionWrap variant="light" className="min-h-[90vh] flex flex-col justify-end pb-12 md:pb-24 relative overflow-hidden">
            {/* Background Texture/Grid (Subtle) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end relative z-10">
                {/* Main Headline - Massive */}
                <div className="md:col-span-12 space-y-8 md:space-y-12">
                    <div className="overflow-visible">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="hero-tag">PRODUCT STRATEGY & DESIGN</span>
                        </motion.div>
                        <motion.h1
                            initial={{ y: "40%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="hero-title -ml-[0.05em]"
                        >
                            <span className="md:whitespace-nowrap">{t("title1")}</span> <br className="hidden md:block" />
                            <span className="md:whitespace-nowrap">{t("title2")}</span> <br className="hidden md:block" />
                            <span className="hero-title-accent">{t("title3")}</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-px w-full bg-border origin-left"
                    />

                    <div className="flex flex-col md:flex-row gap-8 md:gap-32">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-utility-caps text-ink-secondary max-w-[200px] leading-relaxed"
                        >
                            Sábio Lopez <br />
                            <span className="text-ink-primary font-bold">{t("socialProof")}</span> <br />
                            <span className="text-ink-tertiary">São Paulo — Brasil</span>
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="text-body-lg text-ink-primary max-w-xl text-pretty"
                        >
                            {t("description")}
                        </motion.p>
                    </div>
                </div>
            </div>
        </SectionWrap>
    );
}
