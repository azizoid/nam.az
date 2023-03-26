/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ['Nunito'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};