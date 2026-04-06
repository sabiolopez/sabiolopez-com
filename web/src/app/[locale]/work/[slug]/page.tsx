import { setRequestLocale } from 'next-intl/server';
import { getProjectBySlug } from '@/lib/projects';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { CaseStudyLayout } from '@/components/CaseStudyLayout';
import { Metadata } from 'next';

interface ProjectPageProps {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug, locale } = await params;
    const project = await getProjectBySlug(slug, locale);

    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.metadata.title} | Sabio Lopez`,
        description: project.metadata.description,
    };
}

import { PixelRevealImage } from '@/components/PixelRevealImage';
import { ChallengeCard, ChallengeGrid } from '@/components/ChallengeCard';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { ProcessStep, ProcessGrid } from '@/components/ProcessStep';
import { ResultsSection } from '@/components/ResultsSection';
import { BlueprintDevice } from '@/components/BlueprintDevice';
import { LearningsSection } from '@/components/LearningsSection';
import { NavigationList } from '@/components/NavigationList';
import { SectionWrap } from '@/components/SectionWrap';
import { ProcessSection } from '@/components/ProcessSection';
import { EditorialSection } from '@/components/EditorialSection';
import { ProcessImagesCarousel } from '@/components/ProcessImagesCarousel';
import * as Icons from 'lucide-react';

const components = {
    PixelRevealImage,
    ChallengeCard,
    ChallengeGrid,
    ArchitectureDiagram,
    ProcessStep,
    ProcessGrid,
    ResultsSection,
    BlueprintDevice,
    LearningsSection,
    SectionWrap,
    ProcessSection,
    EditorialSection,
    ProcessImagesCarousel,
};

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug, locale } = await params;
    setRequestLocale(locale);

    const project = await getProjectBySlug(slug, locale);

    if (!project) {
        notFound();
    }

    const { metadata, content } = project;

    return (
        <CaseStudyLayout
            title={metadata.title}
            description={metadata.description}
            contextContent={metadata.context ? (
                <div className="space-y-6">
                    {metadata.context.split('\n\n').map((paragraph: string, i: number) => (
                        <p key={i} className="text-body-lg text-ink-primary">
                            {paragraph.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                    return <strong key={j} className="block mt-4 mb-1 font-semibold first:mt-0">{part.slice(2, -2)}</strong>;
                                }
                                return part.split('\n').map((line, k) => (
                                    <span key={k} className="block">
                                        {line}
                                    </span>
                                ));
                            })}
                        </p>
                    ))}
                </div>
            ) : undefined}
            darkSection={metadata.darkSection}
            problemSection={metadata.problemSection}
            wrapChildren={false} // MDX now dictates sections for better layout control
            hideChildren={false}
            company={metadata.tag}
            segment={metadata.segment}
            journey={metadata.journey}
            role={metadata.role}
            period={metadata.date}
            tags={metadata.chips}
            navigation={<NavigationList locale={locale} />}
        >
            <MDXRemote
                source={content}
                components={components}
            />
        </CaseStudyLayout>
    );
}
