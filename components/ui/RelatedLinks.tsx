import Link from "next/link";

export type RelatedItem = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
};

type RelatedLinksProps = {
  items: RelatedItem[];
};

/**
 * Bandeau de liens connexes en bas de page — invite à poursuivre la visite.
 * Important pour le maillage interne SEO.
 */
export function RelatedLinks({ items }: RelatedLinksProps) {
  return (
    <section
      className="py-16 md:py-24 px-5 md:px-6 bg-bridge-cream border-t border-loire-stone/40"
      aria-label="Pages connexes"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-atlas-clay font-sans font-medium text-center">
          Poursuivre la visite
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-bridge-ink text-center mt-3 mb-10 md:mb-12">
          À <em className="italic text-atlas-clay">explorer</em> ensuite
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group block h-full rounded-2xl border border-loire-stone/60 bg-bridge-cream hover:border-atlas-clay/50 hover:shadow-lg p-6 transition-all duration-500"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-atlas-ochre font-sans font-medium">
                  {item.eyebrow}
                </p>
                <h3 className="font-serif text-2xl text-bridge-ink mt-2 group-hover:text-atlas-clay transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-bridge-ink/70 leading-relaxed">
                  {item.description}
                </p>
                <span className="inline-block mt-4 text-xs uppercase tracking-[0.2em] text-atlas-clay font-sans group-hover:translate-x-1 transition-transform">
                  Découvrir →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
