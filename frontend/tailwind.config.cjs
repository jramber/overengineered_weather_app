/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'weather': '50px 1fr 100px'
      }
    },
  },
  plugins: [],
}
