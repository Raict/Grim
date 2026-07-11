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
      title: "FaviconGen - Безкоштовний генератор фавіконок | Згенерувати фавіконку онлайн",
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
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
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
  langDir: '../locales',
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
  autoI18n: true,
  exclude: ['/api/**', '/_nuxt/**', '/vercel/**', '/ru', '/ru/**']
},

  css: ["~/assets/scss/main.scss"],

  // Security headers and performance optimization
  nitro: {
    compressPublicAssets: true,
    prerender: {
      routes: ['/sitemap_index.xml', '/robots.txt']
    },
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
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Resource-Policy': 'same-origin',
          'X-DNS-Prefetch-Control': 'off',
          'Content-Security-Policy': "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self'; worker-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests"
        }
      },
      '/': { prerender: true, headers: { 'cache-control': 's-maxage=86400' } },
      '/favicons': { prerender: true },
      '/favicons-text': { prerender: true },
      '/faq': { prerender: true },
      '/terms': { prerender: true },
      '/privacy': { prerender: true },
      '/en': { prerender: true },
      '/en/favicons': { prerender: true },
      '/en/favicons-text': { prerender: true },
      '/en/faq': { prerender: true },
      '/en/terms': { prerender: true },
      '/en/privacy': { prerender: true },
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
  build: {
    transpile: ["@nuxt/ui"],
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
      exclude: ['@nuxt/kit', '@nuxt/ui']
    },
    ssr: {
      noExternal: ['@nuxt/ui']
    }
  },

  robots: {
  allow: ['/'],

  disallow: [
    '/.nuxt/', '/admin/', '/tmp/', '/temp/', '/vercel/'
  ]
  }
})
