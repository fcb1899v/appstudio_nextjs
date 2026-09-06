// Next 16 removed `next lint`, which had been supplying the config implicitly.
// There was no config file in the repository, so once the command went away
// linting stopped working entirely rather than failing loudly.
//
// Both entry points export a Linter.Config[] through CommonJS, so the default
// import is the array itself.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      // Kept for reference, excluded from the build; not worth linting.
      'public/legacy/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
];
