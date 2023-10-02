module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '468px',

      'semi-xs': '540px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'semi-md': '960px',


      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'semi-lg': '1200px',

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: {
          normal: '#0673dd',
          DEFAULT: '#1e90ff',
          dark: '#0265c3',
          light: '#d2e9ff',
          deep: '#0265c3'
        },
        level: {
          basic: '#ffb700',
          normal: '#e7785d',
          hard: '#20ad72'
        },
        border: {
          DEFAULT: '#ff6700'
        }
      }
    }
  },
  variants: {
    extend: {
      textColor: ['nextOnChecked'],
      backgroundColor: ['nextOnChecked'],
      borderColor: ['nextOnChecked']
    },
  },
}

