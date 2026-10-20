import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignoriraj TypeScript greške pri buildanju
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignoriraj ESLint upozorenja pri buildanju
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;