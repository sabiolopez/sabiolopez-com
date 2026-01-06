import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SectionWrap } from "@/components/SectionWrap";
import { AboutHero } from "@/components/AboutHero";
import { Clock, Globe, Target, GraduationCap } from "lucide-react";
import { AboutProfileImage } from "@/components/AboutProfileImage";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sobre | Sabio Lopez",
    description: "20 years of strategic design, from early web interfaces to AI-driven systems. Learn more about Sábio Lopez's trajectory and operating principles.",
};

export default async function AboutPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations("About");

    return (
        <main className="bg-canvas min-h-screen font-sans selection:bg-highlight selection:text-canvas pt-20 overflow-x-hidden">
            <Header />

            <AboutHero />

            {/* Narrative Sections */}
            <SectionWrap id="narrative" variant="dark" className="py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left: Deep Dive */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="prose prose-xl text-ink-primary font-light leading-relaxed space-y-8 max-w-2xl">
                            {/* Currently indication - Refined & Subtle */}
                            <div className="bg-white/5 border-l border-accent/40 pl-6 py-1 mb-12">
                                <span className="block font-mono text-[10px] text-accent uppercase mb-1 tracking-widest opacity-80">{t("current.label")}</span>
                                <p className="text-base font-normal text-ink-primary/90">
                                    {t("current.description")}
                                </p>
                            </div>

                            <p>{t("narrative.intro")}</p>
                            <p>{t("narrative.early_career")}</p>
                            <p>{t("narrative.transition")}</p>
                            <p>{t("narrative.growth")}</p>
                            <p>{t("narrative.ai_focus")}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-border">
                            <div className="space-y-2">
                                <Clock className="w-5 h-5 text-ink-tertiary" />
                                <span className="block font-mono text-[10px] text-ink-tertiary uppercase">{t("stats.seniority_label")}</span>
                                <p className="text-sm font-medium">{t("stats.seniority_value")}</p>
                            </div>
                            <div className="space-y-2">
                                <Globe className="w-5 h-5 text-ink-tertiary" />
                                <span className="block font-mono text-[10px] text-ink-tertiary uppercase">{t("stats.location_label")}</span>
                                <p className="text-sm font-medium">{t("stats.location_value")}</p>
                            </div>
                            <div className="space-y-2">
                                <Target className="w-5 h-5 text-ink-tertiary" />
                                <span className="block font-mono text-[10px] text-ink-tertiary uppercase">{t("stats.specialization_label")}</span>
                                <p className="text-sm font-medium">{t("stats.specialization_value")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Principles & Tools */}
                    <div className="lg:col-span-5 space-y-16">
                        <AboutProfileImage
                            src="/images/about/sabio-face.jpg"
                            alt={t("images.profile_face_alt")}
                        />

                        <div className="space-y-8">
                            <h3 className="text-label-caps text-accent">{t("principles.title")}</h3>
                            <ul className="space-y-6">
                                {["p1", "p2", "p3"].map((key, i) => (
                                    <li key={key} className="flex items-start gap-6 group">
                                        <span className="font-mono text-xs text-ink-tertiary pt-1">0{i + 1}</span>
                                        <span className="text-xl lg:text-2xl font-sans font-medium tracking-tight border-b border-transparent group-hover:border-accent transition-all pb-1 cursor-default">
                                            {t(`principles.${key}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-surface-elevated/40 backdrop-blur-sm p-8 border border-border/20 space-y-6 group/stack hover:border-accent/30 transition-all duration-500">
                            <h4 className="text-label-caps text-ink-tertiary group-hover/stack:text-accent transition-colors">{t("stack.title")}</h4>
                            <div className="flex flex-wrap gap-2">
                                {(t.raw("stack.tools") as string[]).map(tool => (
                                    <span key={tool} className="tag-chip !bg-white/5 !border-white/10 hover:!border-accent/30 hover:!text-accent transition-all">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrap>

            {/* Education & Specializations */}
            <SectionWrap className="py-24 border-t border-border">
                <div className="space-y-16">
                    <div className="flex items-center gap-4">
                        <GraduationCap className="w-8 h-8 text-accent" />
                        <h2 className="text-display-sm font-sans font-medium">{t("education.title")}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
                        {/* Degrees - Left side */}
                        <div className="md:col-span-4 space-y-8">
                            <h3 className="text-label-caps text-ink-tertiary">FORMAÇÃO ACADÊMICA</h3>
                            <div className="space-y-8">
                                {(t.raw("education.degrees") as any[]).map((item, i) => (
                                    <div key={i} className="group">
                                        <p className="text-lg font-medium text-ink-primary group-hover:text-accent transition-colors">
                                            {item.degree}
                                        </p>
                                        <p className="text-sm text-ink-tertiary font-mono uppercase tracking-wider mt-1">
                                            {item.institution}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Courses - Right side */}
                        <div className="md:col-span-8 space-y-8">
                            <h3 className="text-label-caps text-ink-tertiary">CURSOS & ESPECIALIZAÇÕES</h3>
                            <div className="space-y-6">
                                {(t.raw("education.courses") as any[]).map((course, i) => (
                                    <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-6 border-b border-border/50 last:border-0 group">
                                        <div className="lg:col-span-3">
                                            <span className="inline-block px-2 py-0.5 bg-surface-elevated border border-border text-[10px] font-mono text-ink-secondary uppercase tracking-tighter">
                                                {course.pilar}
                                            </span>
                                        </div>
                                        <div className="lg:col-span-4">
                                            <h4 className="text-base font-medium text-ink-primary">
                                                {course.course}
                                            </h4>
                                            <p className="text-[11px] text-ink-tertiary font-mono uppercase mt-1">
                                                {course.institution}
                                            </p>
                                        </div>
                                        <div className="lg:col-span-5">
                                            <p className="text-sm text-ink-secondary leading-relaxed">
                                                {course.focus}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrap>

            <Footer variant="light" />
        </main>
    );
}
