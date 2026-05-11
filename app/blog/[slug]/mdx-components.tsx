import Link from "next/link";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Mapping des éléments HTML générés par MDX vers nos composants stylés.
 *
 * Conventions :
 *  - h2/h3 obtiennent un id auto-générable (pour ancrer + table des matières
 *    future). Pour l'instant on les laisse sans, on ajoutera rehype-slug
 *    plus tard si besoin.
 *  - Les liens internes (/...) passent par <Link> Next pour la navigation
 *    client. Les liens externes ouvrent dans un nouvel onglet avec
 *    rel="noopener".
 *  - Les images sont en next/image pour l'optimisation. Si on a une URL
 *    distante, on bascule sur <img> standard.
 */
function CustomLink({
  href,
  children,
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  if (!href) return <a {...rest}>{children}</a>;

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link
        href={href}
        className="text-atlas-clay underline decoration-atlas-clay/40 underline-offset-4 hover:decoration-atlas-clay transition-colors"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-atlas-clay underline decoration-atlas-clay/40 underline-offset-4 hover:decoration-atlas-clay transition-colors"
      {...rest}
    >
      {children}
    </a>
  );
}

function CustomImage({
  src,
  alt,
  width,
  height,
  ...rest
}: ComponentPropsWithoutRef<"img">) {
  if (!src) return null;

  // Bypass next/image pour URLs externes ou si dimensions manquantes
  if (typeof src !== "string" || !src.startsWith("/")) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src as string}
        alt={alt ?? ""}
        className="rounded-xl my-8 mx-auto"
        {...rest}
      />
    );
  }

  return (
    <figure className="my-10">
      <Image
        src={src}
        alt={alt ?? ""}
        width={typeof width === "number" ? width : 1200}
        height={typeof height === "number" ? height : 800}
        className="rounded-xl mx-auto"
        sizes="(max-width: 768px) 100vw, 768px"
      />
      {alt && (
        <figcaption className="mt-3 text-center text-xs text-bridge-ink/55 italic font-serif">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Composants exposés à l'auteur dans les fichiers .mdx.
 * L'auteur peut écrire <FAQ> ... </FAQ> ou utiliser markdown standard.
 */
function FAQ({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="not-prose my-12 rounded-2xl bg-loire-pale/30 border border-loire-stone/40 p-6 md:p-8"
      aria-label="Questions fréquentes"
    >
      <p className="text-[0.6rem] uppercase tracking-[0.35em] text-atlas-clay font-sans font-medium mb-4">
        Questions fréquentes
      </p>
      <dl className="space-y-5">{children}</dl>
    </section>
  );
}

function FAQItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-serif text-lg md:text-xl text-bridge-ink mb-2 leading-tight">
        {question}
      </dt>
      <dd className="text-sm md:text-base text-bridge-ink/75 leading-relaxed font-light">
        {children}
      </dd>
    </div>
  );
}

function Callout({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: "info" | "warn" | "quote";
}) {
  const styles = {
    info: "border-loire-deep bg-loire-pale/40 text-bridge-ink",
    warn: "border-atlas-terracotta bg-atlas-cream/40 text-bridge-ink",
    quote: "border-atlas-saffron bg-atlas-cream/30 text-bridge-ink italic",
  };
  return (
    <aside
      className={`not-prose my-8 rounded-xl border-l-4 p-5 md:p-6 ${styles[variant]}`}
    >
      {children}
    </aside>
  );
}

export const mdxComponents = {
  a: CustomLink,
  img: CustomImage,
  FAQ,
  FAQItem,
  Callout,
} as const;
