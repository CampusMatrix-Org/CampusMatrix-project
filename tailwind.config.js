/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#6b21a8', // Deep Violet/Purple (Main Brand Color)
        'primary-light': '#8b5cf6',  // Lighter Purple for focus/active
        'sidebar-bg': '#ffffff',   // Making the sidebar pure white
        'page-bg': '#E5E5E5',      // A slightly darker page background (gray-100/200 equivalent)
        'hover-dark': '#581c87',   // New color for darker hover state on sidebar items
      },
    },
  },
  plugins: [],
}