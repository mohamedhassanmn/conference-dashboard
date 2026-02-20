// tailwind.config.ts
import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./app.vue",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./composables/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        "160": "40rem", // 640px
      },
      colors: {
        primary: {
          100: "#EDF2FB",
          200: "#E2EAFC",
          300: "#D7E3FC",
          400: "#CCDBFD",
          500: "#C1D3FE",
          600: "#B6CCFE",
          700: "#ABC4FF",
        },
        neutral: {
          100: "#C9CEF8",
          200: "#AEB3DF",
          300: "#8C92C8",
          400: "#5F6599",
          500: "#4C5078",
          600: "#343757",
          700: "#24263D",
        },
        "golden-yellow": "#EBEB7C",
        "dusky-red": "#FF8789",
        "grass-green": "#C7F9A0",
      },
      fontFamily: {
        nunito: ['"Nunito Sans"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        14: "0.875rem", // 14px
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }], // 10px / 14px
      },
      width: {
        "4.5": "1.125rem", // 18px
        "57": "14.25rem", // 228px
        "79": "19.75rem", // 316px
        "125": "31.25rem", // 500px
        "160": "40rem", // 640px
      },
      height: {
        "4.5": "1.125rem", // 18px
        "34": "8.5rem", // 136px
        "37.5": "9.375rem", // 150px
        "39.25": "9.8125rem", // 157px
        "46": "11.5rem", // 184px
        "125": "31.25rem", // 500px
      },
      maxHeight: {
        "125": "31.25rem", // 500px
      },
    },
  },
};
