/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  daisyui: {
    themes: ['dark', 'light'],
  },
  plugins: [require('daisyui')],
};
