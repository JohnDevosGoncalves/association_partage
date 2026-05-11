import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt — généré automatiquement à /robots.txt.
 *
 * Politique :
 *  - Tous les crawlers (Google, Bing, etc.) ont accès à l'intégralité du site
 *  - Les crawlers IA (GPTBot, ClaudeBot, PerplexityBot, etc.) sont
 *    explicitement autorisés pour maximiser la visibilité dans les réponses
 *    génératives — c'est la stratégie GEO/AEO.
 *  - Si à terme on veut bloquer un bot IA spécifique, ajouter une règle
 *    disallow: "/" pour son userAgent.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Bots IA explicitement bienvenus — entraînement et réponses temps réel
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
