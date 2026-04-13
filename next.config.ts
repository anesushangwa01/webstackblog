import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from any external domain (WordPress, Gravatar, CDNs, etc.)
    // unoptimized=true bypasses the Next.js image proxy entirely so
    // no per-domain allowlist is needed — images load from their source URL directly.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
  },
};

export default nextConfig;
