/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'wizard': '700px',
        'quiz': '700px'
      },
      width: {
        'topic': '900px'
      }
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    darkTheme: "light",
   },
}

