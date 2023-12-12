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
      },
      colors:{
        primary: '#ECF5FF', // Replace with your primary color hex value
        secondary: '#CCD4F2', // Replace with your secondary color hex value
        text: '#889DF0', 
      }
    },
  },
  plugins: [],
}