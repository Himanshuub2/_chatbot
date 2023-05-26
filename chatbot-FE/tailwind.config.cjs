module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        "darkestBlue":"#0A1E34",
        "cyanBlue":"rgb(23 186 159)",
        "lightGray":"#89969F",
        "darkBlue":"#04274e",
        "lightBlue":"#12345a",
        "lighterBlue":"#295280",
        "fontGray":"#BBB9B9",
        "tagColor":"rgb(10 30 52)",
        "graphColor": "rgb(138 138 242)",
        "tabColor":"#4B719D",
        
      },

      fontFamily:{
        "ExtraBold-Mars":'MarsCentra-Extrabold',
        "Bold-Mars":'MarsCentra-Bold',
        "Book-Mars":'MarsCentra-Book',
      },

      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}