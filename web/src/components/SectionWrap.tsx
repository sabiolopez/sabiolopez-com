"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SectionWrapProps {
    children: ReactNode;
    variant?: "light" | "dark";
    className?: string;
    id?: string;
}

export function SectionWrap({
    children,
    variant = "light",
    className,
    id
}: SectionWrapProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observerOptions = {
            rootMargin: "0px",
            threshold: 0.1,
        };

        const visibilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            });
        }, observerOptions);

        if (sectionRef.current) {
            visibilityObserver.observe(sectionRef.current);
        }

        return () => {
            visibilityObserver.disconnect();
        };
    }, []);

    return (
        <section
            id={id}
            ref={sectionRef}
            data-theme={variant}
            className={cn(
                "transition-all duration-300 ease-in-out relative",
                variant === "dark"
                    ? "bg-[#0D0D0D] text-[#F9F9F7] section-dark rounded-[2.5rem] md:rounded-[3rem] shadow-[0_0_40px_rgba(0,0,0,0.15)] border-t border-b border-white/5 z-20 -my-6 md:-my-12"
                    : "bg-[#F9F9F7] text-[#1A1A1A] z-10",
                className
            )}
        >
            <div className={cn(
                "max-w-[var(--layout-max-width)] mx-auto px-[var(--layout-padding-x-mobile)] md:px-[var(--layout-padding-x-desktop)] reveal-observer",
                isVisible && "is-visible"
            )}>
                {children}
            </div>
        </section>
    );
}
