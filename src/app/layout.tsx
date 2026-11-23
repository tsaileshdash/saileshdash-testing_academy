import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QA Career Hub — Software Testing & Quality Engineering Platform",
  description:
    "Structured roadmaps, testing tools directory, interview prep, practical projects, and market trends from Fresher to Automation Engineer to SDET.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-30 grid grid-cols-3 grid-rows-6 gap-x-3 gap-y-5 overflow-hidden px-3 py-5 opacity-[0.18] sm:grid-cols-4 sm:grid-rows-7 sm:gap-x-5 sm:gap-y-6 md:grid-cols-5 md:grid-rows-8 lg:grid-cols-6 lg:grid-rows-9"
          >
            {Array.from({ length: 54 }, (_, index) => (
              <span
                key={index}
                className="self-center justify-self-center whitespace-nowrap font-[cursive] text-[12px] font-bold italic tracking-normal text-slate-600 dark:text-slate-300 sm:text-[13px]"
              >
                Sailesh Dash
              </span>
            ))}
          </div>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
