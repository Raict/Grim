import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000/api",
      siteName: 'FaviconGen',
      siteUrl: 'https://favicon-gen.com'
    },
  },

  app: {
    head: {
      title: "FaviconGen - Professional Favicon Generator",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
      onBeforeEnter: () => {
        // Will be handled by middleware
      }
    }
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
        { code: "ru", name: "Русский", file: "ru.json" },
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

  // Security headers
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'Cross-Origin-Embedder-Policy': 'credentialless',
          'Cross-Origin-Opener-Policy': 'same-origin'
        }
      }
    }
  },

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