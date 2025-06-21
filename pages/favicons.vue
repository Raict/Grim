<template>
    <div>
      <HeroSection />
      <FaviconConverter />
      <section class="adsense-section">
      <div class="container">
        <div class="adsense-placeholder">
          <div class="adsense-content">
            <Icon name="lucide:megaphone" />
            <span>{{ $t('pages.home.adsense') }}</span>
          </div>
        </div>
      </div>
    </section>
    </div>
  </template>
  
  <script setup lang="ts">
  
  useHead({
    title: 'Faviconitys - Конвертер зображень у фавіконки',
    meta: [
      { name: 'description', content: 'Простий та швидкий інструмент для створення фавіконок з ваших зображень. Підтримує різні формати та розміри.' }
    ]
  })
  </script>
  <style lang="scss" scoped>
.adsense-section {
  padding: spacing(3xl) 0;
  background: var(--bg-secondary);
  margin-bottom: spacing(3xl);
}

.adsense-placeholder {
  max-width: 728px;
  height: 90px;
  margin: 0 auto;
  border: 2px dashed var(--border);
  border-radius: border-radius(lg);
  @include flex-center;
  color: var(--text-tertiary);
  font-size: font-size(sm);
  
  .adsense-content {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>