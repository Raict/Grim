import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
    apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000/api",
    },
  },

  site: {
    url: 'https://faviconitys.com',
    name: 'Faviconitys',
    description: 'Free online favicon generator and converter. Create professional favicons from images, text, or AI generation.',
    defaultLocale: 'uk',
  },

  app: {
    head: {
      title: "faviconitys",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
    },
  },
  compatibilityDate: "2025-06-15",
  devtools: { enabled: true },

  modules: [
    ["@nuxt/ui", { global: true, icons: ["lucide"] }],
    ["@nuxtjs/i18n", {
      bundle: {
        optimizeTranslationDirective: false
      },
      locales: [
        { code: "uk", name: "Українська", file: "uk.json" },
        { code: "en", name: "English", file: "en.json" },
      ],
      lazy: true,
      langDir: '../locales/',

      defaultLocale: "uk",
      strategy: "prefix_except_default",
    }],
    ["@nuxtjs/color-mode", {
      preference: "system",
      fallback: "dark",
      hid: "nuxt-color-mode-script",
      globalName: "__NUXT_COLOR_MODE__",
      componentName: "ColorScheme",
      classPrefix: "",
      classSuffix: "-mode",
      storageKey: "nuxt-color-mode",
    }],
  ],

  css: ["~/assets/scss/main.scss"],
  typescript: {
    strict: true,
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: `
          @use "~/assets/scss/mixins" as *;
          @use "~/assets/scss/variables" as *;
        `
        },
      },
    },
  },
})