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
      },
      spacing: {
        'mainTop': '-250px',
        'secondLeft': '-150px',
        '128': '42rem'
      },
      colors: {
        'light-grey': '#EBEBEB'
      },
      rotate: {
        'minus-45': '-45deg',
        'minus-90': '-90deg',
        'minus-135': '-135deg',
        'minus-225': '-225deg'
      }
    },
  },
  plugins: [],
}
