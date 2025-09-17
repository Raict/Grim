<template>
    <section id="favicon-converter" class="section" role="main" aria-labelledby="converter-title">
      <div class="container">
        <div class="text-center converter-header">
          <h2 id="converter-title" class="converter-title">
            {{ title }}
          </h2>
          <p class="converter-subtitle">
            {{ $t('converter.subtitle') }}
          </p>
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
                class="btn btn--outline btn--sm converter-content__clear-btn"
                @click="clearConverter"
                :aria-label="$t('converter.clear') + ' - очистити всі завантажені файли'"
                type="button"
              >
                <Icon name="lucide:trash-2" class="converter-content__clear-icon" aria-hidden="true" />
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
              <DownloadButton
                :is-processing="isProcessing"
                :show-success="showSuccess"
                :progress="progress"
                :disabled="selectedSizes.length === 0"
                :default-text="$t('converter.downloadZip')"
                :success-text="$t('converter.downloadComplete')"
                :processing-text="processingText"
                @click="processImages"
              />
            </div>
          </div>
  
          <InstallationGuide
            v-if="processedImages.length > 0 && !isProcessing && !showSuccess"
            :generated-sizes="selectedSizes"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import JSZip from "jszip" 

  const toast = useToast()
  const i18n = useI18n()
  
  const title = i18n.t('converter.title')
  
  const selectedFile = ref<File | null>(null)
  const selectedSizes = ref<number[]>([16, 32])
  const processedImages = ref<ProcessedImage[]>([])
  const isProcessing = ref(false)
  const progress = ref(0)
  const showSuccess = ref(false)
  
  interface ProcessedImage {
    size: number
    dataUrl: string
    fileName: string
    blob: Blob
  }
  
  const processingText = computed(() => {
    if (progress.value < 20) return i18n.t('converter.processing')
    if (progress.value < 40) return 'Обробка зображення...'
    if (progress.value < 70) return 'Створення фавіконок...'
    if (progress.value < 90) return 'Створення архіву...'
    return 'Майже готово...'
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
    showSuccess.value = false
  }
  
  const clearConverter = () => {
    clearSelectedFile()
    toast.add({
      title: i18n.t('converter.cleared'),
      type: 'foreground'
    })
  }
  
  async function fileToImageBitmap(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to load image'))
    }
    img.src = objectUrl
  })
}

async function resizeImage(img: HTMLImageElement, size: number): Promise<Blob> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  canvas.width = size
  canvas.height = size

  // Simple canvas drawing instead of pica
  ctx.drawImage(img, 0, 0, size, size)

  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob!), "image/png")
  })
}

async function processImages() {
  if (!selectedFile.value) return

  isProcessing.value = true
  progress.value = 0

  try {
    // Show processing animation for at least 1 second for visual feedback
    await new Promise(resolve => setTimeout(resolve, 500))

    const img = await fileToImageBitmap(selectedFile.value)
    progress.value = 20

    await new Promise(resolve => setTimeout(resolve, 300))
    progress.value = 40

    const processed = await Promise.all(
      selectedSizes.value.map(async (size) => {
        const blob = await resizeImage(img, size)
        const dataUrl = await blobToDataUrl(blob)
        let fileName = `favicon-${size}x${size}.png`
        if (size === 180) fileName = "apple-touch-icon.png"
        if (size === 192) fileName = "android-chrome-192x192.png"
        if (size === 512) fileName = "android-chrome-512x512.png"
        return { size, dataUrl, fileName, blob }
      })
    )

    await new Promise(resolve => setTimeout(resolve, 400))
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

    await new Promise(resolve => setTimeout(resolve, 300))
    progress.value = 90

    const zipBlob = await zip.generateAsync({ type: "blob" })

    await new Promise(resolve => setTimeout(resolve, 200))
    progress.value = 100

    processedImages.value = processed

    // Trigger standard browser download with animation
    const link = document.createElement('a')
    link.href = URL.createObjectURL(zipBlob)
    link.download = 'favicons.zip'
    link.style.display = 'none'
    document.body.appendChild(link)

    // Small delay to ensure proper animation timing
    await new Promise(resolve => setTimeout(resolve, 100))
    link.click()

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    }, 1000)

    showSuccessToast()

    // Show success state
    showSuccess.value = true

    // Reset success state after 3 seconds
    setTimeout(() => {
      showSuccess.value = false
      progress.value = 0
    }, 3000)
  } catch (error) {
    console.error('Error processing images:', error)

    let errorMessage = i18n.t('converter.error')
    if (error instanceof Error) {
      if (error.message.includes('memory')) {
        errorMessage = i18n.t('converter.errorMemory')
      } else if (error.message.includes('format')) {
        errorMessage = i18n.t('converter.errorFormat')
      } else if (error.message.includes('size')) {
        errorMessage = i18n.t('converter.errorSize')
      }
    }

    toast.add({
      title: errorMessage,
      type: 'background'
    })
  } finally {
    isProcessing.value = false
    // Don't reset progress here - let the success state show
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
  
  </script>
  
  <style lang="scss" scoped>
  .converter-card {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .converter-content {
    margin-top: spacing(sm);

    @include respond-to(sm) {
      margin-top: spacing(md);
    }

    @include respond-to(md) {
      margin-top: spacing(lg);
    }

    @include respond-to(lg) {
      margin-top: spacing(xl);
    }

    &__header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: spacing(sm);

      @include respond-to(sm) {
        margin-bottom: spacing(md);
      }

      @include respond-to(md) {
        margin-bottom: spacing(lg);
      }
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
    margin-top: spacing(md);
    text-align: center;

    @include respond-to(sm) {
      margin-top: spacing(lg);
    }

    @include respond-to(md) {
      margin-top: spacing(xl);
    }

    @include respond-to(lg) {
      margin-top: spacing(2xl);
    }
  }

  .converter-title {
    font-size: font-size(2xl);
    font-weight: font-weight(bold);
    margin-bottom: spacing(sm);
    background: linear-gradient(135deg, var(--primary), var(--secondary), var(--primary));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 300% 300%;
    animation: gradientText 4s ease-in-out infinite;
    filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3));

    @include respond-to(sm) {
      font-size: font-size(3xl);
      margin-bottom: spacing(md);
    }

    @include respond-to(md) {
      font-size: font-size(4xl);
    }

    @supports not (-webkit-background-clip: text) {
      color: var(--primary);
    }
  }

  @keyframes gradientText {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .converter-header {
    margin-bottom: spacing(md);

    @include respond-to(sm) {
      margin-bottom: spacing(lg);
    }

    @include respond-to(md) {
      margin-bottom: spacing(xl);
    }
  }

  .converter-subtitle {
    font-size: font-size(sm);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
    padding: 0 spacing(xs);

    @include respond-to(sm) {
      font-size: font-size(base);
      padding: 0 spacing(sm);
    }

    @include respond-to(md) {
      font-size: font-size(lg);
      max-width: 700px;
      padding: 0;
    }
  }
  </style>