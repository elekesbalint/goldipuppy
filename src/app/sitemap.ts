import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.goldipuppy.com";

  // Minimal, safe static sitemap for main routes (expand later if needed)
  const routes = [
    "",
    "/puppies",
    "/breeds",
    "/reviews",
    "/faq",
    "/ordering",
    "/delivery",
    "/contact",
    "/reserve",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}


