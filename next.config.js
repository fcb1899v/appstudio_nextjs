/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  async headers() {
    // 開発環境ではCSPを無効化
    if (process.env.NODE_ENV === 'development') {
      return [];
    }
    
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.gstatic.com https://*.google.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://www.gstatic.com/recaptcha/releases/ https://www.gstatic.com/recaptcha/releases/*",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://*.google.com https://*.gstatic.com",
              "frame-src 'self' https://*.google.com https://*.gstatic.com https://www.google.com/recaptcha/",
            ].join('; '),
          },
        ],
      },
    ];
  },
};
 
module.exports = nextConfig;
