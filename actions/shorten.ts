"use server";

import { db } from "@/lib/db"; // Changed from "../lib/db" to "@/lib/db"

export async function shortenUrl(originalUrl: string) {
  // ... rest of your code is fine
  if (!originalUrl) {
    return { error: "URL is required" };
  }
  
  let urlToSave = originalUrl;
  if (!/^https?:\/\//i.test(originalUrl)) {
    urlToSave = "https://" + originalUrl;
  }

  const shortCode = Math.random().toString(36).substring(2, 8);

  try {
    const link = await db.link.create({
      data: {
        original: urlToSave,
        shortCode: shortCode,
      },
    });
    return { success: true, shortCode: link.shortCode };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to create link. Please try again." };
  }
}