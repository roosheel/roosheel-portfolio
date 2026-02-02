import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0e17',
          surface: '#1a1f2e',
          'surface-light': '#1f2937',
          'surface-lighter': '#374151',
        },
        light: {
          bg: '#fafafa',
          surface: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'zoom-in-95': 'zoom-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
