/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-bg': '#2C2A4A',      // Dark purple for the sidebar
        'sidebar-active': '#5E35B1',  // Bright purple for the active link
        'content-bg': '#F5F3FF',      // Very light purple/grey for main bg
        'card-bg': '#EDE9FE',        // Light lavender for the stat cards
        'fab-purple': '#7C3AED',      // Vibrant purple 
        'text-dark': '#1F2937',       // Default dark text
      }
    },
  },
  plugins: [],
}
