/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      height: {
        "custom-1": "calc(100vh - 48px)"
      }
    },
  },
  plugins: [],
}
