# Nakajima Masao App Studio Next.js Website

A modern Next.js-based website providing landing pages for multiple educational and utility mobile applications. Built with TypeScript, Material-UI, and Firebase hosting.

## 🚀 Tech Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript 5.8.3
- **React**: React 19.1.0 with automatic JSX runtime
- **Styling**: Tailwind CSS 4.1.11, CSS Modules, Material-UI 7.1.1
- **UI Components**: Material-UI (@mui/material, @mui/icons-material)
- **Analytics**: Google Analytics 4
- **Advertising**: Google AdSense
- **Deployment**: Firebase Hosting (Firebase 12.0.0)
- **Cookie Management**: Cookiebot
- **SEO**: Structured Data, Sitemap, Robots.txt
- **Security**: reCAPTCHA v3 integration
- **Build**: Static export with optimized images

## 📋 Features

- **Multi-language Support**: Japanese and English switching with automatic language detection
- **Responsive Design**: Mobile-first design, tablet, and desktop compatible
- **GDPR Compliance**: Comprehensive cookie consent management system
- **Analytics**: Detailed user behavior tracking and performance monitoring
- **SEO Optimization**: Meta tags, structured data, and search engine optimization
- **Performance Optimization**: Static export, image optimization, and lazy loading
- **Form Handling**: Contact form with reCAPTCHA v3 spam protection
- **API Integration**: Secure form submission endpoints
- **Accessibility**: WCAG compliant design and navigation

## 🛠️ Setup

### Prerequisites

- Node.js 18 or higher (recommended: Node.js 20+)
- npm or yarn
- Firebase CLI (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/fcb1899v/appstudio_nextjs.git
cd appstudio_next

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🔧 Environment Variables

Create a `.env.local` file in the project root and set the following variables:

```bash
# Google Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE=ca-pub-XXXXXXXXXX

# Cookiebot
NEXT_PUBLIC_COOKIEBOT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# reCAPTCHA (for contact form)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key

# reCAPTCHA secret key (server-side only; do not use NEXT_PUBLIC_ prefix)
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Google Form (contact form submission)
NEXT_PUBLIC_GOOGLE_FORM=your_google_form_id

# Environment
NODE_ENV=development
```

## 📁 Project Structure

```
appstudio_next/
├── config/                     # Root config (Next.js only; PostCSS/Tailwind stay at root)
│   ├── next.config.ts          # Next.js configuration
│   └── README.md
├── scripts/                    # Build and test scripts (TypeScript, run with tsx)
│   ├── optimize-images.ts      # Image optimization after build
│   └── test-recaptcha-api.ts   # reCAPTCHA API test (run with dev server up)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── ja/page.tsx         # Japanese home
│   │   ├── api/                # API routes
│   │   │   ├── recaptcha/      # reCAPTCHA verification
│   │   │   └── submit-form/    # Contact form submission (with input validation)
│   │   ├── [appSlug]/          # Dynamic app pages (e.g. /elevator, /phonics)
│   │   │   ├── page.tsx        # English app pages
│   │   │   └── ja/page.tsx     # Japanese app pages
│   │   ├── contact/            # Contact page (en/ja)
│   │   └── terms/              # Terms page (en/ja)
│   ├── components/
│   │   ├── Common/             # Shared components
│   │   │   ├── AppPage.tsx     # Shared app showcase layout
│   │   │   ├── AnalyticsTracker.tsx
│   │   │   ├── AppScreenshots.tsx
│   │   │   ├── CookieConsentBanner.tsx
│   │   │   ├── DownloadNow.tsx
│   │   │   ├── ElevatorBigNews.tsx
│   │   │   ├── EnhancedFeatures.tsx
│   │   │   ├── MyAppsBadges.tsx
│   │   │   ├── MyAppsFeatures.tsx
│   │   │   ├── MyAppsHeader.tsx
│   │   │   ├── MyAppsHowtoUse.tsx
│   │   │   ├── MyAppsTop.tsx
│   │   │   ├── MyFooter.tsx
│   │   │   ├── MyHead.tsx
│   │   │   ├── MySplash.tsx
│   │   │   ├── StructuredData.tsx
│   │   │   ├── UserReviews.tsx
│   │   │   ├── WordWebApp.tsx
│   │   │   └── YoutubeMovie.tsx
│   │   └── Home/               # Home page and related components
│   │       ├── ContactBody.tsx
│   │       ├── HomeAppsList.tsx
│   │       ├── PrivacyPolicy.tsx
│   │       └── TermsContents.tsx
│   ├── config/                 # App config (e.g. Firebase)
│   │   └── firebaseConfig.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAnalytics.ts
│   │   ├── useCookieConsent.ts
│   │   ├── useGeoLocation.ts
│   │   ├── usePageTracking.ts
│   │   └── useWindowSize.ts
│   ├── lib/                    # Shared lib (e.g. fonts)
│   │   └── fonts.ts            # Next.js local font setup
│   ├── types/                  # TypeScript type definitions
│   │   ├── app.ts              # App and common component types
│   │   ├── env.d.ts            # Environment variable types
│   │   └── global.d.ts         # Global declarations (Window, etc.)
│   └── utils/                  # Utility functions
│       ├── analytics.ts
│       ├── constants.ts
│       └── functions.ts
├── public/                     # Static assets
│   ├── images/                 # App images and assets
│   ├── fonts/                  # Font files (.ttf, .otf)
│   └── legacy/                 # Legacy files (excluded from build)
├── postcss.config.ts           # PostCSS (at root for tooling)
├── tailwind.config.ts          # Tailwind CSS (at root for tooling)
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🍪 GDPR Compliance

This project implements a comprehensive GDPR-compliant cookie consent management system:

- **Cookie Consent Banner**: User-friendly consent interface with detailed options
- **Detailed Control**: Individual control for necessary, analytics, and marketing cookies
- **Google Analytics**: Loaded only with explicit analytics consent
- **AdSense**: Loaded only with explicit marketing consent
- **Cookie Management**: Automatic cleanup on consent withdrawal
- **Privacy Policy**: Clear information about data usage

### Cookie Types

1. **Necessary Cookies**: Always enabled, required for basic functionality
2. **Analytics Cookies**: Google Analytics tracking (explicit consent required)
3. **Marketing Cookies**: AdSense and advertising (explicit consent required)

## 📊 Analytics

Comprehensive user behavior tracking implementation:

- **Page View Tracking**: Automatic tracking of all page visits
- **Scroll Depth Measurement**: User engagement analysis
- **Time on Page Measurement**: Content effectiveness metrics
- **Menu Interaction Tracking**: Navigation pattern analysis
- **App Download Tracking**: Conversion rate monitoring
- **External Link Click Tracking**: Outbound link analytics
- **Performance Monitoring**: Core Web Vitals tracking

## 🚀 Deployment

### Firebase Hosting (Recommended)

```bash
# Build the project (creates static files in 'out/' directory)
npm run build

# Deploy to Firebase Hosting
npm run deploy
# or
firebase deploy
```

The project is configured for static export, generating optimized static files in the `out/` directory.

### Other Platforms

- **Vercel**: 
  ```bash
  vercel --prod
  ```
  Note: Static export is configured in `config/next.config.ts` (`output: 'export'`).

- **Netlify**: 
  - Deploy `out/` directory after `npm run build`
  - Or use Netlify's Next.js integration

- **GitHub Pages**: 
  - Deploy static files from `out/` directory
  - Configure GitHub Actions for automated deployment

- **Any Static Hosting**: 
  - The `out/` directory contains all static files ready for deployment

## 🧪 Development Commands

```bash
# Start development server (uses config/next.config.ts)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Deploy to Firebase
npm run deploy

# Optimize images (run after build; processes out/images)
npm run optimize-images

# Build then optimize images
npm run build-optimized

# Test reCAPTCHA API (run with dev server up in another terminal)
npm run test:recaptcha
```

## 📱 Supported Apps

- **Japanese**: Japanese language learning app with vocabulary and pronunciation
- **Phonics**: English pronunciation learning app with interactive lessons
- **Allowance**: Allowance management app for children
- **Crossing**: Traffic signal waiting game for road safety education
- **Signal**: Traffic signal simulator for learning traffic rules
- **Toilet**: Toilet training app for young children
- **Transit**: Public transportation app for route planning
- **Elevator**: Elevator simulator for building navigation
- **Elevator Neo**: Enhanced elevator simulator with advanced features

## 🔒 Security Features

- **reCAPTCHA v3 Integration**: Advanced form spam protection with invisible verification
- **Environment Variable Protection**: Sensitive data (e.g. `RECAPTCHA_SECRET_KEY`) in server-only env vars; no `NEXT_PUBLIC_` for secrets
- **GDPR Compliance**: Comprehensive user privacy protection with cookie consent
- **Secure API Endpoints**: Protected form submission with server-side validation
- **TypeScript Strict Mode**: Enhanced type safety to prevent runtime errors
- **No Debug Information**: Production-ready code with security best practices
- **Content Security Policy**: XSS protection and secure resource loading (configured on server)
- **HTTPS Only**: All external resources loaded over HTTPS
- **Input Validation**: Client and server-side form validation (name, email, app allowlist, message length limits)
- **Cookie Security**: Secure cookie handling with consent management

## 📈 Performance Features

- **Static Export**: Fully static site generation for maximum speed and SEO
- **Image Optimization**: Automatic image compression with Sharp, WebP/AVIF support
- **Lazy Loading**: Components and images loaded on demand
- **Code Splitting**: Automatic code splitting with Next.js App Router
- **Package Optimization**: Tree-shaking and package import optimization
- **SEO Optimization**: Meta tags, structured data, sitemap, and robots.txt
- **Analytics Integration**: Real-time performance monitoring with GA4
- **Core Web Vitals**: Optimized for Google's performance metrics (LCP, FID, CLS)
- **Font Optimization**: Custom fonts with optimized loading
- **Bundle Size Optimization**: Minimal JavaScript bundle with optimized imports

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Ensure responsive design for all components
- Maintain accessibility standards
- Add appropriate tests for new features
- Update documentation for any changes

## 📄 License

This project is licensed under the MIT License.

### 📦 Package Licenses

**Core Dependencies:**
- **Next.js 16.0.10** (MIT)
- **React 19.1.0** (MIT)
- **React DOM 19.1.0** (MIT)
- **TypeScript 5.8.3** (Apache-2.0)
- **Firebase 12.0.0** (Apache-2.0)
- **Firebase Functions 7.0.1** (MIT)
- **Firebase Tools 15.0.0** (MIT)
- **React Firebase Hooks 5.1.1** (Apache-2.0)

**UI & Styling:**
- **Material-UI (@mui/material) 7.1.1** (MIT)
- **Material-UI Icons (@mui/icons-material) 7.1.1** (MIT)
- **React Icons 5.5.0** (MIT)
- **Sass 1.89.2** (MIT)
- **Tailwind CSS 4.1.11** (MIT)
- **Emotion React 11.14.0** (MIT)
- **Emotion Styled 11.14.0** (MIT)

**Development Tools:**
- **ESLint 9.28.0** (MIT)
- **ESLint Config Next 16.0.10** (MIT)
- **TypeScript ESLint Parser 8.34.0** (MIT)
- **TypeScript ESLint Plugin 8.34.0** (MIT)
- **PostCSS 8.5.6** (MIT)
- **Autoprefixer 10.4.21** (MIT)

**HTTP & API:**
- **Axios 1.9.0** (MIT)
- **CORS 2.8.5** (MIT)

**Authentication & Security:**
- **React Google reCAPTCHA v3 1.11.0** (MIT)

**Routing & Navigation:**
- **React Router DOM 7.6.2** (MIT)

**Media & Content:**
- **React YouTube 10.1.0** (MIT)

**Image Processing:**
- **Sharp 0.34.2** (Apache-2.0)

**Language & Localization:**
- **Accept Language 3.0.20** (MIT)

**Note**: This project uses various dependencies with different licenses. The main project is MIT licensed, but dependencies include:
- MIT (majority)
- Apache-2.0 (Firebase, TypeScript, Sharp, React Firebase Hooks)

Please review the individual dependency licenses in `package-lock.json` for complete license information.

## 📞 Support

For issues and questions, please use [GitHub Issues](https://github.com/fcb1899v/appstudio_nextjs/issues).

## 🔗 Links

- **GitHub Repository**: [https://github.com/fcb1899v/appstudio_nextjs](https://github.com/fcb1899v/appstudio_nextjs)
- **Predecessor Repository**: [https://github.com/fcb1899v/nakajimamasao-appstudio](https://github.com/fcb1899v/nakajimamasao-appstudio) (legacy)

## 📝 Changelog

### Version 0.1.9 (Latest)
- **Next.js 16.0.10**: Migrated to Next.js 16 with App Router
- **React 19.1.0**: Upgraded to React 19 with automatic JSX runtime
- **TypeScript 5.8.3**: Latest TypeScript with improved type safety
- **Material-UI 7.1.1**: Updated to latest Material-UI version
- **Firebase 12.0.0**: Updated Firebase SDK to latest version
- **Tailwind CSS 4.1.11**: Upgraded to Tailwind CSS 4
- **Config**: Next.js config moved to `config/next.config.ts`; PostCSS and Tailwind configs remain at project root
- **App routes**: Dynamic `[appSlug]` routes with `generateStaticParams` for static export; shared `AppPage` component
- **Security**: reCAPTCHA secret key moved to server-only env var (`RECAPTCHA_SECRET_KEY`); form submission API input validation (length, email format, app allowlist)
- **Structure**: `src/config/` (Firebase), `src/lib/fonts.ts` (fonts), `src/types/` (app + global + env); types consolidated into `app.ts`; scripts in TypeScript (`tsx`)
- **Testing**: reCAPTCHA API test script (`npm run test:recaptcha`); test-recaptcha page removed
- Enhanced performance with static export optimization
- Added comprehensive GDPR compliance with cookie consent management
- Integrated Google Analytics 4 with detailed tracking
- Optimized for Core Web Vitals and SEO
- Added custom React hooks for analytics and cookie management
- Legacy files organized and excluded from build
