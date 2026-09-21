// Next 16 removed `next lint`, which had supplied the config implicitly, so without this file linting stopped silently.
// Both entry points export a Linter.Config[] array.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'functions/node_modules/**',
      // Kept for reference, excluded from the build; not worth linting.
      'public/legacy/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    // Cloud Functions are a separate package on a separate runtime.
    // The deploy analyzer could not read an ESM source, so this one stays CommonJS.
    files: ['functions/**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];

export default config;
