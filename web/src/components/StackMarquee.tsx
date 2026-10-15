import Image from "next/image";
import { useTranslations } from "next-intl";
import { STACK_GROUPS } from "@/data/stack";

function MarqueeSet({ hidden = false, label }: { hidden?: boolean; label: (key: string) => string }) {
    return (
        <div className="stack-marquee-set flex shrink-0 items-center" aria-hidden={hidden || undefined}>
            {STACK_GROUPS.map((group) => (
                <div key={group.key} className="flex items-center gap-12 px-14 border-l border-border first:border-l-0">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent whitespace-nowrap">
                        {label(group.key)}
                    </span>
                    <ul className="flex items-center gap-12">
                        {group.items.map((item) => (
                            <li key={item.name} className="relative h-11 w-32 shrink-0">
                                <Image
                                    src={item.src}
                                    alt={hidden ? "" : item.name}
                                    title={item.name}
                                    fill
                                    className="object-contain opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export function StackMarquee() {
    const t = useTranslations("HomePage.stack");
    const label = (key: string) => t(`groups.${key}`);

    return (
        <section id="stack" className="relative z-10 bg-canvas pt-8 lg:pt-12 pb-0">
            <div className="max-w-[var(--layout-max-width)] mx-auto px-[var(--layout-padding-x-mobile)] md:px-[var(--layout-padding-x-desktop)] mb-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-tertiary">
                    / {t("title")}
                </span>
            </div>
            <div className="stack-marquee relative overflow-hidden">
                <div className="stack-marquee-track flex w-max">
                    <MarqueeSet label={label} />
                    <MarqueeSet label={label} hidden />
                </div>
            </div>
        </section>
    );
}
