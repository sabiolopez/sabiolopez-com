# Arquitetura de Conteúdo — Estruturação de Cases (Mapeamento Semântico)

> **Agente Arquiteto de Conteúdo:** Estruturação lógica dos fatos para os 3 cases iniciais. Foco em decisão e contexto real SaaS B2B.

---

## Case 1: Ticket Edenred (Growth & Activation)

### 1. Contexto
*   **Empresa:** Benefícios corporativos (Edenred Group).
*   **Modelo:** SaaS B2B com portais corporativos complexos e legado.
*   **Momento:** Foco em escala e eficiência operacional via self-service.
*   **Restrições:** Dependência de dados de integrações e alinhamento com times comercial/marketing.

### 2. Problema real
*   **O que não funcionava:** Atrito no onboarding e na ativação de novos clientes B2B.
*   **Impacto:** Necessidade de suporte humano excessivo e lentidão na primeira utilização do produto.

### 3. Hipóteses consideradas
*   Simplificação da jornada de aquisição self-service vs. Melhoria na documentação/suporte.
*   Foco em ativação imediata (Quick Win) vs. Onboarding completo detalhado.

### 4. Decisões tomadas
*   Priorização do design de jornadas de aquisição assistidas por dados de comportamento.
*   Testes de usabilidade contínuos para validar a redução de carga cognitiva no setup inicial.

### 5. Execução
*   Discovery contínuo em squad de Growth.
*   Refestelamento técnico entre produto e comercial para garantir que a promessa de venda seja entregue na interface.

### 6. Resultados e aprendizados
*   Melhoria na eficiência dos portais (Métricas de ativação).
*   Aprendizado: Em sistemas legados, a simplificação visual é secundária à clarificação dos dados de entrada.

---

## Case 2: Qive/Arquivei (Monetização & Conversão)

### 1. Contexto
*   **Empresa:** Qive (antiga Arquivei).
*   **Produto:** Gestão de documentos fiscais SaaS B2B.
*   **Momento:** Busca por maior monetização e clareza nos ICPs (Ideal Customer Profiles).

### 2. Problema real
*   **O que não funcionava:** Checkout com baixa conversão e confusão na escolha de planos.
*   **Impacto:** Perda de receita no fundo do funil e churn precoce por planos mal dimensionados.

### 3. Hipóteses consideradas
*   Redesign visual do checkout vs. Reestruturação da hierarquia de planos/preços.
*   Inclusão de comparativos explícitos entre tiers vs. Onboarding guiado pré-pagamento.

### 4. Decisões tomadas
*   Redesign modular do checkout focado em clareza de valor.
*   Uso de testes A/B para validar mudanças de copy e layout antes do deploy global.

### 5. Execução
*   Atuação na Growth Tribe (Aquisição, Ativação e Monetização).
*   Análise quantitativa profunda via Amplitude/Mixpanel para identificar gargalos no funil.

### 6. Resultados e aprendizados
*   Otimização da taxa de conversão do checkout.
*   Aprendizado: No B2B, a decisão de compra é técnica e baseada em valor, não em impulso.

---

## Case 3: Gympass/Wellhub (Scalable Product Design)

### 1. Contexto
*   **Empresa:** Gympass (atual Wellhub).
*   **Modelo:** B2B2C global (Empresa -> Funcionário -> Academia).
*   **Momento:** Expansão multi-país acelerada.

### 2. Problema real
*   **O que não funcionava:** Falta de um designer dedicado ao time de Growth; jornadas não logadas inconsistentes entre países.
*   **Impacto:** Dificuldade em escalar experimentos de aquisição e branding inconsistente.

### 3. Hipóteses consideradas
*   Criação de landings específicas por país vs. Design de sistema modular e centralizado.
*   Foco em conversão B2B (empresas) vs. B2C (usuário final) na home não logada.

### 4. Decisões tomadas
*   Implementação de um design modular focado em escalabilidade global.
*   Colaboração direta com Branding, SEO e Dados para unificar a jornada do usuário.

### 5. Execução
*   Primeiro designer dedicado à Growth Tribe.
*   Arquitetura da informação para suportar múltiplos idiomas e contextos de mercado.

### 6. Resultados e aprendizados
*   Estrutura de aquisição escalável globalmente.
*   Aprendizado: O design modular é a única forma de sustentar o crescimento hiper-acelerado sem criar dívida técnica visual.

---

## Case 08: Ticket Edenred — Redesenho de relatórios do Portal Ticket (Migração & Arquitetura de Informação)

> Slug: `ticket_reports` · id: `case08` · `order: 1` · Fonte: apresentação do projeto (prevalece sobre documentos anteriores).

### 1. Contexto
*   Migração do portal legado (TEP) para o Portal Ticket; relatórios era frente necessária para atender médias, grandes e Top Accounts.
*   Escopo inicial: replicar 18 relatórios em 3 meses (ampliado para 6). Frente sem squad; design assumido por mim, em parceria com o GPM.

### 2. Problema real
*   Relatórios fragmentados, filtros/tabelas fixos, exportação como única saída e demandas de grandes contas atendidas manualmente por Operações.

### 3. Hipóteses consideradas
*   Replicar os 18 relatórios vs. reorganizar por domínio de informação (Pedidos e Documentos Fiscais, Beneficiários, Cartões, Reversões).
*   Baixo uso de grandes contas = baixa necessidade? (refutada: demanda atendida fora do portal).

### 4. Decisões tomadas
*   Arquitetura unificada, filtros principais/avançados, personalização de colunas, exploração no portal e exportação reutilizável.

### 5. Execução
*   Análise de uso + arquivos personalizados (com LLM) + benchmark; protótipos (Figma Design/Make, Google Antigravity); teste com 5 clientes; piloto e rollout em ondas; dashboards de acompanhamento.

### 6. Resultados e aprendizados
*   Mais da metade da base habilitada (acesso, não uso/retenção).
*   Aprendizado: uso do portal mostra só parte da necessidade; migrar exige rever arquitetura; ampliar a base exige orientação e visibilidade.

### Política de anonimização (público)
*   Não publicar: nomes de fornecedores terceiros (parceiro de desenvolvimento, ferramenta de monitoramento), tamanho absoluto da base, contagens por onda e data exata do rollout. Usar percentuais e valores arredondados.
*   Notas públicas mantidas: leitura dos indicadores e limites da validação.

> Nota: cases 04–07 ainda não estão detalhados neste documento.
