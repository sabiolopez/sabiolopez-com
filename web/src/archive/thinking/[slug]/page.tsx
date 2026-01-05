import { setRequestLocale } from 'next-intl/server';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { SectionWrap } from "@/components/SectionWrap";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';

// Custom components to use in MDX
const components = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: (props: any) => <h1 className="text-4xl md:text-6xl font-semibold tracking-tight my-12 text-ink-primary" {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: (props: any) => <h2 className="text-3xl md:text-4xl font-medium tracking-tight mt-16 mb-8 text-ink-primary" {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h3: (props: any) => <h3 className="text-2xl font-medium tracking-tight mt-12 mb-6 text-ink-secondary" {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    p: (props: any) => <p className="text-xl leading-relaxed text-ink-secondary font-light mb-8" {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ul: (props: any) => <ul className="list-none space-y-4 mb-8" {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    li: (props: any) => (
        <li className="flex gap-4 items-start text-xl text-ink-secondary font-light" {...props}>
            <span className="text-accent mt-2 font-mono text-xs">{"//"}</span>
            <span>{props.children}</span>
        </li>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blockquote: (props: any) => (
        <blockquote className="border-l-2 border-accent pl-8 py-4 my-12 italic text-2xl md:text-3xl font-light text-ink-primary" {...props} />
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    strong: (props: any) => <strong className="font-semibold text-ink-primary" {...props} />,
};

export default async function ThinkingArticlePage({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const post = await getPostBySlug(slug, locale);

    if (!post) {
        notFound();
    }

    return (
        <main className="bg-canvas min-h-screen pt-16">
            <Header />

            <SectionWrap variant="light" className="py-24">
                <Link
                    href={`/${locale}/thinking`}
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-tertiary hover:text-ink-primary transition-colors mb-16"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Thinking
                </Link>

                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-4">
                            {post.metadata.tags?.map(tag => (
                                <span key={tag} className="px-3 py-1 border border-border text-[10px] font-mono uppercase text-ink-tertiary">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="hero-title text-5xl md:text-7xl">
                            {post.metadata.title}
                        </h1>
                        <div className="flex items-center gap-8 pt-6 border-t border-border">
                            <div className="space-y-1">
                                <span className="block font-mono text-[9px] uppercase tracking-widest text-ink-tertiary">Date</span>
                                <span className="text-sm font-medium">{post.metadata.date}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="block font-mono text-[9px] uppercase tracking-widest text-ink-tertiary">Author</span>
                                <span className="text-sm font-medium">{post.metadata.author}</span>
                            </div>
                        </div>
                    </div>

                    <article className="prose prose-xl prose-invert max-w-none pt-12">
                        <MDXRemote source={post.content} components={components} />
                    </article>
                </div>
            </SectionWrap>

            <Footer />
        </main>
    );
}
