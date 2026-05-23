import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BrandForge AI — Premium AI Logo & Brand Generator",
    template: "%s | BrandForge AI",
  },
  description:
    "Generate stunning logos, brand identities, color palettes, and slogans with AI. The most powerful AI branding tool for founders, designers, and marketers.",
  keywords: [
    "AI logo generator",
    "brand identity",
    "logo maker",
    "AI branding",
    "color palette generator",
    "slogan generator",
  ],
  authors: [{ name: "BrandForge AI" }],
  creator: "BrandForge AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brandforge.ai",
    title: "BrandForge AI — Premium AI Logo & Brand Generator",
    description: "Generate stunning brand identities with AI in seconds.",
    siteName: "BrandForge AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BrandForge AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandForge AI",
    description: "Generate stunning brand identities with AI in seconds.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} font-sans antialiased bg-[#030303] text-white`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111111",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#7C3AED", secondary: "#ffffff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#ffffff" },
            },
          }}
        />
      </body>
    </html>
  );
}