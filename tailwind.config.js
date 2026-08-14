/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        military: {
          900: '#0a0f0d',
          800: '#1a1f1c',
          700: '#2a302c',
          600: '#3a4540',
          500: '#4a554f',
          400: '#6a756f',
          300: '#8a958f',
          200: '#aab5af',
          100: '#cad5cf',
          50: '#eaf5ef',
        },
        accent: {
          gold: '#c9a227',
          red: '#8b2635',
          green: '#2d5a3f',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}