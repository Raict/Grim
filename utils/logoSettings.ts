import type { SafeFaviconSettings } from './securityUtils'

export interface LogoSettings {
  text: string
  fontFamily: string
  brandText: string
  brandTextFontFamily: string
  brandTextColor: string
  brandTextGradientColor: string
  brandTextColorType: 'solid' | 'gradient'
  useBrandTextColor: boolean
  saveLogoSvg: boolean
  exportOptionsVersion: number
  fontSize: number
  fontWeight: number
  textOffsetX: number
  textOffsetY: number
  textDiagonalDownOffset: number
  textDiagonalUpOffset: number
  textColor: string
  backgroundColor: string
  backgroundType: 'solid' | 'gradient' | 'transparent'
  gradientColor: string
  borderRadiusPercent: number
  backgroundAlpha: number
}

export const BRAND_LOGO_SETTINGS: LogoSettings = {
  text: 'FG',
  fontFamily: 'Space Grotesk',
  brandText: 'FaviconGen',
  brandTextFontFamily: 'Sora',
  brandTextColor: '#22d3ee',
  brandTextGradientColor: '#4f46e5',
  brandTextColorType: 'solid',
  useBrandTextColor: false,
  saveLogoSvg: false,
  exportOptionsVersion: 3,
  fontSize: 30,
  fontWeight: 800,
  textOffsetX: 0,
  textOffsetY: 0,
  textDiagonalDownOffset: 0,
  textDiagonalUpOffset: 0,
  textColor: '#ffffff',
  backgroundColor: '#22d3ee',
  backgroundType: 'gradient',
  gradientColor: '#4f46e5',
  borderRadiusPercent: 32,
  backgroundAlpha: 0
}

const LEGACY_LOGO_SETTINGS = {
  text: 'FG',
  fontFamily: 'Bookman',
  fontSize: 32,
  fontWeight: 700,
  textColor: '#ffffff',
  backgroundColor: '#6ee7b7',
  backgroundType: 'gradient',
  gradientColor: '#3814b8',
  borderRadiusPercent: 50,
  backgroundAlpha: 0
}

export const migrateLegacyLogoSettings = (settings: SafeFaviconSettings): SafeFaviconSettings => {
  const isLegacyPreset = Object.entries(LEGACY_LOGO_SETTINGS)
    .every(([key, value]) => settings[key as keyof SafeFaviconSettings] === value)

  if (isLegacyPreset) return { ...settings, ...BRAND_LOGO_SETTINGS }

  if (settings.exportOptionsVersion !== BRAND_LOGO_SETTINGS.exportOptionsVersion) {
    return {
      ...settings,
      brandTextColorType: 'solid',
      saveLogoSvg: BRAND_LOGO_SETTINGS.saveLogoSvg,
      exportOptionsVersion: BRAND_LOGO_SETTINGS.exportOptionsVersion
    }
  }

  return settings
}
