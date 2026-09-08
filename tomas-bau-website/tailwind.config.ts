import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#1BABB4',
          50: '#EAF9FA',
          100: '#CFF1F3',
          400: '#3CC2CA',
          500: '#1BABB4',
          600: '#158B93',
          700: '#106C72',
        },
        brand: {
          red: '#E8392A',
          redDark: '#C42B1E',
          navy: '#1A2035',
          navyLight: '#252D47',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
