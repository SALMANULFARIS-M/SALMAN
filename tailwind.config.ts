/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'], // Important for Angular
  theme: {
    extend: {
      transitionProperty: {
        transform: 'transform',
        perspective: {
          '3d': '1200px',
        },
      },
    },
  },
  plugins: [],
};
