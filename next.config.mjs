import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'lh3.googleusercontent.com',
      'img.clerk.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
};

export default withContentlayer(nextConfig);
