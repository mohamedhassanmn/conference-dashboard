// tailwind.config.ts
export default {
  content: [
    "./app.vue",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "100": "#EDF2FB",
          "200": "#E2EAFC",
          "300": "#D7E3FC",
          "400": "#CCDBFD",
          "500": "#C1D3FE",
          "600": "#B6CCFE",
          "700": "#ABC4FF",
        },
        neutrals: {
          "100": "#C9CEF8",
          "200": "#AEB3DF",
          "300": "#8C92C8",
          "400": "#5F6599",
          "500": "#4C5078",
          "600": "#343757",
          "700": "#24263D",
        },
      },
    },
  },
};
