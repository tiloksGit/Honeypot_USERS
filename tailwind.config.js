/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        bgBack : "url('./src/assets/icons/background.jpg')"
      }
    },
  },
  plugins: [],
}