<template>
    <div class="app-layout">
      <AppHeader />
      
      <main class="main-content">
        <slot />
      </main>
      
      <AppFooter />
      
      <!-- Google AdSense (закоментовано) -->
      <!-- <GoogleAdsense /> -->
    </div>
  </template>
  
  <script setup lang="ts">
  
  // Композабл для теми
  const colorMode = useColorMode()
  
  // Встановлюємо клас для body
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
    
    // Забезпечуємо мінімальну висоту для контенту
    min-height: calc(100vh - 140px); // Приблизна висота хедера + футера
    
    // Додаємо відступ зверху для sticky хедера
    padding-top: 0;
    
    @include respond-to(md) {
      min-height: calc(100vh - 160px);
    }
  }
  
  // Глобальні стилі для всього лейауту
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
  
  // Стилі для плавних переходів між сторінками
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
  
  // Стилі для скролбара на рівні лейауту
  .app-layout {
    // Кастомний скролбар для webkit браузерів
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
  
    // Для Firefox
    scrollbar-width: thin;
    scrollbar-color: var(--border) var(--bg-secondary);
  }
  
  // Стилі для фокусу на рівні лейауту (доступність)
  .app-layout {
    :deep(*:focus) {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
      border-radius: border-radius(sm);
    }
    
    :deep(button:focus),
    :deep(a:focus),
    :deep(input:focus),
    :deep(textarea:focus),
    :deep(select:focus) {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
  }
  
  // Responsive утиліти для лейауту
  @include respond-to(sm) {
    .main-content {
      // Додаткові стилі для планшетів
    }
  }
  
  @include respond-to(md) {
    .main-content {
      // Додаткові стилі для десктопів
    }
  }
  
  @include respond-to(lg) {
    .main-content {
      // Додаткові стилі для великих екранів
    }
  }
  
  // Стилі для loading станів
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
  
  // Стилі для помилок
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
  