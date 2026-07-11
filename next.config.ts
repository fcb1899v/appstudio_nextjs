import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['192.168.68.100'],
  // Expose env to client (no NEXT_PUBLIC_ prefix in .env.local)
  env: {
    GOOGLE_FORM_ID: process.env.GOOGLE_FORM_ID,
    RECAPTCHA_V3_SITE_KEY: process.env.RECAPTCHA_V3_SITE_KEY,
    FAMILY_MOVIE_DRIVE_FILE_ID: process.env.FAMILY_MOVIE_DRIVE_FILE_ID,
  },
  // /familymovie noindex headers are configured in firebase.json via scripts/sync-familymovie-redirect.mjs
  // (headers in next.config do not work with output: 'export')
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      include: /public\/legacy/,
      use: 'ignore-loader',
    });
    return config;
  },
  turbopack: {},
};

export default nextConfig;
