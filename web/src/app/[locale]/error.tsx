"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft, RefreshCcw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations("Error");

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

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
                        <div className="w-24 h-24 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center backdrop-blur-sm">
                            <AlertCircle className="w-10 h-10 text-red-600/50" />
                        </div>
                        {/* Decorative background glow */}
                        <div className="absolute -inset-4 bg-red-500/5 blur-3xl -z-10 rounded-full" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <span className="text-label-caps text-red-600">
                            {t("subtitle")}
                        </span>
                        <h1 className="section-title">
                            {t("title")}
                        </h1>
                    </div>

                    <p className="text-ink-secondary text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                        {t("message")}
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => reset()}
                        className="btn-primary"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        {t("cta")}
                    </button>

                    <Link
                        href="/"
                        className="btn-secondary"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Home
                    </Link>
                </div>

                {/* Meta / Technical Footer */}
                <div className="mt-24 pt-8 border-t border-white/5">
                    <p className="text-white/10 text-xs font-mono tracking-widest uppercase">
                        Product & Growth Design Framework — Architectural Intelligence
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
