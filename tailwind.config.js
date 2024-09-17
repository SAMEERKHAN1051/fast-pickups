/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#023ec2', // Custom primary color
        secondary: '#f4bd00', // Custom secondary color
        preprimary: '#5d8aed',
        // primary: '#00cf95', // Custom primary color
        // secondary: '#d7f7e9', // Custom secondary color
        textColor:'#2d3b4e'
      },
      fontFamily: {
        sans: ["MuseoSans", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        'header-bg': "url('./assets/images/header-bg.jpg')",
      },
    },
  },   
  plugins: [],
}

