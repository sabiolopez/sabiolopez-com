"use client";

import React from "react";
import { SectionWrap } from "./SectionWrap";

interface EditorialSectionProps {
    children: React.ReactNode;
    variant?: "light" | "dark";
    className?: string;
    removeBottomPadding?: boolean;
}

export function EditorialSection({
    children,
    variant = "light",
    className,
    removeBottomPadding = false
}: EditorialSectionProps) {
    return (
        <SectionWrap variant={variant} className={`py-24 md:py-40 ${removeBottomPadding ? 'pb-0 md:pb-0' : ''} ${className || ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                <div className="md:col-start-4 md:col-span-8">
                    <div className="max-w-4xl space-y-12
                        [&>h2]:text-4xl [&>h2]:md:text-6xl [&>h2]:font-semibold [&>h2]:tracking-tighter [&>h2]:text-ink-primary [&>h2]:mb-12
                        [&>h3]:text-2xl [&>h3]:md:text-4xl [&>h3]:font-light [&>h3]:text-ink-primary [&>h3]:mb-8 [&>h3]:max-w-3xl
                        [&>p]:text-lg [&>p]:md:text-2xl [&>p]:text-ink-secondary [&>p]:font-light [&>p]:leading-relaxed [&>p]:text-pretty
                        [&>ul]:space-y-6 [&>ul]:text-lg [&>ul]:md:text-2xl [&>ul]:text-ink-secondary [&>ul]:font-light
                        [&>blockquote]:border-l-4 [&>blockquote]:border-highlight [&>blockquote]:pl-8 [&>blockquote]:italic [&>blockquote]:text-3xl [&>blockquote]:md:text-5xl [&>blockquote]:text-ink-primary">
                        {children}
                    </div>
                </div>
            </div>
        </SectionWrap>
    );
}
