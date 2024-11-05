import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: false,
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
