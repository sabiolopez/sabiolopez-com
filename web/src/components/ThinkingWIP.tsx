import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

export function ThinkingWIP() {
    const t = useTranslations("HomePage.thinking");

    return (
        <section id="thinking" className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                    <h2 className="font-mono text-xs text-ink-tertiary uppercase tracking-[0.2em] sticky top-24">
                        {t("title")}
                    </h2>
                </div>

                <div className="md:col-span-8 flex flex-col justify-between min-h-[400px]">
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <span className="inline-block font-mono text-[10px] text-ink-primary uppercase tracking-widest px-3 py-1 bg-accent border border-accent rounded-sm">
                                {t("status")}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-12">
                            {[
                                "The Perceived Value of Latency in AI Interfaces",
                                "B2B SaaS: Why Design Systems Fail at Scale",
                                "Growth Design is not about A/B Testing buttons",
                                "The transition from Product Designer to Architect"
                            ].map((title, i) => (
                                <div key={i} className="flex justify-between items-baseline border-b border-border/50 pb-6 group opacity-40 hover:opacity-100 transition-opacity cursor-default">
                                    <h3 className="text-h2 !font-light opacity-80 group-hover:opacity-100 transition-opacity">
                                        {title}
                                    </h3>
                                    <span className="font-mono text-[10px] text-ink-tertiary">{t("wip_suffix")}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-24 flex justify-between items-end border-t border-border pt-12">
                        <p className="text-body-sm text-ink-secondary max-w-md">
                            {t("note")}
                        </p>
                        <Link
                            href="/thinking"
                            className="cta-link"
                        >
                            Explore Thoughts
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
