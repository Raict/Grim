import { defineNuxtConfig } from "nuxt/config"
import { fileURLToPath } from 'node:url'

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
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
    "@nuxt/ui",
    ['@nuxtjs/i18n', {
  bundle: {
    optimizeTranslationDirective: true,
    compositionOnly: true,
    runtimeOnly: false
      },
  locales: [
    { code: 'uk', name: 'Українська', file: 'uk.json' },
    { code: 'en', name: 'English',    file: 'en.json' }
  ],
  lazy: true,
  langDir: fileURLToPath(new URL('./locales', import.meta.url)), 
  defaultLocale: 'uk',
  strategy: 'prefix_except_default',
  seo: true,                 
  baseUrl: 'https://favicon-gen.com',
  compilation: {
    strictMessage: false,
    escapeHtml: false
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
    alwaysRedirect: false
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
sitemap: {
  siteUrl: 'https://favicon-gen.com',
  autoI18n: true,
  defaultLocale: 'uk',
  i18n: {
    locales: ['uk', 'en'],
    defaultLocale: 'uk'
  },
  exclude: ['/api/**', '/_nuxt/**', '/vercel/**'],
  urls: [
    '/', '/favicons', '/favicons-text', '/faq', '/terms', '/privacy'
  ]
},
  ui: {
    global: true,
    icons: ["lucide"]
  },

  css: ["~/assets/scss/main.scss"],

  // Security headers and performance optimization
  nitro: {
    compressPublicAssets: true,
    esbuild: {
      options: {
        target: 'es2022'
      }
    },
    experimental: {
      wasm: false
    },
    externals: {
      inline: ['@nuxt/ui']
    },
    rollupConfig: {
      external: ['@nuxt/kit', 'node:url', 'node:path', 'node:fs']
    },
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
      '/': { prerender: true, headers: { 'cache-control': 's-maxage=86400' } },
      '/favicons': { prerender: true },
      '/favicons-text': { prerender: true },
      '/faq': { prerender: true },
      '/terms': { prerender: true },
      '/privacy': { prerender: true },
      '/api/**': {
        cors: true,
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
  build: {
    transpile: ["trpc-nuxt", "@nuxt/ui"],
  },

  experimental: {
    payloadExtraction: false,
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
      exclude: ['@nuxt/kit', '@nuxt/ui']
    },
    ssr: {
      noExternal: ['@nuxt/ui']
    }
  },

  robots: {
  siteUrl: 'https://favicon-gen.com',
  sitemap: 'https://favicon-gen.com/sitemap.xml',

  allow: [
    '/', '/en/', '/en/favicon', '/favicon',
    '/en/favicons-text', '/favicons-text',
    '/en/faq', '/faq', '/en/privacy', '/privacy',
    '/en/terms', '/terms', '/favicon.ico',
    '/favicon-*.png', '/apple-touch-icon.png',
    '/site.webmanifest', '/assets/', '/sitemap.xml'
  ],

  disallow: [
    '/_nuxt/', '/_nuxt/builds/', '/.nuxt/', '/admin/',
    '/tmp/', '/temp/', '/api/', '/ru/', '/vercel/'
  ],

  groups: [
    {
      userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot']
    }
  ],

  host: 'https://favicon-gen.com'
},

  hooks: {
    'vite:extendConfig': (config, { isServer }) => {
      if (isServer) {
        config.build = config.build || {}
        config.build.rollupOptions = config.build.rollupOptions || {}
        config.build.rollupOptions.external = config.build.rollupOptions.external || []

        if (Array.isArray(config.build.rollupOptions.external)) {
          config.build.rollupOptions.external.push('@nuxt/kit', 'node:url', 'node:path', 'node:fs')
        }
      }
    }
  }
})