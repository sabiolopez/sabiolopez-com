import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { ExpertiseTabs } from "@/components/ExpertiseTabs";
import { ActingAreas } from "@/components/ActingAreas";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sabio Lopez | Product & Growth Design for SaaS B2B",
  description: "Senior Product Designer specializing in B2B SaaS, Growth and AI. 20 years of experience architecting end-to-end digital journeys.",
};

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-canvas min-h-screen pt-16">
      <Header />
      <Hero />
      <WorkGrid />
      <ExpertiseTabs />
      <ActingAreas />
      <ContactSection />
      <Footer />
    </main>
  );
}
