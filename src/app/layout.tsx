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
      {/* Added overflow-x-hidden to prevent horizontal scroll issues on mobile */}
      <body className={cn(inter.className, "min-h-screen antialiased overflow-x-hidden")}>
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

          {/* GitHub Star Button (Bottom Left) - Responsive sizing and padding */}
          <div className="fixed bottom-4 left-4 lg:bottom-6 lg:left-6 z-50">
            <a
              href="https://github.com/mitedyson/linko" 
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full bg-background/80 backdrop-blur-sm border-slate-200 dark:border-slate-800Qb shadow-lg hover:scale-105 transition-transform text-xs lg:text-sm h-8 lg:h-9 px-3 lg:px-4"
              >
                <Github className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>Star on GitHub</span>
              </Button>
            </a>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}