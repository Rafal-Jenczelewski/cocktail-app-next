const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: colors.gray["800"],
      colors: {
        "primary-bg": colors.yellow["700"],
        "secondary-bg": colors.orange["800"],
        "disabled-bg": colors.blue["200"],
        "primary-text": colors.yellow["600"],
        bg: colors.gray["800"]
      }
    },
  },
  plugins: [],
}
