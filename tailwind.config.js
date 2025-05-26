/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontfamily : {
        almarai : ['Almarai','sans-serif'],
      },
      colors : {
        blue : {
          cart : "#0098ED"   // to be used with 50% opacity
        },
        pink : {
          like : "#E86F6F",   
          notify : "#ff7979"   // 50% opacity
        },
        ornage : {
          base : "#ff9446",   // 50% opacity
        },
        green : {
          base : "#00ca14"  // 50% opacity
        },
        gray : {
          icon_light : "#979797",
          icon_dark : "#585858",
          icon_normal : "#6A6A6A",
          stroke : "#BEBEBE"
        },
        black : {
          text : "#474747"
        },
        white : {
          default : "#FFFFFF"
        }

      },
      screens : {
        
      },
      

    },
  },
  plugins: [],
}

