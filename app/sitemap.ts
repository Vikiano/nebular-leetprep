import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://leetprep.nebular.art";
  const now = new Date();
  const urls = [
    "/",
    "/waitlist",
    "/problems",
    "/roadmap",
    "/behavioral",
    "/system-design",
    "/companies",
    "/pricing",
    "/coach-mode",
    "/legal/acceptable-use",
    "/legal/terms",
    "/legal/privacy",
    "/blog",
  ];
  return urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
