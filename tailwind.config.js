/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  // safelist: [
  //   {
  //     pattern:
  //       /(text|background)-(red|blue|green|yellow|orange|purple|slate)-(0|50|100|200|300|400|500|600|700|800|900|950)/,
  //   }
  // ],
  plugins: [],
}