"use client";

import React from "react";
import { motion } from "framer-motion";

interface LearningItemProps {
    title: string;
    description: string;
}

function LearningItem({ title, description }: LearningItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group space-y-4 border-l border-border pl-8 py-2 md:py-0 hover:border-accent transition-colors duration-500"
        >
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-ink-primary tracking-tight group-hover:text-accent transition-colors">
                    {title}
                </h3>
            </div>
            <p className="text-base leading-relaxed text-ink-secondary font-light">
                {description}
            </p>
        </motion.div>
    );
}

import { SectionWrap } from "./SectionWrap";

interface Learning {
    title: string;
    description: string;
}

interface LearningsSectionProps {
    title?: string;
    learnings?: Learning[];
}

const DEFAULT_LEARNINGS: Learning[] = [
    {
        title: "Gestão de stakeholders mudou minha forma de trabalhar",
        description: "Esse foi o principal aprendizado do projeto. Pela primeira vez, precisei entender com clareza quem acionar, quando envolver cada pessoa e qual nível de detalhe era necessário em cada conversa. Aprendi a ler roadmaps, mapear dependências, centralizar informações e manter uma comunicação clara para que todos tivessem acesso ao mesmo contexto — algo essencial em um projeto com muitos países, agendas diferentes e pouco tempo para decidir."
    },
    {
        title: "Growth começa com organização, não com otimização",
        description: "Eu entrei nesse projeto achando que growth estaria mais ligado a experimentos e resultados rápidos, mas aprendi que, em escala, o trabalho começa antes. Organizar arquitetura, conteúdo, eventos, taxonomia e métricas — e participar da implantação do Amplitude com o time — me mostrou que sem uma base comum não existe aprendizado coletivo nem evolução consistente."
    },
    {
        title: "Um projeto que marcou muitas “primeiras vezes”",
        description: "Foi meu primeiro projeto em escala global, minha primeira experiência internacional, meu primeiro trabalho em inglês e meu primeiro contato direto com growth. Tudo isso aconteceu ao mesmo tempo. Esse contexto me forçou a ser mais sintético, mais assertivo e mais claro, e acelerar minha evolução profissional de uma forma que poucos projetos conseguem fazer."
    }
];

export function LearningsSection({ title = "O que esse projeto me ensinou", learnings = DEFAULT_LEARNINGS }: LearningsSectionProps) {
    return (
        <SectionWrap variant="light" className="relative py-24 md:py-32 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="space-y-16">

                    {/* Header - Simple and aligned with MDX standards */}
                    <div className="space-y-4">
                        <div className="h-px w-16 bg-accent" />
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-ink-primary">
                            {title}
                        </h2>
                    </div>

                    {/* Learnings List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {learnings.map((item, index) => (
                            <LearningItem key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrap>
    );
}
