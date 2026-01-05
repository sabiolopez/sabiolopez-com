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
            rootMargin: "-20% 0% -20% 0%",
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8],
        };

        const themeObserver = new IntersectionObserver((entries) => {
            // Sort to find the most "visible" section in this notification batch
            const sortedEntries = [...entries].sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            const mostVisible = sortedEntries[0];

            if (mostVisible.isIntersecting && mostVisible.intersectionRatio > 0.1) {
                if (variant === "dark") {
                    document.body.classList.add("section-dark");
                    document.body.classList.remove("bg-canvas");
                } else {
                    document.body.classList.remove("section-dark");
                    document.body.classList.add("bg-canvas");
                }
            }

            // Animate only if intersecting
            entries.forEach(entry => {
                if (entry.isIntersecting) setIsVisible(true);
            });
        }, observerOptions);

        if (sectionRef.current) {
            themeObserver.observe(sectionRef.current);
        }

        return () => {
            themeObserver.disconnect();
            // Reset body classes when navigating away or unmounting
            // Note: This might cause a flash if the next page also uses SectionWrap, 
            // but it's safer than leaking the state.
            document.body.classList.remove("section-dark");
            document.body.classList.add("bg-canvas");
        };
    }, [variant]);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={cn(
                "py-24 px-6 md:px-12 transition-all duration-500 ease-in-out scroll-snap-start",
                variant === "dark" ? "section-dark" : "bg-canvas text-ink-primary",
                className
            )}
        >
            <div className={cn(
                "max-w-[1920px] mx-auto reveal-observer",
                isVisible && "is-visible"
            )}>
                {children}
            </div>
        </section>
    );
}
