/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        tilt: "tilt 20s linear infinite",
      },
      keyframes: {
        tilt: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
      },
    },
  },
  plugins: [],
};
