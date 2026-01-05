import { useTranslations } from "next-intl";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FooterProps {
    variant?: "light" | "dark";
}

export function Footer({ variant = "dark" }: FooterProps) {
    const t = useTranslations("HomePage.footer");

    return (
        <footer className={cn(
            "py-24 px-6 md:px-12 max-w-[1920px] mx-auto border-t transition-colors duration-500",
            variant === "dark"
                ? "bg-canvas section-dark border-border/10"
                : "bg-canvas text-ink-primary border-border"
        )}>
            <div className="flex flex-col gap-24">
                {/* Bottom Bar */}
                <div className={cn(
                    "flex flex-col md:flex-row justify-between items-end gap-8 pt-12 border-t",
                    variant === "dark" ? "border-border/10" : "border-border"
                )}>
                    <div className="space-y-1">
                        <span className="block font-sans font-bold text-base tracking-tight text-ink-primary">Sabio Lopez</span>
                        <span className="block text-detail-caps text-ink-tertiary">{t("rights")}</span>
                    </div>

                    <div className="flex gap-8">
                        <a href={t("linkedin_url")} target="_blank" rel="noopener noreferrer" className="text-utility-caps text-ink-secondary hover:text-ink-primary">LinkedIn</a>
                        <a href={`mailto:${t("email")}`} className="text-utility-caps text-ink-secondary hover:text-ink-primary">Email</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
