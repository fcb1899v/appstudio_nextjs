# Nakajima Masao App Studio Next.js Website

A Next.js website that hosts the landing pages for the studio's mobile applications.
It is written in TypeScript, styled with Material-UI and Tailwind CSS, and deployed to Firebase Hosting as a static export.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router), built with `output: 'export'`
- **Language**: TypeScript 5
- **React**: React 19
- **Styling**: Tailwind CSS 4, Material-UI 9, Emotion, Sass
- **UI Components**: `@mui/material`, `@mui/icons-material`, `react-icons`
- **Analytics**: Google Analytics 4
- **Advertising**: Google AdSense
- **Hosting**: Firebase Hosting, with one Cloud Function for reCAPTCHA
- **Cookie Management**: Cookiebot, loaded through the GTM container in production, alongside the in-app consent banner
- **SEO**: Structured data, sitemap, robots.txt
- **Security**: reCAPTCHA v3
- **Images**: Sharp, used by the optimization script rather than by the Next.js image optimizer

## 📋 Features

- **Multi-language Support**: Japanese and English, with automatic language detection
- **Responsive Design**: Mobile-first layouts for phone, tablet and desktop
- **Cookie Consent**: Necessary, analytics and marketing categories, each opt-in in the in-app banner
- **Analytics**: Page views, scroll depth, time on page, menu interaction and outbound clicks
- **SEO**: Meta tags, structured data, sitemap and robots.txt
- **Static Export**: The whole site is prerendered into `out/`
- **Form Handling**: The contact form posts to the Google Forms `formResponse` URL through a hidden iframe, whose `onLoad` signals success
- **reCAPTCHA**: `/api/recaptcha` verifies the token before that post, and the submit is abandoned when the check fails
- **Auto-reply**: An optional Google Apps Script in `gas/` replies to submissions, bound to the Form's spreadsheet

A static export contains no route handlers.
`npm run dev` answers `/api/recaptcha` from `src/app/api/recaptcha/route.ts`, and the deployed site answers it from the `recaptcha` Cloud Function through a Hosting rewrite.
Both take `POST { token }` and reply `{ ok, message }`.

## 🛠️ Setup

### Prerequisites

- Node.js 22, so that the site build and the Cloud Function run on the runtime `functions/package.json` declares
- npm
- Firebase CLI, for deployment and for the functions emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/fcb1899v/appstudio_nextjs.git
cd appstudio_nextjs

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🔧 Environment Variables

Copy `.env_example` to `.env.local` and fill in the values.
The template lists every variable with what it is for, and is the one place that list is maintained, so it is not repeated here.

One distinction in it is not cosmetic.
`next.config.ts` re-exports `GOOGLE_FORM_ID`, `RECAPTCHA_V3_SITE_KEY` and `FAMILY_MOVIE_URL` through its `env` block, which inlines them into the client bundle at build time.
`RECAPTCHA_V3_SECRET_KEY` is deliberately not in that block: with it, anyone can validate their own tokens as this site.
Moving a key across that line changes who can read it.

## ☁️ Cloud Functions

`functions/` holds one function, `recaptcha`, which a Hosting rewrite serves at `/api/recaptcha`.
It exists because `output: 'export'` writes no route handlers, so Hosting has nothing to answer that path with.

`scripts/sync-familymovie-redirect.mjs` writes both the `functions` entry and the rewrite into `firebase.json`, and `npm run deploy` runs it before deploying.
`firebase.json` is untracked: `npm run deploy` generates it.

The secret key lives in Secret Manager, never in the repository:

```bash
cd functions && npm install && cd ..
firebase functions:secrets:set RECAPTCHA_V3_SECRET_KEY
```

To run it locally, pass the same value as an environment variable, because the emulator resolves `defineSecret` from the process environment:

```bash
RECAPTCHA_V3_SECRET_KEY=... firebase emulators:start --only functions
```

`functions/index.js` is CommonJS, and `functions/package.json` declares no `"type": "module"`.

## 📁 Project Structure

```
appstudio_nextjs/
├── next.config.ts              # Next.js configuration, loaded from the project root
├── config/
│   ├── next.config.ts          # Unused; no script passes it with --config
│   └── README.md
├── functions/                  # Cloud Functions (CommonJS, Node 22)
│   ├── index.js                # recaptcha: verifies a v3 token, served at /api/recaptcha
│   └── package.json
├── scripts/
│   ├── optimize-images.ts      # Image optimization, for newly added images
│   ├── sync-familymovie-redirect.mjs  # Writes the functions entry and rewrites into firebase.json
│   └── test-recaptcha-api.ts   # reCAPTCHA API test (run with the dev server up)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── ja/page.tsx         # Japanese home
│   │   ├── api/
│   │   │   ├── recaptcha/      # reCAPTCHA verification, used by npm run dev only
│   │   │   └── submit-form/    # Unused; the form posts to Google Forms
│   │   ├── [appSlug]/          # Dynamic app pages, generated from APP_SLUGS
│   │   │   ├── page.tsx        # English app pages
│   │   │   └── ja/page.tsx     # Japanese app pages
│   │   ├── contact/            # Contact page (en/ja)
│   │   ├── terms/              # Terms page (en/ja)
│   │   └── familymovie/        # Player for FAMILY_MOVIE_URL; its redirect and noindex headers are generated into firebase.json
│   ├── components/
│   │   ├── Common/             # Shared components
│   │   │   ├── AppPage.tsx     # Shared app showcase layout
│   │   │   ├── AnalyticsTracker.tsx
│   │   │   ├── AppScreenshots.tsx
│   │   │   ├── CookieConsentBanner.tsx
│   │   │   ├── DownloadNow.tsx
│   │   │   ├── ElevatorBigNews.tsx
│   │   │   ├── EnhancedFeatures.tsx
│   │   │   ├── HtmlLang.tsx
│   │   │   ├── MyAppsBadges.tsx
│   │   │   ├── MyAppsFeatures.tsx
│   │   │   ├── MyAppsHeader.tsx
│   │   │   ├── MyAppsHowtoUse.tsx
│   │   │   ├── MyAppsTop.tsx
│   │   │   ├── MyFooter.tsx
│   │   │   ├── MyHead.tsx
│   │   │   ├── MySplash.tsx
│   │   │   ├── OptimizedImage.tsx
│   │   │   ├── StructuredData.tsx
│   │   │   ├── UserReviews.tsx
│   │   │   ├── WordWebApp.tsx
│   │   │   └── YoutubeMovie.tsx
│   │   └── Home/               # Home page and related components
│   │       ├── ContactBody.tsx
│   │       ├── HomeAppsList.tsx
│   │       ├── PrivacyPolicy.tsx
│   │       └── TermsContents.tsx
│   ├── config/
│   │   └── firebaseConfig.ts
│   ├── hooks/
│   │   ├── useAnalytics.ts
│   │   ├── useCookieConsent.ts
│   │   ├── useGeoLocation.ts
│   │   ├── usePageTracking.ts
│   │   └── useWindowSize.ts
│   ├── lib/
│   │   └── fonts.ts            # Next.js local font setup
│   ├── types/
│   │   ├── app.ts              # App and common component types
│   │   ├── env.d.ts            # Environment variable types
│   │   └── global.d.ts         # Global declarations (Window, etc.)
│   └── utils/
│       ├── analytics.ts
│       ├── constants.ts        # App list, slugs, menus and legal text
│       └── functions.ts
├── public/                     # Static assets
│   ├── images/                 # App images and assets
│   ├── fonts/                  # Font files (.ttf, .otf)
│   └── legacy/                 # Legacy files (excluded from the build)
├── gas/
│   └── onFormSubmit.gs         # Auto-reply trigger, bound to the Form's spreadsheet
├── postcss.config.ts           # PostCSS (at root, where the tooling expects it)
├── tailwind.config.ts          # Tailwind CSS (at root, where the tooling expects it)
├── eslint.config.mjs           # ESLint flat config
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🍪 GDPR Compliance

Consent is handled in two places, and they do not cover the same scripts.

- **Cookie Consent Banner**: `CookieConsentBanner.tsx` with `useCookieConsent`, offering necessary, analytics and marketing categories
- **Cookiebot**: Loaded by the GTM container in production as the Consent Initialization tag, and its id is set inside that container, not read by any code here; the site itself loads no second copy (`src/app/layout.tsx`, `src/components/Common/MyHead.tsx`)
- **Google Analytics**: Gated on `consent.analytics` in `src/utils/analytics.ts`, so nothing is sent without analytics consent
- **AdSense**: Not gated in the site code, because `MyHead.tsx` renders the AdSense script whenever `ADSENSE_ID` is set, with no check on the marketing category
- **AdSense blocking**: Would have to come from Cookiebot inside the GTM container, which is configured outside this repository
- **Cookie Management**: Cleanup on consent withdrawal in `useCookieConsent`
- **Privacy Policy**: Served from `src/components/Home/PrivacyPolicy.tsx`

## 🚀 Deployment

### Firebase Hosting

```bash
# Build the project, writing static files into out/
npm run build

# Regenerate firebase.json and deploy
npm run deploy
```

`npm run deploy` runs the build, then `scripts/sync-familymovie-redirect.mjs`, then `firebase deploy`.
It deploys to the project `firebase use` has selected, so set that first (`firebase use <project-id>`) or pass `--project`.
Running `firebase deploy` on its own skips that regeneration, so the rewrite and the redirect may be stale.

```bash
# Build and serve the result locally, with the same generated firebase.json
npm run preview
```

### Other Static Hosts

The build output in `out/` is a complete static site, so any static host can serve it.
Redirects, rewrites and headers are not part of that output: they live in `firebase.json` here, and would have to be reproduced on another host.

## 🧪 Development Commands

```bash
# Start the development server
npm run dev

# Production build, into out/
npm run build

# Lint
npm run lint

# next start. The site is a static export, so serve out/ or use npm run preview instead
npm run start

# Build, regenerate firebase.json, deploy
npm run deploy

# Build, regenerate firebase.json, serve locally
npm run preview

# Optimize images that git sees as new or modified, and write their WebP.
# Neither file is replaced unless the new bytes are smaller, so this is safe
# to repeat; it has nothing to do once an image is committed.
npm run optimize-images

# Only part of the tree, or one file
npm run optimize-images -- public/images/newapp

# Optimize first, then build
npm run build-optimized

# The same, then deploy
npm run deploy-optimized

# Test the reCAPTCHA endpoint (run with the dev server up in another terminal)
npm run test:recaptcha
```

## 📱 Supported Apps

Each slug in `APP_SLUG_TO_NUMBER` (`src/utils/constants.ts`) becomes `/<slug>/` and `/<slug>/ja/`.

- **elevator**: LETS ELEVATOR
- **elevatorneo**: LETS ELEVATOR NEO
- **signal**: LETS SIGNAL
- **crossing**: LETS CROSSING
- **toilet**: LETS TOILET
- **allowance**: Sweet Easy Pocket
- **transit**: My Transit Makers
- **phonics**: Study Phonics
- **japanese**: Enjoy Japanese

## 🤝 Contributing

Issue reports are welcome.
Pull requests are not accepted, because the code is not licensed for redistribution.

## 📄 License

This project is not open source.
The source is published so that it can be read, and all rights are reserved.
See [LICENSE](LICENSE) for what that permits.
Third-party components keep their own licenses, listed below.

### 📦 Package Licenses

**Core Dependencies:**
- **Next.js** (MIT)
- **React**, **React DOM** (MIT)
- **TypeScript** (Apache-2.0)
- **Firebase** (Apache-2.0)
- **Firebase Functions** (MIT)
- **Firebase Tools** (MIT)
- **React Firebase Hooks** (Apache-2.0)

**UI & Styling:**
- **Material-UI (@mui/material, @mui/icons-material)** (MIT)
- **React Icons** (MIT)
- **Sass** (MIT)
- **Tailwind CSS** (MIT)
- **Emotion React**, **Emotion Styled** (MIT)

**Development Tools:**
- **ESLint**, **ESLint Config Next** (MIT)
- **TypeScript ESLint Parser**, **TypeScript ESLint Plugin** (MIT)
- **PostCSS**, **Autoprefixer** (MIT)
- **tsx** (MIT)

**HTTP & API:**
- **Axios** (MIT)
- **CORS** (MIT)

**Authentication & Security:**
- **React Google reCAPTCHA v3** (MIT)

**Image Processing:**
- **Sharp** (Apache-2.0)

**Language & Localization:**
- **Accept Language** (MIT)

**Note**: The project itself is not open source and all rights are reserved, while most dependencies are MIT, with Apache-2.0 for Firebase, TypeScript, Sharp and React Firebase Hooks.
See `package-lock.json` for the complete list.

## 📞 Support

For issues and questions, please use [GitHub Issues](https://github.com/fcb1899v/appstudio_nextjs/issues).

## 🔗 Links

- **GitHub Repository**: [https://github.com/fcb1899v/appstudio_nextjs](https://github.com/fcb1899v/appstudio_nextjs)

