import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getAllPosts } from "@/lib/blog";
import { CATEGORY_LABELS } from "@/lib/blog/types";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Le blog — récits, méthodes et regards depuis Orléans et l'Atlas",
  description:
    "Articles de fond sur l'accessibilité PMR au Maroc, la coopérative berbère, le mécénat d'intérêt général et nos missions de scolarisation. Le terrain expliqué en profondeur.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Le blog · Association Partage",
    description:
      "Récits de terrain, méthodes pédagogiques et regards depuis Orléans et le Haut-Atlas.",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  // JSON-LD Blog schema — boost SEO + GEO (Generative Engine Optimization)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog`,
    name: "Blog · Association Partage",
    description:
      "Récits de terrain, méthodes et regards depuis Orléans et le Haut-Atlas.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "NGO",
      name: SITE_NAME,
      url: SITE_URL,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.published,
      dateModified: p.updated ?? p.published,
      url: `${SITE_URL}/blog/${p.slug}`,
      author: {
        "@type": "Organization",
        name: p.author ?? SITE_NAME,
      },
      keywords: p.tags.join(", "),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="bg-bridge-cream">
        <PageHero
          variant="bridge"
          eyebrow="Récits & méthodes"
          title={
            <>
              Le <em className="italic text-atlas-saffron">blog</em>
            </>
          }
          subtitle="Articles de fond sur l'accessibilité au Maroc, le mécénat d'intérêt général, la coopérative berbère, et les méthodes que nous appliquons sur le terrain."
        />

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Blog" },
          ]}
        />

        {posts.length === 0 ? (
          <section className="max-w-3xl mx-auto px-5 md:px-6 py-20 text-center">
            <p className="font-serif text-2xl text-bridge-ink/70 italic">
              Les premiers articles arrivent bientôt.
            </p>
          </section>
        ) : (
          <section className="max-w-5xl mx-auto px-5 md:px-6 py-12 md:py-20">
            <ul className="space-y-12 md:space-y-16">
              {posts.map((post, i) => (
                <li
                  key={post.slug}
                  className="group border-b border-loire-stone/40 pb-12 md:pb-16 last:border-0"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
                  >
                    {/* Métadonnées — colonne gauche */}
                    <div className="lg:col-span-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.3em] text-atlas-clay font-sans font-medium">
                        {CATEGORY_LABELS[post.category]}
                      </p>
                      <p className="mt-2 text-xs text-bridge-ink/55 font-sans">
                        <time dateTime={post.published}>
                          {formatDate(post.published)}
                        </time>
                        <span className="mx-2" aria-hidden="true">·</span>
                        <span>{post.readingTime} min de lecture</span>
                      </p>
                    </div>

                    {/* Titre + description — colonne droite */}
                    <div className="lg:col-span-9">
                      <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-bridge-ink leading-[1.1] font-light tracking-tight group-hover:text-atlas-clay transition-colors duration-500">
                        {post.title}
                      </h2>
                      <p className="mt-4 text-base md:text-lg text-bridge-ink/70 leading-relaxed font-light max-w-[60ch]">
                        {post.description}
                      </p>
                      <span className="inline-flex items-baseline gap-2 mt-5 text-xs uppercase tracking-[0.2em] text-atlas-clay font-sans font-medium group-hover:gap-3 transition-all duration-500">
                        Lire l'article
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Lien RSS */}
        <section className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16 text-center">
          <p className="text-[0.6rem] uppercase tracking-[0.35em] text-bridge-ink/45 font-sans">
            S'abonner
          </p>
          <a
            href="/feed.xml"
            className="inline-flex items-baseline gap-2 mt-3 font-serif italic text-lg md:text-xl text-bridge-ink hover:text-atlas-saffron transition-colors"
          >
            Flux RSS
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
