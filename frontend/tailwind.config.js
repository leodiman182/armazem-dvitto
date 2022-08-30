/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": '#DC6A40',
        "secondary": '#FDDE5C',
        "tertiary": '#e4e4e4',
        "gray1": '#4B4B4D',
      },
      spacing: {
        '102': '28rem',
        '110': '35rem',
        'more': '101%',
      },
      screens: {
        'mac': '1440px',
        'uw': '2560px',
      },
    },
  },
  plugins: [],
}
