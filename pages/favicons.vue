<template>
    <div>
      <HeroSection />
      <FaviconConverter />
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
  