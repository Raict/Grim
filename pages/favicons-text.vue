<template>
    <div>
      <!-- Hero Section -->
      <section class="section section--hero section--text-generator">
        <div class="container">
          <div class="hero-content fade-in-up">
            <h1 class="section__title">
              {{ $t('pages.textGenerator.title') }}
            </h1>
            
            <p class="section__subtitle">
              {{ $t('pages.textGenerator.subtitle') }}
            </p>
            
          </div>
        </div>
      </section>
  
      <!-- Text Favicon Generator -->
      <section class="section section-settings">
        <div class="container">
          <div class="generator-card">
            <div class="generator-layout">
              <!-- Left side: Text settings + Preview -->
              <div class="text-settings">
                <h3 class="settings-title">
                  <Icon name="lucide:type" />
                  {{ $t('pages.textGenerator.settings.text.title') }}
                </h3>
                
                <!-- Text and Font in one row -->
                <div class="text-font-row">
                  <div class="form-group form-group--text">
                    <label class="form-label">{{ $t('pages.textGenerator.settings.text.label') }}</label>
                    <input
                      v-model="textSettings.text"
                      type="text"
                      class="form-input form-input--text"
                      :placeholder="$t('pages.textGenerator.settings.text.placeholder')"
                      maxlength="3"
                    />
                  </div>
  
                  <div class="form-group form-group--font">
                    <label class="form-label">{{ $t('pages.textGenerator.settings.text.font') }}</label>
                    <select v-model="textSettings.fontFamily" class="form-select form-select--font">
                      <option v-for="font in fontOptions" :key="font.value" :value="font.value">
                        {{ font.label }}
                      </option>
                    </select>
                  </div>
                </div>
  
                <div class="form-group">
                  <label class="form-label">{{ $t('pages.textGenerator.settings.text.size') }}</label>
                  <div class="range-group">
                    <input
                      v-model="textSettings.fontSize"
                      type="range"
                      min="0"
                      max="48"
                      class="form-range"
                    />
                    <span class="range-value">{{ textSettings.fontSize }}px</span>
                  </div>
                </div>

  
                <!-- Square Preview -->
                <div class="preview-container">
                  <canvas
                    ref="previewCanvas"
                    :width="150"
                    :height="150"
                    class="preview-canvas"
                  ></canvas>
                </div>
              </div>
  
              <!-- Right side: Colors and style -->
              <div class="color-settings">
                <h3 class="settings-title">
                  <Icon name="lucide:palette" />
                  {{ $t('pages.textGenerator.settings.colors.title') }}
                </h3>
  
                <!-- Quick colors -->
                <div class="form-group">
                  <label class="form-label">{{ $t('pages.textGenerator.settings.colors.quickColors') }}</label>
                  <div class="color-palette">
                    <button
                      v-for="color in quickColors"
                      :key="color"
                      class="color-swatch"
                      :style="{ backgroundColor: color }"
                      @click="textSettings.backgroundColor = color"
                      :class="{ 'color-swatch--active': textSettings.backgroundColor === color }"
                      :title="color"
                    ></button>
                  </div>
                </div>
  
                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label">{{ $t('pages.textGenerator.settings.colors.textColor') }}</label>
                    <div class="color-input-group">
                      <input
                        v-model="textSettings.textColor"
                        type="color"
                        class="form-color"
                      />
                      <input
                        v-model="textSettings.textColor"
                        type="text"
                        class="form-input form-input--color"
                      />
                    </div>
                  </div>
  
                  <div class="form-group">
                    <label class="form-label">{{ $t('pages.textGenerator.settings.colors.backgroundColor') }}</label>
                    <div class="color-input-group">
                      <input
                        v-model="textSettings.backgroundColor"
                        type="color"
                        class="form-color"
                      />
                      <input
                        v-model="textSettings.backgroundColor"
                        type="text"
                        class="form-input form-input--color"
                      />
                    </div>
                  </div>
                </div>
  
                <div class="form-group">
                  <label class="form-label">{{ $t('pages.textGenerator.settings.colors.backgroundType') }}</label>
                  <div class="radio-group">
                    <label class="radio-option">
                      <input
                        v-model="textSettings.backgroundType"
                        type="radio"
                        value="solid"
                      />
                      <span class="radio-custom"></span>
                      <span>{{ $t('pages.textGenerator.settings.colors.solid') }}</span>
                    </label>
                    <label class="radio-option">
                      <input
                        v-model="textSettings.backgroundType"
                        type="radio"
                        value="gradient"
                      />
                      <span class="radio-custom"></span>
                      <span>{{ $t('pages.textGenerator.settings.colors.gradient') }}</span>
                    </label>
                    <label class="radio-option">
                      <input
                        v-model="textSettings.backgroundType"
                        type="radio"
                        value="transparent"
                      />
                      <span class="radio-custom"></span>
                      <span>{{ $t('pages.textGenerator.settings.colors.transparent') }}</span>
                    </label>
                  </div>
                </div>
  
                <div v-if="textSettings.backgroundType === 'gradient'" class="form-group">
                  <label class="form-label">{{ $t('pages.textGenerator.settings.colors.gradientColor') }}</label>
                  <div class="color-input-group">
                    <input
                      v-model="textSettings.gradientColor"
                      type="color"
                      class="form-color"
                    />
                    <input
                      v-model="textSettings.gradientColor"
                      type="text"
                      class="form-input form-input--color"
                    />
                  </div>
                </div>
              </div>
            </div>
  
          </div>
           <!-- Size selection -->
           <div class="sizes-section">
              <SizeSelector v-model="selectedSizes" />
            </div>
  
            <!-- Generate button -->
            <div class="generation-section">
              <button
                class="btn btn--gradient btn--lg btn--full"
                :disabled="!textSettings.text || isGenerating"
                @click="generateFavicons"
              >
                <Icon 
                  v-if="!isGenerating"
                  name="lucide:download" 
                />
                <div 
                  v-if="isGenerating"
                  class="spinner"
                ></div>
                {{ isGenerating ? $t('pages.textGenerator.generating') : $t('pages.textGenerator.generate') }}
              </button>
            </div>
  
            <!-- Installation guide -->
            <InstallationGuide 
              v-if="generatedImages.length > 0"
              :generated-sizes="selectedSizes"
            />
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import JSZip from 'jszip'
  
  const fontOptions = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Impact', label: 'Impact' },
    { value: 'Comic Sans MS', label: 'Comic Sans MS' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Trebuchet MS', label: 'Trebuchet MS' },
    { value: 'Tahoma', label: 'Tahoma' },
    { value: 'Palatino', label: 'Palatino' },
    { value: 'Garamond', label: 'Garamond' },
    { value: 'Bookman', label: 'Bookman' },
    { value: 'Avant Garde', label: 'Avant Garde' },
    { value: 'Arial Black', label: 'Arial Black' },
    { value: 'Century Gothic', label: 'Century Gothic' },
    { value: 'Lucida Console', label: 'Lucida Console' },
    { value: 'Monaco', label: 'Monaco' },
    { value: 'Optima', label: 'Optima' },
    { value: 'Futura', label: 'Futura' }
  ]
  
  const quickColors = [
    '#ef4444', '#dc2626', '#b91c1c',
    '#f97316', '#ea580c', '#c2410c',
    '#f59e0b', '#d97706', '#b45309',
    '#84cc16', '#65a30d', '#4d7c0f',
    '#22c55e', '#16a34a', '#15803d',
    '#06b6d4', '#0891b2', '#0e7490',
    '#3b82f6', '#2563eb', '#1d4ed8',
    '#8b5cf6', '#7c3aed', '#6d28d9',
    '#ec4899', '#db2777', '#be185d',
    '#6b7280', '#4b5563', '#374151',
    '#000000', '#1f2937', '#ffffff'
  ]
  
  const textSettings = reactive({
    text: 'A',
    fontFamily: 'Arial',
    fontSize: 24,
    textColor: '#ffffff',
    backgroundColor: '#10b981',
    backgroundType: 'solid',
    gradientColor: '#14b8a6'
  })
  
  const selectedSizes = ref([16, 32, 48])
  const isGenerating = ref(false)
  const generatedImages = ref<any[]>([])
  const previewCanvas = ref<HTMLCanvasElement | null>(null)
  
  const drawTextOnCanvas = (canvas: HTMLCanvasElement, size: number) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
  
    ctx.clearRect(0, 0, size, size)
  
    if (textSettings.backgroundType === 'transparent') {
      // Transparent background
    } else if (textSettings.backgroundType === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, size, size)
      gradient.addColorStop(0, textSettings.backgroundColor)
      gradient.addColorStop(1, textSettings.gradientColor)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size, size)
    } else {
      ctx.fillStyle = textSettings.backgroundColor
      ctx.fillRect(0, 0, size, size)
    }
  
    // Better text centering
    const fontSize = Math.floor(size * (textSettings.fontSize / 48))
    ctx.font = `${fontSize}px ${textSettings.fontFamily}`
    ctx.fillStyle = textSettings.textColor
    ctx.textAlign = 'center'
    
    // Improved vertical centering
    const metrics = ctx.measureText(textSettings.text)
    const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    const centerY = size / 2 + (actualHeight / 2) - metrics.actualBoundingBoxDescent
    
    ctx.fillText(textSettings.text, size / 2, centerY)
  }
  
  const updatePreview = async () => {
    await nextTick()
    if (previewCanvas.value) {
      drawTextOnCanvas(previewCanvas.value, 150)
    }
  }
  
  const generateFavicons = async () => {
    if (!textSettings.text) return
  
    isGenerating.value = true
    
    try {
      const zip = new JSZip()
      const images: any[] = []
  
      for (const size of selectedSizes.value) {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        
        drawTextOnCanvas(canvas, size)
        
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
      drawTextOnCanvas(icoCanvas, icoSize)
      const icoData = icoCanvas.toDataURL('image/png').split(',')[1]
      zip.file('favicon.ico', icoData, { base64: true })
  
      const manifest = {
        name: "My Website",
        short_name: "Website",
        icons: [] as Array<{ src: string; sizes: string; type: string }>,
        theme_color: textSettings.backgroundColor,
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
      
      await downloadZipFile(zipDataUrl, 'text-favicon-package.zip')
      
      generatedImages.value = images
      // toast.success('Фавіконки з тексту успішно згенеровано!')
      
    } catch (error) {
      console.error('Error generating text favicons:', error)
      // toast.error('Помилка при генерації фавіконок')
    } finally {
      isGenerating.value = false
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
  
  watch(textSettings, updatePreview, { deep: true })
  
  onMounted(() => {
    updatePreview()
  })
  
  const useHeadHook = useHead({
    title: 'Генератор фавіконок з тексту - Faviconitys',
    meta: [
      { 
        name: 'description', 
        content: 'Створюйте фавіконки з тексту або символів. Налаштовуйте шрифти, кольори та стилі. Безкоштовний генератор фавіконок.' 
      }
    ]
  })
  </script>
  
  <style lang="scss" scoped>
  .section--text-generator {
    background: var(--bg-primary);
    padding: 2rem 0 spacing(xl);
    .section__title {
        margin-bottom: 0.5rem;
    }
    .section__subtitle {
        margin-bottom: 0;
    }
  }
  .generator-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: border-radius(xl);
    margin: 0 auto;
    padding: spacing(xl);

  }
  
  .generator-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(3xl);
    
    @include respond-to(lg) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .settings-title {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    font-size: font-size(lg);
    font-weight: font-weight(semibold);
    color: var(--text-primary);
    margin-bottom: spacing(md);
    
    svg {
      width: 20px;
      height: 20px;
      color: var(--primary);
    }
  }
  
  // Text and font in one row
.text-font-row {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: spacing(sm);
  margin-bottom: spacing(lg);
}
  
  .form-group {
    margin-bottom: spacing(lg);
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &--text {
      margin-bottom: 0;
    }
    
    &--font {
      margin-bottom: 0;
    }
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(lg);
    
    @include respond-to(sm) {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .form-label {
    display: block;
    font-size: font-size(sm);
    font-weight: font-weight(medium);
    color: var(--text-primary);
    margin-bottom: spacing(xs);
  }
  
  .form-input {
    width: 100%;
    padding: spacing(sm) spacing(md);
    border: 1px solid var(--border);
    border-radius: border-radius(lg);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: font-size(base);
    @include transition();
    
    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    // Smaller text input for 1-2 letters
    &--text {
        min-height: 46px;
      text-align: center;
      font-size: font-size(xl);
      font-weight: font-weight(bold);
      padding: spacing(xs);
    }
    
    &--color {
      flex: 1;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: font-size(sm);
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
    
    // Fix dropdown arrow spacing
    padding-right: spacing(2xl);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right spacing(md) center;
    background-repeat: no-repeat;
    background-size: 16px 16px;
    appearance: none;
    
    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    &--font {
      font-size: font-size(sm);
      min-height: 46px;
    }
  }
  
  .range-group {
    display: flex;
    align-items: center;
    gap: spacing(md);
  }
  
  .form-range {
    height: 12px;
    padding: 0;
    background: var(--bg-tertiary);
    border-radius: border-radius(full);
    outline: none;
    appearance: none;
    
    // Fix range input not reaching the end
    &::-webkit-slider-track {
      width: 90%;
      height: 6px;
      background: var(--bg-tertiary);
      border-radius: border-radius(full);
    }
    
    &::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      background: var(--primary);
      border-radius: 50%;
      cursor: pointer;
      @include transition();
      
      &:hover {
        transform: scale(1.1);
      }
    }
    
    &::-moz-range-track {
      width: 90%;
      height: 6px;
      background: var(--bg-tertiary);
      border-radius: border-radius(full);
      border: none;
    }
    
    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: var(--primary);
      border-radius: 50%;
      border: none;
      cursor: pointer;
      @include transition();
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  
  .range-value {
    font-size: font-size(sm);
    color: var(--text-secondary);
    font-weight: font-weight(semibold);
    min-width: 58px;
    text-align: right;
    background: var(--bg-tertiary);
    padding: spacing(xs) spacing(sm);
    border-radius: border-radius(md);
  }
  
  .form-hint {
    font-size: font-size(xs);
    color: var(--text-tertiary);
    margin-top: spacing(xs);
    font-style: italic;
  }
  
  // Square preview container
  .preview-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 180px;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: border-radius(lg);
    margin: spacing(lg) auto 0;
    padding: spacing(sm);
  }
  
  .preview-canvas {
    border-radius: border-radius(sm);
    @include transition();
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  .color-palette {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: spacing(xs);
    padding: spacing(md);
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-radius: border-radius(lg);
    border: 1px solid #e2e8f0;
    
    .dark-mode & {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border-color: #334155;
    }
  }
  
  .color-swatch {
    width: 32px;
    height: 32px;
    border-radius: border-radius(md);
    border: 2px solid transparent;
    cursor: pointer;
    @include transition();
    position: relative;
    
    &:hover {
      transform: scale(1.15);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 2;
    }
    
    &--active {
      border-color: var(--text-primary);
      transform: scale(1.15);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 3;
      
      &::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 14px;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }
    }
  }
  
  .color-input-group {
    display: flex;
    gap: spacing(sm);
    align-items: center;
  }
  
  // Fix color input to show full color
  .form-color {
    width: 50px;
    height: 44px;
    border: 1px solid var(--border);
    border-radius: border-radius(lg);
    cursor: pointer;
    @include transition();
    padding: 0;
    background: none;
    
    &:hover {
      border-color: var(--primary);
      transform: scale(1.05);
    }
    
    // Remove default styling
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    
    &::-webkit-color-swatch {
      border: none;
      border-radius: border-radius(lg);
    }
    
    &::-moz-color-swatch {
      border: none;
      border-radius: border-radius(lg);
    }
  }
  
  .radio-group {
    display: flex;
    gap: spacing(md);
    flex-wrap: wrap;
  }
  
  .radio-option {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    cursor: pointer;
    padding: spacing(sm);
    border-radius: border-radius(md);
    @include transition();
    
    &:hover {
      background: var(--bg-tertiary);
    }
    
    input[type="radio"] {
      position: absolute;
      opacity: 0;
      
      &:checked + .radio-custom {
        background: var(--primary);
        border-color: var(--primary);
        
        &::after {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
  }
  
  .radio-custom {
    width: 20px;
    height: 20px;
    border: 2px solid var(--border);
    border-radius: 50%;
    position: relative;
    @include transition();
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
      @include transition();
    }
  }
  
  .sizes-section {
    padding-top: spacing(2xl);
    margin-bottom: spacing(2xl);
  }

  .section-settings {
    padding-top: spacing(lg);
    padding-bottom: spacing(2xl);
  }
  
  .generation-section {
    text-align: center;
    padding-top: spacing(xl);
  }
  
  .btn--full {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: spacing(sm);
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
  
  // Responsive improvements
  @include respond-to(sm) {
    .color-palette {
      grid-template-columns: repeat(12, 1fr);
    }
    
    .color-swatch {
      width: 28px;
      height: 28px;
    }
  }
  
  @include respond-to(md) {
    .generator-card {
      padding: spacing(2xl);
    }
  }

  </style>
  