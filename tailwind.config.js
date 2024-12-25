/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pColor : '#FA6500',
        secondaryTextColor: '#150B2B',
        
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-slow2': {
          '0%': { transform: 'rotate(-30deg)' },
          '50%': { transform: 'rotate(30deg)' },
          '100%': { transform: 'rotate(-30deg)' },
        },
        'spin-slow3': {
          '0%': { transform: 'rotate(-50deg)' },
          '50%': { transform: 'rotate(50deg)' },
          '100%': { transform: 'rotate(-50deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 50s linear infinite', 
        'spin-slow2': 'spin-slow2 50s linear infinite', 
        'spin-slow3': 'spin-slow2 50s linear infinite', 
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    
    styled: true,
    themes: true,
    base: false, 
  },
}

