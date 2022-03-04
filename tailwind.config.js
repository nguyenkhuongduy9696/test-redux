const plugin = require('tailwindcss/plugin');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#43fc96',
          200: '#40ef8f',
          300: '#3de589',
          400: '#38d37e',
          500: '#32c072',
          600: '#2eb069',
          700: '#2aa160',
          800: '#269157',
          900: '#23834f'
        }
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        '1/8': '12.5%',
        '2/8': '25%',
        '3/8': '37.5%',
        '4/8': '50%',
        '5/8': '62.5%',
        '6/8': '75%',
        '7/8': '87.5%'
      },
      screens: {
        sm: '576px',
        // => @media (min-width: 576px) { ... }
        md: '768px',
        // => @media (min-width: 768px) { ... }
        lg: '992px',
        // => @media (min-width: 992px) { ... }
        xl: '1200px',
        // => @media (min-width: 1200px) { ... }
        '2xl': '1440px'
      }

    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.font-11': {
          'font-size': '11px'
        },
        '.font-12': {
          'font-size': '12px'
        },
        '.font-13': {
          'font-size': '13px'
        },
        '.font-14': {
          'font-size': '14px'
        },
        '.font-15': {
          'font-size': '15px'
        },
        '.font-16': {
          'font-size': '16px'
        },
        '.font-17': {
          'font-size': '17px'
        },
        '.font-18': {
          'font-size': '18px'
        },
        '.font-19': {
          'font-size': '19px'
        },
        '.font-20': {
          'font-size': '20px'
        },
        '.w-100': {
          width: '100px'
        },
        '.w-200': {
          width: '200px'
        },
        '.w-300': {
          width: '300px'
        },
        '.w-400': {
          width: '400px'
        },
        '.w-500': {
          width: '500px'
        },
        '.w-600': {
          width: '600px'
        },
        '.w-700': {
          width: '700px'
        },
        '.w-800': {
          width: '800px'
        },
        '.w-900': {
          width: '900px'
        }
      });
    })
  ]
};
