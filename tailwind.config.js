/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAF9F5',
          text: '#191919',
          gray: '#666666',
          'gray-light': '#999999',
          accent: '#D97757',
          'accent-hover': '#C4603D',
          border: '#E5E5E5',
          white: '#FFFFFF',
          green: '#2D7A4F',
          'green-light': '#EDF7F1',
          blue: '#2563EB',
          'blue-light': '#EFF6FF',
          purple: '#7C3AED',
          'purple-light': '#F5F3FF',
          red: '#DC2626',
          amber: '#D97706',
          orange: '#EA580C',
        },
        patreon: {
          DEFAULT: '#FF424D',
          hover: '#E63440',
          bg: '#FFF5F5',
        },
        substack: {
          orange: '#FF6719',
          bg: '#FDF4F0',
        },
        thinkific: {
          DEFAULT: '#7C3AED',
          bg: '#F5F3FF',
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'sans-serif'],
        serif: ['"Merriweather"', 'serif'],
      },
    },
  },
  plugins: [],
}
