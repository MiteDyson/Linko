"use server";

import { db } from "../lib/db";

export async function shortenUrl(originalUrl: string) {
  // 1. Basic Validation
  if (!originalUrl) {
    return { error: "URL is required" };
  }
  
  // Ensure protocol exists
  let urlToSave = originalUrl;
  if (!/^https?:\/\//i.test(originalUrl)) {
    urlToSave = "https://" + originalUrl;
  }

  // 2. Generate Random 6-char Code
  const shortCode = Math.random().toString(36).substring(2, 8);

  // 3. Save to DB
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