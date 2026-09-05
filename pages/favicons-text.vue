<template>
  <div>
    <!-- Hero Section -->
    <section class="section section--hero section--text-generator fixed-header-section">
      <div class="hero-background" aria-hidden="true">
        <div class="hero-gradient"></div>
        <div class="hero-glow"></div>
      </div>

      <div class="container">
        <div class="hero-content fixed-header-content">
          <h1 class="section__title">
            {{ $t('pages.textGenerator.title') }}
          </h1>
          <p class="section__subtitle">
            {{ $t('pages.textGenerator.subtitle') }}
          </p>
          <p class="text-logo-note">
            {{ $t('pages.textGenerator.logoExportNote') }}
          </p>
        </div>
      </div>
    </section>

    <section class="text-seo-guide" aria-labelledby="text-favicon-guide-title">
      <div class="container">
        <h2 id="text-favicon-guide-title">{{ $t('pages.textGenerator.guide.title') }}</h2>
        <p>{{ $t('pages.textGenerator.guide.content') }}</p> 
        <div class="text-seo-guide__links">
          <NuxtLink :to="localePath('/favicons')">{{ $t('pages.textGenerator.guide.imageLink') }}</NuxtLink>
          <NuxtLink :to="localePath('/faq')">{{ $t('pages.textGenerator.guide.faqLink') }}</NuxtLink>
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
                    {{ $t('a11y.textInputHelp') }}
                  </div>
                </div>
                <div class="form-group form-group--font">
                  <label class="form-label" for="font-select">{{ $t('pages.textGenerator.settings.text.faviconFont') }}</label>
                    <!-- <select v-model="textSettings.fontFamily" class="form-select form-select--font">
                      <option v-for="font in fontOptions" :key="font.value" :value="font.value">
                        {{ font.label }}
                      </option>
                    </select> -->
                  <select id="font-select" v-model="textSettings.fontFamily" class="form-select form-select--font" :aria-label="$t('a11y.chooseFont')">
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
                <div class="form-group form-group--font">
                  <label class="form-label" for="brand-text-font-select">{{ $t('pages.textGenerator.settings.text.logoTextFont') }}</label>
                  <select id="brand-text-font-select" v-model="textSettings.brandTextFontFamily" class="form-select form-select--font">
                    <option
                      v-for="font in fontOptions"
                      :key="`brand-${font.value}`"
                      :value="font.value"
                      :style="{ fontFamily: font.value }"
                    >
                      {{ font.label }}
                    </option>
                  </select>
                </div>
                <div class="form-group form-group--font">
                  <label class="form-label" for="brand-text-input">{{ $t('pages.textGenerator.settings.text.logoText') }}</label>
                  <input
                    id="brand-text-input"
                    v-model="textSettings.brandText"
                    type="text"
                    class="form-input form-input--text"
                    maxlength="32"
                    placeholder="FaviconGen"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="font-weight-select">{{ $t('pages.textGenerator.settings.text.weight') }}</label>
                <select id="font-weight-select" v-model="textSettings.fontWeight" class="form-select" :aria-label="$t('a11y.chooseFontWeight')">
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
                    v-model.number="textSettings.fontSize"
                    type="range"
                    min="8"
                    max="48"
                    class="form-range"
                    :aria-label="$t('a11y.fontSize', { size: textSettings.fontSize })"
                    aria-describedby="font-size-value"
                  />
                  <span id="font-size-value" class="range-value" aria-live="polite">{{ textSettings.fontSize }}px</span>
                </div>
              </div>

              <div class="position-controls">
                <div class="form-group">
                  <label class="form-label" for="text-position-x">{{ $t('pages.textGenerator.settings.text.positionX') }}</label>
                  <div class="range-group">
                    <input
                      id="text-position-x"
                      v-model.number="textSettings.textOffsetX"
                      type="range"
                      min="-40"
                      max="40"
                      class="form-range"
                    />
                    <span class="range-value" aria-live="polite">{{ textSettings.textOffsetX }}%</span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="text-position-y">{{ $t('pages.textGenerator.settings.text.positionY') }}</label>
                  <div class="range-group">
                    <input
                      id="text-position-y"
                      v-model.number="textSettings.textOffsetY"
                      type="range"
                      min="-40"
                      max="40"
                      class="form-range"
                    />
                    <span class="range-value" aria-live="polite">{{ textSettings.textOffsetY }}%</span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="text-position-diagonal-down">{{ $t('pages.textGenerator.settings.text.positionDiagonalDown') }}</label>
                  <div class="range-group">
                    <input
                      id="text-position-diagonal-down"
                      v-model.number="textSettings.textDiagonalDownOffset"
                      type="range"
                      min="-40"
                      max="40"
                      class="form-range"
                    />
                    <span class="range-value" aria-live="polite">{{ textSettings.textDiagonalDownOffset }}%</span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="text-position-diagonal-up">{{ $t('pages.textGenerator.settings.text.positionDiagonalUp') }}</label>
                  <div class="range-group">
                    <input
                      id="text-position-diagonal-up"
                      v-model.number="textSettings.textDiagonalUpOffset"
                      type="range"
                      min="-40"
                      max="40"
                      class="form-range"
                    />
                    <span class="range-value" aria-live="polite">{{ textSettings.textDiagonalUpOffset }}%</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="border-radius-range">{{ $t('pages.textGenerator.settings.text.border') }}</label>
                <div class="range-group">
                  <input
                    id="border-radius-range"
                    v-model.number="textSettings.borderRadiusPercent"
                    type="range"
                    min="0"
                    max="100"
                    class="form-range"
                    :aria-label="$t('a11y.cornerRadius', { value: textSettings.borderRadiusPercent })"
                    aria-describedby="border-radius-value"
                  />
                  <span id="border-radius-value" class="range-value" aria-live="polite">{{ textSettings.borderRadiusPercent }}%</span>
                </div>
              </div>

              <!-- Preview Favicons (row, right-to-left) -->
              <div class="Favicons-preview-row" role="group" :aria-label="$t('a11y.faviconPreviews')">
                <div
                  v-for="size in [96, 64, 48, 32, 16]"
                  :key="size"
                  class="Favicon-preview-item"
                >
                  <canvas
                    :ref="el => setFaviconPreviewRef(size, el as HTMLCanvasElement | null)"
                    :width="size"
                    :height="size"
                    :style="{ width: size + 'px', height: size + 'px' }"
                    class="Favicon-preview-canvas"
                    :aria-label="$t('a11y.faviconPreviewSize', { size })"
                    role="img"
                  />
                  <div class="Favicon-size-label" aria-hidden="true">{{ size }}x{{ size }}</div>
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

              <div class="logo-save-panel">
                <div class="logo-options-row">
                  <label
                    class="logo-checkbox-option"
                    :class="{ 'logo-checkbox-option--selected': textSettings.useBrandTextColor }"
                  >
                    <input v-model="textSettings.useBrandTextColor" type="checkbox" />
                    <span class="logo-checkbox-option__box">
                      <Icon v-if="textSettings.useBrandTextColor" name="lucide:check" />
                    </span>
                    <span class="logo-checkbox-option__label">{{ $t('pages.textGenerator.settings.colors.setLogoTitleColor') }}</span>
                  </label>

                  <label
                    class="logo-checkbox-option"
                    :class="{ 'logo-checkbox-option--selected': textSettings.saveLogoSvg }"
                  >
                    <input v-model="textSettings.saveLogoSvg" type="checkbox" />
                    <span class="logo-checkbox-option__box">
                      <Icon v-if="textSettings.saveLogoSvg" name="lucide:check" />
                    </span>
                    <span class="logo-checkbox-option__label">{{ $t('pages.textGenerator.settings.colors.saveLogoSvg') }}</span>
                  </label>
                </div>

                <div class="save-logo-hint" aria-hidden="true">
                  <svg viewBox="0 0 32 32" focusable="false">
                    <path d="M20.3,8.1V6c0-0.8,0.9-1.3,1.5-0.8l6.8,6c0.5,0.4,0.5,1.2,0,1.6l-6.8,6c-0.6,0.5-1.5,0-1.5-0.8v-2h-0.9C12.4,16,5.9,20.3,3,27C3,16.8,10.7,8.6,20.3,8.1z"/>
                  </svg>
                  <span>{{ $t('pages.textGenerator.settings.colors.saveLogoHint') }}</span>
                </div>
              </div>

              <div v-if="textSettings.useBrandTextColor" class="logo-title-controls">
                <div class="form-group logo-title-style">
                  <label class="form-label">{{ $t('pages.textGenerator.settings.colors.logoTitleStyle') }}</label>
                  <div class="radio-group">
                    <label class="radio-option">
                      <input v-model="textSettings.brandTextColorType" type="radio" value="solid" />
                      <span class="radio-custom"></span>
                      <span>{{ $t('pages.textGenerator.settings.colors.solid') }}</span>
                    </label>
                    <label class="radio-option">
                      <input v-model="textSettings.brandTextColorType" type="radio" value="gradient" />
                      <span class="radio-custom"></span>
                      <span>{{ $t('pages.textGenerator.settings.colors.gradient') }}</span>
                    </label>
                  </div>
                </div>

                <div class="logo-title-palettes">
                  <div class="color-block logo-title-color">
                    <div class="palette-bg">
                      <label class="palette-label">{{ $t('pages.textGenerator.settings.colors.logoTitleColor') }}</label>
                      <div class="color-palette-pro">
                        <template v-for="(row, i) in colorPaletteColumns" :key="'brand-row-' + i">
                          <div class="color-row">
                            <button
                              v-for="color in row"
                              :key="'brand-' + color"
                              class="color-swatch"
                              :style="{ backgroundColor: color }"
                              @click="textSettings.brandTextColor = color"
                              :class="{ 'color-swatch--active': textSettings.brandTextColor === color }"
                              :title="color"
                            ></button>
                          </div>
                        </template>
                        <div class="color-row grayscale-column">
                          <button
                            v-for="color in grayscalePalette"
                            :key="'brand-gray-' + color"
                            class="color-swatch"
                            :style="{ backgroundColor: color }"
                            @click="textSettings.brandTextColor = color"
                            :class="{ 'color-swatch--active': textSettings.brandTextColor === color }"
                            :title="color"
                          ></button>
                        </div>
                      </div>
                    </div>
                    <div class="color-input-row">
                      <input
                        v-model="textSettings.brandTextColor"
                        type="color"
                        class="color-picker"
                        :style="{ background: textSettings.brandTextColor }"
                      />
                      <input
                        v-model="textSettings.brandTextColor"
                        type="text"
                        class="color-input"
                        maxlength="7"
                        placeholder="#22D3EE"
                      />
                    </div>
                  </div>

                  <div v-if="textSettings.brandTextColorType === 'gradient'" class="color-block logo-title-color">
                    <div class="palette-bg">
                      <label class="palette-label">{{ $t('pages.textGenerator.settings.colors.logoTitleGradientColor') }}</label>
                      <div class="color-palette-pro">
                        <template v-for="(row, i) in colorPaletteColumns" :key="'brand-gradient-row-' + i">
                          <div class="color-row">
                            <button
                              v-for="color in row"
                              :key="'brand-gradient-' + color"
                              class="color-swatch"
                              :style="{ backgroundColor: color }"
                              @click="textSettings.brandTextGradientColor = color"
                              :class="{ 'color-swatch--active': textSettings.brandTextGradientColor === color }"
                              :title="color"
                            ></button>
                          </div>
                        </template>
                        <div class="color-row grayscale-column">
                          <button
                            v-for="color in grayscalePalette"
                            :key="'brand-gradient-gray-' + color"
                            class="color-swatch"
                            :style="{ backgroundColor: color }"
                            @click="textSettings.brandTextGradientColor = color"
                            :class="{ 'color-swatch--active': textSettings.brandTextGradientColor === color }"
                            :title="color"
                          ></button>
                        </div>
                      </div>
                    </div>
                    <div class="color-input-row">
                      <input
                        v-model="textSettings.brandTextGradientColor"
                        type="color"
                        class="color-picker"
                        :style="{ background: textSettings.brandTextGradientColor }"
                      />
                      <input
                        v-model="textSettings.brandTextGradientColor"
                        type="text"
                        class="color-input"
                        maxlength="7"
                        placeholder="#4F46E5"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="textSettings.backgroundType === 'transparent'" class="form-group">
                <label class="form-label">{{ $t('pages.textGenerator.settings.text.opacity') }}</label>
                <div class="range-group">
                  <input
                    v-model.number="textSettings.backgroundAlpha"
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
            @click="generateFavicons"
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
import { colorPalette, grayscalePalette, fontOptions, FONT_WEIGHT_LABELS, FONT_WEIGHTS } from '~/utils/options'
import { createIcoFile } from '~/utils/icoGenerator'
import { sanitizeFaviconSettings } from '~/utils/securityUtils'
import { BRAND_LOGO_SETTINGS, migrateLegacyLogoSettings } from '~/utils/logoSettings'


  
interface FontObject {
  value: string
  url: string
}

  const colorPaletteColumns = Array.from({ length: colorPalette[0].length }, (_, colIdx) =>
  colorPalette.map(row => row[colIdx])
)

  const textSettings = reactive({ ...BRAND_LOGO_SETTINGS })


  // Save settings to localStorage when they change and sync with global state
  watch(textSettings, (newSettings) => {
    if (isClient) {
      const settingsSnapshot = { ...newSettings }
      localStorage.setItem('favicon-text-settings', JSON.stringify(settingsSnapshot))
      // Trigger custom event for immediate same-page sync
      window.dispatchEvent(new CustomEvent('logo-settings-changed', {
        detail: settingsSnapshot
      }))
    }
  }, { deep: true, flush: 'sync' })

  // Simple text length limit
  watch(() => textSettings.text, (newText) => {
    if (newText && newText.length > 10) {
      textSettings.text = newText.slice(0, 10)
    }
  })

  watch(() => textSettings.brandText, (newText) => {
    if (newText && newText.length > 32) {
      textSettings.brandText = newText.slice(0, 32)
    }
  })

  // Helper function to get supported font weights
  function getSupportedFontWeights(fontFamily: string): number[] {
    return FONT_WEIGHTS[fontFamily] || [400, 700]
  }

  const { t, locale } = useI18n({ useScope: 'global' })
  const localePath = useLocalePath()
  const route = useRoute()
  const pageUrl = computed(() => `https://favicon-gen.com${route.path}`)
  const homeUrl = computed(() => `https://favicon-gen.com${localePath('/')}`)
  const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'
  const selectedSizes = ref([16, 32, 48])
  const isGenerating = ref(false)
  const fontIsLoading = ref(false)
  const generatedImages = ref<any[]>([])
  const showSuccess = ref(false)
  const progress = ref(0)
  const toast = useAppToast()
  const previewCanvas = ref<HTMLCanvasElement | null>(null)
  const FaviconPreviewRefs = reactive<Record<number, HTMLCanvasElement | null>>({})
  const fontFamily = ref(textSettings.fontFamily)
  const availableFontWeights = ref<number[]>([400, 700])
  const activeFontFamily = ref(textSettings.fontFamily)
  const fontLoaded = ref(false)

  const processingText = computed(() => {
    if (progress.value < 20) return t('pages.textGenerator.generating')
    if (progress.value < 40) return t('a11y.renderingText')
    if (progress.value < 70) return t('a11y.creatingFavicons')
    if (progress.value < 90) return t('a11y.creatingArchive')
    return t('a11y.almostReady')
  })

  


  const fontWeightOptions = computed(() => 
  availableFontWeights.value.map(w => ({
    value: w,
    label: `${w}  ${FONT_WEIGHT_LABELS[w] || 'Unknown'}`
  }))
)

const escapeSvgText = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

const getLogoTitle = () => (textSettings.brandText || BRAND_LOGO_SETTINGS.brandText).trim() || BRAND_LOGO_SETTINGS.brandText

const getLogoTextFill = () => (
  textSettings.useBrandTextColor && textSettings.brandTextColorType === 'solid'
    ? textSettings.brandTextColor
    : 'url(#logoTextGradient)'
)

const createLogoSvg = () => {
  const logoText = getLogoTitle()
  const iconSize = 96
  const gap = 22
  const estimatedTextWidth = Math.max(180, logoText.length * 28)
  const width = iconSize + gap + estimatedTextWidth
  const height = 144
  const iconX = 8
  const iconY = 24
  const radius = (Math.max(0, Math.min(textSettings.borderRadiusPercent, 100)) / 100) * (iconSize / 2)
  const safeFontFamily = escapeSvgText(textSettings.fontFamily)
  const safeBrandFontFamily = escapeSvgText(textSettings.brandTextFontFamily)
  const safeIconText = escapeSvgText(textSettings.text)
  const safeLogoText = escapeSvgText(logoText)
  const iconFill = textSettings.backgroundType === 'gradient' ? 'url(#iconGradient)' : textSettings.backgroundColor
  const iconOpacity = textSettings.backgroundType === 'transparent' ? textSettings.backgroundAlpha / 100 : 1
  const logoGradientStart = textSettings.useBrandTextColor ? textSettings.brandTextColor : textSettings.backgroundColor
  const logoGradientEnd = textSettings.useBrandTextColor ? textSettings.brandTextGradientColor : textSettings.gradientColor
  const diagonalDownOffset = textSettings.textDiagonalDownOffset || 0
  const diagonalUpOffset = textSettings.textDiagonalUpOffset || 0
  const iconTextX = iconX + iconSize / 2 + iconSize * (((textSettings.textOffsetX || 0) + diagonalDownOffset + diagonalUpOffset) / 100)
  const iconTextY = iconY + iconSize / 2 + iconSize * (((textSettings.textOffsetY || 0) + diagonalDownOffset - diagonalUpOffset) / 100)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${safeLogoText} logo">
  <defs>
    <linearGradient id="iconGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${textSettings.backgroundColor}" />
      <stop offset="100%" stop-color="${textSettings.gradientColor}" />
    </linearGradient>
    <linearGradient id="logoTextGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${logoGradientStart}" />
      <stop offset="100%" stop-color="${logoGradientEnd}" />
    </linearGradient>
  </defs>
  <rect x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" rx="${radius}" fill="${iconFill}" opacity="${iconOpacity}" />
  <text x="${iconTextX}" y="${iconTextY}" text-anchor="middle" dominant-baseline="central" font-family="${safeFontFamily}, system-ui, sans-serif" font-size="60" font-weight="${textSettings.fontWeight}" fill="${textSettings.textColor}">${safeIconText}</text>
  <text x="${iconX + iconSize + gap}" y="${height / 2 + 2}" dominant-baseline="central" font-family="${safeBrandFontFamily}, system-ui, sans-serif" font-size="46" font-weight="${textSettings.fontWeight}" fill="${getLogoTextFill()}">${safeLogoText}</text>
</svg>`
}

  const  setFaviconPreviewRef = (size: number, el: HTMLCanvasElement | null) => {
    FaviconPreviewRefs[size] = el
  }
  
  const drawTextOnCanvas = (canvas: HTMLCanvasElement, size: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    const percent = Math.max(0, Math.min(textSettings.borderRadiusPercent, 100));
    const radius = (percent / 100) * (size / 2);

    ctx.save();

    // Apply clipping for rounded corners or circle
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

    // Draw background
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

    // Draw text
    const fontSize = Math.floor(size * (textSettings.fontSize / 48));
    ctx.font = `${textSettings.fontWeight} ${fontSize}px ${activeFontFamily.value}`;
    ctx.fillStyle = textSettings.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    // Calculate proper center position accounting for font metrics
    const textMetrics = ctx.measureText(textSettings.text);
    const actualHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
    const centerY = size / 2 + actualHeight / 2 - textMetrics.actualBoundingBoxDescent;

    const diagonalDownOffset = textSettings.textDiagonalDownOffset || 0;
    const diagonalUpOffset = textSettings.textDiagonalUpOffset || 0;
    const offsetX = size * (((textSettings.textOffsetX || 0) + diagonalDownOffset + diagonalUpOffset) / 100);
    const offsetY = size * (((textSettings.textOffsetY || 0) + diagonalDownOffset - diagonalUpOffset) / 100);

    ctx.fillText(textSettings.text, size / 2 + offsetX, centerY + offsetY);

    ctx.restore();
  };


  const redrawAllFavicons = () => {
    if (fontIsLoading.value) return;
  [16, 32, 48, 64, 96].forEach(size => {
    const canvas = FaviconPreviewRefs[size]
    if (canvas) drawTextOnCanvas(canvas, size)
  })
  // Don't call updateFavicon here to avoid conflicts - main watcher will handle it
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
      redrawAllFavicons()
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
      redrawAllFavicons()
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

  // Helper function to create text-based image (like resizeImage but for text)
  async function createTextImage(size: number): Promise<Blob> {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.width = size
    canvas.height = size

    // Use simplified drawing logic
    drawTextOnCanvas(canvas, size)

    return new Promise(resolve => {
      canvas.toBlob(blob => resolve(blob!), "image/png")
    })
  }

  // Helper: Blob to DataURL (same as FaviconConverter)
  function blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = e => resolve(e.target!.result as string)
      reader.readAsDataURL(blob)
    })
  }

  const generateFavicons = async () => {
    if (!textSettings.text || fontIsLoading.value) return

    isGenerating.value = true
    progress.value = 0

    try {
      // Show processing animation for at least 1 second for visual feedback
      await new Promise(resolve => setTimeout(resolve, 500))

      progress.value = 20

      await new Promise(resolve => setTimeout(resolve, 300))
      progress.value = 40

      // Process all sizes using the same pattern as FaviconConverter
      const processed = await Promise.all(
        selectedSizes.value.map(async (size) => {
          const blob = await createTextImage(size)
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

      // Generate ICO file from multiple sizes (always include ICO)
      const icoSizes = [16, 32, 48].filter(size => selectedSizes.value.includes(size))
      if (icoSizes.length === 0) {
        // If no ICO sizes selected, use the smallest available size
        icoSizes.push(Math.min(...selectedSizes.value))
      }

      // Create canvases for ICO generation
      const icoCanvases: HTMLCanvasElement[] = []
      for (const size of icoSizes) {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        drawTextOnCanvas(canvas, size)
        icoCanvases.push(canvas)
      }

      const icoBlob = await createIcoFile(icoCanvases)
      zip.file("favicon.ico", icoBlob)

      if (textSettings.saveLogoSvg) {
        zip.file("logo.svg", createLogoSvg())
      }

      const manifest = {
        name: "My Website",
        short_name: "Website",
        icons: processed.filter(x => x.size >= 192).map(x => ({
          src: "/" + x.fileName,
          sizes: `${x.size}x${x.size}`,
          type: "image/png",
        })),
        theme_color: textSettings.backgroundColor,
        background_color: "#ffffff",
        display: "standalone",
      }
      zip.file("site.webmanifest", JSON.stringify(manifest, null, 2))

      await new Promise(resolve => setTimeout(resolve, 300))
      progress.value = 90

      const zipBlob = await zip.generateAsync({ type: "blob" })

      await new Promise(resolve => setTimeout(resolve, 200))
      progress.value = 100

      generatedImages.value = processed

      // Trigger standard browser download with animation
      const link = document.createElement('a')
      link.href = URL.createObjectURL(zipBlob)
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

      // Auto-reset to normal state after showing success for 3 seconds
      setTimeout(() => {
        showSuccess.value = false
        progress.value = 0
      }, 3000)

    } catch (error) {
      console.error('Error generating text favicons:', error)

      let errorMessage = t('converter.error')
      if (error instanceof Error) {
        if (error.message.includes('memory')) {
          errorMessage = t('converter.errorMemory')
        } else if (error.message.includes('format')) {
          errorMessage = t('converter.errorFormat')
        } else if (error.message.includes('size')) {
          errorMessage = t('converter.errorSize')
        }
      }

      toast.add({
        title: errorMessage,
        type: 'background'
      })
    } finally {
      isGenerating.value = false
      // Don't reset progress here - let the success state show
    }
  }


  // Combined watcher for all textSettings changes
  watch(
    textSettings,
    async () => {
      // Reset success state when user changes settings
      generatedImages.value = []
      showSuccess.value = false
      progress.value = 0

      // Update preview (same as updatePreview function)
      await nextTick()
      if (previewCanvas.value && !fontIsLoading.value) {
        drawTextOnCanvas(previewCanvas.value, 150)
      }

      // Redraw all favicons
      await nextTick();
      [16, 32, 48, 64, 96].forEach(size => {
        const canvas = FaviconPreviewRefs[size]
        if (canvas && !fontIsLoading.value) drawTextOnCanvas(canvas, size)
      })
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
    redrawAllFavicons();
  }
});



  onMounted(() => {
    if (isClient) {
      // Load settings first
      const savedSettings = localStorage.getItem('favicon-text-settings')
      if (savedSettings) {
        try {
          const rawSettings = JSON.parse(savedSettings)
          const parsed = migrateLegacyLogoSettings(sanitizeFaviconSettings(rawSettings))
          if (rawSettings?.exportOptionsVersion !== BRAND_LOGO_SETTINGS.exportOptionsVersion) {
            parsed.saveLogoSvg = BRAND_LOGO_SETTINGS.saveLogoSvg
            parsed.brandTextColorType = BRAND_LOGO_SETTINGS.brandTextColorType
            parsed.exportOptionsVersion = BRAND_LOGO_SETTINGS.exportOptionsVersion
          }
          Object.assign(textSettings, parsed)
        } catch (error) {
          console.warn('Failed to parse saved text settings:', error)
        }
      }

      availableFontWeights.value = getSupportedFontWeights(textSettings.fontFamily)
      if (!availableFontWeights.value.includes(textSettings.fontWeight)) {
        textSettings.fontWeight = availableFontWeights.value[0]
      }
    }

    // Draw previews after settings are loaded
    nextTick(() => {
      [16, 32, 48, 64, 96].forEach(size => {
        const canvas = FaviconPreviewRefs[size]
        if (canvas && !fontIsLoading.value) drawTextOnCanvas(canvas, size)
      })
      updatePreview()
    })
  })
  
  
useHead(() => ({
    title: t('pages.textGenerator.seoTitle'),
    meta: [
      {
        name: 'description',
        content: t('pages.textGenerator.description')
      },
      {
        property: 'og:title',
        content: t('pages.textGenerator.seoTitle')
      },
      {
        property: 'og:description',
        content: t('pages.textGenerator.description')
      },
      {
        property: 'og:type',
        content: 'website'
      },
      { name: 'twitter:title', content: t('pages.textGenerator.seoTitle') },
      { name: 'twitter:description', content: t('pages.textGenerator.description') }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          '@id': `${pageUrl.value}#application`,
          name: t('pages.textGenerator.title'),
          description: t('pages.textGenerator.description'),
          url: pageUrl.value,
          applicationCategory: 'DesignApplication',
          operatingSystem: 'Web Browser',
          inLanguage: locale.value === 'uk' ? 'uk-UA' : 'en-US',
          isPartOf: { '@id': 'https://favicon-gen.com/#website' },
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
        })
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('nav.home'), item: homeUrl.value },
            { '@type': 'ListItem', position: 2, name: t('nav.textGenerator'), item: pageUrl.value }
          ]
        })
      }
    ]
  }))
  </script>
  
  <style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

  .section--text-generator {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: spacing(3xl) 0 spacing(2xl);
    color: var(--hero-heading);
    background: var(--hero-surface);
    border-bottom: 1px solid var(--hero-border);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 0;
      background-image: radial-gradient(circle, var(--hero-dots) 3px, transparent 3.8px);
      background-size: 76px 76px;
      mask-image: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.38) 100%);
      pointer-events: none;
    }

    @include respond-to(2xl) {
      padding: spacing(4xl) 0 spacing(3xl);
    }

    @include respond-to(3xl) {
      padding: spacing(5xl) 0 spacing(4xl);
    }

    .container,
    .hero-content {
      position: relative;
      z-index: 2;
    }
  
    .section__title {
      margin-bottom: spacing(md);
      background: var(--hero-title-gradient);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: font-weight(extrabold);
      line-height: 1.08;
    }
  
    .section__subtitle {
      margin-bottom: 0;
      color: var(--hero-subheading);
      font-size: font-size(lg);
      font-weight: font-weight(medium);
    }

    .text-logo-note {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: spacing(lg) auto 0;
      padding: spacing(sm) spacing(lg);
      border: 1px solid rgba(34, 211, 238, 0.32);
      border-radius: border-radius(full);
      background: rgba(34, 211, 238, 0.1);
      color: var(--primary-light);
      font-size: font-size(sm);
      font-weight: font-weight(semibold);
      line-height: 1.35;
      box-shadow: 0 12px 34px rgba(34, 211, 238, 0.1);

      .light-mode & {
        color: #0f8f9c;
        background: rgba(34, 211, 238, 0.14);
      }
    }
  }

  .hero-background {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .hero-gradient {
    position: absolute;
    inset: 0;
    background: var(--hero-gradient);
    background-size: 160% 160%;
    animation: gradientShift 15s ease infinite;
  }

  .hero-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 900px;
    height: 460px;
    background: var(--hero-glow);
    filter: blur(36px);
    transform: translate(-50%, -50%);
    animation: glowPulse 6s ease-in-out infinite;
  }

  .text-seo-guide {
    padding: spacing(3xl) 0;
    background: var(--bg-secondary);
    text-align: center;

    p {
      max-width: 850px;
      margin: spacing(md) auto spacing(lg);
      color: var(--text-secondary);
      line-height: 1.7;
    }

    &__links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: spacing(lg);

      a { color: var(--primary); font-weight: font-weight(semibold); }
    }
  }
  
  .generator-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: border-radius(lg);
    margin: 0 auto;
    padding: spacing(xs);

    @include respond-to(sm) {
      padding: spacing(sm);
      border-radius: border-radius(xl);
    }

    @include respond-to(md) {
      padding: spacing(md);
    }

    @include respond-to(lg) {
      padding: spacing(lg);
    }

    @include respond-to(xl) {
      padding: spacing(xl);
    }

    // Slightly darker on light theme
    .light-mode & {
      background: #f3f4f6;
      border-color: #e5e7eb;
    }
  }
  
  .generator-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(sm);

    @include respond-to(sm) {
      gap: spacing(md);
    }

    @include respond-to(md) {
      gap: spacing(lg);
    }

    @include respond-to(xl) {
      grid-template-columns: 1fr 1fr;
      gap: spacing(xl);
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
    gap: spacing(xs);
    margin-bottom: spacing(sm);

    @include respond-to(sm) {
      gap: spacing(sm);
      margin-bottom: spacing(md);
    }

    @include respond-to(md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin-bottom: spacing(lg);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  
  .form-group {
    margin-bottom: spacing(sm);

    @include respond-to(sm) {
      margin-bottom: spacing(md);
    }

    @include respond-to(md) {
      margin-bottom: spacing(lg);
    }

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
    padding: spacing(xs) spacing(sm);
    border: 1px solid var(--border);
    border-radius: border-radius(md);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: font-size(sm);
    box-sizing: border-box;
    @include transition();

    @include respond-to(sm) {
      padding: spacing(sm) spacing(md);
      border-radius: border-radius(lg);
      font-size: font-size(base);
    }

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
    }

    &--text {
      min-height: 40px;
      text-align: center;
      font-size: font-size(lg);
      font-weight: font-weight(bold);
      padding: spacing(xs);

      @include respond-to(sm) {
        min-height: 46px;
        font-size: font-size(xl);
      }
    }

    &--color {
      flex: 1;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: font-size(xs);
      min-width: 0;

      @include respond-to(sm) {
        font-size: font-size(sm);
      }
    }
  }
  
  .form-select {
    width: 100%;
    min-height: 40px;
    padding: spacing(xs) spacing(lg) spacing(xs) spacing(sm);
    border: 1px solid var(--border);
    border-radius: border-radius(md);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: font-size(sm);
    cursor: pointer;
    @include transition();
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right spacing(sm) center;
    background-repeat: no-repeat;
    background-size: 14px 14px;
    appearance: none;
    box-sizing: border-box;

    @include respond-to(sm) {
      min-height: 46px;
      padding: spacing(sm) spacing(2xl) spacing(sm) spacing(md);
      border-radius: border-radius(lg);
      font-size: font-size(base);
      background-position: right spacing(md) center;
      background-size: 16px 16px;
    }

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
    }

    &--font {
      font-size: font-size(xs);
      min-height: 40px;

      @include respond-to(sm) {
        font-size: font-size(sm);
        min-height: 46px;
      }
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
  
  .Favicons-preview-row {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 32px;
    flex-wrap: wrap;
    padding: 0 spacing(xs);

    @include respond-to(sm) {
      flex-wrap: nowrap;
      gap: 16px;
      padding: 0;
    }
  }
  
  .Favicon-preview-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  
    .Favicon-size-label {
      margin-top: 6px;
      font-size: 13px;
      color: #888;
    }
  }
  
  .Favicon-preview-canvas {
    background: transparent;
    overflow: hidden;
  }
  
  .palettes-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(md);
    margin-top: spacing(lg);
    margin-bottom: spacing(md);

    @include respond-to(sm) {
      gap: spacing(lg);
    }

    @include respond-to(lg) {
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
      gap: spacing(xs);
      margin-bottom: spacing(sm);
      min-width: 0;
    }
  
    .palette-bg {
      background: var(--border);
      border-radius: 16px;
      padding: spacing(sm);
      display: inline-block;
      margin: 0 auto;
      margin-bottom: spacing(md);
  
      // Darker background for light theme to improve color visibility
      .light-mode & {
        background: #d1d5db;
        border: 1px solid #9ca3af;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
      min-width: 60px;
      font-size: font-size(sm);
      padding: spacing(xs) spacing(sm);
      border: 1px solid var(--border);
      border-radius: border-radius(md);
      background: var(--bg-primary);
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      color: var(--text-primary);

      @include respond-to(sm) {
        min-width: 84px;
        font-size: font-size(base);
        padding: spacing(sm);
      }
    }
  }

  .position-controls {
    display: grid;
    gap: spacing(md);

    @include respond-to(md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .logo-save-panel {
    display: grid;
    gap: spacing(md);
    margin: spacing(lg) 0 spacing(md);

    @include respond-to(lg) {
      grid-template-columns: minmax(260px, 0.9fr) minmax(280px, 1.1fr);
      align-items: center;
    }
  }

  .logo-options-row {
    display: grid;
    gap: spacing(sm);
  }

  .logo-title-controls {
    margin-bottom: spacing(md);
  }

  .logo-title-style {
    margin-bottom: spacing(md);
  }

  .logo-title-palettes {
    display: grid;
    gap: spacing(md);

    @include respond-to(lg) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
    }
  }

  .logo-title-color {
    margin-bottom: 0;
  }

  .logo-checkbox-option {
    display: inline-flex;
    align-items: center;
    gap: spacing(sm);
    min-height: 44px;
    padding: spacing(sm) spacing(md);
    border: 2px solid var(--border);
    border-radius: border-radius(lg);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: font-size(sm);
    font-weight: font-weight(medium);
    cursor: pointer;
    @include transition();

    &:hover {
      background: var(--bg-secondary);
      border-color: var(--primary-light);
      transform: translateY(-1px);
    }

    &--selected {
      border-color: var(--primary);
      background: rgba(16, 185, 129, 0.05);

      .dark-mode & {
        background: rgba(20, 184, 166, 0.1);
      }
    }

    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    &__box {
      width: 20px;
      height: 20px;
      border: 2px solid var(--border);
      border-radius: border-radius(sm);
      @include flex-center;
      flex-shrink: 0;
      color: #ffffff;
      @include transition();

      .logo-checkbox-option:hover & {
        border-color: var(--primary);
      }

      .logo-checkbox-option--selected & {
        border-color: var(--primary);
        background: var(--primary);
      }

      svg {
        width: 12px;
        height: 12px;
      }
    }

    &__label {
      line-height: 1.25;
    }
  }

  .save-logo-hint {
    position: relative;
    display: grid;
    align-items: center;
    justify-content: center;
    justify-self: center;
    width: min(100%, 340px);
    min-height: auto;
    padding: spacing(md) spacing(lg);
    color: var(--primary-light);
    font-family: 'Permanent Marker', 'Comic Sans MS', cursive;
    font-size: clamp(1.15rem, 2vw, 1.8rem);
    font-weight: 400;
    line-height: 1.02;
    transform: rotate(-3deg);
    text-align: center;
    text-shadow:
      0 0 14px rgba(34, 211, 238, 0.52),
      0 4px 0 rgba(3, 15, 30, 0.5);

    @include respond-to(lg) {
      justify-self: start;
      width: min(100%, 360px);
      min-height: 112px;
      padding: spacing(md) spacing(lg) spacing(md) spacing(xl);
      transform: rotate(-3.5deg) translate(18px, -4px);
      text-align: left;
    }

    .light-mode & {
      color: #0f8f9c;
      text-shadow:
        0 0 14px rgba(34, 211, 238, 0.32),
        0 3px 0 rgba(255, 255, 255, 0.95);
    }

    svg {
      display: none;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.8;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 16px rgba(34, 211, 238, 0.7));

      @include respond-to(lg) {
        position: absolute;
        display: block;
        left: -54px;
        top: 50%;
        width: clamp(54px, 4.6vw, 76px);
        height: clamp(54px, 4.6vw, 76px);
        transform: translateY(-50%) rotate(180deg);
      }
    }

    span {
      display: block;
      max-width: 300px;

      @include respond-to(lg) {
        transform: rotate(2deg);
      }
    }
  }
  
  .color-palette-pro {
    display: flex;
    flex-direction: row;
    gap: 2px;
    overflow-x: auto;
    padding: 2px;

    .color-row {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 28px;
    }

    .grayscale-column {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-left: spacing(xs);
      min-width: 28px;

      @include respond-to(sm) {
        margin-left: spacing(sm);
      }
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
    position: relative;

    // Better visibility on light theme
    .light-mode & {
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.1);
    }

    &:hover {
      border-color: var(--primary);
      transform: scale(1.05);
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);

      .light-mode & {
        box-shadow: 0 2px 6px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(0,0,0,0.15);
      }
    }

    &--active {
      border-color: var(--primary);
      outline: 2px solid var(--bg-primary);
      z-index: 2;
      transform: scale(1.05);
      box-shadow: 0 3px 8px rgba(0,0,0,0.2);

      .light-mode & {
        box-shadow: 0 3px 8px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(0,0,0,0.2);
      }
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

    @media (max-width: 500px) {
      .container {
        padding: 0 spacing(xs);
      }
    }
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

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.62; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.04); }
  }
  </style>
