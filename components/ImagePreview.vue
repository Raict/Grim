<template>
    <div class="image-preview">
      <div class="image-preview__original">
        <h3 class="image-preview__title">{{ $t('converter.originalImage')}}</h3>
        <div class="image-preview__container">
          <img
            :src="originalImageUrl"
            :alt="file.name"
            class="image-preview__image"
          />
        </div>
        <p class="image-preview__info">
          {{ file.name }} ({{ formatFileSize(file.size) }})
        </p>
      </div>
      <div v-if="processedImages.length > 0" class="image-preview__processed">
        <h3 class="image-preview__title">{{ $t('converter.generateFavicons') }}</h3>
        <div class="favicon-grid">
          <div
            v-for="image in processedImages"
            :key="image.size"
            class="favicon-item"
          >
            <div class="favicon-item__container">
              <img
                :src="image.dataUrl"
                :alt="`Favicon ${image.size}x${image.size}`"
                class="favicon-item__image"
                :style="{ 
                  width: `${Math.min(image.size, 64)}px`, 
                  height: `${Math.min(image.size, 64)}px` 
                }"
              />
            </div>
            <p class="favicon-item__size">
              {{ image.size }}×{{ image.size }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  interface Props {
    file: File
    processedImages?: ProcessedImage[]
  }
  
  interface ProcessedImage {
    size: number
    dataUrl: string
    blob: Blob
  }
  
  const props = withDefaults(defineProps<Props>(), {
    processedImages: () => []
  })
  
  const originalImageUrl = computed(() => {
    return URL.createObjectURL(props.file)
  })
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  onUnmounted(() => {
    URL.revokeObjectURL(originalImageUrl.value)
  })
  </script>
  
  <style lang="scss" scoped>
  .image-preview {
    display: flex;
    flex-direction: column;
    gap: spacing(2xl);
    
    &__original {
      text-align: center;
    }
    
    &__processed {
      // Стилі для секції згенерованих фавіконок
    }
    
    &__title {
      font-size: font-size(lg);
      font-weight: font-weight(semibold);
      color: var(--text-primary);
      margin-bottom: spacing(lg);
    }
    
    &__container {
      display: inline-block;
      padding: spacing(lg);
      background: var(--bg-tertiary);
      border-radius: border-radius(lg);
      margin-bottom: spacing(md);
      @include transition();
      
      &:hover {
        transform: scale(1.02);
        box-shadow: shadow(md);
      }
    }
    
    &__image {
      max-width: 300px;
      max-height: 200px;
      object-fit: contain;
      border-radius: border-radius(md);
      display: block;
      
      @include respond-to(sm) {
        max-width: 400px;
        max-height: 250px;
      }
    }
    
    &__info {
      font-size: font-size(sm);
      color: var(--text-tertiary);
      margin: 0;
      font-weight: font-weight(medium);
    }
  }
  
  .favicon-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: spacing(lg);
    
    @include respond-to(sm) {
      grid-template-columns: repeat(3, 1fr);
    }
    
    @include respond-to(md) {
      grid-template-columns: repeat(4, 1fr);
    }
    
    @include respond-to(lg) {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  
  .favicon-item {
    text-align: center;
    
    &__container {
      padding: spacing(md);
      background: var(--bg-tertiary);
      border-radius: border-radius(lg);
      margin-bottom: spacing(sm);
      @include transition();
      @include flex-center;
      min-height: 80px;
      
      &:hover {
        background: var(--bg-secondary);
        transform: translateY(-2px);
        box-shadow: shadow(md);
      }
    }
    
    &__image {
      display: block;
      border-radius: border-radius(sm);
      @include transition();
      
      &:hover {
        transform: scale(1.1);
      }
    }
    
    &__size {
      font-size: font-size(sm);
      color: var(--text-secondary);
      font-weight: font-weight(medium);
      margin: 0;
    }
  }
  
  // Анімації для появи елементів
  .image-preview__original {
    animation: fadeInUp 0.6s ease-out;
  }
  
  .image-preview__processed {
    animation: fadeInUp 0.6s ease-out 0.2s both;
  }
  
  .favicon-item {
    animation: fadeInUp 0.4s ease-out;
    
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }
  </style>
  