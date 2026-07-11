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

const firebasePath = path.join(process.cwd(), 'firebase.json');

const defaultConfig = {
  hosting: {
    public: 'out',
    ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
    redirects: [],
    headers: [],
  },
};

const config = fs.existsSync(firebasePath)
  ? JSON.parse(fs.readFileSync(firebasePath, 'utf8'))
  : structuredClone(defaultConfig);

config.hosting ??= defaultConfig.hosting;
config.hosting.redirects ??= [];
config.hosting.headers ??= [];

config.hosting.redirects = config.hosting.redirects.filter(
  (redirect) => !redirect.source.startsWith('/familymovie'),
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

config.hosting.headers = [
  ...config.hosting.headers.filter((entry) => !entry.source.startsWith('/familymovie')),
  ...familyMovieHeaders,
];

fs.writeFileSync(firebasePath, `${JSON.stringify(config, null, 2)}\n`);
console.log('Configured /familymovie noindex headers in firebase.json');
