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
    preset: "cloudflare-pages",
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("shiki")) {
              return "shiki";
            }
          },
        },
      },
    },
  },
  modules: [
    "@nuxt/icon",
    "@nuxt/ui",
    [
      "nuxt-shiki",
      {
        defaultTheme: "github-dark",
        defaultLang: "vue",
        bundledLangs: [
          "vue",
          "typescript",
          "javascript",
          "bash",
          "sh",
          "shell",
          "json",
          "html",
          "css",
          "yaml",
          "xml",
          "sql",
        ],
      },
    ],
  ],
  css: ["~/assets/css/main.css"],
  ui: {
    prefix: "Nuxt",
  },
});
