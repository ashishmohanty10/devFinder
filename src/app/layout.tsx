import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "devFinder",
  description: "Application to meet fellow developers to work on projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${geistSans.className} ${geistMono.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />

          <Header />

          <main className="px-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
