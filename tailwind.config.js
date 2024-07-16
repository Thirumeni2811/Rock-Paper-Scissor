/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackPearl: '#0b1116',
        luckyOrange: '#fc6a1a',
        floralWhite: '#fefbec',
      },
      screens: {
        'xs': {'max': '576px'},          // Extra small devices (phones, 576px and down)
        'sm': {'min': '576px'},          // Small devices (portrait tablets and large phones, 576px and up)
        'md': {'min': '768px'},          // Medium devices (landscape tablets, 768px and up)
        'lg': {'min': '992px'},          // Large devices (laptops/desktops, 992px and up)
        'xl': {'min': '1200px'},         // Extra large devices (large laptops and desktops, 1200px and up)
      },
    },
  },
  plugins: [],
}