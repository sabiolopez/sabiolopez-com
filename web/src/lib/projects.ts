import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PROJECTS_PATH = path.join(process.cwd(), 'content/projects');

export interface ProjectMetadata {
    id: string;
    title: string;
    tag: string;
    date: string;
    description: string;
    context?: string;
    chips: string[];
    cover: string;
    slug: string;
    status: 'draft' | 'published';
    order?: number;
    // New fields for scalability
    segment: string;
    journey: string;
    role: string;
    featured: boolean;
    darkSection?: {
        solutionTitle: string;
        solutionDescription: string;
        strategyTitle: string;
        strategies: { title: string; description: string }[];
        carouselImages: string[];
        hideCarousel?: boolean;
    };
    problemSection?: {
        title?: string;
        description: string;
        problems: { title: string; description: string }[];
    };
}

export async function getProjectBySlug(slug: string, locale: string) {
    const filePath = path.join(PROJECTS_PATH, slug, `${locale}.mdx`);

    if (!fs.existsSync(filePath)) {
        // Fallback to default locale (en) if localized mdx doesn't exist
        const fallbackPath = path.join(PROJECTS_PATH, slug, `en.mdx`);
        if (!fs.existsSync(fallbackPath)) return null;

        const source = fs.readFileSync(fallbackPath, 'utf8');
        const { content, data } = matter(source);
        return { content, metadata: { ...data, slug } as ProjectMetadata };
    }

    const source = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(source);

    return {
        content,
        metadata: {
            ...data,
            slug,
        } as ProjectMetadata,
    };
}

export function parseYear(dateStr: string): number {
    if (!dateStr) return 0;

    // Check if it's an ISO date like "2025-12-27"
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return parseInt(dateStr.substring(0, 4));
    }

    // Handle ranges: "2021-2022", "2024–2025", "2024 — WIP"
    // Split by any kind of dash (hyphen, en dash, em dash)
    const parts = dateStr.split(/[–—\-]/);
    const lastPart = parts[parts.length - 1].trim();

    // If last part is WIP or similar, try to parse the first part if it's a year
    if (lastPart.toUpperCase().includes('WIP') || isNaN(Number(lastPart))) {
        const firstPart = parts[0].trim();
        const year = parseInt(firstPart);
        return isNaN(year) ? 0 : year;
    }

    const year = parseInt(lastPart);
    return isNaN(year) ? 0 : year;
}

export async function getAllProjects(locale: string): Promise<ProjectMetadata[]> {
    if (!fs.existsSync(PROJECTS_PATH)) return [];

    const slugs = fs.readdirSync(PROJECTS_PATH).filter(file => {
        return fs.statSync(path.join(PROJECTS_PATH, file)).isDirectory();
    });

    const projects = slugs.map(slug => {
        let filePath = path.join(PROJECTS_PATH, slug, `${locale}.mdx`);

        if (!fs.existsSync(filePath)) {
            filePath = path.join(PROJECTS_PATH, slug, `en.mdx`);
        }

        if (!fs.existsSync(filePath)) return null;

        const source = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(source);

        return {
            ...data,
            slug,
        } as ProjectMetadata;
    }).filter((p): p is ProjectMetadata => p !== null);

    return projects.sort((a, b) => {
        // Primary sort: explicit order field defined in frontmatter
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;

        if (orderA !== orderB) {
            return orderA - orderB;
        }

        // Fallback: sort by year descending
        const yearA = parseYear(a.date);
        const yearB = parseYear(b.date);
        return yearB - yearA;
    });
}
