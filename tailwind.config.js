/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'code': ['"Fira Code"', 'monospace']
      },
      screens: {
        'ss': '320px',
      }
    },
  },
  plugins: [],
}
