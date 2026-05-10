import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { StarField } from "@/components/ui/StarField";
import { CustomCursor } from "@/components/ui/CustomCursor";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCALE,
  ORGANIZATION_INFO,
  SOCIAL_LINKS,
} from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "Non-profit",
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// JSON-LD : décrit l'association à Google et autres moteurs comme une entité
// structurée (Organization). Améliore la rich card et la knowledge panel.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: ORGANIZATION_INFO.legalName,
  alternateName: SITE_TAGLINE,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description: SITE_DESCRIPTION,
  foundingDate: ORGANIZATION_INFO.foundingDate,
  email: ORGANIZATION_INFO.email,
  telephone: ORGANIZATION_INFO.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: ORGANIZATION_INFO.addressLocality,
    addressCountry: ORGANIZATION_INFO.addressCountry,
  },
  areaServed: ORGANIZATION_INFO.areasServed.map((c) => ({
    "@type": "Country",
    name: c,
  })),
  sameAs: Object.values(SOCIAL_LINKS),
  contactPoint: {
    "@type": "ContactPoint",
    email: ORGANIZATION_INFO.email,
    contactType: "customer service",
    availableLanguage: ["French", "Arabic"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "fr-FR",
  description: SITE_DESCRIPTION,
};

// Évite le "flash" du mauvais thème : applique le thème sauvegardé
// dans localStorage avant que React n'hydrate la page.
const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('ap-theme');
    if (saved === 'night' || saved === 'day') {
      document.documentElement.dataset.theme = saved;
    } else {
      document.documentElement.dataset.theme = 'day';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      data-theme="day"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CustomCursor />
          <StarField />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
