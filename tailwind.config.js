/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        gradient: 'gradientAnimation 2s ease infinite'
      },
      backgroundImage: {
        "palo-alto": "linear-gradient(to right,#16A085,#F4D03F)"
      },
      fontFamily: {
        'code': ['"Fira Code"', 'monospace']
      },
      keyframes: {
        'gradientAnimation': {
          '0%': { backgroundPosition: '"0% 50%"'},
          '50%': { backgroundPosition: '"100% 50%"'},
          '100%': { backgroundPosition: '"0% 50%"'},
        }
      },
      screens: {
        'ss': '320px',
      }
    },
  },
  plugins: [],
}
