<template>
    <section id="favicon-converter" class="section">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="text-4xl font-bold mb-3">
            {{ title }}
          </h2>
        </div>
  
        <div class="card converter-card">
          <ImageUploader 
            v-if="!selectedFile"
            :has-selected-file="!!selectedFile"
            @file-selected="handleFileSelected"
            :is-processing="isProcessing"
          />
  
          <div v-if="selectedFile" class="converter-content">
            <div class="converter-content__header">
              <button
                class="btn btn--outline btn--sm converter-content__clear-btn "
                @click="clearConverter"
              >
                <Icon name="lucide:trash-2" class="converter-content__clear-icon" />
                {{ $t('converter.clear') }}
              </button>
            </div>
  
            <ImagePreview 
              :file="selectedFile"
              :processed-images="processedImages"
              @remove-image="clearSelectedFile"
            />
            
            <SizeSelector 
              v-model="selectedSizes"
              class="mt-4"
            />
  
            <div class="converter-actions">
              <button
                class="btn btn--gradient btn--lg converter-btn"
                :class="{ 'converter-btn--loading': isProcessing }"
                :disabled="selectedSizes.length === 0 || isProcessing"
                @click="processImages"
              >
                <div class="converter-btn__content">
                  <Icon 
                    v-if="!isProcessing"
                    name="lucide:download" 
                    class="converter-btn__icon"
                  />
                  <div 
                    v-if="isProcessing"
                    class="converter-btn__spinner"
                  ></div>
                  <span class="converter-btn__text">
                    {{ isProcessing ? processingText : $t('converter.downloadZip') }}
                  </span>
                </div>
                <div 
                  v-if="isProcessing"
                  class="converter-btn__progress"
                  :style="{ width: `${progress}%` }"
                ></div>
              </button>
            </div>
          </div>
  
          <InstallationGuide 
            v-if="processedImages.length > 0"
            :generated-sizes="selectedSizes"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  
  const { $trpc } = useNuxtApp()
  const toast = useToast()
  const i18n = useI18n()
  
  const title = i18n.t('converter.title')
  
  const selectedFile = ref<File | null>(null)
  const selectedSizes = ref<number[]>([16, 32])
  const processedImages = ref<ProcessedImage[]>([])
  const isProcessing = ref(false)
  const progress = ref(0)
  
  interface ProcessedImage {
    size: number
    dataUrl: string
    fileName: string
    blob: Blob
  }
  
  const processingText = computed(() => {
    if (progress.value < 30) return i18n.t('converter.processing')
    if (progress.value < 80) return i18n.t('converter.creating')
    return i18n.t('converter.processing')
  })
  
  const handleFileSelected = (file: File) => {
    selectedFile.value = file
    processedImages.value = []
    progress.value = 0
  }
  
  const clearSelectedFile = () => {
    selectedFile.value = null
    processedImages.value = []
    selectedSizes.value = [16, 32]
    progress.value = 0
  }
  
  const clearConverter = () => {
    clearSelectedFile()
    toast.add({
      title: i18n.t('converter.cleared'),
      type: 'foreground'
    })
  }
  
  const processImages = async () => {
    if (!selectedFile.value) return
  
    isProcessing.value = true
    progress.value = 0
    const progressInterval = setInterval(() => {
      if (progress.value < 90) {
        progress.value += Math.random() * 15
      }
    }, 200)
  
    try {
      const base64 = await fileToBase64(selectedFile.value)
      progress.value = 20
  
      const result = await $trpc.favicon.convert.mutate({
        imageData: base64,
        sizes: selectedSizes.value
      })
  
      progress.value = 80
  
      processedImages.value = await Promise.all(
        result.images.map(async (img: { size: number; dataUrl: string; fileName: string }) => {
          const blob = await (await fetch(img.dataUrl)).blob()
          return { ...img, blob }
        })
      )
  
      await downloadZipFile(result.zipData)
      progress.value = 100
  
      showSuccessToast()
    } catch (error) {
      console.error('Error processing images:', error)
      showErrorToast()
    } finally {
      clearInterval(progressInterval)
      setTimeout(() => {
        isProcessing.value = false
        progress.value = 0
      }, 1000)
    }
  }
  
  const showSuccessToast = () => {
    toast.add({
      title: 'ZIP архів з фавіконками успішно створено!',
      type: 'foreground'
    })
  }
  
  const showErrorToast = () => {
    toast.add({
      title: i18n.t('converter.error') as string,
      type: 'background'
    })
  }
  </script>
  
  <style lang="scss" scoped>
  .converter-card {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .converter-content {
    margin-top: spacing(2xl);
  
    &__header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: spacing(lg);
    }
  
    &__title {
      font-size: font-size(xl);
      font-weight: font-weight(semibold);
      color: var(--text-primary);
    }
  
    &__clear-btn {
      display: flex;
      align-items: center;
      gap: spacing(xs);
      padding: spacing(sm) spacing(md);
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-secondary);
      border-radius: border-radius(md);
      font-size: font-size(sm);
      cursor: pointer;
      transition: all 0.3s ease-out;
      
      &:hover {
        background: var(--bg-tertiary);
        color: var(--text-primary);
        border-color: var(--primary);
      }
  
      .converter-content__clear-icon {
        width: 16px;
        height: 16px;
        color: var(--warning)
      }
    }
  }
  
  .converter-actions {
    margin-top: spacing(2xl);
    text-align: center;
  }
  
  .converter-btn {
    position: relative;
    overflow: hidden;
    min-width: 200px;
  
    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: spacing(sm);
      position: relative;
      z-index: 2;
    }
  
    &__icon {
      width: 20px;
      height: 20px;
      @include transition();
    }
  
    &__spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  
    &__text {
      font-weight: font-weight(medium);
      @include transition();
    }
  
    &__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.3);
      @include transition(width);
      transition-duration: 0.3s;
    }
  
    &--loading {
      cursor: not-allowed;
  
      .converter-btn__content {
        opacity: 0.9;
      }
    }
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .converter-btn {
    @include transition();
  
    &:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    }
  
    &:not(:disabled):active {
      transform: translateY(0);
    }
  }
  </style>