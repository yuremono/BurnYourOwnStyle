/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ matchUtilities }) {
      // text-shadow with arbitrary value (CSS variable)
      matchUtilities(
        {
          "text-shadow": (value) => ({
            "text-shadow": value,
          }),
        },
        { type: ["any"] }
      );

      // drop-shadow with arbitrary value
      matchUtilities(
        {
          "drop-shadow": (value) => ({
            filter: `drop-shadow(${value})`,
          }),
        },
        { type: ["any"] }
      );

      // box-shadow with arbitrary value
      matchUtilities(
        {
          "box-shadow": (value) => ({
            "box-shadow": value,
          }),
        },
        { type: ["any"] }
      );

      // webkit-text-stroke with arbitrary value
      matchUtilities(
        {
          "text-stroke": (value) => ({
            "-webkit-text-stroke": value,
          }),
        },
        { type: ["any"] }
      );
    }),
  ],
}
