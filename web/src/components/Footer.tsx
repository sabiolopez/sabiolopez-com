import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations("HomePage.footer");

    return (
        <footer data-theme="dark" className="bg-[#0D0D0D] text-[#F9F9F7] w-full transition-colors duration-500 relative z-20">
            <div className="max-w-[var(--layout-max-width)] mx-auto px-[var(--layout-padding-x-mobile)] md:px-[var(--layout-padding-x-desktop)] pt-12 pb-24">
                <div className="flex flex-col gap-24">
                    {/* Bottom Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-8 border-t border-white/10">
                        <div className="space-y-1">
                            <span className="block font-sans font-bold text-base tracking-tight text-[#F9F9F7]">Sabio Lopez</span>
                            <span className="block text-detail-caps text-[#888888]">{t("rights")}</span>
                        </div>

                        <div className="flex gap-8">
                            <a href={t("linkedin_url")} target="_blank" rel="noopener noreferrer" className="text-utility-caps text-[#A0A0A0] hover:text-[#F9F9F7] transition-colors">LinkedIn</a>
                            <a href={`mailto:${t("email")}`} className="text-utility-caps text-[#A0A0A0] hover:text-[#F9F9F7] transition-colors">Email</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
