/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#494FA0',
        pink: "#E92B64",
        lightBlue:"#0070f0"
      },
    },
  },
  plugins: [],
}
