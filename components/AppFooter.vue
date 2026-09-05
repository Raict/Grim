<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <!-- Main Footer -->
        <div class="footer__main">
          <!-- Brand Section -->
          <div class="footer__brand">
            <div class="footer__logo">
              <div class="footer__logo-icon">
                <DynamicLogo :size="32" canvas-class="footer__dynamic-logo" />
                <div class="footer__logo-glow"></div>
              </div>
              <span
                class="footer__logo-text"
                :style="{
                  fontFamily: logoTextStyles.fontFamily,
                  fontWeight: logoTextStyles.fontWeight,
                  background: logoTextStyles.background,
                  '-webkit-background-clip': 'text',
                  '-webkit-text-fill-color': 'transparent',
                  'background-clip': 'text'
                }"
              >
                {{ displayLogoText }}
              </span>
            </div>
            <p class="footer__description">
              {{ $t('footer.description') }}
            </p>
          </div>

          <!-- Links Group -->
          <div class="footer__links-group">
            <!-- Quick Links -->
            <div class="footer__section">
              <h4 class="footer__section-title">
                <Icon name="lucide:navigation" class="footer__section-icon" />
                {{ $t('nav.navigation') }}
              </h4>
              <ul class="footer__links">
                <li>
                  <NuxtLink
                    :to="localePath('/')"
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path === '/' || $route.path === '/en' }"
                  >
                    <Icon name="lucide:home" class="footer__link-icon" />
                    {{ $t('nav.home') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    :to="localePath('/favicons')"
                    prefetch-on="interaction"
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path.includes('/favicons') && !$route.path.includes('/favicons-text') }"
                  >
                    <Icon name="lucide:image" class="footer__link-icon" />
                    {{ $t('nav.converter') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    :to="localePath('/favicons-text')"
                    prefetch-on="interaction"
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path.includes('/favicons-text') }"
                  >
                    <Icon name="lucide:type" class="footer__link-icon" />
                    {{ $t('nav.textGenerator') }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Legal Links -->
            <div class="footer__section">
              <h4 class="footer__section-title">
                <Icon name="lucide:info" class="footer__section-icon" />
                {{ $t('nav.about') }}
              </h4>
              <ul class="footer__links">
                <li>
                  <NuxtLink
                    :to="localePath('/about')"
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path.includes('/about') }"
                  >
                    <Icon name="lucide:info" class="footer__link-icon" />
                    {{ $t('footer.links.about') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    :to="localePath('/faq')"
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path.includes('/faq') }"
                  >
                    <Icon name="lucide:help-circle" class="footer__link-icon" />
                    {{ $t('nav.faq') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    :to="localePath('/privacy')"
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path.includes('/privacy') }"
                  >
                    <Icon name="lucide:shield" class="footer__link-icon" />
                    {{ $t('footer.links.privacy') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    :to="localePath('/terms')"
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path.includes('/terms') }"
                  >
                    <Icon name="lucide:file-text" class="footer__link-icon" />
                    {{ $t('footer.links.terms') }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer__bottom">
          <div class="footer__bottom-content">
            <div class="footer__copyright-section">
              <p class="footer__copyright">
                {{ $t('footer.copyright', { year: currentYear }) }}
              </p>
              <p class="footer__made-with">
                {{ $t('footer.madeWith') }}
              </p>
            </div>
            <div class="footer__actions">
              <button
                class="footer__top-btn"
                @click="scrollToTop"
                :title="$t('a11y.backToTop')"
                :aria-label="$t('a11y.backToTop')"
              >
                <Icon name="lucide:arrow-up" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { sanitizeFaviconSettings } from '~/utils/securityUtils'
import { BRAND_LOGO_SETTINGS, migrateLegacyLogoSettings } from '~/utils/logoSettings'
import { fontOptions } from '~/utils/options'

const localePath = useLocalePath()
const route = useRoute()
const currentYear = new Date().getFullYear()
const customLogoText = ref(BRAND_LOGO_SETTINGS.brandText)
const isTextGeneratorPage = computed(() => route.path.includes('/favicons-text'))
const displayLogoText = computed(() => isTextGeneratorPage.value ? customLogoText.value : BRAND_LOGO_SETTINGS.brandText)

const logoTextStyles = reactive({
  fontFamily: `'${BRAND_LOGO_SETTINGS.brandTextFontFamily}', system-ui, sans-serif`,
  fontWeight: BRAND_LOGO_SETTINGS.fontWeight,
  background: `linear-gradient(135deg, ${BRAND_LOGO_SETTINGS.backgroundColor}, ${BRAND_LOGO_SETTINGS.gradientColor})`
})

const getBrandTextBackground = (settings: ReturnType<typeof sanitizeFaviconSettings>) => {
  if (settings.useBrandTextColor && settings.brandTextColor) {
    return settings.brandTextColorType === 'gradient' && settings.brandTextGradientColor
      ? `linear-gradient(135deg, ${settings.brandTextColor}, ${settings.brandTextGradientColor})`
      : settings.brandTextColor
  }

  if (settings.backgroundType === 'gradient' && settings.backgroundColor && settings.gradientColor) {
    return `linear-gradient(135deg, ${settings.backgroundColor}, ${settings.gradientColor})`
  }

  return settings.backgroundColor || logoTextStyles.background
}

const loadBrandTextFont = (fontFamily: string) => {
  const fontObj = fontOptions.find(font => font.value === fontFamily)
  if (!fontObj?.url || document.querySelector(`link[data-font="${fontObj.value}"]`)) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = fontObj.url
  link.setAttribute('data-font', fontObj.value)
  document.head.appendChild(link)
}

const handleLogoSettingsChange = (event: CustomEvent | StorageEvent) => {
  try {
    let detail: unknown
    if ('detail' in event) {
      detail = event.detail
    } else if (event.key === 'favicon-text-settings' && event.newValue) {
      detail = JSON.parse(event.newValue)
    } else {
      return
    }

    const settings = migrateLegacyLogoSettings(sanitizeFaviconSettings(detail))
    const brandTextFontFamily = settings.brandTextFontFamily || BRAND_LOGO_SETTINGS.brandTextFontFamily
    customLogoText.value = settings.brandText || BRAND_LOGO_SETTINGS.brandText
    loadBrandTextFont(brandTextFontFamily)
    logoTextStyles.fontFamily = `'${brandTextFontFamily}', system-ui, sans-serif`

    if (settings.fontWeight) {
      logoTextStyles.fontWeight = settings.fontWeight
    }
    logoTextStyles.background = getBrandTextBackground(settings)
  } catch (error) {
    console.warn('Failed to apply footer logo settings:', error)
  }
}

onMounted(() => {
  loadBrandTextFont(BRAND_LOGO_SETTINGS.brandTextFontFamily)

  try {
    const saved = localStorage.getItem('favicon-text-settings')
    if (saved) {
      handleLogoSettingsChange({ detail: JSON.parse(saved) } as CustomEvent)
    }
  } catch (error) {
    console.warn('Failed to load footer logo settings:', error)
  }

  window.addEventListener('logo-settings-changed', handleLogoSettingsChange as EventListener)
  window.addEventListener('storage', handleLogoSettingsChange as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('logo-settings-changed', handleLogoSettingsChange as EventListener)
  window.removeEventListener('storage', handleLogoSettingsChange as EventListener)
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style lang="scss" scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  margin-top: spacing(4xl);

  // Slightly darker on light theme
  .light-mode & {
    background: #f3f4f6;
    border-top-color: #e5e7eb;
  }

  &__content {
    padding: spacing(2xl) 0 spacing(lg);
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(xl);
    margin-bottom: spacing(xl);

    @include respond-to(md) {
      grid-template-columns: 1.2fr 2fr;
      gap: spacing(2xl);
      align-items: start;
    }

    @include respond-to(lg) {
      grid-template-columns: 1fr 1.8fr;
    }
  }

  &__brand {
    text-align: center;

    @include respond-to(md) {
      text-align: left;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: spacing(sm);
    margin-bottom: spacing(md);
    font-size: font-size(lg);
    font-weight: font-weight(bold);
    color: var(--text-primary);

    @include respond-to(md) {
      justify-content: flex-start;
    }
  }

  &__logo-icon {
    position: relative;
    width: 32px;
    height: 32px;
    @include flex-center;
    @include transition();

    &:hover {
      transform: translateY(-1px) scale(1.05);
    }
  }

  &__dynamic-logo {
    display: block;
  }

  &__logo-glow {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border-radius: inherit;
    z-index: -1;
    filter: blur(8px);
    opacity: 0.6;
    animation: glowPulse 3s ease-in-out infinite;
  }

  &__logo-text {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    background-size: 200% 200%;
    display: inline-block;
    line-height: 1.18;
    padding-bottom: 0.08em;
    animation: gradientText 4s ease-in-out infinite;

    @supports not (-webkit-background-clip: text) {
      color: var(--primary);
    }
  }

  &__description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
    font-size: font-size(base);
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;

    @include respond-to(md) {
      margin-left: 0;
      margin-right: 0;
    }
  }

  &__links-group {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(lg);

    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
      gap: spacing(xl);
    }
  }

  &__section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: border-radius(lg);
    padding: spacing(md);
    backdrop-filter: blur(10px);
    @include transition();

    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    &-title {
      display: flex;
      align-items: center;
      gap: spacing(xs);
      font-size: font-size(xs);
      font-weight: font-weight(semibold);
      color: var(--text-primary);
      margin-bottom: spacing(sm);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    &-icon {
      width: 14px;
      height: 14px;
      color: var(--primary);
    }
  }

  &__links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: spacing(xs);
  }

  &__link {
    display: flex;
    align-items: center;
    gap: spacing(xs);
    color: var(--text-secondary);
    text-decoration: none;
    font-size: font-size(xs);
    padding: spacing(xs) spacing(sm);
    border-radius: border-radius(sm);
    @include transition();
    position: relative;

    &:hover {
      color: var(--primary);
      background: rgba(16, 185, 129, 0.05);
      transform: translateX(spacing(xs));
    }

    &--active {
      color: var(--primary);
      font-weight: font-weight(medium);
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);

      .light-mode & {
        color: #047857;
      }

      .dark-mode & {
        color: var(--primary-light);
      }
    }

    &-icon {
      width: 12px;
      height: 12px;
      opacity: 0.7;
      @include transition();
    }

    &:hover &-icon {
      opacity: 1;
      transform: scale(1.1);
    }
  }


  &__bottom {
    padding-top: spacing(md);
    border-top: 1px solid var(--border);

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: spacing(sm);
      text-align: center;

      @include respond-to(sm) {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
    }
  }

  &__copyright-section {
    display: flex;
    flex-direction: column;
    gap: spacing(xs);

    @include respond-to(sm) {
      flex-direction: row;
      gap: spacing(sm);
      align-items: center;
    }
  }

  &__copyright {
    color: var(--text-secondary);
    font-size: font-size(sm);
    margin: 0;
    font-weight: font-weight(medium);
  }

  &__made-with {
    color: var(--text-secondary);
    font-size: font-size(xs);
    margin: 0;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: spacing(sm);
  }


  &__top-btn {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border: none;
    border-radius: border-radius(md);
    color: white;
    cursor: pointer;
    @include flex-center;
    @include transition();
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);

    &:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }

    &:active {
      transform: translateY(-1px) scale(0.98);
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
}


@keyframes glowPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

@keyframes gradientText {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.footer {
  animation: fadeInUp 0.8s ease-out;
}

.footer__section {
  animation: fadeInUp 0.6s ease-out;

  @for $i from 1 through 3 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.15}s;
    }
  }
}


@include respond-to(lg) {
  .footer {
    &__main {
      grid-template-columns: 1fr 1.5fr;
    }

    &__links-group {
      grid-template-columns: repeat(2, 1fr);
      gap: spacing(2xl);
    }
  }
}
</style>
