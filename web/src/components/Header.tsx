"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
    const t = useTranslations("Common.nav");
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/", label: t("home") },
        { href: "/#work", label: t("work") },
        { href: "/about", label: t("about") },
        { href: "/#contact", label: t("contact") },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-border/50">
            <nav className="max-w-[1920px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
                <Link href="/" className="font-sans font-bold text-lg tracking-tighter text-ink-primary">
                    Sábio Lopez<span className="text-highlight">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-utility-caps text-ink-tertiary hover:text-ink-primary transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-ink-primary hover:bg-surface-elevated rounded-full transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Nav Overlay */}
            {isOpen && (
                <div className="md:hidden bg-canvas border-b border-border/50 animate-in slide-in-from-top-2 duration-300">
                    <div className="px-6 py-8 flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-h2 font-sans font-medium text-ink-secondary hover:text-ink-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
