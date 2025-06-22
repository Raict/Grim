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
              <!-- Left: Text settings + Preview -->
              <div class="text-settings">
                <h3 class="settings-title">
                  <Icon name="lucide:type" />
                  {{ $t('pages.textGenerator.settings.text.title') }}
                </h3>
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

                  <div class="form-group">
                    <label class="form-label">{{ $t('pages.textGenerator.settings.text.border') }}</label>
  <div class="range-group">
    <input
  v-model="textSettings.borderRadiusPercent"
  type="range"
  min="0"
  max="100"
  class="form-range"
/>
    <span class="range-value">{{ textSettings.borderRadiusPercent }}%</span>
  </div>
</div>
                </div>
  
                <!-- Preview Favicons (row, right-to-left) -->
                <div class="favicons-preview-row">
                  <div
                    v-for="size in [96,64, 48, 32, 16]"
                    :key="size"
                    class="favicon-preview-item"
                  >
                    <canvas
                      :ref="el => setFaviconPreviewRef(size, el as HTMLCanvasElement | null)"
                      :width="size"
                      :height="size"
                      :style="{ width: size + 'px', height: size + 'px' }"
                      class="favicon-preview-canvas"
                    ></canvas>
                    <div class="favicon-size-label">{{ size }}x{{ size }}</div>
                  </div>
                </div>
              </div>
  
              <!-- Right: Colors and style -->
              <div class="color-settings">
                <h3 class="settings-title">
                  <Icon name="lucide:palette" />
                  {{ $t('pages.textGenerator.settings.colors.title') }}
                </h3>
  
                <div class="palettes-row">
  <!-- Font Color -->
  <div class="color-block">
    <div class="palette-bg">
        <label class="palette-label">Font Color</label>
        <div class="color-palette-pro">
      <template v-for="(row, i) in colorPaletteColumns" :key="'text-row-' + i">
        <div class="color-row">
          <button
            v-for="color in row"
            :key="'text-' + color"
            class="color-swatch"
            :style="{ backgroundColor: color }"
            @click="textSettings.textColor = color"
            :class="{ 'color-swatch--active': textSettings.textColor === color }"
            :title="color"
          ></button>
        </div>
      </template>
      <div class="color-row grayscale-column">
        <button
          v-for="color in grayscalePalette"
          :key="'text-gray-' + color"
          class="color-swatch"
          :style="{ backgroundColor: color }"
          @click="textSettings.textColor = color"
          :class="{ 'color-swatch--active': textSettings.textColor === color }"
          :title="color"
        ></button>
      </div>
    </div>
    </div>
    <div class="color-input-row">
      <input
        v-model="textSettings.textColor"
        type="color"
        class="color-picker"
        :style="{ background: textSettings.textColor }"
      />
      <input
        v-model="textSettings.textColor"
        type="text"
        class="color-input"
        maxlength="7"
        placeholder="#FFFFFF"
      />
    </div>
  </div>

  <!-- Background Color Block -->
  <div class="color-block">
    <div class="palette-bg">
    <label class="palette-label">Background Color</label>
    <div class="color-palette-pro">
      <template v-for="(row, i) in colorPaletteColumns" :key="'bg-row-' + i">
        <div class="color-row">
          <button
            v-for="color in row"
            :key="'bg-' + color"
            class="color-swatch"
            :style="{ backgroundColor: color }"
            @click="textSettings.backgroundColor = color"
            :class="{ 'color-swatch--active': textSettings.backgroundColor === color }"
            :title="color"
          ></button>
        </div>
      </template>
      <div class="color-row grayscale-column">
        <button
          v-for="color in grayscalePalette"
          :key="'bg-gray-' + color"
          class="color-swatch"
          :style="{ backgroundColor: color }"
          @click="textSettings.backgroundColor = color"
          :class="{ 'color-swatch--active': textSettings.backgroundColor === color }"
          :title="color"
        ></button>
      </div>
    </div>
    </div>
    <div class="color-input-row">
      <input
        v-model="textSettings.backgroundColor"
        type="color"
        class="color-picker"
        :style="{ background: textSettings.backgroundColor }"
      />
      <input
        v-model="textSettings.backgroundColor"
        type="text"
        class="color-input"
        maxlength="7"
        placeholder="#209CEE"
      />
    </div>
  </div>
</div>

                <!-- Rest remains unchanged -->
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

  
  const colorPalette = [
    // Red (10 shades)
    ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
    // Orange (10 shades)
    ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12'],
    // Yellow (10 shades)
    ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12'],
    // Green (10 shades)
    ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
    // Emerald (10 shades)
    ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
    // Teal (10 shades)
    ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a'],
    // Cyan (10 shades)
    ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'],
    // Blue (10 shades)
    ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
    // Indigo (10 shades)
    ['#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81'],
    // Violet (10 shades)
    ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'],
    // Purple (10 shades)
    ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6e11b0', '#581c87'],
    // Fuchsia (10 shades)
    ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75'],
    // Pink (10 shades)
    ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843'],
    // Rose (10 shades)
    ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337']
  ]

  const grayscalePalette = [
  '#ffffff',
  '#e5e5e5',
  '#cccccc',
  '#b2b2b2',
  '#999999',
  '#7f7f7f',
  '#666666',
  '#4c4c4c',
  '#333333',
  '#292929',
  '#1f1f1f',
  '#141414',
  '#0a0a0a',
  '#000000'
]



  const colorPaletteColumns = Array.from({ length: colorPalette[0].length }, (_, colIdx) =>
  colorPalette.map(row => row[colIdx])
)

  const textSettings = reactive({
    text: 'A',
    fontFamily: 'Arial',
    fontSize: 24,
    textColor: '#ffffff',
    backgroundColor: '#10b981',
    backgroundType: 'solid',
      gradientColor: '#14b8a6',
      borderRadiusPercent: 50
  })
  
  const selectedSizes = ref([16, 32, 48])
  const isGenerating = ref(false)
  const generatedImages = ref<any[]>([])
  const previewCanvas = ref<HTMLCanvasElement | null>(null)
  const faviconPreviewRefs = reactive<Record<number, HTMLCanvasElement | null>>({})

  function setFaviconPreviewRef(size: number, el: HTMLCanvasElement | null) {
    faviconPreviewRefs[size] = el
  }
  
  const drawTextOnCanvas = (canvas: HTMLCanvasElement, size: number) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, size, size);

      const percent = Math.max(0, Math.min(textSettings.borderRadiusPercent, 100))
      const radius = (percent / 100) * (size / 2)
  ctx.save();

  if (radius >= size / 2) {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    // Фон
    if (textSettings.backgroundType === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, textSettings.backgroundColor);
      gradient.addColorStop(1, textSettings.gradientColor);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = textSettings.backgroundColor;
    }
    ctx.fillRect(0, 0, size, size);
  } else {
    // Скруглений квадрат
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.clip();
    // Фон
    if (textSettings.backgroundType === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, textSettings.backgroundColor);
      gradient.addColorStop(1, textSettings.gradientColor);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = textSettings.backgroundColor;
    }
    ctx.fillRect(0, 0, size, size);
  }

  // Текст
  const fontSize = Math.floor(size * (textSettings.fontSize / 48));
  ctx.font = `${fontSize}px ${textSettings.fontFamily}`;
  ctx.fillStyle = textSettings.textColor;
  ctx.textAlign = 'center';
  const metrics = ctx.measureText(textSettings.text);
  const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  const centerY = size / 2 + (actualHeight / 2) - metrics.actualBoundingBoxDescent;
  ctx.fillText(textSettings.text, size / 2, centerY);

  ctx.restore();
};


  
  const updatePreview = async () => {
    await nextTick()
    if (previewCanvas.value) {
      drawTextOnCanvas(previewCanvas.value, 150)
    }
  }

  const updateFavicon = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return
    const dataUrl = canvas.toDataURL('image/png')
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null
    if (!favicon) {
      favicon = document.createElement('link') as HTMLLinkElement
      favicon.rel = 'icon'
      document.head.appendChild(favicon)
    }
    favicon.setAttribute('type', 'image/png')
    favicon.setAttribute('href', dataUrl)
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
  watch(
    textSettings,
    async () => {
      await nextTick();
      [16, 32, 48, 64, 96].forEach(size => {
        const canvas = faviconPreviewRefs[size]
        if (canvas) drawTextOnCanvas(canvas, size)
      })
      updateFavicon(faviconPreviewRefs[32] || null)
    },
    { deep: true }
  )
  
  onMounted(() => {
    [16, 32, 48, 64, 96].forEach(size => {
      const canvas = faviconPreviewRefs[size]
      if (canvas) drawTextOnCanvas(canvas, size)
    })
    updateFavicon(faviconPreviewRefs[32] || null)
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
    gap: spacing(xl);
    @include respond-to(xl) {
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
    &--text { margin-bottom: 0; }
    &--font { margin-bottom: 0; }
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
      &:hover { transform: scale(1.1); }
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
      &:hover { transform: scale(1.1); }
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

  .favicons-preview-row {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 16px;
    margin-bottom: 32px;
  }
  .favicon-preview-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .favicon-size-label {
      margin-top: 6px;
      font-size: 13px;
      color: #888;
    }
  }
  .favicon-preview-canvas {
    background: transparent;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  }

  .palettes-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: spacing(lg);
    margin-top: 32px;
    margin-bottom: 16px;

      
  @include respond-to(md) {
    gap: spacing(xl);
  }

  }
  .color-block {
    margin: 0 auto;
    .palette-label {
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--text-primary);
    }
    .color-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .palette-bg {
  background: var(--border);
  border-radius: 16px;
  padding: spacing(sm);
  display: inline-block;
  margin: 0 auto;
  margin-bottom: spacing(md);

}
    .color-picker {
      width: 50px;
      height: 38px;
      border: 1px solid var(--border);
      border-radius: border-radius(md);
      cursor: pointer;
      @include transition();
      padding: 0;
      background: none;
      
      &:hover {
        border-color: var(--primary);
        transform: scale(1.05);
      }
      
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
    .color-input {
      flex: 1;
      min-width: 84px;
      font-size: 16px;
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      background: var(--bg-primary);
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      color: var(--text-primary);
    }
  }
  .color-palette-pro {
    display: flex;
    flex-direction: row;
    gap: 2px;
    .color-row {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .grayscale-column {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
  }
  .color-swatch {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: 0.12s;
    box-shadow: 0 1px 2px rgba(0,0,0,0.06);
    &:hover {
      border-color: var(--primary);
    }
    &--active {
      border-color: var(--primary);
      outline: 2px solid var(--bg-primary);
      z-index: 2;
    }
  }

  .color-input-group {
    display: flex;
    gap: spacing(sm);
    align-items: center;
  }
  
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
  
  @include respond-to(sm) {
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