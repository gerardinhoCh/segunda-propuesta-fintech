import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Netlify handles output via @netlify/plugin-nextjs */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
