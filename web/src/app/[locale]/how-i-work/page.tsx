import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default async function HowIWorkPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("HowIWork");
    const common = await getTranslations("HomePage");

    return (
        <main className="bg-canvas min-h-screen font-sans selection:bg-highlight selection:text-canvas pt-20">
            <Header />

            {/* Hero Editorial */}
            <section className="pt-12 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
                <div className="max-w-5xl space-y-12">
                    <h1 className="text-5xl md:text-[7vw] leading-[0.9] font-semibold tracking-tighter text-ink-primary">
                        {t("hero.title")}
                    </h1>
                    <p className="text-xl md:text-3xl text-ink-secondary font-light leading-relaxed text-pretty">
                        {t("hero.subtitle")}
                    </p>
                </div>
            </section>

            {/* Operating Principle */}
            <section className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto border-t border-border bg-surface-elevated/30">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">{t("principle.title")}</span>
                    </div>
                    <div className="md:col-span-8">
                        <h2 className="text-2xl md:text-4xl font-light text-ink-primary leading-tight max-w-3xl">
                            {t("principle.description")}
                        </h2>
                    </div>
                </div>
            </section>

            {/* Process Stepper */}
            <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <h2 className="font-mono text-xs text-ink-tertiary uppercase tracking-[0.2em] sticky top-12">
                            {t("process.title")}
                        </h2>
                    </div>

                    <div className="md:col-span-8 space-y-24 relative">
                        {/* Vertical line Connector */}
                        <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border hidden md:block" />

                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="relative pl-0 md:pl-12 group">
                                {/* Dot indicator */}
                                <div className="absolute left-[-5px] top-1 w-8 h-8 bg-canvas border border-border rounded-full hidden md:flex items-center justify-center z-10 group-hover:border-ink-primary transition-colors">
                                    <div className="w-1.5 h-1.5 bg-ink-tertiary rounded-full group-hover:bg-highlight transition-colors" />
                                </div>

                                <div className="space-y-4">
                                    <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-widest">Phase 0{step}</span>
                                    <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-ink-primary">
                                        {t(`process.step${step}.title`)}
                                    </h3>
                                    <p className="text-lg text-ink-secondary max-w-xl font-light leading-relaxed">
                                        {t(`process.step${step}.desc`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Callout */}
            <section className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto border-t border-border">
                <div className="bg-ink-primary text-canvas p-12 md:p-24 flex flex-col items-center text-center space-y-8">
                    <h3 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
                        {t("cta.title")}
                    </h3>
                    <Link href="/#contact" className="px-12 py-6 border border-canvas/20 hover:bg-canvas hover:text-ink-primary transition-all font-mono text-sm uppercase tracking-widest">
                        {t("cta.button")}
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
