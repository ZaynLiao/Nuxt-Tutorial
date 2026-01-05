// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  future: {
    compatibilityVersion: 4,
  },
  app: {
    head: {
      title: "Nuxt Tutorial",
      titleTemplate: "%s - Nuxt Tutorial",
      htmlAttrs: {
        lang: "zh-Hant-TW",
        class: "dark",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },
  typescript: {
    strict: true,
  },
  devtools: { enabled: true },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  modules: [
    "@nuxt/icon",
    "@nuxt/ui",
    ["nuxt-shiki", { defaultTheme: "github-dark", defaultLang: "vue" }],
  ],
  css: ["~/assets/css/main.css"],
  ui: {
    prefix: "Nuxt",
  },
});
