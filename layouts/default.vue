<template>
    <div class="app-layout layout-container" role="document">
      <a href="#main-content" class="skip-link">{{ $t('a11y.skipToMain') }}</a>

      <AppHeader />

      <main id="main-content" class="main-content page-wrapper" role="main" :aria-label="$t('a11y.mainContent')">
        <slot />
      </main>

      <AppFooter />
      <AppToaster />

      <!-- Повідомлення для скрінрідерів -->
      <LiveAnnouncer />
    </div>
  </template>
  
  <script setup lang="ts">
  const colorMode = useColorMode()
  
  onMounted(() => {
    document.body.className = `${colorMode.value}-mode`
  })
  
  watch(() => colorMode.value, (newMode) => {
    document.body.className = `${newMode}-mode`
  })
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
    min-height: calc(100vh - 140px);
    position: relative;
    z-index: 1;

    padding-top: 0;

    @include respond-to(md) {
      min-height: calc(100vh - 160px);
    }
  }
  
  :deep(.container) {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 spacing(lg);
    
    @include respond-to(sm) {
      padding: 0 spacing(xl);
    }
    
    @include respond-to(xl) {
      max-width: 1400px;
    }
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
    :deep(*:focus) {
      outline: 3px solid var(--primary);
      outline-offset: 3px;
      border-radius: border-radius(sm);
      box-shadow: 0 0 0 1px var(--bg-primary);
    }

    :deep(button:focus-visible),
    :deep(a:focus-visible),
    :deep(input:focus-visible),
    :deep(textarea:focus-visible),
    :deep(select:focus-visible) {
      outline: 3px solid var(--primary);
      outline-offset: 3px;
      box-shadow: 0 0 0 1px var(--bg-primary), 0 0 8px rgba(16, 185, 129, 0.4);
    }

    // Приховання обведення при кліках мишкою
    :deep(*:focus:not(:focus-visible)) {
      outline: none;
      box-shadow: none;
    }
  }
  
  // Покращена доступність
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary);
    color: #052e2b;
    padding: spacing(sm) spacing(md);
    border-radius: border-radius(sm);
    text-decoration: none;
    font-weight: font-weight(medium);
    z-index: 9999;
    @include transition();

    &:focus {
      top: 6px;
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

  // Підтримка висококонтрастного режиму
  @media (prefers-contrast: high) {
    .app-layout {
      --border: #000000;

      :deep(*:focus) {
        outline: 4px solid #000000;
        outline-offset: 2px;
      }
    }
  }

  // Підтримка зменшеної анімації
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
  
