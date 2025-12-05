"use server";

import { db } from "@/lib/db";

export async function shortenUrl(originalUrl: string, customSlug?: string) {
  // 1. Basic Validation
  if (!originalUrl) {
    return { error: "URL is required" };
  }
  
  // Ensure protocol exists
  let urlToSave = originalUrl;
  if (!/^https?:\/\//i.test(originalUrl)) {
    urlToSave = "https://" + originalUrl;
  }

  // 2. Custom Slug Logic
  let shortCode: string;

  if (customSlug && customSlug.trim() !== "") {
    // Validate custom slug format (alphanumeric only, 3-20 chars)
    const slugRegex = /^[a-zA-Z0-9-_]{3,20}$/;
    if (!slugRegex.test(customSlug)) {
      return { error: "Custom URL must be 3-20 characters (letters, numbers, -, _)" };
    }

    // Check if taken
    const existing = await db.link.findUnique({
      where: { shortCode: customSlug },
    });

    if (existing) {
      return { error: "This custom URL is already taken!" };
    }

    shortCode = customSlug;
  } else {
    // Generate Random 6-char Code if no custom slug
    shortCode = Math.random().toString(36).substring(2, 8);
  }

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