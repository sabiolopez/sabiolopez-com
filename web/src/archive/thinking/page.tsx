import { setRequestLocale } from 'next-intl/server';
import { SectionWrap } from '@/components/SectionWrap';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllArticles } from '@/lib/mdx';
import Link from 'next/link';

export default async function ThinkingPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const articles = await getAllArticles(locale);

    return (
        <main className="bg-canvas min-h-screen pt-16">
            <Header />

            <SectionWrap variant="light" className="py-24">
                <div className="max-w-4xl">
                    <span className="hero-tag">
                        Thinking & Writing
                    </span>
                    <h1 className="hero-title">
                        Insights on <br /> <span className="hero-title-accent">Architectural Intelligence.</span>
                    </h1>
                    <p className="text-xl text-ink-secondary font-light max-w-2xl leading-relaxed">
                        Exploring the intersection of product strategy, systems design, and behavioral psychology in B2B SaaS.
                    </p>
                </div>
            </SectionWrap>

            <SectionWrap variant="light" className="py-12 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border-x border-b border-border shadow-sm">
                    {articles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/${locale}/thinking/${article.slug}`}
                            className="bg-white p-8 md:p-12 hover:bg-surface-elevated transition-all duration-300 group flex flex-col justify-between min-h-[400px]"
                        >
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <span className="font-mono text-[9px] uppercase tracking-widest text-ink-tertiary px-2 py-1 border border-border">
                                        {article.category}
                                    </span>
                                    <span className="font-mono text-[9px] uppercase tracking-widest text-ink-tertiary">
                                        {article.date}
                                    </span>
                                </div>

                                <h2 className="text-3xl font-sans font-bold tracking-tight text-ink-primary group-hover:text-accent transition-colors leading-tight">
                                    {article.title}
                                </h2>

                                <p className="text-ink-secondary font-light leading-relaxed line-clamp-3">
                                    {article.description}
                                </p>
                            </div>

                            <div className="pt-8 flex justify-between items-end border-t border-border/50">
                                <div className="flex gap-4">
                                    <div className="space-y-1">
                                        <span className="block font-mono text-[8px] uppercase tracking-widest text-ink-tertiary">Tech_Level</span>
                                        <span className="text-[10px] font-sans font-bold uppercase">{article.tech_level}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="block font-mono text-[8px] uppercase tracking-widest text-ink-tertiary">Read_Time</span>
                                        <span className="text-[10px] font-sans font-bold uppercase">{article.read_time}</span>
                                    </div>
                                </div>
                                <div className="w-8 h-8 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="font-mono text-xs">{"->"}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </SectionWrap>

            <Footer />
        </main>
    );
}
