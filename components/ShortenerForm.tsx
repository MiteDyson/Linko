"use client";

import { useState } from "react";
import { shortenUrl } from "@/actions/shorten";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ArrowRight, Check, Link2 } from "lucide-react";

export default function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShortCode(null);

    const result = await shortenUrl(url);

    if (result.error) {
      setError(result.error);
    } else if (result.shortCode) {
      setShortCode(result.shortCode);
      setUrl(""); // Clear input
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    if (!shortCode) return;
    const fullUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Paste your long link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="h-12"
        />
        <Button type="submit" disabled={isLoading} className="h-12 px-8">
          {isLoading ? "Shortening..." : "Shorten"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {shortCode && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <Link2 className="h-4 w-4 text-green-700 flex-shrink-0" />
            <span className="text-green-900 font-medium truncate">
              {window.location.origin}/{shortCode}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="text-green-700 hover:text-green-800 hover:bg-green-100"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy</span>
          </Button>
        </div>
      )}
    </div>
  );
}