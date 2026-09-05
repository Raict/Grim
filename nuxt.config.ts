import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  site: {
    url: 'https://favicon-gen.com',
    name: 'FaviconGen'
  },
  runtimeConfig: {
    public: {
      siteName: 'FaviconGen',
      siteUrl: 'https://favicon-gen.com'
    },
  },

  app: {
    head: {
      title: "FaviconGen",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      link: [],
      script: []
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  compatibilityDate: "2025-06-15",
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/icon',
    ['@nuxtjs/i18n', {
  bundle: {
    optimizeTranslationDirective: true,
    compositionOnly: true,
    runtimeOnly: false
      },
  locales: [
    { code: 'uk', name: 'Українська', language: 'uk', file: 'uk.json' },
    { code: 'en', name: 'English', language: 'en', file: 'en.json' }
  ],
  lazy: true,
  langDir: '../locales',
  defaultLocale: 'uk',
  strategy: 'prefix_except_default',
  baseUrl: 'https://favicon-gen.com',
  compilation: {
    strictMessage: false,
    escapeHtml: false
  },
  // Stable, crawlable locale URLs are preferable to automatic redirects based on
  // browser language. Users can switch languages through regular locale links.
  detectBrowserLanguage: false
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
sitemap: {
  autoI18n: true,
  zeroRuntime: true,
  exclude: ['/api/**', '/_nuxt/**', '/vercel/**']
},

  css: ["~/assets/scss/main.scss"],

  // Vercel owns global security headers. Nitro keeps route-specific SEO/cache rules.
  nitro: {
    compressPublicAssets: true,
    prerender: {
      routes: ['/sitemap_index.xml', '/robots.txt'],
      failOnError: true
    },
    esbuild: {
      options: {
        target: 'es2022'
      }
    },
    experimental: {
      wasm: false
    },
    rollupConfig: {
      external: ['@nuxt/kit', 'node:url', 'node:path', 'node:fs']
    },
    routeRules: {
      '/': { prerender: true, headers: { 'cache-control': 's-maxage=86400' } },
      '/favicons': { prerender: true },
      '/favicons-text': { prerender: true },
      '/faq': { prerender: true },
      '/terms': { prerender: true },
      '/privacy': { prerender: true },
      '/about': { prerender: true },
      '/en': { prerender: true },
      '/en/favicons': { prerender: true },
      '/en/favicons-text': { prerender: true },
      '/en/faq': { prerender: true },
      '/en/terms': { prerender: true },
      '/en/privacy': { prerender: true },
      '/en/about': { prerender: true },
      '/api/**': {
        headers: {
          'X-Robots-Tag': 'noindex, nofollow'
        }
      },
      '/_nuxt/**': {
        headers: {
          'cache-control': 'max-age=31536000',
          'X-Robots-Tag': 'noindex, nofollow'
        }
      },
      '/.nuxt/**': {
        headers: {
          'X-Robots-Tag': 'noindex, nofollow'
        }
      },
      '/vercel/**': {
                headers: {
          'X-Robots-Tag': 'noindex, nofollow'
        }
      },
      '/favicon*.{ico,png}': { headers: { 'cache-control': 'max-age=31536000' } },
      '**/*.{js,css,png,jpg,jpeg,gif,ico,svg}': { headers: { 'cache-control': 'max-age=31536000' } }
    }
  },

  typescript: {
    strict: true,
  },
  experimental: {
    payloadExtraction: false,
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
      sourcemap: false,
      rollupOptions: {
        external: ['@nuxt/kit', 'node:url', 'node:path', 'node:fs'],
        output: {
          manualChunks: {
            vendor: ['vue']
          }
        }
      }
    },
    css: {
      devSourcemap: false,
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
    optimizeDeps: {
      exclude: ['@nuxt/kit']
    }
  },

  robots: {
    allow: ['/']
  },

  icon: {
    provider: 'none',
    clientBundle: {
      icons: [
        'lucide:sun',
        'lucide:moon',
        'lucide:heart',
        'lucide:star',
        'lucide:coffee',
        'lucide:home',
        'lucide:rocket',
        'lucide:camera'
      ],
      scan: true
    }
  }
})
