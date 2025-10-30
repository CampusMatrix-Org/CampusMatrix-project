/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this line includes jsx
  ],
  theme: {
    extend: {
      // Add your custom colors here
      colors: {
        'primary-purple': '#7F56D9', // This purple looks like your screenshot
        'sidebar-bg': '#FFFFFF',     // This is just white
      }
    },
  },
  plugins: [],
}