<template>
  <div>
    <!-- Hero Section -->
    <section class="section section--hero">
      <div class="container">
        <div class="hero-content fade-in-up">
          <h1 class="section__title">
            {{ $t('pages.aiGenerator.title') }}
          </h1>
          
          <p class="section__subtitle">
            {{ $t('pages.aiGenerator.subtitle') }}
          </p>
          
          <p class="section__description">
            {{ $t('pages.aiGenerator.description') }}
          </p>
        </div>
      </div>
    </section>

    <!-- AI Favicon Generator -->
    <section class="section">
      <div class="container">
        <div class="card generator-card">
          <div class="generator-content">
            <div class="generator-section">
              <h3 class="generator-section__title">
                <Icon name="lucide:sparkles" />
                {{ $t('pages.aiGenerator.prompt.title') }}
              </h3>
              
              <div class="form-group">
                <label class="form-label">{{ $t('pages.aiGenerator.prompt.label') }}</label>
                <textarea
                  v-model="aiSettings.prompt"
                  class="form-textarea"
                  :placeholder="$t('pages.aiGenerator.prompt.placeholder')"
                  rows="4"
                ></textarea>
                <p class="form-hint">{{ $t('pages.aiGenerator.prompt.hint') }}</p>
              </div>

              <div class="prompt-examples">
                <h4 class="prompt-examples__title">{{ $t('pages.aiGenerator.prompt.examples') }}</h4>
                <div class="prompt-examples__list">
                  <button
                    v-for="example in promptExamples"
                    :key="example"
                    class="prompt-example"
                    @click="aiSettings.prompt = example"
                  >
                    {{ example }}
                  </button>
                </div>
              </div>
            </div>
            <div class="generator-section">
              <h3 class="generator-section__title">
                <Icon name="lucide:brush" />
                {{ $t('pages.aiGenerator.settings.title') }}
              </h3>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">{{ $t('pages.aiGenerator.settings.style') }}</label>
                  <select v-model="aiSettings.style" class="form-select">
                    <option value="modern">{{ $t('pages.aiGenerator.styles.modern') }}</option>
                    <option value="minimalist">{{ $t('pages.aiGenerator.styles.minimalist') }}</option>
                    <option value="flat">{{ $t('pages.aiGenerator.styles.flat') }}</option>
                    <option value="3d">{{ $t('pages.aiGenerator.styles.3d') }}</option>
                    <option value="vintage">{{ $t('pages.aiGenerator.styles.vintage') }}</option>
                    <option value="cartoon">{{ $t('pages.aiGenerator.styles.cartoon') }}</option>
                    <option value="professional">{{ $t('pages.aiGenerator.styles.professional') }}</option>
                    <option value="artistic">{{ $t('pages.aiGenerator.styles.artistic') }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">{{ $t('pages.aiGenerator.settings.colorScheme') }}</label>
                  <select v-model="aiSettings.colorScheme" class="form-select">
                    <option value="auto">{{ $t('pages.aiGenerator.colorSchemes.auto') }}</option>
                    <option value="blue">{{ $t('pages.aiGenerator.colorSchemes.blue') }}</option>
                    <option value="green">{{ $t('pages.aiGenerator.colorSchemes.green') }}</option>
                    <option value="red">{{ $t('pages.aiGenerator.colorSchemes.red') }}</option>
                    <option value="purple">{{ $t('pages.aiGenerator.colorSchemes.purple') }}</option>
                    <option value="orange">{{ $t('pages.aiGenerator.colorSchemes.orange') }}</option>
                    <option value="monochrome">{{ $t('pages.aiGenerator.colorSchemes.monochrome') }}</option>
                    <option value="rainbow">{{ $t('pages.aiGenerator.colorSchemes.rainbow') }}</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">{{ $t('pages.aiGenerator.settings.complexity') }}</label>
                  <select v-model="aiSettings.complexity" class="form-select">
                    <option value="simple">{{ $t('pages.aiGenerator.complexity.simple') }}</option>
                    <option value="medium">{{ $t('pages.aiGenerator.complexity.medium') }}</option>
                    <option value="complex">{{ $t('pages.aiGenerator.complexity.complex') }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">{{ $t('pages.aiGenerator.settings.variants') }}</label>
                  <select v-model="aiSettings.variants" class="form-select">
                    <option v-for="count in [1, 2, 3, 4]" :key="count" :value="String(count)">
                      {{ $t('pages.aiGenerator.variantCount', { count }) }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="generator-actions">
              <button
                class="btn btn--gradient btn--lg"
                :disabled="!aiSettings.prompt.trim() || isGenerating"
                @click="generateAIFavicons"
              >
                <Icon 
                  v-if="!isGenerating"
                  name="lucide:sparkles" 
                />
                <div 
                  v-if="isGenerating"
                  class="spinner"
                ></div>
                {{ isGenerating ? $t('pages.aiGenerator.generating') : $t('pages.aiGenerator.generate') }}
              </button>
              
              <p class="generation-note">
                <Icon name="lucide:info" />
                {{ $t('pages.aiGenerator.generationNote') }}
              </p>
            </div>

            <div v-if="generatedVariants.length > 0" class="results-section">
              <h3 class="generator-section__title">
                <Icon name="lucide:image" />
                {{ $t('pages.aiGenerator.results') }}
              </h3>

              <div class="variants-grid">
                <div
                  v-for="(variant, index) in generatedVariants"
                  :key="index"
                  class="variant-card"
                  :class="{ 'variant-card--selected': selectedVariant === index }"
                  @click="selectedVariant = index"
                >
                  <div class="variant-preview">
                    <img :src="variant.preview" :alt="`${$t('pages.aiGenerator.variant')} ${index + 1}`" />
                  </div>
                  <div class="variant-info">
                    <h4 class="variant-title">{{ $t('pages.aiGenerator.variant') }} {{ index + 1 }}</h4>
                    <button
                      class="btn btn--ghost btn--sm"
                      @click.stop="selectVariant(index)"
                    >
                      {{ $t('pages.aiGenerator.selectVariant') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="selectedVariant !== null">
              <SizeSelector v-model="selectedSizes" />

              <div class="generator-actions">
                <button
                  class="btn btn--primary btn--lg"
                  :disabled="selectedSizes.length === 0 || isProcessing"
                  @click="processFinalFavicons"
                >
                  <Icon 
                    v-if="!isProcessing"
                    name="lucide:download" 
                  />
                  <div 
                    v-if="isProcessing"
                    class="spinner"
                  ></div>
                  {{ isProcessing ? $t('pages.aiGenerator.processing') : $t('pages.aiGenerator.downloadFavicons') }}
                </button>
              </div>
            </div>
          </div>

          <InstallationGuide 
            v-if="finalImages.length > 0"
            :generated-sizes="selectedSizes"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import JSZip from 'jszip'
const { t } = useI18n({ useScope: 'global' });
// SEO
useHead({
      title: t('pages.aiGenerator.fullTitle'),
      meta: [
        {
          name: 'description',
          content: t('pages.aiGenerator.metaDescription'),
        },
      ],
    });

const nuxtToast = useAppToast()
const toast = {
  success: (title: string) => nuxtToast.add({ title, color: 'success' }),
  error: (title: string) => nuxtToast.add({ title, color: 'error' })
}

const aiSettings = reactive({
  prompt: '',
  style: 'modern',
  colorScheme: 'auto',
  complexity: 'medium',
  variants: '3'
})


const isGenerating = ref(false)
const isProcessing = ref(false)
const generatedVariants = ref<any[]>([])
const selectedVariant = ref<number | null>(null)
const selectedSizes = ref([16, 32, 48, 180, 192, 512])
const finalImages = ref<any[]>([])

const promptExamples = computed(() => [1, 2, 3, 4, 5, 6].map(index => t(`pages.aiGenerator.promptExamples.${index}`)))

const generateAIFavicons = async () => {
  if (!aiSettings.prompt.trim()) return

  isGenerating.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 3000))
    const variants = []
    const variantCount = parseInt(aiSettings.variants)
    
    for (let i = 0; i < variantCount; i++) {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 64, 64)
        const colors = ['#10b981', '#14b8a6', '#6366f1', '#8b5cf6', '#f59e0b']
        gradient.addColorStop(0, colors[i % colors.length])
        gradient.addColorStop(1, colors[(i + 1) % colors.length])
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)
      
        ctx.fillStyle = 'white'
        ctx.font = '24px Arial'
        ctx.textAlign = 'center'
        ctx.fillText((i + 1).toString(), 32, 40)
      }
      
      variants.push({
        preview: canvas.toDataURL(),
        data: canvas.toDataURL()
      })
    }
    
    generatedVariants.value = variants
    toast.success(t('pages.aiGenerator.generatedSuccess', { count: variantCount }))
    
  } catch (error) {
    console.error('Error generating AI favicons:', error)
    toast.error(t('pages.aiGenerator.generationError'))
  } finally {
    isGenerating.value = false
  }
}


const selectVariant = (index: number) => {
  selectedVariant.value = index
  toast.success(t('pages.aiGenerator.variantSelected', { count: index + 1 }))
}

const processFinalFavicons = async () => {
  if (selectedVariant.value === null) return

  isProcessing.value = true
  
  try {
    const zip = new JSZip()
    const images: any[] = []
    const selectedVariantData = generatedVariants.value[selectedVariant.value]

    for (const size of selectedSizes.value) {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        const img = new Image()
        await new Promise((resolve) => {
          img.onload = resolve
          img.src = selectedVariantData.data
        })
        
        ctx.drawImage(img, 0, 0, size, size)
      }
      
      const dataUrl = canvas.toDataURL('image/png')
      const base64Data = dataUrl.split(',')[1]
      
      let fileName = `favicon-${size}x${size}.png`
      if (size === 180) fileName = 'apple-touch-icon.png'
      if (size === 192) fileName = 'android-chrome-192x192.png'
      if (size === 512) fileName = 'android-chrome-512x512.png'
      
      zip.file(fileName, base64Data, { base64: true })
      
      images.push({
        size,
        dataUrl,
        fileName
      })
    }

    const icoSize = selectedSizes.value.includes(32) ? 32 : selectedSizes.value.includes(16) ? 16 : selectedSizes.value[0]
    const icoCanvas = document.createElement('canvas')
    icoCanvas.width = icoSize
    icoCanvas.height = icoSize
    const icoCtx = icoCanvas.getContext('2d')
    
    if (icoCtx) {
      const img = new Image()
      await new Promise((resolve) => {
        img.onload = resolve
        img.src = selectedVariantData.data
      })
      icoCtx.drawImage(img, 0, 0, icoSize, icoSize)
    }
    
    const icoData = icoCanvas.toDataURL('image/png').split(',')[1]
    zip.file('favicon.ico', icoData, { base64: true })

    const manifest = {
      name: "My Website",
      short_name: "Website",
      icons: [] as Array<{ src: string; sizes: string; type: string }>,
      theme_color: "#10b981",
      background_color: "#ffffff",
      display: "standalone"
    }

    images.forEach(({ size, fileName }) => {
      if (size >= 192) {
        manifest.icons.push({
          src: `/${fileName}`,
          sizes: `${size}x${size}`,
          type: "image/png"
        })
      }
    })

    zip.file('site.webmanifest', JSON.stringify(manifest, null, 2))

    const zipBuffer = await zip.generateAsync({ type: 'blob' })
    const zipDataUrl = `data:application/zip;base64,${await blobToBase64(zipBuffer)}`
    
    await downloadZipFile(zipDataUrl, 'ai-favicon-package.zip')
    
    finalImages.value = images
    toast.success(t('pages.aiGenerator.processingSuccess'))
    
  } catch (error) {
    console.error('Error processing AI favicons:', error)
    toast.error(t('pages.aiGenerator.processingError'))
  } finally {
    isProcessing.value = false
  }
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.readAsDataURL(blob)
  })
}
</script>

<style lang="scss" scoped>
.generator-card {
  max-width: 900px;
  margin: 0 auto;
}

.generator-content {
  display: flex;
  flex-direction: column;
  gap: spacing(2xl);
}

.generator-section {
  &__title {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    font-size: font-size(lg);
    font-weight: font-weight(semibold);
    color: var(--text-primary);
    margin-bottom: spacing(lg);
    
    svg {
      width: 20px;
      height: 20px;
      color: var(--primary);
    }
  }
}

.form-group {
  margin-bottom: spacing(lg);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing(lg);
  
  @include respond-to(md) {
    grid-template-columns: 1fr 1fr;
  }
}

.form-label {
  display: block;
  font-size: font-size(sm);
  font-weight: font-weight(medium);
  color: var(--text-primary);
  margin-bottom: spacing(sm);
}

.form-textarea {
  width: 100%;
  padding: spacing(md);
  border: 1px solid var(--border);
  border-radius: border-radius(lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: font-size(base);
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  @include transition();
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
}

.form-select {
  width: 100%;
  padding: spacing(sm) spacing(md);
  border: 1px solid var(--border);
  border-radius: border-radius(lg);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: font-size(base);
  cursor: pointer;
  @include transition();
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
}

.form-hint {
  font-size: font-size(xs);
  color: var(--text-tertiary);
  margin-top: spacing(xs);
}

.prompt-examples {
  margin-top: spacing(lg);
  
  &__title {
    font-size: font-size(sm);
    font-weight: font-weight(medium);
    color: var(--text-secondary);
    margin-bottom: spacing(md);
  }
  
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: spacing(sm);
  }
}

.prompt-example {
  padding: spacing(xs) spacing(sm);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: border-radius(md);
  color: var(--text-secondary);
  font-size: font-size(sm);
  cursor: pointer;
  @include transition();
  
  &:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
}

.generator-actions {
  text-align: center;
  padding-top: spacing(xl);
  border-top: 1px solid var(--border);
}

.generation-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: spacing(xs);
  margin-top: spacing(md);
  font-size: font-size(sm);
  color: var(--text-tertiary);
  
  svg {
    width: 16px;
    height: 16px;
  }
}

.results-section {
  padding-top: spacing(xl);
  border-top: 1px solid var(--border);
}

.variants-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing(lg);
  
  @include respond-to(sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include respond-to(md) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.variant-card {
  @include card;
  padding: spacing(lg);
  cursor: pointer;
  @include transition();
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: shadow(lg);
  }
  
  &--selected {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
  }
}

.variant-preview {
  width: 100%;
  height: 120px;
  background: var(--bg-tertiary);
  border-radius: border-radius(lg);
  @include flex-center;
  margin-bottom: spacing(md);
  overflow: hidden;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}

.variant-info {
  text-align: center;
}

.variant-title {
  font-size: font-size(base);
  font-weight: font-weight(medium);
  color: var(--text-primary);
  margin-bottom: spacing(sm);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
