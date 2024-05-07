import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: false,
  },
  reactStrictMode: true,
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'lh3.googleusercontent.com',
      'img.clerk.com',
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
};

export default withContentlayer(nextConfig);
