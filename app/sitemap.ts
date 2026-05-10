import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap XML — généré automatiquement à /sitemap.xml.
 * Inclut la home + 5 pages dédiées + ancres sur la home.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Pages dédiées — priorité haute, indexation prioritaire
  const dedicatedPages = [
    { path: "/mecenat", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/maison-bledi", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/histoire", priority: 0.8, changeFrequency: "yearly" as const },
    { path: "/cooperative", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/kiosque", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  // Ancres sur la home — utiles pour les sitelinks Google
  const homeAnchors = [
    { hash: "#histoire", priority: 0.6 },
    { hash: "#bledi", priority: 0.6 },
    { hash: "#cooperative", priority: 0.6 },
    { hash: "#kiosque", priority: 0.6 },
    { hash: "#mecenat", priority: 0.7 },
    { hash: "#contact", priority: 0.6 },
  ];

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...dedicatedPages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...homeAnchors.map((a) => ({
      url: `${SITE_URL}/${a.hash}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: a.priority,
    })),
  ];
}
