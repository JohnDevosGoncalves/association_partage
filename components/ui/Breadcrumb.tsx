import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  trail: Crumb[];
};

/**
 * Fil d'Ariane accessible. Le dernier élément est le titre courant
 * (sans href). Émet aussi du JSON-LD BreadcrumbList pour Google.
 */
export function Breadcrumb({ trail }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: c.href } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Fil d'Ariane"
        className="max-w-5xl mx-auto px-5 md:px-6 py-6"
      >
        <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans text-bridge-ink/60">
          {trail.map((c, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={i} className="flex items-center gap-2">
                {c.href && !isLast ? (
                  <Link
                    href={c.href}
                    className="hover:text-atlas-clay transition-colors"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={isLast ? "text-atlas-clay" : ""}
                  >
                    {c.label}
                  </span>
                )}
                {!isLast && <span className="opacity-50">·</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
