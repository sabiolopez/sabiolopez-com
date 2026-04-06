"use client";

import React from "react";
import { SectionWrap } from "./SectionWrap";

interface ProcessSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export function ProcessSection({ title, description, children }: ProcessSectionProps) {
    return (
        <SectionWrap variant="light" className="py-24 md:py-40 border-t border-border/10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-16">
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="h-px w-16 bg-accent" />
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-ink-primary">
                                {title}
                            </h2>
                        </div>
                        {description && (
                            <p className="text-body-lg text-ink-primary max-w-4xl text-pretty mt-6">
                                {description}
                            </p>
                        )}
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </SectionWrap>
    );
}
