/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6C2BD9',
          600: '#5a23b5',
          700: '#4a1d95'
        }
      }
    },
  },
  plugins: [],
}
