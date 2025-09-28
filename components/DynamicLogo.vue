<template>
  <canvas
    ref="canvasRef"
    :width="size"
    :height="size"
    :style="{
      width: size + 'px',
      height: size + 'px',
      borderRadius: borderRadius
    }"
    :class="canvasClass"
  />
</template>

<script setup lang="ts">
import { fontOptions, FONT_WEIGHTS } from '~/utils/options'

interface Props {
  size?: number
  canvasClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 32,
  canvasClass: ''
})

// Create a local reactive copy that we can modify
const logoSettings = reactive({
  text: 'FG',
  fontFamily: 'Bookman',
  fontSize: 32,
  fontWeight: 400,
  textColor: '#ffffff',
  backgroundColor: '#6ee7b7',
  backgroundType: 'gradient' as 'solid' | 'gradient' | 'transparent',
  gradientColor: '#3814b8',
  borderRadiusPercent: 50,
  backgroundAlpha: 0
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isClient = typeof window !== 'undefined'

const activeFontFamily = ref('Bookman')
const fontIsLoading = ref(false)

// Computed border radius based on settings
const borderRadius = computed(() => {
  const percent = logoSettings.borderRadiusPercent || 0
  if (percent === 0) return '0px'  // Explicitly return 0px for no radius
  const radius = (percent / 100) * (props.size / 2)
  return percent >= 100 ? '50%' : `${radius}px`
})

// Helper functions (copied from favicons-text)
interface FontObject {
  value: string
  url: string
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
  const testSpan = document.createElement('span')
  testSpan.textContent = 'QW@'
  testSpan.style.position = 'absolute'
  testSpan.style.visibility = 'hidden'
  testSpan.style.fontFamily = 'monospace'
  testSpan.style.fontSize = '40px'
  document.body.appendChild(testSpan)
  const baseWidth = testSpan.offsetWidth
  testSpan.style.fontFamily = `'${fontFamily}', monospace`
  let maxWait = 1000, interval = 20, waited = 0
  while (waited < maxWait && testSpan.offsetWidth === baseWidth) {
    await new Promise(r => setTimeout(r, interval))
    waited += interval
  }
  document.body.removeChild(testSpan)
  return testSpan.offsetWidth !== baseWidth
}

const ensureFontLoaded = async (fontFamily: string, fontWeight = 400, fontSize = 32) => {
  try {
    await document.fonts.load(`${fontWeight} ${fontSize}px '${fontFamily}'`)
    await document.fonts.ready
  } catch (e) {
    console.warn("Font load failed: ", fontFamily, e)
  }
}

const drawLogo = async () => {
  const canvas = canvasRef.value
  if (!canvas || fontIsLoading.value) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const size = props.size
  ctx.clearRect(0, 0, size, size)


  const percent = Math.max(0, Math.min(logoSettings.borderRadiusPercent, 100))
  const radius = (percent / 100) * (size / 2)

  ctx.save()

  // Apply clipping for rounded corners or circle
  if (radius >= size / 2) {
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.clip()
  } else {
    ctx.beginPath()
    ctx.moveTo(radius, 0)
    ctx.lineTo(size - radius, 0)
    ctx.quadraticCurveTo(size, 0, size, radius)
    ctx.lineTo(size, size - radius)
    ctx.quadraticCurveTo(size, size, size - radius, size)
    ctx.lineTo(radius, size)
    ctx.quadraticCurveTo(0, size, 0, size - radius)
    ctx.lineTo(0, radius)
    ctx.quadraticCurveTo(0, 0, radius, 0)
    ctx.closePath()
    ctx.clip()
  }

  // Draw background
  if (logoSettings.backgroundType === 'transparent') {
    ctx.globalAlpha = logoSettings.backgroundAlpha / 100
    ctx.fillStyle = logoSettings.backgroundColor
    ctx.fillRect(0, 0, size, size)
    ctx.globalAlpha = 1.0
  } else if (logoSettings.backgroundType === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, logoSettings.backgroundColor)
    gradient.addColorStop(1, logoSettings.gradientColor)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  } else {
    ctx.fillStyle = logoSettings.backgroundColor
    ctx.fillRect(0, 0, size, size)
  }

  // Draw text
  const fontSize = Math.floor(size * (logoSettings.fontSize / 48))
  ctx.font = `${logoSettings.fontWeight} ${fontSize}px ${activeFontFamily.value}`
  ctx.fillStyle = logoSettings.textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  // Calculate proper center position accounting for font metrics
  const textMetrics = ctx.measureText(logoSettings.text)
  const actualHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
  const centerY = size / 2 + actualHeight / 2 - textMetrics.actualBoundingBoxDescent

  // Draw text in center
  ctx.fillText(logoSettings.text, size / 2, centerY)

  ctx.restore()
}

// Watch for font family changes
watch(() => logoSettings.fontFamily, async (newFont, oldFont) => {
  if (newFont === oldFont || !isClient) return

  const fontObj = fontOptions.find(f => f.value === newFont)

  if (fontObj && !fontObj.url) {
    activeFontFamily.value = newFont
    fontIsLoading.value = false
    drawLogo()
    return
  }

  fontIsLoading.value = true
  let loaded = false
  try {
    if (fontObj && fontObj.url) {
      loadFont(fontObj)
      await ensureFontLoaded(newFont, logoSettings.fontWeight, logoSettings.fontSize)
      loaded = await waitForFontLoad(newFont, logoSettings.fontWeight)
    }
  } catch {
    loaded = false
  }

  if (loaded) {
    activeFontFamily.value = newFont
    fontIsLoading.value = false
    drawLogo()
  } else {
    fontIsLoading.value = false
    activeFontFamily.value = oldFont
  }
})

// Watch for other setting changes - immediate reaction
watch(logoSettings, () => {
  nextTick(() => {
    if (!fontIsLoading.value) {
      drawLogo()
    }
  })
}, { deep: true, immediate: true })

// Listen for localStorage changes for cross-tab sync
const handleStorageChange = (e: StorageEvent) => {
  if (e.key === 'favicon-text-settings' && e.newValue) {
    try {
      const parsed = JSON.parse(e.newValue)
      Object.assign(logoSettings, parsed)
      nextTick(() => {
        drawLogo()
      })
    } catch (error) {
      console.warn('Failed to parse storage change in DynamicLogo:', error)
    }
  }
}

// Listen for same-page updates (immediate sync)
const handleLogoSettingsChange = (e: CustomEvent) => {
  Object.assign(logoSettings, e.detail)
  nextTick(() => {
    drawLogo()
  })
}

// Initial draw and setup
onMounted(() => {
  if (isClient) {
    // Load from localStorage immediately
    try {
      const saved = localStorage.getItem('favicon-text-settings')
      if (saved) {
        const parsed = JSON.parse(saved)
        Object.assign(logoSettings, parsed)
      }
    } catch (error) {
      console.warn('Failed to load settings in DynamicLogo:', error)
    }

    // Listen for storage changes (cross-tab)
    window.addEventListener('storage', handleStorageChange)

    // Listen for same-page changes (immediate)
    window.addEventListener('logo-settings-changed', handleLogoSettingsChange as EventListener)

    // Draw initial logo
    nextTick(() => {
      activeFontFamily.value = logoSettings.fontFamily
      drawLogo()
    })
  }
})

onUnmounted(() => {
  if (isClient) {
    window.removeEventListener('storage', handleStorageChange)
    window.removeEventListener('logo-settings-changed', handleLogoSettingsChange as EventListener)
  }
})
</script>