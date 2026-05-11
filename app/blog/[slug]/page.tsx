import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { CATEGORY_LABELS } from "@/lib/blog/types";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { mdxComponents } from "./mdx-components";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} · Blog`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      siteName: SITE_NAME,
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      authors: [post.author ?? SITE_NAME],
      tags: post.tags,
      images: post.hero
        ? [
            {
              url: `${SITE_URL}${post.hero}`,
              alt: post.heroAlt ?? post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.hero ? [`${SITE_URL}${post.hero}`] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Articles connexes — 3 plus récents hors lui-même, de préférence même catégorie
  const all = await getAllPosts();
  const related = [
    ...all.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...all.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  const url = `${SITE_URL}/blog/${post.slug}`;

  // JSON-LD BlogPosting — boost majeur pour SEO + GEO (réponses IA)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    description: post.description,
    abstract: post.tldr,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: post.author ?? SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "NGO",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/brand/logo.png`,
      },
    },
    keywords: post.tags.join(", "),
    articleSection: CATEGORY_LABELS[post.category],
    inLanguage: "fr-FR",
    image: post.hero
      ? [`${SITE_URL}${post.hero}`]
      : [`${SITE_URL}/opengraph-image`],
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
        {/* Hero article — éditorial */}
        <header className="relative pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-loire-pale/30">
          <div className="relative max-w-3xl mx-auto">
            <p className="text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium">
              {CATEGORY_LABELS[post.category]}
            </p>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-bridge-ink mt-4 leading-[1.05] font-light tracking-tight">
              {post.title}
            </h1>
            <p className="mt-5 md:mt-7 text-base md:text-lg text-bridge-ink/70 leading-relaxed font-light">
              {post.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-bridge-ink/55 font-sans">
              <span>{post.author ?? SITE_NAME}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min de lecture</span>
            </div>
          </div>
        </header>

        {/* Hero image — affiché uniquement si défini dans le frontmatter */}
        {post.hero && (
          <figure className="relative max-w-5xl mx-auto px-5 md:px-6 -mt-2 md:-mt-4">
            <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)]">
              <Image
                src={post.hero}
                alt={post.heroAlt ?? post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                quality={85}
              />
            </div>
            {post.heroAlt && (
              <figcaption className="mt-3 text-center text-xs text-bridge-ink/55 italic font-serif px-4">
                {post.heroAlt}
              </figcaption>
            )}
          </figure>
        )}

        <Breadcrumb
          trail={[
            { label: "Accueil", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        {/* TLDR — boost AEO (réponse directe pour IA) */}
        <aside className="max-w-3xl mx-auto px-5 md:px-6 mt-8 md:mt-12">
          <div className="rounded-2xl border-l-4 border-atlas-saffron bg-atlas-cream/40 p-5 md:p-6">
            <p className="text-[0.55rem] uppercase tracking-[0.35em] text-atlas-clay font-sans font-medium mb-2">
              En bref
            </p>
            <p className="font-serif text-lg md:text-xl text-bridge-ink leading-relaxed italic">
              {post.tldr}
            </p>
          </div>
        </aside>

        {/* Corps de l'article — MDX */}
        <article className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16 prose-blog">
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>

        {/* Footer article — tags + retour blog */}
        <section className="max-w-3xl mx-auto px-5 md:px-6 pb-10 md:pb-16">
          <div className="border-t border-loire-stone/50 pt-8">
            <p className="text-[0.55rem] uppercase tracking-[0.35em] text-bridge-ink/55 font-sans font-medium mb-3">
              Mots-clés
            </p>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="px-3 py-1 rounded-full bg-bridge-ink/5 text-xs text-bridge-ink/70 font-sans"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className="inline-flex items-baseline gap-2 mt-8 text-xs uppercase tracking-[0.25em] text-atlas-clay font-sans font-medium hover:gap-3 transition-all duration-500"
            >
              <span aria-hidden="true">←</span>
              Retour au blog
            </Link>
          </div>
        </section>

        {related.length > 0 && (
          <RelatedLinks
            items={related.map((p) => ({
              href: `/blog/${p.slug}`,
              eyebrow: CATEGORY_LABELS[p.category],
              title: p.title,
              description: p.description,
            }))}
          />
        )}
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
