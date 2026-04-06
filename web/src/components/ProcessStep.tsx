"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProcessStepProps {
    number: string;
    title: string;
    description: string;
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group space-y-4 border-l border-border pl-8 py-2 hover:border-accent transition-colors duration-500"
        >
            <div className="space-y-2">
                <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] font-medium block">
                    Etapa {number}
                </span>
                <h4 className="text-xl font-semibold text-ink-primary tracking-tight group-hover:text-accent transition-colors">
                    {title}
                </h4>
            </div>
            <p className="text-base leading-relaxed text-ink-secondary font-light max-w-sm">
                {description}
            </p>
        </motion.div>
    );
}

export function ProcessGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            {children}
        </div>
    );
}
