/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true, // 画像最適化APIを無効にする
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}
 
module.exports = nextConfig
