import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
  devIndicators: false,
  images: {
    // Enable image optimization
    formats: ['image/avif', 'image/webp'],
    // Since all images are local, no need to configure remotePatterns
    // Image optimization is handled automatically for local images
    minimumCacheTTL: 60,
  },
}

export default nextConfig
