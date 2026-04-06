import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { SectionWrap } from "./SectionWrap";
import { getAllProjects, parseYear } from "@/lib/projects";
import { getAllArticles } from "@/lib/mdx";

interface NavigationListProps {
    locale: string;
}

export async function NavigationList({ locale }: NavigationListProps) {
    const t = await getTranslations({ locale, namespace: "NavigationList" });
    const projects = await getAllProjects(locale);
    const articles = await getAllArticles(locale);

    const tCase = await getTranslations({ locale, namespace: "CaseStudy.contentType" });

    const tWork = await getTranslations({ locale, namespace: "HomePage.work" });

    const mergedItems = [
        ...projects.map((p) => {
            // Use front_title from translations if available (same source as WorkGrid)
            let translatedTitle = p.title;
            try {
                const rawData = tWork.raw(`cases.${p.id}`);
                if (rawData && typeof rawData === "object" && "front_title" in rawData) {
                    translatedTitle = (rawData as { front_title: string }).front_title;
                }
            } catch {
                // fallback to MDX title
            }
            return {
                id: p.slug,
                typeTag: tCase("project"),
                title: translatedTitle,
                company: p.tag,
                category: p.chips[0] || "",
                description: p.description,
                href: `/work/${p.slug}`,
                date: p.date,
                order: p.order,
                type: "project" as const,
            };
        }),
        ...articles.map((a) => ({
            id: a.slug,
            typeTag: tCase("article"),
            title: a.title,
            company: "",
            category: a.category || "",
            description: a.description,
            href: `/thinking/${a.slug}`,
            date: a.date,
            type: "article" as const,
        })),
    ].sort((a, b) => {
        // Projects with explicit order come first, sorted by that order
        const aOrder = (a as { order?: number }).order;
        const bOrder = (b as { order?: number }).order;

        if (aOrder !== undefined && bOrder !== undefined) {
            return aOrder - bOrder;
        }
        // Projects (with order) before unordered articles
        if (aOrder !== undefined) return -1;
        if (bOrder !== undefined) return 1;

        // Fallback: sort by year descending
        const yearA = parseYear(a.date);
        const yearB = parseYear(b.date);

        if (yearB !== yearA) {
            return yearB - yearA;
        }

        // Secondary sort by title if years are same
        return a.title.localeCompare(b.title);
    });

    return (
        <SectionWrap id="projects-navigation" variant="dark" className="pt-24 pb-0 !rounded-t-none !mt-0 !border-t-0 !rounded-b-none !mb-0 !border-b-0 !shadow-none">
            <div className="space-y-16">
                <div className="flex items-center gap-4">
                    <h2 className="text-label-caps text-ink-tertiary">
                        {t("title")}
                    </h2>
                </div>

                <div className="space-y-6">
                    {mergedItems.map((item, i) => (
                        <Link
                            key={`${item.type}-${item.id}`}
                            href={item.href}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-6 border-b border-border/10 last:border-0 group hover:bg-ink-tertiary/5 transition-colors -mx-4 px-4 py-4 rounded-lg"
                        >
                            <div className="lg:col-span-3">
                                <span className="font-mono font-bold uppercase text-accent text-[10px] tracking-[0.2em]">
                                    {item.typeTag}
                                </span>
                            </div>
                            <div className="lg:col-span-4">
                                <h4 className="text-base font-medium text-ink-primary group-hover:text-accent transition-colors">
                                    {item.title}
                                </h4>
                                <p className="text-[11px] text-ink-tertiary font-mono uppercase mt-1">
                                    {item.type === "project" ? (
                                        <>
                                            <span className="font-semibold text-ink-secondary">{item.company}</span>
                                            {item.category && <span className="mx-2 opacity-30">/</span>}
                                            <span>{item.category}</span>
                                        </>
                                    ) : (
                                        <span>{item.category}</span>
                                    )}
                                </p>
                            </div>
                            <div className="lg:col-span-5">
                                <p className="text-sm text-ink-secondary leading-relaxed line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </SectionWrap>
    );
}
