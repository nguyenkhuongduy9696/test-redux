// const plugin = require('tailwindcss/plugin');

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
        xl: '1200px'
        // => @media (min-width: 1200px) { ... }
      }

    }
  },
  plugins: []
};
