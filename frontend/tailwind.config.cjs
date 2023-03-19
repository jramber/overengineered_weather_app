/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'weather': '50px 1fr 100px',
        'main': '2fr 1fr'
      },
      gridTemplateRows: {
        'main': '50px 1fr'
      },
      fontSize: {
        'superlarge': '5rem'
      }
    },
  },
  plugins: [],
}
