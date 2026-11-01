import type { NextConfig } from 'next';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

// The album link stays outside the repository; a deploy must carry it, any other build may leave the page unconfigured.
function readFamilyMovieUrl(): string {
  const path = process.env.FAMILY_MOVIE_URL_FILE ?? join(homedir(), 'key', 'web', 'family_movie_url');
  let url = '';
  try { url = readFileSync(path, 'utf8').trim(); } catch { url = ''; }
  if (!url && process.env.APPSTUDIO_DEPLOY === '1') {
    throw new Error(`Deploy: cannot read the family movie link from ${path}.`);
  }
  return url;
}

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['192.168.68.100'],
  // Expose build-time values to the client; the family movie link is read from outside the repository.
  env: {
    GOOGLE_FORM_ID: process.env.GOOGLE_FORM_ID,
    RECAPTCHA_V3_SITE_KEY: process.env.RECAPTCHA_V3_SITE_KEY,
    FAMILY_MOVIE_URL: readFamilyMovieUrl(),
  },
  // /familymovie noindex headers are configured in firebase.json via scripts/sync-familymovie-redirect.mjs.
  // Headers and redirects in next.config do not work with output: 'export'.
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
