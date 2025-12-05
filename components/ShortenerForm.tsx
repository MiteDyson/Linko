"use client";

import { useState, useEffect } from "react";
import { shortenUrl } from "@/actions/shorten";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ArrowRight, Check, Link2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [monthlyCount, setMonthlyCount] = useState(0);

  // Check usage limit on load
  useEffect(() => {
    const usage = JSON.parse(localStorage.getItem("linko_usage") || "{}");
    const currentMonth = new Date().toISOString().slice(0, 7); // "2023-10"
    
    if (usage.month === currentMonth) {
      setMonthlyCount(usage.count || 0);
    } else {
      // Reset if new month
      localStorage.setItem("linko_usage", JSON.stringify({ month: currentMonth, count: 0 }));
      setMonthlyCount(0);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortCode(null);

    // Limit Check for Custom URLs
    if (customSlug && monthlyCount >= 5) {
      setError("You have reached your limit of 5 custom URLs this month.");
      setIsLoading(false);
      return;
    }

    const result = await shortenUrl(url, customSlug);

    if (result.error) {
      setError(result.error);
    } else if (result.shortCode) {
      setShortCode(result.shortCode);
      setUrl("");
      
      // Update Limit if it was a custom slug
      if (customSlug) {
        const newCount = monthlyCount + 1;
        setMonthlyCount(newCount);
        const currentMonth = new Date().toISOString().slice(0, 7);
        localStorage.setItem("linko_usage", JSON.stringify({ month: currentMonth, count: newCount }));
        setCustomSlug(""); // Clear custom input
      }
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    if (!shortCode) return;
    const domain = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = `${domain}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Paste your long link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="h-12 pl-10 bg-background border-slate-200 dark:border-slate-800 transition-all focus:ring-2 focus:ring-blue-500/20"
          />
          <Link2 className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Custom alias (optional)"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              className={cn(
                "h-12 pl-10 border-slate-200 dark:border-slate-800 transition-all",
                customSlug ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800" : "bg-background"
              )}
            />
            <Wand2 className={cn(
              "absolute left-3 top-3.5 h-5 w-5 transition-colors",
              customSlug ? "text-blue-500" : "text-muted-foreground"
            )} />
            
            {/* Monthly Limit Indicator */}
            <div className="absolute right-3 top-4 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              {customSlug ? `${5 - monthlyCount} left` : ''}
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading} 
            className={cn(
              "h-12 px-8 font-semibold transition-all hover:scale-105 active:scale-95",
              customSlug 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 shadow-lg"
                : "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
            )}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Processing
              </span>
            ) : (
              <>
                {customSlug ? "Claim Link" : "Shorten"} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-1">
          {error}
        </div>
      )}

      {shortCode && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 shadow-sm">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium">Success! Here's your link:</span>
              <span className="text-green-900 dark:text-green-100 font-semibold truncate text-lg">
                {typeof window !== 'undefined' ? window.location.host : ''}/{shortCode}
              </span>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="h-10 w-10 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 transition-colors"
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      )}
    </div>
  );
}