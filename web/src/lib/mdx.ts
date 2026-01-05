import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'src/content/thinking');

export interface ArticleMetadata {
    title: string;
    date: string;
    description: string;
    category?: string;
    tags?: string[];
    tech_level?: string;
    read_time?: string;
    author?: string;
    slug: string;
    status: 'draft' | 'published';
    publishedAt?: string;
}

export async function getAllArticles(locale: string): Promise<ArticleMetadata[]> {
    const localePath = path.join(CONTENT_PATH, locale);

    if (!fs.existsSync(localePath)) return [];

    const files = fs.readdirSync(localePath);

    return files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const source = fs.readFileSync(path.join(localePath, file), 'utf8');
            const { data } = matter(source);
            return {
                ...data,
                slug: file.replace('.mdx', ''),
            } as ArticleMetadata;
        })
        .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getPostBySlug(slug: string, locale: string) {
    const filePath = path.join(CONTENT_PATH, locale, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) return null;

    const source = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(source);

    return {
        content,
        metadata: {
            ...data,
            slug,
        } as ArticleMetadata,
    };
}
