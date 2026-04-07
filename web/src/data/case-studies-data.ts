export interface ProjectContent {
    results: {
        title?: string;
        items: { value: string; label: string; description: string }[];
    };
    learnings: {
        title?: string;
        items: { title: string; description: string }[];
    };
    carousel: {
        title?: string;
        images: { src: string; alt: string; caption?: string }[];
    };
}

export const CASE_STUDIES_DATA: Record<string, { pt: ProjectContent; en: ProjectContent }> = {
    edenred: {
        pt: {
            results: {
                title: "Impacto em conversão",
                items: [
                    { value: "+18 pts", label: "Conversão de Contratos", description: "Aumento na conversão do fluxo de geração de contratos (de 6% para 24%)." },
                    { value: "−3 pts", label: "Drop-off Rate", description: "Queda na dropoff rate (de 89% para 86%)." },
                    { value: "+4 pts", label: "Ativação de Clientes", description: "Aumento da conversão final de novos clientes (de 3% para 7%)." }
                ]
            },
            learnings: {
                title: "O que esse projeto me ensinou",
                items: [
                    { title: "Jornadas B2B não são lineares", description: "Processos complexos de decisão exigem uma leitura sistêmica, não apenas focada em um único canal ou etapa operacional." },
                    { title: "Self-service como qualificação", description: "O fluxo digital pode funcionar como ponto de qualificação e entrada, não necessariamente substituindo o processo assistido." },
                    { title: "Comportamento real vs. Métricas", description: "Métricas de funil sozinhas podem enganar; elas precisam ser interpretadas à luz do comportamento real e do tempo de decisão do usuário." }
                ]
            },
            carousel: {
                title: "Processo de Design — Imagens",
                images: [
                    { src: "/assets/projects/ticketcase/1.png", alt: "Fluxo inicial de contratação", caption: "Fluxo inicial" },
                    { src: "/assets/projects/ticketcase/2.png", alt: "Funil inicial de conversão", caption: "Funil inicial" },
                    { src: "/assets/projects/ticketcase/3.png", alt: "Customer Journey Map do decisor de RH", caption: "Customer Journey" },
                    { src: "/assets/projects/ticketcase/4.png", alt: "Descobertas da pesquisa", caption: "Discoveries" },
                    { src: "/assets/projects/ticketcase/5.png", alt: "Benchmark com o portal da Itália", caption: "Benchmark — Itália" },
                    { src: "/assets/projects/ticketcase/6.png", alt: "Novo fluxo de jornada proposto", caption: "Novo fluxo" },
                    { src: "/assets/projects/ticketcase/7.png", alt: "Estratégia Contrate Agora", caption: "Estratégia Contrate Agora" },
                    { src: "/assets/projects/ticketcase/8.png", alt: "Entregáveis finais", caption: "Entregáveis" }
                ]
            }
        },
        en: {
            results: {
                title: "Conversion Impact",
                items: [
                    { value: "+18 pts", label: "Contract Conversion", description: "Increase in conversion of the contract generation flow (from 6% to 24%)." },
                    { value: "−3 pts", label: "Drop-off Rate", description: "Drop in dropoff rate (from 89% to 86%)." },
                    { value: "+4 pts", label: "Customer Activation", description: "Increase in final conversion of new customers (from 3% to 7%)." }
                ]
            },
            learnings: {
                title: "What this project taught me",
                items: [
                    { title: "B2B journeys are non-linear", description: "Complex decision processes require a systemic reading, not just focused on a single channel or operational stage." },
                    { title: "Self-service as qualification", description: "The digital flow can function as a qualification and entry point, not necessarily replacing the assisted process." },
                    { title: "Real behavior vs. Metrics", description: "Funnel metrics alone can be misleading; they need to be interpreted in light of real behavior and user decision time." }
                ]
            },
            carousel: {
                title: "Design Process — Images",
                images: [
                    { src: "/assets/projects/ticketcase/1.png", alt: "Initial hiring flow", caption: "Initial flow" },
                    { src: "/assets/projects/ticketcase/2.png", alt: "Initial conversion funnel", caption: "Initial funnel" },
                    { src: "/assets/projects/ticketcase/3.png", alt: "Customer Journey Map for HR decision-maker", caption: "Customer Journey" },
                    { src: "/assets/projects/ticketcase/4.png", alt: "Research discoveries", caption: "Discoveries" },
                    { src: "/assets/projects/ticketcase/5.png", alt: "Benchmark with Italy portal", caption: "Benchmark — Italy" },
                    { src: "/assets/projects/ticketcase/6.png", alt: "Proposed new journey flow", caption: "New flow" },
                    { src: "/assets/projects/ticketcase/7.png", alt: "Hire Now strategy overview", caption: "Hire Now Strategy" },
                    { src: "/assets/projects/ticketcase/8.png", alt: "Final deliverables", caption: "Deliverables" }
                ]
            }
        }
    },
    qive: {
        pt: {
            results: {
                title: "Resultados",
                items: [
                    { value: "+22%", label: "Ticket médio", description: "Aumento de MRR com a introdução de volumetria no modelo de pricing, conectando uso à proposta de valor dos planos." },
                    { value: "-38%", label: "Chamados no trial", description: "Redução significativa de chamados de SDR durante o período de trial após a introdução das camadas de suporte." },
                    { value: "+14pts", label: "NPS no trial", description: "Melhora do NPS ao final da experiência de trial, refletindo maior clareza de valor e menor frustração." },
                    { value: "-31%", label: "Funil de ativação", description: "Redução de leaks no funil, mesmo sem ganho expressivo na conversão final de assinatura." },
                    { value: "+27%", label: "Progressão no trial", description: "Maior progressão até o Aha moment dentro dos 7 dias, indicando melhor alinhamento entre jornada e valor do produto." }
                ]
            },
            learnings: {
                title: "O que esse projeto me ensinou",
                items: [
                    { title: "Trial curto exige foco", description: "Em períodos reduzidos, é essencial guiar o usuário explicitamente para as ações que levam ao valor mínimo (Aha moment)." },
                    { title: "Tempo como elemento estrutural", description: "O tempo limitado não deve ser apenas uma restrição, mas um elemento que dita a priorização da experiência." },
                    { title: "Redução de dispersão", description: "A ativação depende diretamente de remover ruídos e competições de atenção durante o primeiro contato com o produto." }
                ]
            },
            carousel: {
                title: "Processo de Design — Imagens",
                images: [
                    { src: "/assets/projects/qive/Discovery 1.jpg", alt: "Discovery", caption: "Discovery" },
                    { src: "/assets/projects/qive/CustomerJourneyMap 2.jpg", alt: "Customer Journey Map", caption: "Customer Journey Map" },
                    { src: "/assets/projects/qive/Onboarding 3.jpg", alt: "Onboarding", caption: "Onboarding" },
                    { src: "/assets/projects/qive/PlansPage 4.jpg", alt: "Plans Page", caption: "Plans Page" },
                    { src: "/assets/projects/qive/Pricing 5.jpg", alt: "Pricing", caption: "Pricing" },
                    { src: "/assets/projects/qive/Checkout 6.jpg", alt: "Checkout", caption: "Checkout" }
                ]
            }
        },
        en: {
            results: {
                title: "Results",
                items: [
                    { value: "+22%", label: "Average ticket", description: "MRR increase with the introduction of volumetry into the pricing model, connecting usage to plan value proposition." },
                    { value: "-38%", label: "Trial support calls", description: "Significant reduction in SDR calls during the trial period following the introduction of support layers." },
                    { value: "+14pts", label: "Trial NPS", description: "Improved NPS at the end of the trial experience, reflecting greater value clarity and less frustration." },
                    { value: "-31%", label: "Activation funnel", description: "Reduction in funnel leaks, even without expressive gains in final subscription conversion." },
                    { value: "+27%", label: "Trial progression", description: "Greater progression to the Aha moment within 7 days, indicating better alignment between the journey and product value." }
                ]
            },
            learnings: {
                title: "What this project taught me",
                items: [
                    { title: "Short trial requires focus", description: "In reduced periods, it's essential to guide the user explicitly to actions that lead to minimum value (Aha moment)." },
                    { title: "Time as a structural element", description: "Limited time should not just be a restriction, but an element that dictates experience prioritization." },
                    { title: "Dispersion reduction", description: "Activation directly depends on removing noise and attention competition during the first contact with the product." }
                ]
            },
            carousel: {
                title: "Design Process — Images",
                images: [
                    { src: "/assets/projects/qive/Discovery 1.jpg", alt: "Discovery", caption: "Discovery" },
                    { src: "/assets/projects/qive/CustomerJourneyMap 2.jpg", alt: "Customer Journey Map", caption: "Customer Journey Map" },
                    { src: "/assets/projects/qive/Onboarding 3.jpg", alt: "Onboarding", caption: "Onboarding" },
                    { src: "/assets/projects/qive/PlansPage 4.jpg", alt: "Plans Page", caption: "Plans Page" },
                    { src: "/assets/projects/qive/Pricing 5.jpg", alt: "Pricing", caption: "Pricing" },
                    { src: "/assets/projects/qive/Checkout 6.jpg", alt: "Checkout", caption: "Checkout" }
                ]
            }
        }
    },
    cma_brasil: {
        pt: {
            results: { items: [] },
            learnings: {
                title: "O que esse projeto me ensinou",
                items: [
                    { title: "Evolução técnica em produção", description: "Segundo website desenvolvido com VibeCode e primeiro aplicativo funcional publicado em ambiente real, ampliando domínio técnico do processo completo." },
                    { title: "Decisões de stack impactam o produto", description: "Diferença entre CMS e webcoding evidenciou como escolhas técnicas influenciam manutenção, autonomia e evolução do projeto." },
                    { title: "Colaboração garante consistência", description: "Trabalho próximo com stakeholders locais e internacionais foi essencial para alinhar conteúdo, linguagem e contexto cultural." }
                ]
            },
            carousel: {
                title: "Processo de Design — Imagens",
                images: [
                    { src: "/assets/projects/cmacase/Cover.jpg", alt: "Cover do projeto CMA Brasil", caption: "Cover" },
                    { src: "/assets/projects/cmacase/Roadmap.jpg", alt: "Roadmap do projeto", caption: "Roadmap" },
                    { src: "/assets/projects/cmacase/Discovery.jpg", alt: "Discovery e pesquisa institucional", caption: "Discovery" },
                    { src: "/assets/projects/cmacase/Design.jpg", alt: "Design do website", caption: "Design" },
                    { src: "/assets/projects/cmacase/Delivery.jpg", alt: "Entrega e publicação do site", caption: "Deployment" },
                    { src: "/assets/projects/cmacase/App.jpg", alt: "Website CMA Brasil publicado", caption: "App" }
                ]
            }
        },
        en: {
            results: { items: [] },
            learnings: {
                title: "What this project taught me",
                items: [
                    { title: "Technical evolution in production", description: "Second website developed with VibeCode and first functional app published in a real environment, expanding technical mastery of the complete process." },
                    { title: "Stack decisions impact the product", description: "Difference between CMS and webcoding highlighted how technical choices influence maintenance, autonomy, and project evolution." },
                    { title: "Collaboration ensures consistency", description: "Working closely with local and international stakeholders was essential for aligning content, language, and cultural context." }
                ]
            },
            carousel: {
                title: "Design Process — Images",
                images: [
                    { src: "/assets/projects/cmacase/Cover.jpg", alt: "CMA Brasil project cover", caption: "Cover" },
                    { src: "/assets/projects/cmacase/Roadmap.jpg", alt: "Project roadmap", caption: "Roadmap" },
                    { src: "/assets/projects/cmacase/Discovery.jpg", alt: "Institutional discovery and research", caption: "Discovery" },
                    { src: "/assets/projects/cmacase/Design.jpg", alt: "Website design", caption: "Design" },
                    { src: "/assets/projects/cmacase/Delivery.jpg", alt: "Website delivery and publication", caption: "Deployment" },
                    { src: "/assets/projects/cmacase/App.jpg", alt: "Published CMA Brasil website", caption: "App" }
                ]
            }
        }
    },
    gympass_geo: {
        pt: {
            results: {
                title: "Impacto imediato e aprendizado em produção",
                items: [
                    { value: "↑", label: "Clareza na proposta de valor", description: "A visualização da rede tornou mais tangível a cobertura do produto, reduzindo incertezas na jornada inicial e fortalecendo o argumento de valor para novos usuários." },
                    { value: "↓", label: "Queda inicial em trials B2C", description: "Após o lançamento, foi observada redução significativa na geração de trials B2C em determinadas cidades dos EUA, indicando efeito negativo da nova experiência." },
                    { value: "!", label: "Insight via análise segmentada", description: "A análise por cidade revelou que a queda estava concentrada em regiões com baixa densidade de parceiros — onde o mapa evidenciava uma limitação real do produto." },
                    { value: "✓", label: "Correção rápida com feature flag", description: "Feature flag implementada para ocultar o mapa em regiões com baixa cobertura, restaurando a performance do funil e adaptando a experiência ao contexto local." }
                ]
            },
            learnings: {
                title: "O que esse projeto me ensinou",
                items: [
                    { title: "Visualização como suporte", description: "Ativos distribuídos exigem representação visual clara para apoiar processos complexos de decisão." },
                    { title: "Tradução de diferenciais", description: "Diferenciais competitivos podem permanecer abstratos se não houver uma tradução adequada na interface." },
                    { title: "Interface como ferramenta", description: "Elementos de produto podem e devem atuar como suporte direto à argumentação comercial e prova social." }
                ]
            },
            carousel: {
                title: "Processo de Design — Imagens",
                images: [
                    { src: "/assets/work/case05_geo_v3.png", alt: "Geolocalização Gympass", caption: "Geolocalização" }
                ]
            }
        },
        en: {
            results: {
                title: "Immediate impact and learning in production",
                items: [
                    { value: "↑", label: "Clarity in value proposition", description: "The network visualization made the product's coverage more tangible, reducing uncertainty in the initial journey and strengthening the value argument for new users." },
                    { value: "↓", label: "Initial drop in B2C trials", description: "After launch, a significant reduction in B2C trial generation was observed in certain US cities, indicating a possible negative effect of the new experience." },
                    { value: "!", label: "Insight via segmented analysis", description: "City-level analysis revealed that the drop was concentrated in regions with low partner density — where the map exposed a real product limitation." },
                    { value: "✓", label: "Fast fix with feature flag", description: "A feature flag was implemented to hide the map in low-coverage regions, restoring funnel performance and adapting the experience to the local context." }
                ]
            },
            learnings: {
                title: "What this project taught me",
                items: [
                    { title: "Visualization as support", description: "Distributed assets require clear visual representation to support complex decision processes." },
                    { title: "Differentiator translation", description: "Competitive differentiators can remain abstract without proper translation in the interface." },
                    { title: "Interface as a tool", description: "Product elements can and should act as direct support for sales argumentation and social proof." }
                ]
            },
            carousel: {
                title: "Design Process — Images",
                images: [
                    { src: "/assets/work/case05_geo_v3.png", alt: "Gympass Geolocation", caption: "Geolocation" }
                ]
            }
        }
    },
    gympass_redesign: {
        pt: {
            results: {
                title: "Resultados",
                items: [
                    { value: "+687%", label: "Crescimento", description: "Aumento no tráfego direcionado especificamente para captação de Leads B2B." },
                    { value: "+13%", label: "Retenção", description: "Melhora no tempo médio de engajamento nas páginas reformuladas." },
                    { value: "2M", label: "Usuários", description: "A base de usuários ativos saltou para 2 milhões durante o período de rollout." },
                    { value: "6", label: "Mercados", description: "Rollout simultâneo em 6 mercados globais com melhora direta na conversão final." }
                ]
            },
            learnings: {
                title: "O que esse projeto me ensinou",
                items: [
                    { title: "Gestão de stakeholders mudou minha forma de trabalhar", description: "Esse foi o principal aprendizado do projeto. Pela primeira vez, precisei entender com clareza quem acionar, quando envolver cada pessoa e qual nível de detalhe era necessário em cada conversa." },
                    { title: "Growth começa com organização, não com otimização", description: "Organizar arquitetura, conteúdo, eventos, taxonomia e métricas me mostrou que sem uma base comum não existe aprendizado coletivo nem evolução consistente." },
                    { title: "Um projeto que marcou muitas “primeiras vezes”", description: "Foi meu primeiro projeto em escala global, minha primeira experiência internacional e meu primeiro trabalho em inglês." }
                ]
            },
            carousel: {
                title: "Processo de Design — Imagens",
                images: [
                    { src: "/assets/projects/gympass/Project case/Cover 1.jpg", alt: "Capa", caption: "Capa" },
                    { src: "/assets/projects/gympass/Project case/Discovery 2.jpg", alt: "Discovery", caption: "Discovery" },
                    { src: "/assets/projects/gympass/Project case/Design 3.jpg", alt: "Design", caption: "Design" },
                    { src: "/assets/projects/gympass/Project case/Design 4.jpg", alt: "Design Detalhes", caption: "Design Detalhes" },
                    { src: "/assets/projects/gympass/Project case/Team 5.jpg", alt: "Time", caption: "Time" }
                ]
            }
        },
        en: {
            results: {
                title: "Results",
                items: [
                    { value: "+687%", label: "Growth", description: "Increase in traffic specifically directed to B2B Lead capture." },
                    { value: "+13%", label: "Retention", description: "Improvement in average engagement time on the reformulated pages." },
                    { value: "2M", label: "Users", description: "The active user base jumped to 2 million during the rollout period." },
                    { value: "6", label: "Markets", description: "Simultaneous rollout in 6 global markets with direct improvement in final conversion." }
                ]
            },
            learnings: {
                title: "What this project taught me",
                items: [
                    { title: "Stakeholder management changed the way I work", description: "This was the main learning of the project. For the first time, I needed to clearly understand who to involve, when to involve each person and what level of detail was necessary in each conversation." },
                    { title: "Growth starts with organization, not optimization", description: "Organizing architecture, content, events, taxonomy and metrics showed me that without a common base there is no collective learning or consistent evolution." },
                    { title: "A project that marked many “first times”", description: "It was my first global-scale project, my first international experience, my first work in English and my first direct contact with growth." }
                ]
            },
            carousel: {
                title: "Design Process — Images",
                images: [
                    { src: "/assets/projects/gympass/Project case/Cover 1.jpg", alt: "Cover", caption: "Cover" },
                    { src: "/assets/projects/gympass/Project case/Discovery 2.jpg", alt: "Discovery", caption: "Discovery" },
                    { src: "/assets/projects/gympass/Project case/Design 3.jpg", alt: "Design", caption: "Design" },
                    { src: "/assets/projects/gympass/Project case/Design 4.jpg", alt: "Design Details", caption: "Design Details" },
                    { src: "/assets/projects/gympass/Project case/Team 5.jpg", alt: "Team", caption: "Team" }
                ]
            }
        }
    },
    portfolio: {
        pt: {
            results: { items: [] },
            learnings: {
                title: "O que esse projeto me ensinou",
                items: [
                    { title: "IA exige estrutura", description: "A inteligência artificial não elimina a complexidade técnica; ela exige estrutura, prática e curadoria contínua." },
                    { title: "Visão sistêmica", description: "Assumir as etapas de implementação amplia drasticamente a compreensão sobre como o produto realmente funciona." },
                    { title: "Postura de produto", description: "Tratar projetos pessoais com o rigor de um produto real fortalece significativamente o posicionamento profissional." }
                ]
            },
            carousel: {
                title: "Processo de Design — Imagens",
                images: [
                    { src: "/assets/work/case06_portfolio.jpg", alt: "Portfolio as product", caption: "Portfólio" }
                ]
            }
        },
        en: {
            results: { items: [] },
            learnings: {
                title: "What this project taught me",
                items: [
                    { title: "AI requires structure", description: "Artificial intelligence does not eliminate technical complexity; it requires structure, practice, and continuous curation." },
                    { title: "Systemic view", description: "Taking on implementation stages drastically broadens understanding of how the product actually works." },
                    { title: "Product stance", description: "Treating personal projects with the rigor of a real product significantly strengthens professional positioning." }
                ]
            },
            carousel: {
                title: "Design Process — Images",
                images: [
                    { src: "/assets/work/case06_portfolio.jpg", alt: "Portfolio as product", caption: "Portfolio" }
                ]
            }
        }
    }
};
