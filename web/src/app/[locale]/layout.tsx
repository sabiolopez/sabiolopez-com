import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from 'next/script';
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sabio Lopez | Product & Growth Design for SaaS B2B",
  description: "20 years of experience helping SaaS companies bridge the gap between interface design, product strategy, and AI-driven growth.",
  icons: {
    icon: [
      { url: '/favicon_32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon_16.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon_32.svg',
    apple: '/favicon_32.svg',
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-canvas text-ink-primary`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZCBE7JBT20"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZCBE7JBT20');
          `}
        </Script>
      </body>
    </html>
  );
}
