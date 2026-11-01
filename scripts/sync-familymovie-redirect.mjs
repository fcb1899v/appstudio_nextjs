import fs from 'fs';
import path from 'path';

const firebasePath = path.join(process.cwd(), 'firebase.json');

const defaultConfig = {
  hosting: {
    public: 'out',
    ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
    redirects: [],
    headers: [],
  },
};

const functionsConfig = [
  {
    source: 'functions',
    codebase: 'default',
    ignore: ['node_modules', '.git', 'firebase-debug.log', 'firebase-debug.*.log', '*.local'],
  },
];

// output: 'export' writes no route handlers, so the contact form's reCAPTCHA check has no endpoint without this.
const apiRewrites = [{ source: '/api/recaptcha', function: 'recaptcha' }];

const config = fs.existsSync(firebasePath)
  ? JSON.parse(fs.readFileSync(firebasePath, 'utf8'))
  : structuredClone(defaultConfig);

config.hosting ??= defaultConfig.hosting;
config.hosting.redirects ??= [];
config.hosting.headers ??= [];

config.functions = [
  ...functionsConfig,
  ...(config.functions ?? []).filter(
    (fn) => !functionsConfig.some((f) => f.codebase === fn.codebase),
  ),
];
config.hosting.rewrites = [
  ...apiRewrites,
  ...(config.hosting.rewrites ?? []).filter(
    (rewrite) => !apiRewrites.some((api) => api.source === rewrite.source),
  ),
];

config.hosting.redirects = config.hosting.redirects.filter(
  (redirect) => !redirect.source.startsWith('/familymovie'),
);
config.hosting.headers = config.hosting.headers.filter(
  (entry) => !entry.source.startsWith('/familymovie'),
);

const familyMovieHeaders = [
  {
    source: '/familymovie',
    headers: [
      { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet, noimageindex' },
      { key: 'Referrer-Policy', value: 'no-referrer' },
    ],
  },
  {
    source: '/familymovie/**',
    headers: [
      { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet, noimageindex' },
      { key: 'Referrer-Policy', value: 'no-referrer' },
    ],
  },
];

// _next/static file names carry a content hash, so browsers can keep them for a year instead of re-downloading fonts each visit.
const staticCacheHeaders = [
  {
    source: '/_next/static/**',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
  },
];

// Placed last because a later matching header rule overrides an earlier one (firebase-tools#9467).
config.hosting.headers = [
  ...config.hosting.headers.filter(
    (entry) => !staticCacheHeaders.some((h) => h.source === entry.source),
  ),
  ...familyMovieHeaders,
  ...staticCacheHeaders,
];

fs.writeFileSync(firebasePath, `${JSON.stringify(config, null, 2)}\n`);

console.log('Configured /api/recaptcha -> functions:recaptcha');
console.log('Configured one-year Cache-Control for /_next/static/**');
