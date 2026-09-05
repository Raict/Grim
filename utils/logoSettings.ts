import type { SafeFaviconSettings } from './securityUtils'

export interface LogoSettings {
  text: string
  fontFamily: string
  brandTextFontFamily: string
  fontSize: number
  fontWeight: number
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
  brandTextFontFamily: 'Sora',
  fontSize: 30,
  fontWeight: 800,
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

  return isLegacyPreset ? { ...settings, ...BRAND_LOGO_SETTINGS } : settings
}
