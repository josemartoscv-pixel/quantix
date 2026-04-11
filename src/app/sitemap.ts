import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.dineroyahorro.com";
  return [
    { url: base, lastModified: new Date("2025-01-01"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/register`, lastModified: new Date("2025-01-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/login`, lastModified: new Date("2025-01-01"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacidad`, lastModified: new Date("2025-01-01"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookies`, lastModified: new Date("2025-01-01"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
