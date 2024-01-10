/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#8f53d3',
        'grayscale-50': '#3e3647',
        'grayscale-100': '#665975',
        'grayscale-200': '#7b6b8c',
        'grayscale-300': '#8f819f',
        'grayscale-400': '#a498b1',
        'grayscale-500': '#b8afc2',
        'grayscale-600': '#cdc7d4',
        'grayscale-700': '#e1dee6',
        'grayscale-800': '#f6f5f7',
        positive: '#00FFD1',
        negative: '#e23e4c',
      },
      animation: {
        'scale-10s': 'scale 10s linear infinite',
        'scale-15s': 'scale 15s linear infinite',
        fadeIn: 'fadeIn 120ms ease-in',
        'slide-to-right': 'slide-to-right 3s linear infinite',
      },
      keyframes: {
        scale: {
          '0%': { scale: '1', opacity: 0.2 },
          '50%': { scale: '1.2', opacity: 0.4 },
          '100%': { scale: '1', opacity: 0.2 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-to-right': {
          '0%': { left: '-50%' },
          '8%': { left: '130%' },
          '100%': { left: '130%' },
        },
      },
      screens: {
        desktop: '1540px',
      },
    },
  },
  plugins: [],
}
