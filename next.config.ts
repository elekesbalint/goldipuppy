import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Do not block production builds on ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to complete even if there are type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
