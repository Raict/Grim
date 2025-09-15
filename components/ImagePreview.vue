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
      overflow: visible;
      position: relative;
    }

    &__title {
      font-size: font-size(lg);
      font-weight: font-weight(semibold);
      color: var(--text-primary);
      margin-bottom: spacing(lg);
    }

    &__container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      max-width: 600px;
      height: 400px;
      padding: spacing(lg);
      background: var(--bg-tertiary);
      border-radius: border-radius(xl);
      margin: 0 auto spacing(md);
      @include transition();
      border: 2px solid var(--border);

      @include respond-to(md) {
        height: 500px;
      }

      &:hover {
        transform: scale(1.02);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        border-color: var(--primary);
      }
    }

    &__image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: border-radius(lg);
      display: block;
      @include transition();
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
    gap: spacing(xl);
    overflow: visible;

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
    position: relative;
    overflow: visible;

    &__container {
      padding: spacing(lg);
      background: var(--bg-tertiary);
      border-radius: border-radius(xl);
      margin-bottom: spacing(sm);
      @include transition();
      @include flex-center;
      min-height: 100px;
      position: relative;
      overflow: visible;
      border: 2px solid var(--border);

      &:hover {
        background: var(--bg-secondary);
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        border-color: var(--primary);
      }
    }

    &__image {
      display: block;
      border-radius: border-radius(md);
      @include transition(transform);
      transition-duration: 0.3s;
      cursor: pointer;
      position: relative;

      &:hover {
        transform: scale(3) !important;
        z-index: 1000 !important;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4) !important;
        border: 3px solid var(--primary) !important;
        background: white !important;
        padding: 4px !important;
      }
    }

    &__size {
      font-size: font-size(sm);
      color: var(--text-secondary);
      font-weight: font-weight(medium);
      margin: 0;
    }
  }
  
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
  