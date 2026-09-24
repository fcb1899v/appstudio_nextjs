# appstudio_nextjs

Next.js landing pages for all company apps (9 apps, English/Japanese).
Deployed as a static export to Firebase Hosting.

## Build

- `output: 'export'` in `next.config.ts` — no server, no Route Handlers, no `next.config` headers/redirects in production.
  Everything must work as static HTML.
- `src/app/api/recaptcha/route.ts` does NOT run in production (404 on Hosting).
  The live reCAPTCHA check is the Firebase Function `functions/index.js` (`exports.recaptcha`), wired via a `firebase.json` rewrite.
  Edit both files together, or the client-side check will break.

## Deploy

- Always use `npm run deploy` (or `npm run deploy-optimized`), never a bare `firebase deploy`.
  It runs `scripts/sync-familymovie-redirect.mjs` first, which regenerates `firebase.json` (untracked) with the `/api/recaptcha` rewrite and `/familymovie` redirect/headers.
  A stale or hand-edited `firebase.json` will be silently overwritten on the next deploy anyway.

## Adding a new app

Update `src/utils/constants.ts`: add the app to `myAppNumber`, `APP_SLUG_TO_NUMBER`, and its full entry in `myApp()`.
A slug missing from `APP_SLUG_TO_NUMBER` 404s via `src/app/[appSlug]/page.tsx`.

## i18n

No i18n library, no middleware.
Each route has two files — e.g. `src/app/[appSlug]/page.tsx` (English) and `src/app/[appSlug]/ja/page.tsx` (Japanese) — that both render the same component with an `isJa` boolean.
Adding a page means creating both files.
