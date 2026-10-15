"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
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
            <div className="grid grid-cols-1 items-center gap-x-12 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
                <div className="space-y-6 md:space-y-8 lg:col-start-1 lg:row-start-1">
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
                        className="section-title text-balance lg:text-[clamp(2.25rem,3.5vw,3.75rem)]"
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

                </div>

                <motion.a
                    href="https://cmabrasil.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("preview_link_label")}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="group block min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent lg:col-start-2 lg:row-span-2 lg:row-start-1"
                >
                    <div className="overflow-hidden rounded-lg border border-border/50 bg-[#102927]">
                        <Image
                            src="/assets/work/cma-brasil-site-preview.png"
                            alt={t("preview_alt")}
                            width={1372}
                            height={673}
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="h-auto w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
                        />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                        <span className="font-medium text-ink-primary">CMA Brasil</span>
                        <span className="inline-flex items-center gap-2 text-ink-secondary transition-colors group-hover:text-accent">
                            {t("preview_cta")}
                            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </span>
                    </div>
                </motion.a>

                <motion.div
                    className="lg:col-start-1 lg:row-start-2 lg:-mt-2"
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
