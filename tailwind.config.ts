import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'corner-stone': ['var(--corner-stone)', 'serif'],
        beon: ['var(--beon)', 'sans-serif'],
        pacifico: ['var(--pacifico)', 'cursive'],
        kodomo: ['var(--kodomo)', 'sans-serif'],
        riipop: ['var(--riipop)', 'sans-serif'],
        yasashisa: ['var(--yasashisa)', 'sans-serif'],
      },
      colors: {
        lamp: '#F7B249',
        dark: '#383635',
        'ja-yellow': '#ffA500',
        'crossing-red': '#D44028',
        'crossing-yellow': '#EEAE42',
        'ja-blue': '#0077FF',
        'allowance-purple': '#8040FF',
        'allowance-pink': '#FF40FF',
        'allowance-blue': '#00FFFF',
        'en-pink': '#FF69B4',
        'en-blue': '#03A9F4',
        'signal-green': '#57BFA3',
        'toilet-blue': '#86BDDA',
        'transit-green': '#03DAC5',
        'transit-blue': '#3700B3',
      },
      screens: {
        xs: '475px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
