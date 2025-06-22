<template>
  <div class="app">
    <ClientOnly>
      <Teleport to="body">
        <div id="modal-root"></div>
        <div id="toast-root"></div>
      </Teleport>
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const url =
  locale.value === 'uk'
    ? 'https://faviconitys.com/uk'
    : 'https://faviconitys.com/en'

const siteName = t('seo.siteName')
const description = t('seo.description')
const keywords = t('seo.keywords')
const socialDescription = t('seo.socialDescription')
const author = t('seo.author')

const ogLocale = locale.value === 'uk' ? 'uk_UA' : 'en_US'
const ogImage = 'https://faviconitys.com/og-image.png'
const twitterImage = 'https://faviconitys.com/twitter-image.png'

useHead({
  title: t('seo.fullTitle'),
  titleTemplate: '%s | Faviconitys',
  meta: [
    // Primary
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'author', content: author },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },

    // Open Graph
    { property: 'og:title', content: t('seo.fullTitle') },
    { property: 'og:description', content: socialDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: siteName },
    { property: 'og:locale', content: ogLocale },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('seo.fullTitle') },
    { name: 'twitter:description', content: socialDescription },
    { name: 'twitter:image', content: twitterImage },

    // PWA
    { name: 'theme-color', content: '#10b981' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: siteName },

    // Security
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
  ],
  link: [
    // Favicons
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },

    // Fonts
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    },

    // DNS Prefetch
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },

    // Canonical & alternate hreflang
    { rel: 'canonical', href: url },
    { rel: 'alternate', hreflang: 'uk', href: 'https://faviconitys.com/uk' },
    { rel: 'alternate', hreflang: 'en', href: 'https://faviconitys.com/en' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://faviconitys.com' }
  ],
  htmlAttrs: {
    lang: locale.value
  },
  bodyAttrs: {
    class: 'antialiased'
  },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: url,
        inLanguage: locale.value === 'uk' ? 'uk-UA' : 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://faviconitys.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        url: 'https://faviconitys.com',
        logo: 'https://faviconitys.com/logo.png',
        sameAs: [
          'https://twitter.com/faviconitys',
          'https://facebook.com/faviconitys'
        ]
      })
    }
  ]
})
</script>


<style lang="scss">
.app {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  height: 100%;
  height: calc(var(--vh, 1vh) * 100);
  
  @include respond-to(lg) {
    font-size: 18px;
  }
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  @include transition(background-color, color);

  overflow-x: hidden;
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}

.no-js {
  .js-only {
    display: none !important;
  }
}

.js {
  .no-js-only {
    display: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

@media (prefers-contrast: high) {
  :root {
    --border: #000000;
    --text-primary: #000000;
    --text-secondary: #333333;
  }
  
  .dark-mode {
    --border: #ffffff;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
  }
}

@media print {
  .app {
    background: white !important;
    color: black !important;
  }
  
  .header,
  .footer,
  .btn,
  .mobile-menu {
    display: none !important;
  }
  
  .main-content {
    padding: 0 !important;
    margin: 0 !important;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary);
  color: white;
  padding: spacing(sm) spacing(md);
  border-radius: border-radius(md);
  text-decoration: none;
  z-index: 1000;
  @include transition();
  
  &:focus {
    top: 6px;
  }
}

.loading {
  pointer-events: none;
  opacity: 0.6;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-top: 2px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

.error {
  color: var(--error);
  border-color: var(--error);
}

.success {
  color: var(--success);
  border-color: var(--success);
}

img {
  max-width: 100%;
  height: auto;
}

:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: border-radius(sm);
}

::selection {
  background: var(--primary);
  color: white;
}

::-moz-selection {
  background: var(--primary);
  color: white;
}
</style>
