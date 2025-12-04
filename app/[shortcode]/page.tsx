import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface PageProps {
  params: { shortcode: string };
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortcode } = params;

  const link = await db.link.findUnique({
    where: { shortCode: shortcode },
  });

  if (!link) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-red-500">404</h1>
            <p className="text-slate-600">Link not found or expired.</p>
        </div>
      </div>
    );
  }

  // Optional: Increment analytics without blocking the user
  // We don't await this so the redirect happens instantly
  db.link.update({
    where: { id: link.id },
    data: { clicks: { increment: 1 } },
  });

  redirect(link.original);
}