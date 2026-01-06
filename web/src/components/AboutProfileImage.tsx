"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AboutProfileImageProps {
    src: string;
    alt: string;
}

export function AboutProfileImage({ src, alt }: AboutProfileImageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square max-w-[280px] group cursor-default"
        >
            {/* Glow effect - Subtle accent gold */}
            <div className="absolute inset-0 bg-accent/5 rounded-none blur-3xl group-hover:bg-accent/15 transition-colors duration-1000" />

            {/* Image Container - Square & Precision border */}
            <div className="relative h-full w-full overflow-hidden border border-white/10 group-hover:border-accent transition-all duration-700 ease-out shadow-2xl">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 contrast-[1.1] brightness-[0.8] group-hover:brightness-100 transition-all duration-1000 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 280px"
                />
            </div>
        </motion.div>
    );
}
