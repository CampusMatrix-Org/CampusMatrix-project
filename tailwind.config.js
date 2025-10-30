/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-bg': '#FFFFFF',
        'primary-purple': '#6D28D9',
      },
    },
  },
  plugins: [],
}