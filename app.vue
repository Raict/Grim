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
const { t, locale } = useI18n({ useScope: 'global' })
const route = useRoute()

const siteUrl = 'https://favicon-gen.com'
const canonicalPath = computed(() => route.path.replace(/\/+$/, '') || '/')
const canonicalUrl = computed(() => `${siteUrl}${canonicalPath.value === '/' ? '/' : canonicalPath.value}`)
const unprefixedPath = computed(() => canonicalPath.value.replace(/^\/en(?=\/|$)/, '') || '/')
const ukrainianUrl = computed(() => `${siteUrl}${unprefixedPath.value === '/' ? '/' : unprefixedPath.value}`)
const englishUrl = computed(() => `${siteUrl}/en${unprefixedPath.value === '/' ? '' : unprefixedPath.value}`)

const url = computed(() => {
  return canonicalUrl.value
})


const ogLocale = computed(() => {
  switch (locale.value) {
    case 'uk':
      return 'uk_UA'
    default:
      return 'en_US'
  }
})

const ogImage = computed(() => `${siteUrl}/og-image-new.png`)

useHead(() => ({
  title: t('seo.fullTitle'),
  titleTemplate: '%s | FaviconGen',
  meta: [
    { name: 'description', content: t('seo.description') },
    { name: 'author', content: t('seo.author') },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { property: 'og:title', content: t('seo.fullTitle') },
    { property: 'og:description', content: t('seo.socialDescription') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url.value },
    { property: 'og:image', content: ogImage.value },
    { property: 'og:image:secure_url', content: ogImage.value },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: t('seo.ogImageAlt') },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:site_name', content: t('seo.siteName') },
    { property: 'og:locale', content: ogLocale.value },
    { property: 'og:locale:alternate', content: locale.value === 'uk' ? 'en_US' : 'uk_UA' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('seo.fullTitle') },
    { name: 'twitter:description', content: t('seo.socialDescription') },
    { name: 'twitter:image', content: ogImage.value },
    { name: 'twitter:image:alt', content: t('seo.ogImageAlt') },
    { name: 'twitter:domain', content: 'favicon-gen.com' },
    { name: 'application-name', content: t('seo.siteName') },
    { name: 'msapplication-TileColor', content: '#10b981' },
    { name: 'msapplication-config', content: '/browserconfig.xml' },
    { name: 'theme-color', content: '#10b981' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: t('seo.siteName') },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'format-detection', content: 'telephone=no' }
  ],
  link: [
    // Favicons
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'canonical', href: canonicalUrl.value },
    { rel: 'alternate', hreflang: 'uk', href: ukrainianUrl.value },
    { rel: 'alternate', hreflang: 'en', href: englishUrl.value },
    { rel: 'alternate', hreflang: 'x-default', href: ukrainianUrl.value }
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
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: t('seo.siteName'),
        url: url.value,
        inLanguage: locale.value === 'uk' ? 'uk-UA' : 'en-US',
        description: t('seo.description')
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: t('seo.siteName'),
        url: 'https://favicon-gen.com',
        logo: 'https://favicon-gen.com/android-chrome-512x512.png',
        image: ogImage.value,
        description: t('seo.description')
      })
    }
  ]
}))
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

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px var(--bg-primary) inset !important;
  -webkit-text-fill-color: var(--text-primary) !important;
}

*:focus {
  outline: none !important;
}

*:focus-visible {
  outline: 2px solid var(--primary) !important;
  outline-offset: 2px !important;
}

/* CSS Variables */
:root {
  --header-height: 70px;
}

/* Prevent layout shifts and scroll jumping during transitions */
body.page-transitioning {
  overflow-x: hidden; /* Prevent horizontal scroll only */
}

/* Page Transition Effects - Using relative positioning to avoid layout shifts */
.page-enter-active,
.page-leave-active {
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* Temporarily disable problematic animations during page transitions */
.page-transitioning .fade-in-up,
.page-transitioning .hero-title,
.page-transitioning .hero-description,
.page-transitioning .hero-content,
.page-transitioning .feature-card,
.page-transitioning .animate__animated {
  animation-play-state: paused !important;
}

/* Re-enable animations after transition with staggered delays */
.fade-in-up {
  animation-delay: 0.2s;
}

.hero-title {
  animation-delay: 0.1s;
}

.hero-description {
  animation-delay: 0.2s;
}

.hero-content {
  animation-delay: 0.3s;
}

.feature-card {
  animation-delay: 0.4s;
}

/* Default transitions - Right direction (forward navigation) */
.page-enter-from {
  transform: translateX(100%);
}

.page-leave-to {
  transform: translateX(-100%);
}

/* Left direction (backward navigation) */
.nav-left .page-enter-from {
  transform: translateX(-100%);
}

.nav-left .page-leave-to {
  transform: translateX(100%);
}

.page-enter-to,
.page-leave-from {
  transform: translateX(0);
}

/* Layout container optimized for smooth transitions */
.layout-container {
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
  isolation: isolate; /* Create stacking context */
}

.page-wrapper {
  width: 100%;
  position: relative;
  transform: translateZ(0); /* Force hardware acceleration */
  min-height: calc(100vh - var(--header-height));
}
</style>
