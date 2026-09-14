import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.violet,
          DEFAULT: colors.violet[500],
        },
      },
    },
  },
  plugins: [],
}
