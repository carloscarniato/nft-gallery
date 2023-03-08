/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        airbnb: ['Airbnb', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}
