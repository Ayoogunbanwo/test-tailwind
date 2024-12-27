/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens:{
      sm: '640px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },

    dropShadow: {
      'bottom': [
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      ],
    }
,
    extend: {
    },
  },
  plugins: [],
}

