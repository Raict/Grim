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
  import JSZip from "jszip"
  import pica from "pica" 
  import { saveAs } from "file-saver";

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
  
  async function fileToImageBitmap(file: File) {
  return await createImageBitmap(file)
}

async function resizeImage(imageBitmap: ImageBitmap, size: number): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  await pica().resize(imageBitmap, canvas)
  return await new Promise(resolve => canvas.toBlob(blob => resolve(blob!), "image/png"))
}

async function processImages() {
  if (!selectedFile.value) return

  isProcessing.value = true
  progress.value = 0

  try {
    const imageBitmap = await fileToImageBitmap(selectedFile.value)
    progress.value = 10

    const processed = await Promise.all(
      selectedSizes.value.map(async (size) => {
        const blob = await resizeImage(imageBitmap, size)
        const dataUrl = await blobToDataUrl(blob)
        let fileName = `favicon-${size}x${size}.png`
        if (size === 180) fileName = "apple-touch-icon.png"
        if (size === 192) fileName = "android-chrome-192x192.png"
        if (size === 512) fileName = "android-chrome-512x512.png"
        return { size, dataUrl, fileName, blob }
      })
    )
    progress.value = 70

    const zip = new JSZip()
    for (const img of processed) {
      zip.file(img.fileName, img.blob)
    }

    const manifest = {
      name: "My Website",
      short_name: "Website",
      icons: processed.filter(x => x.size >= 192).map(x => ({
        src: "/" + x.fileName,
        sizes: `${x.size}x${x.size}`,
        type: "image/png",
      })),
      theme_color: "#10b981",
      background_color: "#ffffff",
      display: "standalone",
    }
    zip.file("site.webmanifest", JSON.stringify(manifest, null, 2))

    const zipBlob = await zip.generateAsync({ type: "blob" })
    progress.value = 90

    saveAs(zipBlob, "favicons.zip")
    progress.value = 100

    processedImages.value = processed
    showSuccessToast()
  } catch (e) {
    showErrorToast()
  } finally {
    isProcessing.value = false
    progress.value = 0
  }
}

// Helper: Blob to DataURL
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target!.result as string)
    reader.readAsDataURL(blob)
  })
}
  
  const showSuccessToast = () => {
    toast.add({
      title: i18n.t('notify.zipGeneratedsuccess'),
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