import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Expose env to client (no NEXT_PUBLIC_ prefix in .env)
  env: {
    GOOGLE_FORM_ID: process.env.GOOGLE_FORM_ID,
    RECAPTCHA_V3_SITE_KEY: process.env.RECAPTCHA_V3_SITE_KEY,
    RECAPTCHA_V2_SITE_KEY: process.env.RECAPTCHA_V2_SITE_KEY,
  },
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
