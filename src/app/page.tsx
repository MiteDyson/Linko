import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ShortenerForm from "@/components/ShortenerForm";
import LottieAnimation from "@/components/LottieAnimation";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        
        {/* Left Side: Animation (Hidden on mobile) */}
        <div className="hidden lg:block">
          <LottieAnimation />
        </div>

        {/* Right Side: Form Card */}
        <Card className="shadow-xl border-slate-100">
          <CardHeader>
           // Inside app/page.tsx
<CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-800">
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