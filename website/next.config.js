/** @type {import('next').NextConfig} */
const nextConfig = {
  // תמיכה ב-RTL
  i18n: {
    locales: ['he', 'en'],
    defaultLocale: 'he',
  },
  
  // אופטימיזציה לתמונות
  images: {
    domains: ['demo.com', 'download.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // הגדרות TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },

  // הגדרות ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Environment variables זמינים לצד לקוח
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
}

module.exports = nextConfig