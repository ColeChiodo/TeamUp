/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#41B1BE",
                  
          "secondary": "#4172BE",
                  
          "accent": "#41BE8D",
                  
          "neutral": "#CFE4E6",
                  
          "base-100": "#FFFFFF",
                  
          "info": "#000000",
                  
          "success": "#34d399",
                  
          "warning": "#e11d48",
                  
          "error": "#ff0000",
        },
      },
    ],
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  }
}

