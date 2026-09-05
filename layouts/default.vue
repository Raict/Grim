<template>
    <div class="app-layout layout-container" role="document">
      <a href="#main-content" class="skip-link" @click="focusMainContent">{{ $t('a11y.skipToMain') }}</a>

      <AppHeader />

      <main id="main-content" class="main-content page-wrapper" role="main" tabindex="-1" :aria-label="$t('a11y.mainContent')">
        <slot />
      </main>

      <AppFooter />
      <AppToaster />

      <!-- Screen reader announcements -->
      <LiveAnnouncer />
    </div>
  </template>
  
  <script setup lang="ts">
  import { renderBrowserFaviconFromTextSettings } from '~/utils/browserFavicon'

  const colorMode = useColorMode()
  const route = useRoute()
  const browserFaviconHref = useState<string | null>('browser-favicon-href', () => null)

  const syncBrowserFavicon = () => {
    renderBrowserFaviconFromTextSettings().then(href => {
      browserFaviconHref.value = href
    }).catch(error => {
      console.warn('Failed to sync browser favicon:', error)
    })
  }

  const syncBodyThemeClass = (mode: string) => {
    if (!import.meta.client) return

    document.body.classList.remove('light-mode', 'dark-mode')
    document.body.classList.add(`${mode}-mode`)
  }

  onMounted(() => {
    syncBodyThemeClass(colorMode.value)
    syncBrowserFavicon()
    window.addEventListener('logo-settings-changed', syncBrowserFavicon)
    window.addEventListener('storage', syncBrowserFavicon)
  })

  watch(() => route.fullPath, () => {
    if (!import.meta.client) return
    nextTick(syncBrowserFavicon)
  })

  onUnmounted(() => {
    if (!import.meta.client) return
    window.removeEventListener('logo-settings-changed', syncBrowserFavicon)
    window.removeEventListener('storage', syncBrowserFavicon)
  })

  watch(() => colorMode.value, (newMode) => {
    syncBodyThemeClass(newMode)
  })

  const focusMainContent = () => {
    nextTick(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true })
    })
  }
  
  </script>
  
  <style lang="scss" scoped>
  @use 'sass:map';
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--bg-primary);
    color: var(--text-primary);
    @include transition(background-color, color);
  }
  
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - var(--header-height));
    position: relative;
    z-index: 1;

    padding-top: var(--header-height);
  }
  
  .page-enter-active,
  .page-leave-active {
    @include transition(opacity, transform);
    transition-duration: 0.3s;
  }
  
  .page-enter-from {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .page-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .app-layout {
    ::-webkit-scrollbar {
      width: 8px;
    }
  
    ::-webkit-scrollbar-track {
      background: var(--bg-secondary);
      border-radius: border-radius(full);
    }
  
    ::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: border-radius(full);
      @include transition();
      
      &:hover {
        background: var(--text-tertiary);
      }
    }
  
    scrollbar-width: thin;
    scrollbar-color: var(--border) var(--bg-secondary);
  }
  
  .app-layout {
    :deep(*:focus-visible) {
      outline: 3px solid var(--primary);
      outline-offset: 3px;
    }

    // Hide focus outlines for pointer interactions
    :deep(*:focus:not(:focus-visible)) {
      outline: none;
    }
  }
  
  // Accessible skip navigation
  .skip-link {
    position: fixed;
    top: spacing(md);
    left: spacing(md);
    background: var(--primary);
    color: #052e2b;
    padding: spacing(sm) spacing(md);
    border-radius: border-radius(md);
    text-decoration: none;
    font-weight: font-weight(medium);
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(calc(-100% - #{spacing(2xl)}));
    transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;

    &:focus-visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateY(0);
      outline: 3px solid var(--bg-primary);
      outline-offset: 2px;
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

  // High-contrast mode support
  @media (prefers-contrast: high) {
    .app-layout {
      --border: #000000;

      :deep(*:focus-visible) {
        outline: 4px solid #000000;
        outline-offset: 2px;
      }
    }
  }

  // Reduced-motion support
  @media (prefers-reduced-motion: reduce) {
    .app-layout {
      :deep(*) {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  }

  @include respond-to(sm) {
    .main-content {
    }
  }

  @include respond-to(md) {
    .main-content {
    }
  }

  @include respond-to(lg) {
    .main-content {
    }
  }
  
  .app-layout {
    :deep(.loading-overlay) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      @include flex-center;
      z-index: map.get($z-index, modal);
      
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid var(--border);
        border-top: 4px solid var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    }
  }
  
  .app-layout {
    :deep(.error-boundary) {
      padding: spacing(2xl);
      text-align: center;
      
      .error-title {
        font-size: font-size(2xl);
        font-weight: font-weight(bold);
        color: var(--error);
        margin-bottom: spacing(lg);
      }
      
      .error-message {
        font-size: font-size(lg);
        color: var(--text-secondary);
        margin-bottom: spacing(xl);
      }
      
      .error-actions {
        display: flex;
        justify-content: center;
        gap: spacing(md);
      }
    }
  }
  </style>
  
