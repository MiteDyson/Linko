// src/app/page.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ShortenerForm from "@/components/ShortenerForm";
import LottieAnimation from "@/components/LottieAnimation";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 py-8 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl w-full">
        
        {/* Left Side: Animation */}
        {/* Changed from hidden to flex, added order-first for mobile stacking */}
        <div className="flex justify-center w-full order-1 lg:order-none">
          <LottieAnimation />
        </div>

        {/* Right Side: Form Card */}
        <Card className="shadow-xl border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md w-full order-2 lg:order-none">
          <CardHeader>
            <CardTitle className="flex items-centerkz gap-2 text-2xl lg:text-3xl font-bold">
              Linko
            </CardTitle>
            <CardDescription className="text-base">
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