"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionWrap } from "./SectionWrap";
import { ContactDrawer } from "./ContactDrawer";

export function SmallBusinessSection() {
    const t = useTranslations("HomePage.smallBusiness");
    const [open, setOpen] = useState(false);

    // Deep link: /pt#projeto opens the form.
    useEffect(() => {
        if (window.location.hash !== "#projeto") return;
        const id = window.setTimeout(() => setOpen(true), 0);
        return () => window.clearTimeout(id);
    }, []);

    const closeDrawer = useCallback(() => {
        setOpen(false);
        if (window.location.hash === "#projeto") {
            history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    }, []);

    return (
        <SectionWrap id="sites" className="bg-white border-t border-border/50 pt-16 md:pt-24 pb-28 md:pb-44">
            <div className="space-y-6 md:space-y-8">
                <div>
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-label-caps text-accent mb-6 block"
                    >
                        {t("overline")}
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="section-title text-balance"
                    >
                        {t("title_line1")} <br className="hidden md:block" />
                        {t("title_line2")}
                    </motion.h2>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-body-lg text-ink-secondary max-w-2xl text-pretty"
                >
                    {t("description")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-haspopup="dialog"
                        className="group inline-flex items-center gap-2 py-3 font-sans text-body text-ink-primary border-b border-border/30 hover:text-accent hover:border-accent transition-colors cursor-pointer"
                    >
                        {t("cta")}
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                </motion.div>
            </div>
            <ContactDrawer open={open} onClose={closeDrawer} />
        </SectionWrap>
    );
}
