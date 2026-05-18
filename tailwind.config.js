/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        busyBg: '#f6f4f1',
        busyDark: '#1a1a1d',
        busyBorder: '#dcd9d6',
      },
    },
  },
  plugins: [],
}