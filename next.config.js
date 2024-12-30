/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.delivery'], // Allow images from Replicate
  },
  experimental: {
    optimizePackageImports: ['@headlessui/react', 'react-icons'],
  },
};

module.exports = nextConfig;
