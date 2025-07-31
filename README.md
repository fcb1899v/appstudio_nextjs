# Nakajima Masao App Studio Next.js Website

A Next.js-based website providing landing pages for multiple mobile applications.

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.5
- **Language**: TypeScript 5.8.3
- **Styling**: CSS Modules, Material-UI
- **UI Components**: Material-UI (@mui/material 7.2.0, @mui/icons-material 7.2.0)
- **Analytics**: Google Analytics 4
- **Advertising**: Google AdSense
- **Deployment**: Firebase Hosting
- **Cookie Management**: Cookiebot
- **SEO**: Structured Data, Sitemap, Robots.txt

## 📋 Features

- **Multi-language Support**: Japanese and English switching
- **Responsive Design**: Mobile, tablet, and desktop compatible
- **GDPR Compliance**: Cookie consent management system
- **Analytics**: Detailed user behavior tracking
- **SEO Optimization**: Meta tags and structured data support
- **Performance Optimization**: Static export and image optimization
- **Form Handling**: Contact form with reCAPTCHA integration
- **API Integration**: Submit form API endpoints

## 🛠️ Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
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

This project implements a GDPR-compliant cookie consent management system:

- **Cookie Consent Banner**: Users can select cookie types
- **Detailed Control**: Individual control for necessary, analytics, and marketing cookies
- **Google Analytics**: Loaded only with analytics consent
- **AdSense**: Loaded only with marketing consent
- **Cookie Management**: Automatic cleanup on consent withdrawal

### Cookie Types

1. **Necessary Cookies**: Always enabled, required for basic functionality
2. **Analytics Cookies**: Google Analytics tracking (consent required)
3. **Marketing Cookies**: AdSense and advertising (consent required)

## 📊 Analytics

Detailed user behavior tracking implementation:

- Page view tracking
- Scroll depth measurement
- Time on page measurement
- Menu interaction tracking
- App download tracking
- External link click tracking

## 🚀 Deployment

### Firebase Hosting

```bash
# Build
npm run build

# Deploy
npm run deploy
```

### Other Platforms

- **Vercel**: `vercel --prod`
- **Netlify**: Deploy `out/` directory after `npm run build`

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
```

## 📱 Supported Apps

- **Japanese**: Japanese language learning app
- **Phonics**: English pronunciation learning app
- **Allowance**: Allowance management app
- **Crossing**: Traffic signal waiting game
- **Signal**: Traffic signal simulator
- **Toilet**: Toilet training app
- **Transit**: Public transportation app
- **Elevator**: Elevator simulator
- **Elevator Neo**: Enhanced elevator simulator

## 🔒 Security Features

- **reCAPTCHA Integration**: Form spam protection
- **Environment Variable Protection**: Sensitive data not exposed
- **GDPR Compliance**: User privacy protection
- **Secure API Endpoints**: Protected form submission
- **No Debug Information**: Production-ready code

## 📈 Performance Features

- **Static Export**: Optimized for speed
- **Image Optimization**: Automatic image compression
- **Lazy Loading**: Components loaded on demand
- **SEO Optimization**: Meta tags and structured data
- **Analytics Integration**: Performance monitoring

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

### 📦 Package Licenses

**Core Dependencies:**
- **Next.js**: 15.4.5 (MIT)
- **React**: 19.1.1 (MIT)
- **React DOM**: 19.1.1 (MIT)
- **TypeScript**: 5.8.3 (Apache-2.0)
- **Firebase**: 12.0.0 (Apache-2.0)
- **Firebase Functions**: 6.4.0 (MIT)
- **Firebase Tools**: 14.11.2 (MIT)
- **React Firebase Hooks**: 5.1.1 (Apache-2.0)

**UI & Styling:**
- **Material-UI (@mui/material)**: 7.2.0 (MIT)
- **Material-UI Icons (@mui/icons-material)**: 7.2.0 (MIT)
- **React Icons**: 5.5.0 (MIT)
- **Sass**: 1.89.2 (MIT)

**Development Tools:**
- **ESLint**: 9.32.0 (MIT)
- **ESLint Config Next**: 15.4.5 (MIT)
- **TypeScript ESLint Parser**: 8.38.0 (MIT)
- **TypeScript ESLint Plugin**: 8.38.0 (MIT)

**HTTP & API:**
- **Axios**: 1.11.0 (MIT)
- **CORS**: 2.8.5 (MIT)

**Authentication & Security:**
- **React Google reCAPTCHA v3**: 1.11.0 (MIT)

**Routing & Navigation:**
- **React Router DOM**: 7.7.1 (MIT)

**Media & Content:**
- **React YouTube**: 10.1.0 (MIT)

**Image Processing:**
- **Sharp**: 0.34.3 (Apache-2.0)

**Language & Localization:**
- **Accept Language**: 3.0.20 (MIT)

**Note**: This project uses various dependencies with different licenses. The main project is MIT licensed, but dependencies include:
- MIT (majority)
- Apache-2.0 (Firebase, TypeScript, Sharp, React Firebase Hooks)

Please review the individual dependency licenses in `package-lock.json` for complete license information.

## 📞 Support

For issues and questions, please use [Issues](https://github.com/your-repo/issues).

## 🔗 Links

- **Live Site**: [https://your-domain.com](https://your-domain.com)
- **GitHub Repository**: [https://github.com/your-repo](https://github.com/your-repo)
- **Documentation**: [https://your-docs.com](https://your-docs.com)
