/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0F19',      // Deepest background
          primary: '#111827',   // App background
          surface: '#1F2937',   // Card & Navbar backgrounds
          border: '#374151',    // Subtle borders
          blue: '#2563EB',      // Primary buttons/links
          indigo: '#4F46E5',    // AI/Magic accents
          success: '#10B981',   // Positive stock/profit
          danger: '#EF4444',    // Negative stock/loss
          muted: '#9CA3AF',     // Secondary text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}