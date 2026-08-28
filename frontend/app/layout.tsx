import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecoverAI — AI Payment Recovery Intelligence & Decision Engine",
  description:
    "Recover more revenue from failed payments. RecoverAI predicts recovery probability, calculates expected recoverable value, and prescribes targeted recovery actions.",
  keywords: [
    "Payment Recovery",
    "AI Fintech",
    "Failed Payment Intelligence",
    "Revenue Optimization",
    "Payment Decision Engine",
    "Dunning & Retry AI",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} dark scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080C14] text-slate-100 selection:bg-blue-600/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
