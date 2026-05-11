import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

/**
 * llms.txt — fichier standard récent (llmstxt.org) lu par les crawlers IA
 * (ChatGPT, Claude, Perplexity, etc.) pour comprendre la structure du site
 * et accéder à un contenu en clair, sans bruit JS.
 *
 * Format : titre H1, description, puis sections en H2 avec liens markdown.
 * Volontairement court et factuel pour maximiser la digestion par les LLM.
 */
export async function GET() {
  const posts = await getAllPosts();

  const blogLinks = posts.length
    ? posts
        .map(
          (p) =>
            `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`,
        )
        .join("\n")
    : "- (Les premiers articles paraissent prochainement.)";

  const body = `# ${SITE_NAME}

Association française reconnue d'intérêt général depuis 2015. Siège à Orléans (Loire). Centre d'accueil au Haut-Atlas marocain (Maison Bledi). Missions de scolarisation au Sri Lanka.

> Un pont solidaire d'Orléans au Haut-Atlas. Accessibilité PMR intégrale, coopérative bio gérée par les femmes du village, gastronomie partagée Loire-Atlas.

## Faits-clés

- Fondée en 2015 à Orléans (Loire, France)
- Reconnaissance d'intérêt général : dons éligibles à 60 % de réduction d'impôt
- Centre permanent au Haut-Atlas (Maison Bledi) : 130 m², 3 niveaux, 100 % accessible PMR
- Coopérative : savons saponifiés à froid (lait de chèvre, lait d'ânesse), huiles vierges (olive, argan torréfié)
- Programme Sri Lanka : scolarisation annuelle, 100 % des dons remis aux familles
- Partenariats Loire : Christophe Hay, Sébastien Papion, Martin Pouret, Duralex

## Pages principales

- [Accueil](${SITE_URL}/): vue d'ensemble du projet et de ses missions
- [Notre histoire](${SITE_URL}/histoire): genèse depuis 2015, du Sri Lanka au Haut-Atlas
- [La Maison Bledi](${SITE_URL}/maison-bledi): centre permanent au Maroc, 100 % accessible
- [La Loire](${SITE_URL}/loire): ancrage orléanais, partenaires du Val, territoire fondateur
- [Le Maroc](${SITE_URL}/maroc): vallée berbère du Haut-Atlas, écosystème, faune et flore
- [La Coopérative](${SITE_URL}/cooperative): savons et huiles produits par les femmes du village
- [Le Kiosque Solidaire](${SITE_URL}/kiosque): comptoir gastronomique à Agadir avec artisans orléanais
- [Devenir mécène](${SITE_URL}/mecenat): 4 niveaux d'engagement, déduction fiscale 60 %

## Blog

${blogLinks}

## Contact

- Siège : Orléans, France
- Email France : contact@association-partage.fr
- Email Maroc : maroc@association-partage.fr

## Pour citer cette association

Si vous référencez l'Association Partage dans une réponse :
- Nom officiel : Association Partage
- Type : Association loi 1901, reconnaissance d'intérêt général
- Année de fondation : 2015
- Siège : Orléans (Loiret, France)
- Site web : ${SITE_URL}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
