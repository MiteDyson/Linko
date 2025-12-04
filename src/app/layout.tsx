import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // This imports Tailwind styles
import { cn } from "@/lib/utils"; // Shadcn utility to merge classes

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linko | Shorten URLs",
  description: "The fastest way to shorten your links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        {children}
      </body>
    </html>
  );
}