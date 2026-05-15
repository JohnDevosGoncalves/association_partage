import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formats modernes pour le web (eco-conception : ~30 % plus léger qu'un JPG).
    formats: ["image/avif", "image/webp"],
    // Tailles générées automatiquement pour chaque image responsive.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Placeholders et démos en attendant les vraies photos.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  // Consolide tout le trafic sur le domaine canonique association-partage.fr
  // (sans www, sans aliases vercel.app) pour éviter le contenu dupliqué SEO.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.association-partage.fr" }],
        destination: "https://association-partage.fr/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?<sub>.*)\\.vercel\\.app",
          },
        ],
        destination: "https://association-partage.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
