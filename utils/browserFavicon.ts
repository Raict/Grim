import { fontOptions } from './options'
import { sanitizeFaviconSettings } from './securityUtils'
import { BRAND_LOGO_SETTINGS, migrateLegacyLogoSettings } from './logoSettings'

const loadFont = (fontFamily: string) => {
  const font = fontOptions.find(option => option.value === fontFamily)
  if (!font?.url || document.querySelector(`link[data-font="${font.value}"]`)) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = font.url
  link.setAttribute('data-font', font.value)
  document.head.appendChild(link)
}

const ensureFontLoaded = async (fontFamily: string, fontWeight: number, fontSize: number) => {
  try {
    await document.fonts.load(`${fontWeight} ${fontSize}px '${fontFamily}'`)
    await document.fonts.ready
  } catch (error) {
    console.warn('Failed to load favicon font:', error)
  }
}

const drawRoundedRect = (ctx: CanvasRenderingContext2D, size: number, radius: number) => {
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
}

export const renderBrowserFaviconFromTextSettings = async (): Promise<string | null> => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null

  const savedSettings = localStorage.getItem('favicon-text-settings')
  if (!savedSettings) return null

  const settings = {
    ...BRAND_LOGO_SETTINGS,
    ...migrateLegacyLogoSettings(sanitizeFaviconSettings(JSON.parse(savedSettings)))
  }

  const size = 32
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  canvas.width = size
  canvas.height = size

  loadFont(settings.fontFamily)
  await ensureFontLoaded(settings.fontFamily, settings.fontWeight, settings.fontSize)

  ctx.clearRect(0, 0, size, size)

  const percent = Math.max(0, Math.min(settings.borderRadiusPercent, 100))
  const radius = (percent / 100) * (size / 2)

  ctx.save()

  if (radius >= size / 2) {
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.clip()
  } else {
    drawRoundedRect(ctx, size, radius)
    ctx.clip()
  }

  if (settings.backgroundType === 'transparent') {
    ctx.globalAlpha = settings.backgroundAlpha / 100
    ctx.fillStyle = settings.backgroundColor
    ctx.fillRect(0, 0, size, size)
    ctx.globalAlpha = 1
  } else if (settings.backgroundType === 'gradient') {
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, settings.backgroundColor)
    gradient.addColorStop(1, settings.gradientColor)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  } else {
    ctx.fillStyle = settings.backgroundColor
    ctx.fillRect(0, 0, size, size)
  }

  const fontSize = Math.floor(size * (settings.fontSize / 48))
  ctx.font = `${settings.fontWeight} ${fontSize}px '${settings.fontFamily}', system-ui, sans-serif`
  ctx.fillStyle = settings.textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  const textMetrics = ctx.measureText(settings.text)
  const actualHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
  const centerY = size / 2 + actualHeight / 2 - textMetrics.actualBoundingBoxDescent
  const diagonalDownOffset = settings.textDiagonalDownOffset || 0
  const diagonalUpOffset = settings.textDiagonalUpOffset || 0
  const offsetX = size * (((settings.textOffsetX || 0) + diagonalDownOffset + diagonalUpOffset) / 100)
  const offsetY = size * (((settings.textOffsetY || 0) + diagonalDownOffset - diagonalUpOffset) / 100)
  ctx.fillText(settings.text, size / 2 + offsetX, centerY + offsetY)
  ctx.restore()

  return canvas.toDataURL('image/png')
}
