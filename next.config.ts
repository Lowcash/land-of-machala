import type { NextConfig } from 'next'

import bundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  typedRoutes: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ]
  },
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
