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
    "/mock-interview",
    "/study-plan",
    "/resume-review",
    "/legal/acceptable-use",
    "/legal/terms",
    "/legal/privacy",
    "/blog",
    "/blog/why-three-tier-explanations",
    "/blog/coach-mode-vs-stealth-tools",
    "/blog/amazon-leadership-principles-field-guide",
    "/blog/system-design-interview-rubric",
    "/blog/spaced-repetition-for-algorithms",
    "/blog/meta-e5-coding-signal",
  ];
  return urls.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : path.startsWith("/blog/") ? 0.5 : 0.7,
  }));
}
