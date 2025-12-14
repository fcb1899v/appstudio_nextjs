# Nakajima Masao App Studio Next.js Website

A modern Next.js-based website providing landing pages for multiple educational and utility mobile applications. Built with TypeScript, Material-UI, and Firebase hosting.

## 🚀 Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Modules, Material-UI
- **UI Components**: Material-UI (@mui/material, @mui/icons-material)
- **Analytics**: Google Analytics 4
- **Advertising**: Google AdSense
- **Deployment**: Firebase Hosting
- **Cookie Management**: Cookiebot
- **SEO**: Structured Data, Sitemap, Robots.txt
- **Security**: reCAPTCHA v3 integration

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

- Node.js 18 or higher
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

# Environment
NODE_ENV=development
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── api/            # API routes
│   │   ├── recaptcha/  # reCAPTCHA verification
│   │   └── submit-form/ # Contact form submission
│   └── [app]/          # App-specific pages
│       ├── page.tsx    # English pages
│       └── ja/page.tsx # Japanese pages
├── components/         # React components
│   ├── Common/         # Shared components
│   │   ├── AnalyticsTracker.tsx
│   │   ├── CookieConsentBanner.tsx
│   │   ├── MyAppsBadges.tsx
│   │   ├── MyAppsFeatures.tsx
│   │   ├── MyAppsHeader.tsx
│   │   ├── MyAppsTop.tsx
│   │   ├── MyFooter.tsx
│   │   ├── MyHead.tsx
│   │   ├── MySplash.tsx
│   │   ├── StructuredData.tsx
│   │   ├── YoutubeMovie.tsx
│   │   ├── EnhancedFeatures.tsx
│   │   ├── UserReviews.tsx
│   │   ├── AppScreenshots.tsx
│   │   ├── DownloadNow.tsx
│   │   ├── ElevatorBigNews.tsx
│   │   ├── MyAppsHowtoUse.tsx
│   │   ├── WordWebApp.tsx
│   │   └── firebaseConfig.ts
│   └── Home/           # Home page components
│       ├── ContactBody.tsx
│       ├── HomeAppsList.tsx
│       ├── PrivacyPolicy.tsx
│       └── TermsContents.tsx
├── hooks/              # Custom hooks
│   ├── useAnalytics.ts
│   ├── useCookieConsent.ts
│   ├── useGeoLocation.ts
│   ├── usePageTracking.ts
│   └── useWindowSize.ts
├── utils/              # Utility functions
│   ├── analytics.ts
│   ├── constants.ts
│   └── functions.ts
└── types/              # TypeScript type definitions
    ├── app.ts
    ├── common.ts
    └── env.d.ts
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

### Firebase Hosting

```bash
# Build the project
npm run build

# Deploy to Firebase
npm run deploy
```

### Other Platforms

- **Vercel**: `vercel --prod`
- **Netlify**: Deploy `out/` directory after `npm run build`
- **GitHub Pages**: Deploy static files from `out/` directory

## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Deploy to Firebase
npm run deploy

# Optimize images
npm run optimize-images

# Build with image optimization
npm run build-optimized
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

- **reCAPTCHA v3 Integration**: Advanced form spam protection
- **Environment Variable Protection**: Sensitive data securely managed
- **GDPR Compliance**: Comprehensive user privacy protection
- **Secure API Endpoints**: Protected form submission with validation
- **No Debug Information**: Production-ready code with security best practices
- **Content Security Policy**: XSS protection and secure resource loading

## 📈 Performance Features

- **Static Export**: Optimized for maximum speed and SEO
- **Image Optimization**: Automatic image compression and WebP conversion
- **Lazy Loading**: Components and images loaded on demand
- **SEO Optimization**: Meta tags, structured data, and search engine optimization
- **Analytics Integration**: Real-time performance monitoring
- **Core Web Vitals**: Optimized for Google's performance metrics

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
- **Next.js** (MIT)
- **React** (MIT)
- **React DOM** (MIT)
- **TypeScript** (Apache-2.0)
- **Firebase** (Apache-2.0)
- **Firebase Functions** (MIT)
- **Firebase Tools** (MIT)
- **React Firebase Hooks** (Apache-2.0)

**UI & Styling:**
- **Material-UI (@mui/material)** (MIT)
- **Material-UI Icons (@mui/icons-material)** (MIT)
- **React Icons** (MIT)
- **Sass** (MIT)

**Development Tools:**
- **ESLint** (MIT)
- **ESLint Config Next** (MIT)
- **TypeScript ESLint Parser** (MIT)
- **TypeScript ESLint Plugin** (MIT)

**HTTP & API:**
- **Axios** (MIT)
- **CORS** (MIT)

**Authentication & Security:**
- **React Google reCAPTCHA v3** (MIT)

**Routing & Navigation:**
- **React Router DOM** (MIT)

**Media & Content:**
- **React YouTube** (MIT)

**Image Processing:**
- **Sharp** (Apache-2.0)

**Language & Localization:**
- **Accept Language** (MIT)

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

### Latest Updates
- Migrated to Next.js 16 with React 19 automatic JSX runtime
- Updated all dependencies to latest versions
- Enhanced security with reCAPTCHA v3
- Improved performance with static export
- Added comprehensive GDPR compliance
- Integrated Google Analytics 4
- Optimized for Core Web Vitals
