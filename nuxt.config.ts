import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000/api",
      siteName: 'FaviconGen',
      siteUrl: 'https://www.favicon-gen.com'
    },
  },

  app: {
    head: {
      title: "FaviconGen - Безкоштовний генератор фавіконок | Згенерувати фавіконку онлайн",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: ""
        },
        {
          rel: "preload",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
          as: "style",
          onload: "this.onload=null;this.rel='stylesheet'"
        }
      ],
      script: []
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
    ["@nuxt/ui", {
      global: true,
      icons: ["lucide"],
      safeListColors: ['primary', 'gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
    }],
    ["@nuxtjs/i18n", {
      bundle: {
        optimizeTranslationDirective: true,
        compositionOnly: true,
        runtimeOnly: false
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
      compilation: {
        strictMessage: false,
        escapeHtml: false
      }
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

  // Security headers and performance optimization
  nitro: {
    compressPublicAssets: true,
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
      },
      '/': { prerender: true, headers: { 'cache-control': 's-maxage=31536000' } },
      '/api/**': { cors: true },
      '/_nuxt/**': { headers: { 'cache-control': 'max-age=31536000' } }
    }
  },

  typescript: {
    strict: true,
  },
  build: {
    transpile: ["trpc-nuxt"],
  },

  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    treeshakeClientOnly: true,
    emitRouteChunkError: 'automatic'
  },

  optimization: {
    keyedComposables: [
      {
        name: 'useI18n',
        argumentLength: 1,
      }
    ]
  },

  ssr: true,
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue'],
            ui: ['@nuxt/ui']
          }
        }
      }
    },
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