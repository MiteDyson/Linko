import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ThemeToggle";
import Background from "@/components/Background";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Background Layer */}
          <Background />

          {/* Theme Toggle (Top Right) */}
          <ThemeToggle />

          {/* Main Content */}
          {children}

          {/* GitHub Star Button (Bottom Left) */}
          <div className="fixed bottom-6 left-6 z-50">
            <a
              href="https://github.com/mitedyson/linko" 
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="gap-2 rounded-full bg-background/80 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-lg hover:scale-105 transition-transform"
              >
                <Github className="w-4 h-4" />
                <span>Star on GitHub</span>
              </Button>
            </a>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}