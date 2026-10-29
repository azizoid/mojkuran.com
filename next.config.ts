import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  poweredByHeader: false,
  reactStrictMode: true,
  devIndicators: false,
  images: {
    // Static export: local images shipped as-is
    unoptimized: true,
  },
}

export default nextConfig
