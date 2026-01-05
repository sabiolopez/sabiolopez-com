import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SectionWrap } from "./SectionWrap";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CaseStudyLayoutProps {
    title: string;
    description: string;
    company: string;
    role: string;
    year: string;
    tags: string[];
    children: ReactNode;
    locale: string;
}

export function CaseStudyLayout({
    title,
    description,
    company,
    role,
    year,
    tags,
    children
}: CaseStudyLayoutProps) {
    return (
        <main className="bg-canvas min-h-screen pt-16">
            <Header />

            {/* Hero Section */}
            <SectionWrap variant="light" className="py-24 border-b border-border">
                <Link
                    href="/#work"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-tertiary hover:text-ink-primary transition-colors mb-16"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Work
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-8 space-y-8">
                        <div className="flex flex-wrap gap-3">
                            {tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-surface border border-border text-[9px] font-mono uppercase text-ink-tertiary">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="hero-title">
                            {title}
                        </h1>
                        <p className="text-body-lg text-ink-secondary max-w-3xl">
                            {description}
                        </p>
                    </div>

                    <div className="md:col-span-4 flex flex-col justify-end">
                        <div className="space-y-8 border-t border-border pt-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <span className="block font-mono text-[9px] uppercase tracking-widest text-ink-tertiary">Client</span>
                                    <span className="text-sm font-medium">{company}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="block font-mono text-[9px] uppercase tracking-widest text-ink-tertiary">Year</span>
                                    <span className="text-sm font-medium">{year}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="block font-mono text-[9px] uppercase tracking-widest text-ink-tertiary">Role</span>
                                    <span className="text-sm font-medium">{role}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrap>

            {/* Content Area */}
            <SectionWrap variant="light" className="py-24">
                <div className="max-w-4xl mx-auto prose prose-xl prose-invert prose-headings:text-ink-primary prose-p:text-ink-secondary prose-p:font-light prose-strong:text-ink-primary">
                    {children}
                </div>
            </SectionWrap>

            {/* Next Project / CTA */}
            <SectionWrap variant="dark" className="py-32">
                <div className="flex flex-col items-center text-center space-y-12">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em]">Full archive coming soon</span>
                    <h2 className="section-title text-canvas text-center">
                        WANT TO SEE THE <br /> <span className="hero-title-accent">FULL PROCESS?</span>
                    </h2>
                    <Link
                        href="/#contact"
                        className="px-12 py-6 bg-accent text-canvas font-mono text-sm uppercase tracking-widest hover:bg-canvas transition-colors"
                    >
                        Request Case Access
                    </Link>
                </div>
            </SectionWrap>

            <Footer />
        </main>
    );
}
