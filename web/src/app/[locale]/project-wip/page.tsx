"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Workflow, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectWIP() {
    const t = useTranslations("ProjectWIP");

    return (
        <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl w-full"
            >
                {/* Visual Element */}
                <div className="mb-12 flex justify-center">
                    <div className="relative">
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm"
                        >
                            <Workflow className="w-10 h-10 text-accent" />
                        </motion.div>

                        {/* Decorative background glow */}
                        <div className="absolute -inset-4 bg-accent/20 blur-3xl -z-10 rounded-full" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <span className="text-label-caps text-accent tracking-[0.2em]">
                            {t("subtitle")}
                        </span>
                        <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl">
                            {t("title")}
                        </h1>
                    </div>

                    <div className="space-y-6 max-w-xl mx-auto">
                        <p className="text-ink-primary text-xl font-medium">
                            {t("intro")}
                        </p>

                        <p className="text-ink-secondary text-base md:text-lg leading-relaxed">
                            {t("message")}
                        </p>

                        <p className="text-ink-secondary text-base md:text-lg leading-relaxed">
                            {t("context")}
                        </p>

                        <p className="text-ink-tertiary text-sm italic pt-4">
                            {t("footer_note")}
                        </p>
                    </div>
                </div>

                {/* CTAs */}
                <div className="mt-12 flex items-center justify-center">
                    <Link
                        href="/"
                        className="btn-primary"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t("cta_home")}
                    </Link>
                </div>

                {/* Meta / Technical Footer */}
                <div className="mt-24 pt-8 border-t border-border/30">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-tertiary opacity-60">
                        System Signature: [ Intentionally Orchestrated Experience ] — AI Built Engine v2.0
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
