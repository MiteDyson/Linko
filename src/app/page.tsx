// src/app/page.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ShortenerForm from "@/components/ShortenerForm";
import LottieAnimation from "@/components/LottieAnimation";

export default function Home() {
  return (
    // REMOVED: bg-slate-50 (it was hiding your background)
    <main className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        
        {/* Left Side: Animation (Hidden on mobile) */}
        <div className="hidden lg:block">
          <LottieAnimation />
        </div>

        {/* Right Side: Form Card */}
        {/* Added: backdrop-blur to make text readable over animated backgrounds */}
        <Card className="shadow-xl border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
          <CardHeader>
            {/* REMOVED: text-slate-800 (let the theme handle the color) */}
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              Linko
            </CardTitle>
            <CardDescription>
              Enter a long URL below to generate a short, shareable link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShortenerForm />
          </CardContent>
        </Card>

      </div>
    </main>
  );
}