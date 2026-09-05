// Security utility functions for safe favicon generation

// File validation utilities
export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif'
] as const

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

// Magic number signatures for common image formats
const FILE_SIGNATURES = {
  'image/png': [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/webp': [0x52, 0x49, 0x46, 0x46], // RIFF header
  'image/gif': [0x47, 0x49, 0x46, 0x38] // GIF8
}

export interface SafeFaviconSettings {
  text?: string
  fontFamily?: string
  brandText?: string
  brandTextFontFamily?: string
  brandTextColor?: string
  brandTextGradientColor?: string
  brandTextColorType?: 'solid' | 'gradient'
  useBrandTextColor?: boolean
  saveLogoSvg?: boolean
  exportOptionsVersion?: number
  fontSize?: number
  fontWeight?: number
  textOffsetX?: number
  textOffsetY?: number
  textDiagonalDownOffset?: number
  textDiagonalUpOffset?: number
  textColor?: string
  backgroundColor?: string
  backgroundType?: 'solid' | 'gradient' | 'transparent'
  gradientColor?: string
  borderRadiusPercent?: number
  backgroundAlpha?: number
}

const isHexColor = (value: unknown): value is string =>
  typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)

const sanitizeBrandTextInput = (input: string): string => input
  .replace(/[<>]/g, '')
  .replace(/javascript:/gi, '')
  .replace(/data:/gi, '')
  .replace(/vbscript:/gi, '')
  .trim()
  .slice(0, 32)

const toFiniteNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

/** Copies only expected, bounded settings from untrusted storage/events. */
export function sanitizeFaviconSettings(value: unknown): SafeFaviconSettings {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const input = value as Record<string, unknown>
  const safe: SafeFaviconSettings = Object.create(null)
  const fontSize = toFiniteNumber(input.fontSize)
  const fontWeight = toFiniteNumber(input.fontWeight)
  const textOffsetX = toFiniteNumber(input.textOffsetX)
  const textOffsetY = toFiniteNumber(input.textOffsetY)
  const textDiagonalDownOffset = toFiniteNumber(input.textDiagonalDownOffset)
  const textDiagonalUpOffset = toFiniteNumber(input.textDiagonalUpOffset)
  const borderRadiusPercent = toFiniteNumber(input.borderRadiusPercent)
  const backgroundAlpha = toFiniteNumber(input.backgroundAlpha)

  if (typeof input.text === 'string') safe.text = sanitizeTextInput(input.text).slice(0, 3)
  if (typeof input.fontFamily === 'string' && /^[\w .-]{1,64}$/.test(input.fontFamily)) safe.fontFamily = input.fontFamily
  if (typeof input.brandText === 'string') safe.brandText = sanitizeBrandTextInput(input.brandText)
  if (typeof input.brandTextFontFamily === 'string' && /^[\w .-]{1,64}$/.test(input.brandTextFontFamily)) safe.brandTextFontFamily = input.brandTextFontFamily
  if (isHexColor(input.brandTextColor)) safe.brandTextColor = input.brandTextColor
  if (isHexColor(input.brandTextGradientColor)) safe.brandTextGradientColor = input.brandTextGradientColor
  if (input.brandTextColorType === 'solid' || input.brandTextColorType === 'gradient') safe.brandTextColorType = input.brandTextColorType
  if (typeof input.useBrandTextColor === 'boolean') safe.useBrandTextColor = input.useBrandTextColor
  if (typeof input.saveLogoSvg === 'boolean') safe.saveLogoSvg = input.saveLogoSvg
  if (input.exportOptionsVersion === 2 || input.exportOptionsVersion === 3) safe.exportOptionsVersion = input.exportOptionsVersion
  if (fontSize !== undefined) safe.fontSize = Math.min(48, Math.max(8, fontSize))
  if (fontWeight !== undefined && Number.isInteger(fontWeight) && fontWeight >= 100 && fontWeight <= 900) safe.fontWeight = fontWeight
  if (textOffsetX !== undefined) safe.textOffsetX = Math.min(40, Math.max(-40, textOffsetX))
  if (textOffsetY !== undefined) safe.textOffsetY = Math.min(40, Math.max(-40, textOffsetY))
  if (textDiagonalDownOffset !== undefined) safe.textDiagonalDownOffset = Math.min(40, Math.max(-40, textDiagonalDownOffset))
  if (textDiagonalUpOffset !== undefined) safe.textDiagonalUpOffset = Math.min(40, Math.max(-40, textDiagonalUpOffset))
  if (isHexColor(input.textColor)) safe.textColor = input.textColor
  if (isHexColor(input.backgroundColor)) safe.backgroundColor = input.backgroundColor
  if (isHexColor(input.gradientColor)) safe.gradientColor = input.gradientColor
  if (input.backgroundType === 'solid' || input.backgroundType === 'gradient' || input.backgroundType === 'transparent') safe.backgroundType = input.backgroundType
  if (borderRadiusPercent !== undefined) safe.borderRadiusPercent = Math.min(100, Math.max(0, borderRadiusPercent))
  if (backgroundAlpha !== undefined) safe.backgroundAlpha = Math.min(100, Math.max(0, backgroundAlpha))

  return safe
}

/**
 * Validates file type using magic number (binary signature)
 */
export function validateFileSignature(buffer: ArrayBuffer, expectedMimeType: string): boolean {
  const uint8Array = new Uint8Array(buffer)
  const normalizedMimeType = expectedMimeType === 'image/jpg' ? 'image/jpeg' : expectedMimeType
  const signature = FILE_SIGNATURES[normalizedMimeType as keyof typeof FILE_SIGNATURES]

  if (!signature) return false

  // Special case for WebP - need to check full RIFF header
  if (normalizedMimeType === 'image/webp') {
    const webpSignature = new Uint8Array([0x52, 0x49, 0x46, 0x46]) // RIFF
    const webpType = new Uint8Array([0x57, 0x45, 0x42, 0x50]) // WEBP at offset 8

    const hasRiff = signature.every((byte, index) => uint8Array[index] === byte)
    const hasWebp = webpType.every((byte, index) => uint8Array[index + 8] === byte)

    return hasRiff && hasWebp
  }

  return signature.every((byte, index) => uint8Array[index] === byte)
}

/**
 * Comprehensive file validation
 */
export function validateUploadedFile(file: File): { isValid: boolean; error?: string } {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'File too large. Maximum size is 10MB.' }
  }

  if (file.size === 0) {
    return { isValid: false, error: 'File is empty.' }
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
    return { isValid: false, error: 'Invalid file type. Only PNG, JPG, JPEG, WebP, and GIF are allowed.' }
  }

  return { isValid: true }
}

/**
 * Validates file buffer against expected type using magic numbers
 */
export async function validateFileBuffer(file: File): Promise<{ isValid: boolean; error?: string }> {
  try {
    const buffer = await file.arrayBuffer()

    if (!validateFileSignature(buffer, file.type)) {
      return {
        isValid: false,
        error: 'File signature does not match the declared file type. Possible file tampering detected.'
      }
    }

    return { isValid: true }
  } catch (error) {
    return { isValid: false, error: 'Failed to read file data.' }
  }
}

/**
 * Sanitizes user text input to prevent XSS
 */
export function sanitizeTextInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .trim()
    .slice(0, 10) // Limit to 10 characters max for favicon text
}

/**
 * Safe HTML escaping for display
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/**
 * Rate limiting utility (client-side)
 */
class RateLimiter {
  private requests: number[] = []
  private maxRequests: number
  private timeWindow: number

  constructor(maxRequests: number = 5, timeWindow: number = 60000) { // 5 requests per minute
    this.maxRequests = maxRequests
    this.timeWindow = timeWindow
  }

  canMakeRequest(): boolean {
    const now = Date.now()
    // Remove old requests outside time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow)

    if (this.requests.length >= this.maxRequests) {
      return false
    }

    this.requests.push(now)
    return true
  }

  getTimeUntilNextRequest(): number {
    if (this.requests.length < this.maxRequests) return 0

    const oldestRequest = Math.min(...this.requests)
    return Math.max(0, this.timeWindow - (Date.now() - oldestRequest))
  }
}

export const processRateLimiter = new RateLimiter(3, 30000) // 3 processing requests per 30 seconds

/**
 * Memory-safe canvas creation with size limits
 */
export function createSafeCanvas(width: number, height: number): HTMLCanvasElement | null {
  const MAX_CANVAS_SIZE = 4096 // Maximum dimension
  const MAX_CANVAS_AREA = 16 * 1024 * 1024 // 16 megapixels

  if (width > MAX_CANVAS_SIZE || height > MAX_CANVAS_SIZE) {
    throw new Error(`Canvas dimensions too large. Maximum size is ${MAX_CANVAS_SIZE}x${MAX_CANVAS_SIZE}`)
  }

  if (width * height > MAX_CANVAS_AREA) {
    throw new Error('Canvas area too large. Reduce image dimensions.')
  }

  try {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  } catch (error) {
    throw new Error('Failed to create canvas. Insufficient memory.')
  }
}

/**
 * Generates secure Content Security Policy header value
 */
export function generateCSPHeader(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "upgrade-insecure-requests"
  ].join('; ')
}
