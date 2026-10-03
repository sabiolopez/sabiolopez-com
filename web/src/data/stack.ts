export interface StackItem {
    name: string;
    src: string;
}

export interface StackGroup {
    key: "discovery" | "design" | "analytics" | "ai_dev" | "ops";
    items: StackItem[];
}

const BASE = "/assets/expertise";

/**
 * Single source of truth for the home page stack marquee.
 * Group labels come from i18n: HomePage.stack.groups.<key>
 */
export const STACK_GROUPS: StackGroup[] = [
    {
        key: "discovery",
        items: [
            { name: "Miro", src: `${BASE}/design/Discov-Miro.svg` },
            { name: "Maze", src: `${BASE}/design/Discov-Maze.svg` },
            { name: "Dovetail", src: `${BASE}/design/Discov-dovetail.svg` },
            { name: "Userberry", src: `${BASE}/design/Discov-Userberry.svg` },
        ],
    },
    {
        key: "design",
        items: [
            { name: "Figma", src: `${BASE}/design/Design-Figma.svg` },
            { name: "Framer", src: `${BASE}/design/Design-Framer.svg` },
        ],
    },
    {
        key: "analytics",
        items: [
            { name: "Google Analytics", src: `${BASE}/growth/Analytics-GA.svg` },
            { name: "Datadog", src: `${BASE}/growth/Analytics-Datadog.svg` },
            { name: "Hotjar", src: `${BASE}/growth/Analytics-hotjar.svg` },
            { name: "Optimizely", src: `${BASE}/growth/Analytics-Optimizely.svg` },
        ],
    },
    {
        key: "ai_dev",
        items: [
            { name: "ChatGPT", src: `${BASE}/ai/AI-Chatgpt.svg` },
            { name: "Claude", src: `${BASE}/ai/AI-Claude.svg` },
            { name: "Perplexity", src: `${BASE}/ai/AI-Perplexity.svg` },
            { name: "Windsurf", src: `${BASE}/ai/Dev-Windsurf.svg` },
            { name: "Replit", src: `${BASE}/ai/Dev-Replit.svg` },
            { name: "GitHub", src: `${BASE}/ai/Dev-Github.svg` },
            { name: "Webflow", src: `${BASE}/ai/Dev-Webflow.svg` },
        ],
    },
    {
        key: "ops",
        items: [
            { name: "Jira", src: `${BASE}/saas/Agil-Jira.svg` },
            { name: "Azure DevOps", src: `${BASE}/saas/Agil-Azure.svg` },
            { name: "Notion", src: `${BASE}/saas/DB-Notion.svg` },
            { name: "Airtable", src: `${BASE}/saas/DB-Airtable.svg` },
            { name: "HubSpot", src: `${BASE}/saas/CRM-Hubspot.svg` },
            { name: "Intercom", src: `${BASE}/saas/CRM-Intercom.svg` },
            { name: "Retool", src: `${BASE}/saas/CRM-Retool.svg` },
            { name: "Zapier", src: `${BASE}/growth/Integra-Zapier.svg` },
            { name: "n8n", src: `${BASE}/growth/Integra-N8C.svg` },
        ],
    },
];
