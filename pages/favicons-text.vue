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

    <!-- Text Faviconly Generator -->
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
                  <label class="form-label" for="text-input">{{ $t('pages.textGenerator.settings.text.label') }}</label>
                  <input
                    id="text-input"
                    v-model="textSettings.text"
                    type="text"
                    class="form-input form-input--text"
                    :placeholder="$t('pages.textGenerator.settings.text.placeholder')"
                    maxlength="3"
                    :aria-describedby="textSettings.text.length === 0 ? 'text-input-help' : undefined"
                  />
                  <div v-if="textSettings.text.length === 0" id="text-input-help" class="sr-only">
                    Введіть до 3 символів для генерації фавіконки
                  </div>
                </div>
                <div class="form-group form-group--font">
                  <label class="form-label" for="font-select">{{ $t('pages.textGenerator.settings.text.font') }}</label>
                    <!-- <select v-model="textSettings.fontFamily" class="form-select form-select--font">
                      <option v-for="font in fontOptions" :key="font.value" :value="font.value">
                        {{ font.label }}
                      </option>
                    </select> -->
                  <select id="font-select" v-model="textSettings.fontFamily" class="form-select form-select--font" aria-label="Виберіть шрифт для тексту">
                    <option
                      v-for="font in fontOptions"
                      :key="font.value"
                      :value="font.value"
                      :style="{ fontFamily: font.value }"
                    >
                      {{ font.label }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="font-weight-select">{{ $t('pages.textGenerator.settings.text.weight') }}</label>
                <select id="font-weight-select" v-model="textSettings.fontWeight" class="form-select" aria-label="Виберіть жирність шрифту">
                  <option v-for="option in fontWeightOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="font-size-range">{{ $t('pages.textGenerator.settings.text.size') }}</label>
                <div class="range-group">
                  <input
                    id="font-size-range"
                    v-model="textSettings.fontSize"
                    type="range"
                    min="8"
                    max="48"
                    class="form-range"
                    :aria-label="`Розмір шрифту: ${textSettings.fontSize} пікселів`"
                    aria-describedby="font-size-value"
                  />
                  <span id="font-size-value" class="range-value" aria-live="polite">{{ textSettings.fontSize }}px</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="border-radius-range">{{ $t('pages.textGenerator.settings.text.border') }}</label>
                <div class="range-group">
                  <input
                    id="border-radius-range"
                    v-model="textSettings.borderRadiusPercent"
                    type="range"
                    min="0"
                    max="100"
                    class="form-range"
                    :aria-label="`Заокруглення кутів: ${textSettings.borderRadiusPercent} відсотків`"
                    aria-describedby="border-radius-value"
                  />
                  <span id="border-radius-value" class="range-value" aria-live="polite">{{ textSettings.borderRadiusPercent }}%</span>
                </div>
              </div>

              <!-- Preview Faviconlys (row, right-to-left) -->
              <div class="Faviconlys-preview-row" role="group" aria-label="Попередній перегляд фавіконок різних розмірів">
                <div
                  v-for="size in [96, 64, 48, 32, 16]"
                  :key="size"
                  class="Faviconly-preview-item"
                >
                  <canvas
                    :ref="el => setFaviconlyPreviewRef(size, el as HTMLCanvasElement | null)"
                    :width="size"
                    :height="size"
                    :style="{ width: size + 'px', height: size + 'px' }"
                    class="Faviconly-preview-canvas"
                    :aria-label="`Попередній перегляд фавіконки розміром ${size} на ${size} пікселів`"
                    role="img"
                  />
                  <div class="Faviconly-size-label" aria-hidden="true">{{ size }}x{{ size }}</div>
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
                    <label class="palette-label">{{ $t('pages.textGenerator.settings.colors.textColor') }}</label>
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
                    <label class="palette-label">{{ $t('pages.textGenerator.settings.colors.backgroundColor') }}</label>
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

              <div v-if="textSettings.backgroundType === 'transparent'" class="form-group">
                <label class="form-label">{{ $t('pages.textGenerator.settings.text.opacity') }}</label>
                <div class="range-group">
                  <input
                    v-model="textSettings.backgroundAlpha"
                    type="range"
                    min="0"
                    max="100"
                    class="form-range"
                  />
                  <span class="range-value">{{ textSettings.backgroundAlpha }}%</span>
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
          <DownloadButton
            :is-processing="isGenerating"
            :show-success="showSuccess"
            :progress="progress"
            :disabled="!textSettings.text"
            :default-text="$t('pages.textGenerator.generate')"
            :success-text="$t('pages.textGenerator.downloadComplete')"
            :processing-text="processingText"
            @click="generateFaviconlys"
          />
        </div>

        <!-- Installation guide -->
        <InstallationGuide
          v-if="generatedImages.length > 0 && !isGenerating && !showSuccess"
          :generated-sizes="selectedSizes"
        />
      </div>
    </section>

    <!-- <section class="adsense-section">
      <div class="container">
        <div class="adsense-placeholder">
          <div class="adsense-content">
            <Icon name="lucide:megaphone" />
            <span>{{ $t('pages.home.adsense') }}</span>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>
  
  <script setup lang="ts">
  import JSZip from 'jszip'


  
interface FontObject {
  value: string
  url: string
}

  const colorPaletteColumns = Array.from({ length: colorPalette[0].length }, (_, colIdx) =>
  colorPalette.map(row => row[colIdx])
)

  const textSettings = reactive({
    text: 'FS',
    fontFamily: 'Bookman',
      fontSize: 32,
      fontWeight: 400,
    textColor: '#ffffff',
    backgroundColor: '#6ee7b7',
    backgroundType: 'gradient',
      gradientColor: '#3814b8',
      borderRadiusPercent: 50,
      backgroundAlpha: 0,
  })

  const { t } = useI18n()
  const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'
  const selectedSizes = ref([16, 32, 48])
  const isGenerating = ref(false)
  const fontIsLoading = ref(false)
  const generatedImages = ref<any[]>([])
  const showSuccess = ref(false)
  const progress = ref(0)
  const toast = useToast()
  const previewCanvas = ref<HTMLCanvasElement | null>(null)
  const FaviconlyPreviewRefs = reactive<Record<number, HTMLCanvasElement | null>>({})
  const fontFamily = ref(textSettings.fontFamily)
  const availableFontWeights = ref<number[]>([400, 700])
  const activeFontFamily = ref(textSettings.fontFamily)
  const fontLoaded = ref(false)

  const processingText = computed(() => {
    if (progress.value < 20) return t('pages.textGenerator.generating')
    if (progress.value < 40) return 'Рендер тексту...'
    if (progress.value < 70) return 'Створення фавіконок...'
    if (progress.value < 90) return 'Створення архіву...'
    return 'Майже готово...'
  })

  


  const fontWeightOptions = computed(() => 
  availableFontWeights.value.map(w => ({
    value: w,
    label: `${w}  ${FONT_WEIGHT_LABELS[w] || 'Unknown'}`
  }))
)

  const  setFaviconlyPreviewRef = (size: number, el: HTMLCanvasElement | null) => {
    FaviconlyPreviewRefs[size] = el
  }
  
  const drawTextOnCanvas = (canvas: HTMLCanvasElement, size: number) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, size, size);

  const percent = Math.max(0, Math.min(textSettings.borderRadiusPercent, 100));
  const radius = (percent / 100) * (size / 2);

  ctx.save();

  if (radius >= size / 2) {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
  } else {
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
  }

  if (textSettings.backgroundType === 'transparent') {
    ctx.globalAlpha = textSettings.backgroundAlpha / 100; 
    ctx.fillStyle = textSettings.backgroundColor;
    ctx.fillRect(0, 0, size, size);
    ctx.globalAlpha = 1.0;
  } else if (textSettings.backgroundType === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, textSettings.backgroundColor);
    gradient.addColorStop(1, textSettings.gradientColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  } else {
    ctx.fillStyle = textSettings.backgroundColor;
    ctx.fillRect(0, 0, size, size);
  }

  const fontSize = Math.floor(size * (textSettings.fontSize / 48));
    ctx.font = `${textSettings.fontWeight} ${fontSize}px ${activeFontFamily.value}`;
  ctx.fillStyle = textSettings.textColor;
  ctx.textAlign = 'center';
  const metrics = ctx.measureText(textSettings.text);
  const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  const centerY = size / 2 + (actualHeight / 2) - metrics.actualBoundingBoxDescent;
  ctx.fillText(textSettings.text, size / 2, centerY);

  ctx.restore();
  };


  const redrawAllFaviconlys = () => {
    if (fontIsLoading.value) return;
  [16, 32, 48, 64, 96].forEach(size => {
    const canvas = FaviconlyPreviewRefs[size]
    if (canvas) drawTextOnCanvas(canvas, size)
  })
  updateFaviconly(FaviconlyPreviewRefs[32] || null)
}



const loadFont = (fontObj: FontObject): void => {
  if (!document.querySelector(`link[data-font="${fontObj.value}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = fontObj.url
    link.setAttribute('data-font', fontObj.value)
    document.head.appendChild(link)
  }
}

const waitForFontLoad = async (
  fontFamily: string, 
  fontWeight: number = 400
): Promise<boolean> => {
  const testSpan = document.createElement('span');
  testSpan.textContent = 'QW@';
  testSpan.style.position = 'absolute';
  testSpan.style.visibility = 'hidden';
  testSpan.style.fontFamily = 'monospace';
  testSpan.style.fontSize = '40px';
  document.body.appendChild(testSpan);
  const baseWidth = testSpan.offsetWidth;
  testSpan.style.fontFamily = `'${fontFamily}', monospace`;
  let maxWait = 1000, interval = 20, waited = 0;
  while (waited < maxWait && testSpan.offsetWidth === baseWidth) {
    await new Promise(r => setTimeout(r, interval));
    waited += interval;
  }
  document.body.removeChild(testSpan);
  return testSpan.offsetWidth !== baseWidth;
}

const  ensureFontLoaded = async (fontFamily: string, fontWeight = 400, fontSize = 32) =>{
  try {
    await document.fonts.load(`${fontWeight} ${fontSize}px '${fontFamily}'`);
    await document.fonts.ready;
  } catch (e) {
    console.warn("Font load failed: ", fontFamily, e)
  }
}


watch(
  () => textSettings.fontFamily,
  async (newFont, oldFont) => {
    if (newFont === oldFont) return

    const fontObj = fontOptions.find(f => f.value === newFont)

    if (fontObj && !fontObj.url) {
      activeFontFamily.value = newFont
      fontIsLoading.value = false
      redrawAllFaviconlys()
      return
    }

    fontIsLoading.value = true
    let loaded = false
    try {
      if (fontObj && fontObj.url) {
        loadFont(fontObj)
        await ensureFontLoaded(newFont, textSettings.fontWeight, textSettings.fontSize)
        loaded = await waitForFontLoad(newFont, textSettings.fontWeight)
      }
    } catch { loaded = false }
    if (loaded) {
      activeFontFamily.value = newFont
      fontIsLoading.value = false
      redrawAllFaviconlys()
    } else {
      fontIsLoading.value = false
      toast.add({ title: t('error.loadFont'), color: 'error' })
      textSettings.fontFamily = oldFont
    }
  }
)

  
  const updatePreview = async () => {
    await nextTick() 
    if (previewCanvas.value && !fontIsLoading.value) {
      drawTextOnCanvas(previewCanvas.value, 150)
    }
  }

  const updateFaviconly = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return
    const dataUrl = canvas.toDataURL('image/png')
    let Faviconly = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null
    if (!Faviconly) {
      Faviconly = document.createElement('link') as HTMLLinkElement
      Faviconly.rel = 'icon'
      document.head.appendChild(Faviconly)
    }
    Faviconly.setAttribute('type', 'image/png')
    Faviconly.setAttribute('href', dataUrl)
  }
  
  const generateFaviconlys = async () => {
  if (!textSettings.text && fontIsLoading.value) return

  isGenerating.value = true
  progress.value = 0

  try {
    // Show processing animation for better UX
    await new Promise(resolve => setTimeout(resolve, 400))
    progress.value = 20

    await new Promise(resolve => setTimeout(resolve, 300))
    progress.value = 40

    const zip = new JSZip()
    const images: any[] = []

    for (const size of selectedSizes.value) {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size

      drawTextOnCanvas(canvas, size)

      const dataUrl = canvas.toDataURL('image/png')
      const base64Data = dataUrl.split(',')[1]

      let fileName = `Faviconly-${size}x${size}.png`
      if (size === 180) fileName = 'apple-touch-icon.png'
      if (size === 192) fileName = 'android-chrome-192x192.png'
      if (size === 512) fileName = 'android-chrome-512x512.png'

      // Save as binary Blob, not base64
      const response = await fetch(dataUrl)
      const blob = await response.blob()
      zip.file(fileName, blob)

      images.push({
        size,
        dataUrl,
        fileName
      })
    }

    // Add Faviconly.ico as a PNG (for real ICO you’d need special logic)
    const icoSize = selectedSizes.value.includes(32) ? 32 : selectedSizes.value.includes(16) ? 16 : selectedSizes.value[0]
    const icoCanvas = document.createElement('canvas')
    icoCanvas.width = icoSize
    icoCanvas.height = icoSize
    drawTextOnCanvas(icoCanvas, icoSize)
    const icoDataUrl = icoCanvas.toDataURL('image/png')
    const icoBlob = await (await fetch(icoDataUrl)).blob()
    zip.file('Faviconly.ico', icoBlob)

    // Add manifest file
    const manifest = {
      name: "My Website",
      short_name: "Website",
      icons: images.filter(x => x.size >= 192).map(({ size, fileName }) => ({
        src: `/${fileName}`,
        sizes: `${size}x${size}`,
        type: "image/png"
      })),
      theme_color: textSettings.backgroundColor,
      background_color: "#ffffff",
      display: "standalone"
    }
    zip.file('site.webmanifest', JSON.stringify(manifest, null, 2))

    await new Promise(resolve => setTimeout(resolve, 300))
    progress.value = 90

    // Generate ZIP as Blob and trigger download
    const zipBuffer = await zip.generateAsync({ type: 'blob' })

    await new Promise(resolve => setTimeout(resolve, 200))
    progress.value = 100

    generatedImages.value = images

    // Trigger standard browser download with animation
    const link = document.createElement('a')
    link.href = URL.createObjectURL(zipBuffer)
    link.download = 'text-favicons.zip'
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

    // Show success toast
    toast.add({
      title: t('notify.zipGeneratedsuccess'),
      type: 'foreground'
    })

    // Show success state
    showSuccess.value = true
    console.log('✅ Text generator success state set to true, should show green button')

    // Auto-reset to normal state after showing success for 3 seconds
    setTimeout(() => {
      showSuccess.value = false
      progress.value = 0
    }, 3000)

  } catch (error) {
    console.error('Error generating text Faviconlys:', error)

    // Show error toast
    toast.add({
      title: t('converter.error'),
      type: 'background'
    })
  } finally {
    isGenerating.value = false
  }
}
  
  
  watch(textSettings, updatePreview, { deep: true })
  watch(
    textSettings,
    async () => {
      // Reset success state when user changes settings
      generatedImages.value = []
      showSuccess.value = false
      progress.value = 0

      await nextTick();
      [16, 32, 48, 64, 96].forEach(size => {
        const canvas = FaviconlyPreviewRefs[size]
        if (canvas && !fontIsLoading.value) drawTextOnCanvas(canvas, size)
      })
      updateFaviconly(FaviconlyPreviewRefs[32] || null)
    },
    { deep: true }
  )

  watch(() => textSettings.fontFamily, (newFontFamily) => {
  if (isClient) {
      availableFontWeights.value = getSupportedFontWeights(newFontFamily)
      textSettings.fontWeight = availableFontWeights.value[0]
  }
  })


  watch(() => textSettings.fontWeight, async (newWeight, oldWeight) => {
  if (isClient) {
    fontIsLoading.value = true;
    await ensureFontLoaded(textSettings.fontFamily, newWeight, textSettings.fontSize);
    fontIsLoading.value = false;
    activeFontFamily.value = textSettings.fontFamily;
    redrawAllFaviconlys();
  }
});


  
  onMounted(() => {
    [16, 32, 48, 64, 96].forEach(size => {
      const canvas = FaviconlyPreviewRefs[size]
      if (canvas && !fontIsLoading.value) drawTextOnCanvas(canvas, size)
    })
    updateFaviconly(FaviconlyPreviewRefs[32] || null)
    updatePreview()
      if (isClient) {
          availableFontWeights.value = getSupportedFontWeights(fontFamily.value)
          textSettings.fontWeight = availableFontWeights.value[0]
     }
  })
  
  
useHead({
    title: t('pages.textGenerator.title'),
    meta: [
      {
        name: 'description',
        content: t('pages.textGenerator.description')
      },
      {
        name: 'keywords',
        content: 'text to favicon, favicon from text, letter favicon, symbol favicon, text favicon generator, custom font favicon'
      },
      {
        property: 'og:title',
        content: t('pages.textGenerator.title')
      },
      {
        property: 'og:description',
        content: t('pages.textGenerator.description')
      },
      {
        property: 'og:type',
        content: 'website'
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
    grid-template-columns: 1fr;
    gap: spacing(sm);
    margin-bottom: spacing(lg);
  
    @include respond-to(sm) {
      grid-template-columns: 1fr 2fr;
    }
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
    min-height: 46px;
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
    flex: 1;
    height: 12px;
    padding: 0;
    background: var(--bg-tertiary);
    border-radius: border-radius(full);
    outline: none;
    appearance: none;
  
    &::-webkit-slider-track {
      width: 100%;
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
      width: 100%;
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
  
  .Faviconlys-preview-row {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 16px;
    margin-bottom: 32px;
    flex-wrap: wrap;
  
    @include respond-to(sm) {
      flex-wrap: nowrap;
    }
  }
  
  .Faviconly-preview-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  
    .Faviconly-size-label {
      margin-top: 6px;
      font-size: 13px;
      color: #888;
    }
  }
  
  .Faviconly-preview-canvas {
    background: transparent;
    overflow: hidden;
  }
  
  .palettes-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(lg);
    margin-top: 32px;
    margin-bottom: 16px;
  
    @include respond-to(md) {
      grid-template-columns: 1fr 1fr;
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
  
      // Darker background for light theme
      .light-mode & {
        background: #e5e7eb;
        border-color: #d1d5db;
      }
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
      margin-left: spacing(sm);
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
    flex-direction: column;
  
    @include respond-to(sm) {
      flex-direction: row;
    }
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
          transform: translate(-50%, -50%) scale(1);
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
  
  .generation-section {
    text-align: center;
    padding-top: spacing(xl);
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