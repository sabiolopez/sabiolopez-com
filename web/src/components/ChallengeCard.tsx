"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface ChallengeCardProps {
    title: string;
    description: string;
    icon: LucideIcon | string;
    label?: string;
}

export function ChallengeCard({ title, description, icon, label }: ChallengeCardProps) {
    const Icon = typeof icon === 'string' ? (Icons as any)[icon] || Icons.Target : icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-surface-elevated border border-border p-8 lg:p-10 space-y-6 hover:border-accent/40 transition-colors duration-500"
        >
            {/* Top Bar with Icon */}
            <div className="flex items-start justify-between">
                <div className="p-3 bg-canvas border border-border group-hover:border-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-ink-secondary group-hover:text-accent transition-colors" />
                </div>
                {label && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-tertiary">
                        {label}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="space-y-3">
                <h4 className="text-xl font-bold text-ink-primary tracking-tight uppercase italic group-hover:text-accent transition-colors">
                    {title}
                </h4>
                <p className="text-sm leading-relaxed text-ink-secondary font-light">
                    {description}
                </p>
            </div>

            {/* Aesthetic Corner Accents */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-border/20 group-hover:border-accent/30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-border/20 group-hover:border-accent/30 pointer-events-none" />
        </motion.div>
    );
}

export function ChallengeGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16 not-prose">
            {children}
        </div>
    );
}
