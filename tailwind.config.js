// const defaultTheme = require('tailwindcss/defaultTheme');

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
        green: {
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
      }
    }
  },
  plugins: []
};
