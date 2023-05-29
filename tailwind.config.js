/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/screens/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ['Nunito'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
