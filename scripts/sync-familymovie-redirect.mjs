import fs from 'fs';
import path from 'path';

function loadEnvFile(fileName) {
  const envPath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const familyMovieUrl = (process.env.FAMILY_MOVIE_URL ?? '').trim();
const firebasePath = path.join(process.cwd(), 'firebase.json');

const defaultConfig = {
  hosting: {
    public: 'out',
    ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
    redirects: [],
    headers: [],
  },
};

// firebase.json is untracked because the redirect target is private, so the
// pieces that are not secret are written here instead of living on one machine.
const functionsConfig = [
  {
    source: 'functions',
    codebase: 'default',
    ignore: ['node_modules', '.git', 'firebase-debug.log', 'firebase-debug.*.log', '*.local'],
  },
];

// output: 'export' writes no route handlers, so the contact form's reCAPTCHA
// check has no endpoint without this.
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
    source: '/familymovie/',
    headers: [
      { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet, noimageindex' },
      { key: 'Referrer-Policy', value: 'no-referrer' },
    ],
  },
];

config.hosting.headers = [...config.hosting.headers, ...familyMovieHeaders];

if (familyMovieUrl) {
  config.hosting.redirects.push(
    {
      source: '/familymovie',
      destination: familyMovieUrl,
      type: 302,
    },
    {
      source: '/familymovie/',
      destination: familyMovieUrl,
      type: 302,
    },
  );
}

fs.writeFileSync(firebasePath, `${JSON.stringify(config, null, 2)}\n`);

if (familyMovieUrl) {
  console.log(`Configured /familymovie redirect to ${familyMovieUrl}`);
} else {
  console.log('FAMILY_MOVIE_URL not set; configured /familymovie noindex headers only');
}
console.log('Configured /api/recaptcha -> functions:recaptcha');
