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

useHead({
  title: 'Faviconitys - Convert Images to Favicons',
  titleTemplate: '%s | Faviconitys',
  meta: [
    { name: 'description', content: 'Simple and fast tool for creating favicons from your images. Supports various formats and sizes.' },
    { name: 'keywords', content: 'favicon, converter, image, icon, web development, favicon generator, ico, png' },
    { name: 'author', content: 'Faviconitys Team' },
    { name: 'robots', content: 'index, follow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    
    // Open Graph
    { property: 'og:title', content: 'Faviconitys - Convert Images to Favicons' },
    { property: 'og:description', content: 'Simple and fast tool for creating favicons from your images.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://Faviconitys.com' },
    { property: 'og:image', content: '/og-image.png' },
    { property: 'og:site_name', content: 'Faviconitys' },
    { property: 'og:locale', content: 'uk_UA' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Faviconitys - Convert Images to Favicons' },
    { name: 'twitter:description', content: 'Simple and fast tool for creating favicons from your images.' },
    { name: 'twitter:image', content: '/twitter-image.png' },
    
    // PWA
    { name: 'theme-color', content: '#10b981' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'Faviconitys' },
    
    // Security
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'referrer', content: 'strict-origin-when-cross-origin' }
  ],
  link: [
    // Favicons
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    
    // Fonts
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { 
      rel: 'stylesheet', 
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' 
    },
    
    // DNS Prefetch для оптимізації
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    
    // Canonical URL
    { rel: 'canonical', href: 'https://Faviconitys.com' }
  ],
  htmlAttrs: {
    lang: 'uk'
  },
  bodyAttrs: {
    class: 'antialiased'
  }
})

// Ініціалізація додатку
onMounted(() => {
  // Додаємо клас для JavaScript
  document.documentElement.classList.add('js')
  
  // Видаляємо клас no-js якщо він є
  document.documentElement.classList.remove('no-js')
  
  // Ініціалізуємо Service Worker для PWA (якщо потрібно)
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js').catch(console.error)
  }
  
  // Додаємо обробник для зміни розміру вікна
  const handleResize = () => {
    // Оновлюємо CSS змінну для висоти viewport
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
  }
  
  handleResize()
  window.addEventListener('resize', handleResize)
  
  // Cleanup
  return () => {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style lang="scss">
// Глобальні стилі для всього додатку
.app {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100); // Фікс для мобільних браузерів
  
  // Забезпечуємо правильне відображення на всіх пристроях
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

// Глобальні стилі для HTML
html {
  // Плавний скрол
  scroll-behavior: smooth;
  
  // Базовий розмір шрифту
  font-size: 16px;
  
  // Висота для мобільних пристроїв
  height: 100%;
  height: calc(var(--vh, 1vh) * 100);
  
  @include respond-to(lg) {
    font-size: 18px;
  }
}

// Глобальні стилі для body
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  @include transition(background-color, color);
  
  // Запобігаємо горизонтальному скролу
  overflow-x: hidden;
  
  // Покращуємо рендеринг тексту
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  
  // Висота для мобільних пристроїв
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}

// Стилі для no-js fallback
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

// Глобальні стилі для доступності
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

// Стилі для високого контрасту
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

// Стилі для друку
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

// Глобальні утилітні класи
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

// Стилі для loading станів
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

// Стилі для помилок
.error {
  color: var(--error);
  border-color: var(--error);
}

.success {
  color: var(--success);
  border-color: var(--success);
}

// Responsive images
img {
  max-width: 100%;
  height: auto;
}

// Стилі для фокусу
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
  border-radius: border-radius(sm);
}

// Стилі для selection
::selection {
  background: var(--primary);
  color: white;
}

::-moz-selection {
  background: var(--primary);
  color: white;
}
</style>
