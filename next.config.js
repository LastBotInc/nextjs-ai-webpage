const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@headlessui/react', 'react-icons'],
  },
};

module.exports = withNextIntl(nextConfig);
