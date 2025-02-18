import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
