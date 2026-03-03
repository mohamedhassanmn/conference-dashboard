export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  srcDir: "app/",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxt/image"],
  routeRules: {
    "/api/**": {
      proxy: `${process.env.BACKEND_URL}/**`,
    },
  },
});
