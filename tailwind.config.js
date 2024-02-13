/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      breuer: ['Breuer', 'sans-serif'],
      aller: ['Aller', 'sans-serif'],
      'minion-pro': ['MinionPro', 'sans-serif'],
    },
    colors: {
      'white': '#fff',
      'black': '#000',
      'black-2': '#1d1d1b',
      'gray-1': '#c6c6c6',
      'gray-2': '#f2f2f2',
      'gray-3': '#9d9d9c',
      'gray-4': '#808080',
      'gray-5': 'rgba(242,242,242,.5)',
      'gray-6': '#E5E7EB',
      'yellow-1': '#f9b233',
      'yellow-2': '#ffce44',
    },
    screens: {
      'xs': '450px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1680px',
      'max-lg': { 'max': '1023px' },
    },
    extend: {
      rotate: {
        'left': '90deg',
        'right': '270deg',
        'upper': '180deg',
        'down': '0',
      },
      borderRadius: {
        'lg': '60px',
        'md': '20px',
        'sm': '15px',
        'xs': '10px',
      },
      fontSize: {
        'xl': '1.375rem',
      },
      maxWidth: {
        'max-content': '1680px',
      },
      animation: {
        'fade-in': 'fade-in .3s',
        'arrow-rotate-in': 'arrow-rotate-in .3s forwards',
        'slide-down': 'slide-down 1s forwards',
        'slide-up': 'slide-up .5s forwards',
      },
      keyframes: {
        'fade-in': {
          'from': {
            opacity: '0',
          },
          'to': {
            opacity: '1',
          },
        },
        'arrow-rotate-in': {
          'from': {
            transform: 'rotate(0)',
          },
          'to': {
            transform: 'rotate(180deg)',
          },
        },
        'slide-down': {
          'from': {
            maxHeight: '0',
          },
          'to': {
            maxHeight: '200vh',
          },
        },
        'slide-up': {
          'from': {
            maxHeight: '100vh',
          },
          'to': {
            maxHeight: '0',
          },
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}