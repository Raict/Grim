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

const url = computed(() => {
  switch (locale.value) {
    case 'uk':
      return 'https://favicon-gen.com/'
    // case 'ru':
    //   return 'https://favicon-gen.com/ru'
    default:
      return 'https://favicon-gen.com/en'
  }
})


const ogLocale = computed(() => {
  switch (locale.value) {
    case 'uk':
      return 'uk_UA'
    // case 'ru':
    //   return 'ru_RU'
    default:
      return 'en_US'
  }
})

// Static OG image for all languages
const ogImage = computed(() => {
  return 'https://raw.githubusercontent.com/Raict/Grim/main/public/og-image-new.png'
})

const twitterImage = computed(() => {
  return 'https://raw.githubusercontent.com/Raict/Grim/main/public/og-image-new-small.png'
})

useHead(() => ({
  title: t('seo.fullTitle'),
  titleTemplate: '%s | FaviconGen',
  meta: [
    // Primary SEO
    { name: 'description', content: t('seo.description') },
    { name: 'keywords', content: t('seo.keywords') },
    { name: 'author', content: t('seo.author') },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'bingbot', content: 'index, follow' },

    // Content classification
    { name: 'classification', content: 'Web Design Tools' },
    { name: 'category', content: 'Technology' },
    { name: 'coverage', content: 'Worldwide' },
    { name: 'distribution', content: 'Global' },

    // Language and geo
    { name: 'language', content: locale.value },
    { name: 'geo.region', content: 'UA' },
    { name: 'geo.placename', content: 'Ukraine' },

    // Additional SEO meta tags
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'HandheldFriendly', content: 'true' },
    { name: 'MobileOptimized', content: '320' },

    // Performance and caching
    { 'http-equiv': 'cache-control', content: 'public, max-age=31536000' },
    { 'http-equiv': 'expires', content: new Date(Date.now() + 31536000000).toUTCString() },

    // Rich snippets and search features (verification codes will be added when registered)
    // { name: 'google-site-verification', content: 'verification-code-will-be-added' },
    // { name: 'msvalidate.01', content: 'verification-code-will-be-added' },
    // { name: 'yandex-verification', content: 'verification-code-will-be-added' },

    // Social media and sharing
    { name: 'pinterest-rich-pins', content: 'true' },
    { name: 'linkedin:owner', content: 'company-id' },

    // Content categorization
    { name: 'news_keywords', content: t('seo.keywords') },
    { name: 'topic', content: 'favicon generator, web development tools' },
    { name: 'subject', content: 'Free favicon generator and converter' },
    { name: 'summary', content: t('seo.description') },

    // Open Graph Enhanced
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
    { property: 'og:locale:alternate', content: 'en_US' },
    { property: 'og:locale:alternate', content: 'uk_UA' },
    // { property: 'og:locale:alternate', content: 'ru_RU' },

    // Article properties
    { property: 'article:author', content: t('seo.author') },
    { property: 'article:publisher', content: 'https://favicon-gen.com' },
    { property: 'article:section', content: 'Web Design Tools' },
    { property: 'article:tag', content: 'favicon' },
    { property: 'article:tag', content: 'icon generator' },
    { property: 'article:tag', content: 'web design' },

    // Twitter Card Enhanced
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('seo.fullTitle') },
    { name: 'twitter:description', content: t('seo.socialDescription') },
    { name: 'twitter:image', content: twitterImage.value },
    { name: 'twitter:image:alt', content: t('seo.ogImageAlt') },
    { name: 'twitter:site', content: '@favicon_gen' },
    { name: 'twitter:creator', content: '@favicon_gen' },
    { name: 'twitter:domain', content: 'favicon-gen.com' },
    { name: 'twitter:app:name:iphone', content: t('seo.siteName') },
    { name: 'twitter:app:name:ipad', content: t('seo.siteName') },
    { name: 'twitter:app:name:googleplay', content: t('seo.siteName') },


    // Schema.org microdata
    { name: 'application-name', content: t('seo.siteName') },
    { name: 'msapplication-TileColor', content: '#10b981' },
    { name: 'msapplication-config', content: '/browserconfig.xml' },

    // PWA Enhanced
    { name: 'theme-color', content: '#10b981' },
    { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#10b981' },
    { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#065f46' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: t('seo.siteName') },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-touch-fullscreen', content: 'yes' },

    // Performance and security
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
    { name: 'format-detection', content: 'telephone=no' },


    // Rich snippets support
    { name: 'thumbnail', content: ogImage.value }
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

    // DNS Prefetch and Preconnect for performance optimization
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'dns-prefetch', href: '//res.cloudinary.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'preconnect', href: 'https://res.cloudinary.com' },

    // Resource hints for better performance - removed favicon preload as it's not critical
    { rel: 'prefetch', href: '/apple-touch-icon.png' },

    // Canonical & alternate hreflang
    { rel: 'canonical', href: url },
    { rel: 'alternate', hreflang: 'uk', href: 'https://favicon-gen.com/' },
    { rel: 'alternate', hreflang: 'en', href: 'https://favicon-gen.com/en' },
    // { rel: 'alternate', hreflang: 'ru', href: 'https://favicon-gen.com/ru' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://favicon-gen.com' }
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
        description: t('seo.description'),
        keywords: t('seo.keywords'),
        // Removed search action as the site doesn't have search functionality
        mainEntity: {
          '@type': ['WebApplication', 'SoftwareApplication'],
          name: 'Free Favicon Generator',
          description: t('seo.socialDescription'),
          applicationCategory: ['DesignApplication', 'DeveloperApplication'],
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
          },
          featureList: [
            'Convert images to favicon',
            'Generate favicon from text',
            'Multiple favicon sizes',
            'ZIP download with HTML code',
            'No registration required',
            'Ad-free service'
          ]
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: t('seo.siteName'),
        url: 'https://favicon-gen.com',
        logo: 'https://favicon-gen.com/favicon-512x512.png',
        image: ogImage.value,
        description: t('seo.description'),
        sameAs: [
          'https://github.com/favicon-gen',
          'https://twitter.com/favicon_gen'
        ],
        // contactPoint: {
        //   '@type': 'ContactPoint',
        //   contactType: 'Customer Service',
        //   url: 'https://favicon-gen.com/contact'
        // }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'FaviconGen - Favicon Generator',
        description: t('seo.socialDescription'),
        url: url.value,
        image: ogImage.value,
        screenshot: ogImage.value,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Web Browser',
        browserRequirements: 'HTML5, JavaScript enabled',
        softwareVersion: '1.0',
        releaseNotes: 'Free online favicon generator with AI support',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        author: {
          '@type': 'Person',
          name: t('seo.author')
        },
        keywords: t('seo.keywords'),
        inLanguage: locale.value === 'uk' ? 'uk-UA' : 'en-US',
        featureList: [
          'Convert images to favicon',
          'Generate favicon from text',
          'AI-powered favicon generation',
          'Multiple sizes support (16x16, 32x32, 180x180, 192x192, 512x512)',
          'ZIP download with manifest',
          'PWA icon support',
          'Free online tool',
          'No registration required',
          'Multiple language support'
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: t('seo.fullTitle'),
        description: t('seo.description'),
        image: ogImage.value,
        step: [
          {
            '@type': 'HowToStep',
            name: 'Upload Image',
            text: 'Upload your image or logo to our favicon generator',
            image: ogImage.value
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Sizes',
            text: 'Select the favicon sizes you need (16x16, 32x32, 180x180, 192x192, 512x512)',
            image: ogImage.value
          },
          {
            '@type': 'HowToStep',
            name: 'Download',
            text: 'Download your complete favicon package with all sizes and HTML code',
            image: ogImage.value
          }
        ],
        totalTime: 'PT2M',
        tool: [
          {
            '@type': 'HowToTool',
            name: 'Web Browser'
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How to generate favicon?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Upload your image to our free favicon generator, select sizes, and download the complete package with all necessary files and HTML code.'
            }
          },
          {
            '@type': 'Question',
            name: 'What favicon sizes do I need?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Common favicon sizes include 16x16, 32x32 for browsers, 180x180 for Apple devices, and 192x192, 512x512 for Android and PWA apps.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is favicon generator free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, our favicon generator is completely free with no limitations, registration required, or hidden fees.'
            }
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://favicon-gen.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Favicon Generator',
            item: url.value
          }
        ]
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
