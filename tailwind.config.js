/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',  // Qo'shimcha kichik ekranlar uchun o'lcham
      },
      borderRadius: {
        'large': '50%', // Rasmlar yumaloq bo'lishi uchun
      },
    },
  },
  plugins: [],
}