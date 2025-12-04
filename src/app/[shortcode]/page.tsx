import { db } from "@/lib/db";
import { redirect } from "next/navigation";

// Define the interface for the Page props
interface PageProps {
  params: { shortcode: string };
}

// Ensure the page is dynamic
export const dynamic = "force-dynamic";

export default async function RedirectPage({ params }: PageProps) {
  // Await params before accessing properties (required in Next.js 15, good practice in 14)
  const { shortcode } = await Promise.resolve(params); // Added await just in case, though params is usually synchronous in 14

  // Fetch the link from the database
  const link = await db.link.findUnique({
    where: { shortCode: shortcode }, // Ensure this matches your Prisma schema field name (usually camelCase 'shortCode' or lowercase 'shortcode')
  });

  // If the link doesn't exist, show a 404 page
  if (!link) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-6xl font-bold text-red-500 mb-2">404</h1>
        <p className="text-xl text-slate-600">Link Not Found</p>
        <a 
          href="/" 
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    );
  }

  // Increment the click count asynchronously (fire and forget)
  // We use a try-catch to ensure this doesn't block the redirect if it fails slightly
  try {
    await db.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });
  } catch (error) {
    console.error("Failed to update click count:", error);
  }

  // Redirect to the original URL
  redirect(link.original);
}