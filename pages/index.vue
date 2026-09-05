<template>
  <div itemscope itemtype="https://schema.org/WebPage">
    <!-- Hero section -->
    <section class="hero-section fixed-header-section" aria-labelledby="main-heading" role="banner">
      <div class="hero-background" aria-hidden="true">
        <div class="hero-gradient"></div>
        <div class="hero-glow"></div>
      </div>
      <div class="container hero-container">
        <header class="hero-content fixed-header-content">
          <div class="hero-text">
            <h1 id="main-heading" class="hero-title" itemprop="name">
              <span class="hero-title__main">{{ $t('pages.home.title') }}</span>
              <span class="hero-title__sub">{{ $t('pages.home.subtitle') }}</span>
            </h1>

            <p class="hero-description" itemprop="description">
              {{ $t('pages.home.description') }}
            </p>

          </div>

          <div class="hero-visual" role="img" :aria-label="$t('a11y.generatorDemo')">
            <div class="hero-preview">
              <div class="browser-mockup">
                <div class="browser-header">
                  <div class="browser-dots" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div class="browser-tab">
                    <div class="favicon-demo" :key="currentFaviconIndex" :style="faviconStyle" role="img" :aria-label="$t('a11y.faviconExample', { icon: currentFavicon.icon.replace('lucide:', '') })">
                      <Icon :name="currentFavicon.icon" aria-hidden="true" />
                    </div>
                    <Icon name="lucide:x" class="browser-tab__close" aria-hidden="true" />
                  </div>
                  <div class="browser-new-tab" aria-hidden="true">
                    <Icon name="lucide:plus" />
                  </div>
                  <span class="browser-header__spacer" aria-hidden="true"></span>
                </div>
                <div class="browser-content">
                  <div class="demo-website">
                    <div class="demo-favicon-showcase" aria-hidden="true">
                      <span
                        v-for="size in [52, 40, 30, 22]"
                        :key="size"
                        class="demo-favicon-tile"
                        :style="[{ width: `${size}px`, height: `${size}px` }, faviconStyle]"
                      >
                        <Icon :name="currentFavicon.icon" />
                      </span>
                    </div>
                    <div class="demo-content">
                      <div class="demo-line"></div>
                      <div class="demo-line"></div>
                      <div class="demo-bottom-section">
                        <div class="demo-lines-group">
                          <div class="demo-line short"></div>
                          <div class="demo-line short"></div>
                        </div>
                        <div class="demo-cta">
                          <NuxtLink :to="localePath('/favicons')" prefetch-on="interaction" class="demo-generate-btn">
                            <Icon name="lucide:sparkles" />
                            <span>{{ $t('pages.home.demo.generateBtn') }}</span>
                          </NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </section>

    <!-- Features section -->
    <section id="features-section" class="features-section" aria-labelledby="features-heading" itemscope itemtype="https://schema.org/ItemList" role="region">
      <div class="container">
        <header class="section-header">
          <h2 id="features-heading" class="section-title" itemprop="name">{{ $t('pages.home.features.title') }}</h2>
          <p class="section-description" itemprop="description">
            {{ $t('pages.home.features.description') }}
          </p>
        </header>

        <div class="features-grid">
          <article class="feature-card feature-card--primary">
            <NuxtLink :to="localePath('/favicons')" prefetch-on="interaction" class="feature-link" @mouseenter="playHoverSound">
            <div class="feature-card__icon" aria-hidden="true">
              <Icon name="lucide:image" :size="46" aria-hidden="true"/>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">{{ $t('pages.home.features.converter.title') }}</h3>
              <p id="converter-desc" class="feature-card__description">
                {{ $t('pages.home.features.converter.description') }}
              </p>
              <ul class="feature-card__features">
                <li class="feature-item">
                  <Icon name="lucide:check" aria-hidden="true" />
                  <span>{{ $t('pages.home.features.converter.features.formats') }}</span>
                </li>
                <li class="feature-item">
                  <Icon name="lucide:check" aria-hidden="true" />
                  <span>{{ $t('pages.home.features.converter.features.zip') }}</span>
                </li>
                <li class="feature-item">
                  <Icon name="lucide:check" aria-hidden="true" />
                  <span>{{ $t('pages.home.features.converter.features.guide') }}</span>
                </li>
              </ul>
            </div>
            <div class="feature-card__arrow" aria-hidden="true">
              <Icon name="lucide:arrow-right" />
            </div>
            </NuxtLink>
          </article>

          <!-- Text favicon generator -->
          <article class="feature-card feature-card--secondary">
            <NuxtLink :to="localePath('/favicons-text')" prefetch-on="interaction" class="feature-link" @mouseenter="playHoverSound">
            <div class="feature-card__icon" aria-hidden="true">
              <Icon name="lucide:type" :size="46" aria-hidden="true"/>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">{{ $t('pages.home.features.text.title') }}</h3>
              <p id="text-desc" class="feature-card__description">
                {{ $t('pages.home.features.text.description') }}
              </p>
              <ul class="feature-card__features">
                <li class="feature-item">
                  <Icon name="lucide:check" aria-hidden="true" />
                  <span>{{ $t('pages.home.features.text.features.fonts') }}</span>
                </li>
                <li class="feature-item">
                  <Icon name="lucide:check" aria-hidden="true" />
                  <span>{{ $t('pages.home.features.text.features.colors') }}</span>
                </li>
                <li class="feature-item">
                  <Icon name="lucide:check" aria-hidden="true" />
                  <span>{{ $t('pages.home.features.text.features.effects') }}</span>
                </li>
              </ul>
            </div>
            <div class="feature-card__arrow" aria-hidden="true">
              <Icon name="lucide:arrow-right" />
            </div>
            </NuxtLink>
          </article>

          <!-- AI favicon generator -->
          <!-- <NuxtLink to="/favicon-ai" class="feature-card feature-card--accent">
            <div class="feature-card__icon">
              <Icon name="lucide:sparkles" />
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">{{ $t('pages.home.features.ai.title') }}</h3>
              <p class="feature-card__description">
                {{ $t('pages.home.features.ai.description') }}
              </p>
              <div class="feature-card__features">
                <div class="feature-item">
                  <Icon name="lucide:check" />
                  <span>{{ $t('pages.home.features.ai.features.description') }}</span>
                </div>
                <div class="feature-item">
                  <Icon name="lucide:check" />
                  <span>{{ $t('pages.home.features.ai.features.styles') }}</span>
                </div>
                <div class="feature-item">
                  <Icon name="lucide:check" />
                  <span>{{ $t('pages.home.features.ai.features.unique') }}</span>
                </div>
              </div>
            </div>
            <div class="feature-card__arrow">
              <Icon name="lucide:arrow-right" />
            </div>
          </NuxtLink> -->
        </div>
      </div>
    </section>

    <!-- Google AdSense section -->
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

    <!-- Benefits section -->
    <section class="benefits-section" aria-labelledby="benefits-heading">
      <div class="container">
        <div class="section-header">
          <h2 id="benefits-heading" class="section-title">{{ $t('pages.home.benefits.title') }}</h2>
        </div>

        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-icon">
              <Icon name="lucide:zap" />
            </div>
            <h3 class="benefit-title">{{ $t('pages.home.benefits.fast.title') }}</h3>
            <p class="benefit-description">
              {{ $t('pages.home.benefits.fast.description') }}
            </p>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">
              <Icon name="lucide:shield-check" />
            </div>
            <h3 class="benefit-title">{{ $t('pages.home.benefits.secure.title') }}</h3>
            <p class="benefit-description">
              {{ $t('pages.home.benefits.secure.description') }}
            </p>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">
              <Icon name="lucide:heart" />
            </div>
            <h3 class="benefit-title">{{ $t('pages.home.benefits.free.title') }}</h3>
            <p class="benefit-description">
              {{ $t('pages.home.benefits.free.description') }}
            </p>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">
              <Icon name="lucide:smartphone" />
            </div>
            <h3 class="benefit-title">{{ $t('pages.home.benefits.responsive.title') }}</h3>
            <p class="benefit-description">
              {{ $t('pages.home.benefits.responsive.description') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n({ useScope: 'global' });
const localePath = useLocalePath()
const route = useRoute()
const pageUrl = computed(() => `https://favicon-gen.com${route.path === '/' ? '/' : route.path}`)
const homeOgImage = computed(() => `https://favicon-gen.com/og-image-${locale.value === 'uk' ? 'uk' : 'en'}-v2.jpg`)

useHead(() => ({
  title: t('pages.home.fullTitle'),
  meta: [
    {
      name: 'description',
      content: t('pages.home.description'),
    },
    { property: 'og:title', content: t('pages.home.fullTitle') },
    { property: 'og:description', content: t('pages.home.description') },
    { name: 'twitter:title', content: t('pages.home.fullTitle') },
    { name: 'twitter:description', content: t('pages.home.description') },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${pageUrl.value}#webpage`,
        name: t('pages.home.fullTitle'),
        description: t('pages.home.description'),
        url: pageUrl.value,
        primaryImageOfPage: homeOgImage.value,
        inLanguage: locale.value === 'uk' ? 'uk-UA' : 'en-US',
        isPartOf: { '@id': 'https://favicon-gen.com/#website' },
        mainEntity: {
          '@type': 'WebApplication',
          name: 'FaviconGen',
          applicationCategory: 'DesignApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [{
            '@type': 'ListItem',
            position: 1,
            name: t('nav.home'),
            item: pageUrl.value
          }]
        }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://favicon-gen.com/#website',
        name: 'FaviconGen',
        url: 'https://favicon-gen.com/',
        description: t('seo.description'),
        inLanguage: ['uk-UA', 'en-US'],
        publisher: { '@id': 'https://favicon-gen.com/#organization' }
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://favicon-gen.com/#organization',
        name: 'FaviconGen',
        url: 'https://favicon-gen.com/',
        logo: 'https://favicon-gen.com/android-chrome-512x512.png',
        image: homeOgImage.value,
        description: t('seo.description'),
        sameAs: ['https://github.com/Raict/Grim']
      })
    }
  ]
}));

const faviconVariants = [
  { icon: 'lucide:heart', background: 'linear-gradient(135deg, #fb7185, #be123c)', foreground: '#ffffff' },
  { icon: 'lucide:star', background: 'linear-gradient(135deg, #fbbf24, #b45309)', foreground: '#ffffff' },
  { icon: 'lucide:coffee', background: 'linear-gradient(135deg, #a78bfa, #6d28d9)', foreground: '#ffffff' },
  { icon: 'lucide:home', background: 'linear-gradient(135deg, #34d399, #047857)', foreground: '#ffffff' },
  { icon: 'lucide:rocket', background: 'linear-gradient(135deg, #60a5fa, #1d4ed8)', foreground: '#ffffff' },
  { icon: 'lucide:camera', background: 'linear-gradient(135deg, #f472b6, #be185d)', foreground: '#ffffff' }
]

const currentFaviconIndex = ref(0)
const currentFavicon = computed(() => faviconVariants[currentFaviconIndex.value])
const faviconStyle = computed<Record<string, string>>(() => ({
  '--favicon-background': currentFavicon.value.background,
  '--favicon-foreground': currentFavicon.value.foreground
}))

let faviconInterval: number | undefined

const playHoverSound = () => {
  // Optimized for performance - no implementation needed
}

onMounted(() => {
  if (import.meta.client) {
    faviconInterval = window.setInterval(() => {
      currentFaviconIndex.value = (currentFaviconIndex.value + 1) % faviconVariants.length
    }, 3000)
  }
})

onUnmounted(() => {
  if (faviconInterval && import.meta.client) {
    window.clearInterval(faviconInterval)
    faviconInterval = undefined
  }
})
</script>

<style lang="scss" scoped>

.hero-section {
  position: relative;
  overflow: hidden;
  min-height: calc((var(--vh, 1vh) * 100) - var(--header-height));
  display: flex;
  align-items: center;
  padding: calc(spacing(xl) - 40px) 0;
  color: var(--hero-heading);
  background: var(--hero-surface);
  border-bottom: 1px solid var(--hero-border);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle, var(--hero-dots) 2.25px, transparent 2.75px);
    background-size: 72px 72px;
    pointer-events: none;
    z-index: 1;
  }

  @include respond-to(md) {
    padding: calc(spacing(3xl) - 40px) 0;
  }

  @include respond-to(xl) {
    padding: calc(spacing(6xl) - 40px) 0;
  }

  @include respond-to(3xl) {
    padding: spacing(6xl) 0;
  }
}

.hero-container {
  display: flex;
  align-items: center;
  min-height: 100%;
  width: 100%;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--hero-gradient);
  background-size: 160% 160%;
  animation: gradientShift 15s ease infinite;
}


.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 800px;
  background: var(--hero-glow);
  animation: glowPulse 6s ease-in-out infinite;
  filter: blur(40px);
}


.hero-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing(sm);
  align-items: center;
  position: relative;
  z-index: 2;
  max-width: 92%;
  margin: 0 auto;
  

  @include respond-to(md) {
    gap: spacing(xl);
  }

  @include respond-to(lg) {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: spacing(2xl);
  }

  @include respond-to(xl) {
    gap: spacing(3xl);
  }

  @include respond-to(2xl) {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: spacing(3xl);
    max-width: 100%;
  }

  @include respond-to(3xl) {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: spacing(4xl);
    max-width: 1580px;
  }
}

.hero-text {
  text-align: center;
  
  @include respond-to(lg) {
    text-align: left;
  }

  @include respond-to(2xl) {
    max-width: 720px;
  }
}

.hero-title {
  margin-bottom: spacing(lg);
  @include transition();
  cursor: default;

  &:hover {
    transform: translateY(-3px);
  }

  &__main {
    display: block;
    font-size: font-size(5xl);
    font-weight: font-weight(extrabold);
    background: var(--hero-title-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;

    @include respond-to(md) {
      font-size: font-size(5xl);
    }

    @include respond-to(xl) {
      font-size: font-size(6xl);
    }

    @include respond-to(2xl) {
      font-size: font-size(6xl);
    }

    @include respond-to(3xl) {
      font-size: font-size(7xl);
    }
  }

  &__sub {
    display: block;
    font-size: font-size(2xl);
    font-weight: font-weight(medium);
    color: var(--hero-subheading);
    margin-top: spacing(sm);

    @include respond-to(md) {
      font-size: font-size(2xl);
    }

    @include respond-to(2xl) {
      font-size: font-size(3xl);
      line-height: 1.25;
    }
  }
}

.hero-description {
  font-size: font-size(lg);
  color: var(--hero-copy);
  line-height: 1.6;
  margin-bottom: spacing(lg);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  @include transition();
  cursor: default;

  &:hover {
    transform: translateY(-2px);
    color: var(--text-primary);
  }

  @include respond-to(lg) {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: spacing(xl);
  }

  @include respond-to(xl) {
    margin-bottom: spacing(2xl);
  }

  @include respond-to(2xl) {
    max-width: 680px;
    font-size: font-size(xl);
    line-height: 1.7;
  }
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: spacing(xl);
  flex-wrap: wrap;
  margin-bottom: spacing(xl);

  @include respond-to(sm) {
    gap: spacing(2xl);
  }

  @include respond-to(lg) {
    justify-content: flex-start;
  }
}

.hero-feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: spacing(sm);
  font-size: font-size(sm);
  color: var(--text-secondary);
  font-weight: font-weight(medium);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: spacing(sm);
  border-radius: border-radius(lg);

  &:hover {
    transform: translateY(-5px);
    color: var(--text-primary);

    .hero-feature__icon-wrapper {
      transform: scale(1.1) rotate(5deg);
      box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.15),
        0 0 0 4px rgba(255, 255, 255, 0.1);
    }

    .hero-feature__icon {
      filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
    }
  }

  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border-radius: border-radius(xl);
    box-shadow:
      0 10px 25px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    margin-bottom: spacing(xs);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.5s ease;
    }

    &:hover::before {
      left: 100%;
    }
  }

  &__icon {
    width: 28px;
    height: 28px;
    color: white;
    transition: all 0.3s ease;
  }
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: spacing(lg);
  margin-bottom: spacing(2xl);
}

.hero-stat {
  text-align: center;
  
  &__number {
    font-size: font-size(2xl);
    font-weight: font-weight(bold);
    color: var(--primary);
    margin-bottom: spacing(xs);
  }
  
  &__label {
    font-size: font-size(sm);
    color: var(--text-tertiary);
  }
}

// Browser mockup
.hero-visual {
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 0;
  
  @include respond-to(lg) {
    justify-content: flex-end;
  }
}

// Responsive browser mockup sizing
.hero-preview {
  max-width: 400px;
  width: 100%;

  @include respond-to(md) {
    max-width: 500px;
  }

  @include respond-to(lg) {
    max-width: 640px;
  }

  @include respond-to(xl) {
    max-width: 700px;
  }

  @include respond-to(2xl) {
    max-width: 760px;
  }

  @include respond-to(3xl) {
    max-width: 840px;
  }
}

.browser-mockup {
  box-sizing: border-box;
  width: 100%;
  background: var(--browser-surface);
  border: 1px solid var(--browser-border);
  border-radius: border-radius(2xl);
  box-shadow: var(--browser-frame-shadow);
  overflow: hidden;
  @include transition();

  @include respond-to(lg) {
    display: flex;
    flex-direction: column;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--browser-frame-shadow), 0 0 0 1px var(--browser-frame-border);
  }
}

.browser-header {
  min-height: 64px;
  padding: spacing(sm) spacing(md) 0;
  display: grid;
  grid-template-columns: auto minmax(150px, 320px) auto minmax(0, 1fr);
  align-items: center;
  gap: spacing(sm);
  background: var(--browser-toolbar);
  border-bottom: 1px solid var(--browser-toolbar-border);

  @include respond-to(lg) {
    min-height: 76px;
    padding: spacing(md) spacing(xl) 0;
    gap: spacing(md);
  }
}

.browser-dots {
  display: flex;
  gap: spacing(xs);
  justify-self: start;
  margin-right: spacing(sm);
  
  span {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    
    &:nth-child(1) { background: #ff5f57; }
    &:nth-child(2) { background: #ffbd2e; }
    &:nth-child(3) { background: #28ca42; }
  }
}

.browser-tab {
  position: relative;
  align-self: end;
  justify-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: spacing(md);
  width: 100%;
  max-width: 320px;
  height: 48px;
  background: var(--browser-tab);
  border: 1px solid var(--browser-tab-border);
  border-bottom: 0;
  border-radius: 20px 20px 0 0;
  box-shadow: var(--browser-tab-shadow);

  @include respond-to(lg) {
    height: 58px;
    border-radius: 24px 24px 0 0;
  }
}

.browser-tab__close {
  width: 18px;
  height: 18px;
  margin-right: spacing(md);
  margin-left: auto;
  color: var(--browser-chrome-icon);
  stroke-width: 2.2;
}

.favicon-demo {
  width: 34px;
  height: 34px;
  margin-left: spacing(md);
  color: var(--favicon-foreground, #ffffff);
  background: var(--favicon-background, linear-gradient(135deg, #22c7c9, #397bdc 52%, #774ff2));
  border-radius: border-radius(lg);
  @include flex-center;
  color: white;
  border: 1px solid rgba(145, 161, 255, 0.58);
  box-shadow:
    0 8px 20px rgba(32, 199, 197, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @include respond-to(lg) {
    width: 42px;
    height: 42px;
  }

  svg {
    width: 58%;
    height: 58%;
    stroke-width: 2.5;
    color: inherit;
    stroke: currentColor;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.45));
  }

  &:hover {
    transform: translateY(-2px) scale(1.08);
  }
}

.browser-new-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: start;
  color: var(--browser-chrome-icon);

  svg {
    width: 18px;
    height: 18px;
    stroke-width: 2.2;

    @include respond-to(lg) {
      width: 22px;
      height: 22px;
    }
  }
}

.browser-header__spacer {
  min-width: 0;
}

.browser-content {
  padding: spacing(lg);
  background: var(--browser-content);

  @include respond-to(lg) {
    display: flex;
    flex: 1;
    align-items: center;
  }

  @include respond-to(lg) {
    padding: spacing(lg);
  }

  @include respond-to(xl) {
    padding: spacing(xl);
  }
}

.demo-website {
  width: 100%;

  .demo-favicon-showcase {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: spacing(md);
    min-height: 64px;
    margin-bottom: spacing(md);
    padding: spacing(sm) spacing(md);
    border: 1px solid var(--browser-preview-border);
    border-radius: border-radius(xl);
    background: var(--browser-preview-bg);
  }

  .demo-favicon-tile {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    color: var(--favicon-foreground, #ffffff);
    background: var(--favicon-background, linear-gradient(135deg, #20c7c5, #397bdc 50%, #774ff2));
    border-radius: 24%;
    box-shadow:
      0 8px 18px rgba(32, 199, 197, 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);

    svg {
      width: 56%;
      height: 56%;
      stroke-width: 2.4;
      color: inherit;
      stroke: currentColor;
      filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.42));
    }
  }

  .demo-content {
    display: flex;
    flex-direction: column;
    gap: spacing(sm);

    @include respond-to(lg) {
      gap: spacing(md);
    }
  }

  .demo-line {
    height: 12px;
    background: var(--browser-line);
    border-radius: border-radius(sm);

    @include respond-to(lg) {
      height: 16px;
    }

    &.short {
      width: 60%;
    }
  }

  .demo-bottom-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .demo-lines-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: spacing(sm);

    @include respond-to(lg) {
      gap: spacing(md);
    }

    .demo-line {
      width: 100%;

      &.short {
        width: 100%;
      }
    }
  }

  .demo-cta {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}

.demo-generate-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: spacing(xs);
  padding: spacing(sm) spacing(md);
  background: linear-gradient(135deg, #20c7c5 0%, #397bdc 52%, #6875f5 100%);
  color: white;
  border-radius: border-radius(md);
  text-decoration: none;
  font-weight: font-weight(medium);
  font-size: font-size(xs);
  box-shadow: shadow(sm);
  @include transition();
  position: relative;
  overflow: hidden;
  min-width: 138px;
  min-height: 42px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    @include transition();
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: shadow(lg);
    color: white;
    text-decoration: none;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }

  @include respond-to(lg) {
    padding: spacing(sm) spacing(md);
    font-size: font-size(sm);
    min-width: 158px;
    min-height: 48px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
}

// Features section
.features-section {
  padding: spacing(xl) 0;

  @include respond-to(md) {
    padding: spacing(3xl) 0;
  }

}

.section-header {
  text-align: center;
  margin-bottom: spacing(2xl);

  @include respond-to(md) {
    margin-bottom: spacing(2xl);
  }

}

.section-title {
  font-size: font-size(3xl);
  font-weight: font-weight(bold);
  color: var(--text-primary);
  margin-bottom: spacing(xs);
  @include transition();
  cursor: default;

  &:hover {
    transform: translateY(-2px);
    @include gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @include respond-to(lg) {
    margin-bottom: spacing(sm);
    font-size: font-size(4xl);
  }
}

.section-description {
  font-size: font-size(lg);
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
  @include transition();
  cursor: default;

  &:hover {
    transform: translateY(-1px);
    color: var(--text-primary);
  }
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing(xl);
  
  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include respond-to(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  @include card;
  padding: spacing(2xl);
  position: relative;
  overflow: hidden;

  .feature-link {
    text-decoration: none;
    color: inherit;
    @include transition();
    cursor: pointer;
    display: block;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    @include transition();
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: shadow(2xl);
    
    &::before {
      left: 100%;
    }
    
    .feature-card__arrow {
      transform: translateX(spacing(sm));
    }
  }
  
  &--primary {
    border-left: 4px solid var(--primary);
  }
  
  &--secondary {
    border-left: 4px solid var(--secondary);
  }
  
  &--accent {
    border-left: 4px solid #6366f1;
  }
  
  &__icon {
    width: 64px;
    height: 64px;
    @include gradient(135deg, var(--primary), var(--secondary));
    border-radius: border-radius(xl);
    @include flex-center;
    color: white;
    margin-bottom: spacing(xl);
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
  
  &--secondary &__icon {
    @include gradient(135deg, var(--secondary), #6366f1);
  }
  
  &--accent &__icon {
    @include gradient(135deg, #6366f1, #8b5cf6);
  }
  
  &__content {
    flex: 1;
  }
  
  &__title {
    font-size: font-size(xl);
    font-weight: font-weight(bold);
    color: var(--text-primary);
    margin-bottom: spacing(md);
  }
  
  &__description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: spacing(lg);
  }
  
  &__features {
    display: flex;
    flex-direction: column;
    gap: spacing(sm);
  }
  
  &__arrow {
    position: absolute;
    top: spacing(xl);
    right: spacing(xl);
    width: 24px;
    height: 24px;
    color: var(--text-tertiary);
    @include transition();
  }
}

.feature-item {
  display: flex;
  align-items: center;
  gap: spacing(sm);
  font-size: font-size(sm);
  color: var(--text-secondary);
  
  svg {
    width: 16px;
    height: 16px;
    color: var(--success);
    flex-shrink: 0;
  }
}

// AdSense Section
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

// Benefits Section
.benefits-section {
  padding: spacing(5xl) 0;
}

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing(2xl);
  
  @include respond-to(sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include respond-to(lg) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.benefit-item {
  text-align: center;
  
  .benefit-icon {
    width: 80px;
    height: 80px;
    background: rgba(16, 185, 129, 0.1);
    border-radius: 50%;
    @include flex-center;
    margin: 0 auto spacing(lg);
    color: var(--primary);
    @include transition();
    
    svg {
      width: 40px;
      height: 40px;
    }
    
    &:hover {
      background: var(--primary);
      color: white;
      transform: scale(1.1);
    }
  }
  
  .benefit-title {
    font-size: font-size(lg);
    font-weight: font-weight(semibold);
    color: var(--text-primary);
    margin-bottom: spacing(sm);
  }
  
  .benefit-description {
    color: var(--text-secondary);
    line-height: 1.6;
  }
}

/* Animation removed */

.feature-card {
  animation: fadeInUp 0.6s ease-out;
  
  @for $i from 1 through 3 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}

.benefit-item {
  animation: fadeInUp 0.6s ease-out;

  @for $i from 1 through 4 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}

// Background Animation Keyframes
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}


@keyframes glowPulse {
  0%, 100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
  }
  33% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.1);
  }
  66% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.9);
  }
}

</style>
