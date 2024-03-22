module.exports = {
  swcMinify: true,
  compress: false,
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    largePageDataBytes: 160 * 100000,
  }
}
