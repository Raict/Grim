<template>
    <div>
      <!-- Hero Section -->
      <section class="section section--hero fixed-header-section">
        <div class="hero-background" aria-hidden="true">
          <div class="hero-gradient"></div>
          <div class="hero-glow"></div>
        </div>

        <div class="container">
          <div class="hero-content fixed-header-content">
            <h1 class="section__title">
              {{ $t('pages.privacy.title') }}
            </h1>
            
            <p class="section__subtitle">
              {{ $t('pages.privacy.lastUpdated') }}
            </p>
            
            <p class="section__description">
              {{ $t('pages.privacy.intro') }}
            </p>
          </div>
        </div>
      </section>
  
      <!-- Privacy Policy Content -->
      <section class="section">
        <div class="container">
          <div class="legal-content">
            <div 
              v-for="(section, key) in privacySections" 
              :key="key"
              class="legal-section"
            >
              <h2 class="legal-section__title">
                {{ $t(`pages.privacy.sections.${key}.title`) }}
              </h2>
              <p class="legal-section__content">
                {{ $t(`pages.privacy.sections.${key}.content`) }}
              </p>
              <a
                v-if="key === 'contact'"
                href="https://github.com/Raict/Grim/issues"
                target="_blank"
                rel="noopener noreferrer"
                class="legal-section__link"
              >
                {{ $t('pages.privacy.contactLink') }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const privacySections = {
    dataCollection: {},
    dataUsage: {},
    cookies: {},
    thirdParty: {},
    dataProtection: {},
    contact: {}
  }
  
  // SEO
  const { t } = useI18n({ useScope: 'global' })
  const localePath = useLocalePath()
  const route = useRoute()
  const pageUrl = computed(() => `https://favicon-gen.com${route.path}`)
  const homeUrl = computed(() => `https://favicon-gen.com${localePath('/')}`)

  useHead(() => ({
    title: t('pages.privacy.seoTitle'),
    meta: [
      {
        name: 'description',
        content: t('pages.privacy.seoDescription')
      },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: t('pages.privacy.seoTitle') },
      { property: 'og:description', content: t('pages.privacy.seoDescription') },
      { name: 'twitter:title', content: t('pages.privacy.seoTitle') },
      { name: 'twitter:description', content: t('pages.privacy.seoDescription') }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('nav.home'), item: homeUrl.value },
            { '@type': 'ListItem', position: 2, name: t('pages.privacy.title'), item: pageUrl.value }
          ]
        })
      }
    ]
  }))
  </script>
  
  <style lang="scss" scoped>
  .section--hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: flex;
    align-items: center;
    min-height: calc((var(--vh, 1vh) * 100) - var(--header-height));
    padding: spacing(2xl) 0;
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
      mask-image: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.42) 100%);
      pointer-events: none;
    }

    @include respond-to(md) {
      padding: spacing(3xl) 0;
    }

    @include respond-to(3xl) {
      padding: spacing(4xl) 0;
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
    width: 1100px;
    height: 700px;
    background: var(--hero-glow);
    filter: blur(40px);
    transform: translate(-50%, -50%);
    animation: glowPulse 6s ease-in-out infinite;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 920px;
    margin: 0 auto;
    text-align: center;
  }

  .section__title {
    margin-bottom: spacing(lg);
    background: var(--hero-title-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: font-weight(extrabold);
    line-height: 1.08;
  }

  .section__subtitle {
    margin-bottom: spacing(md);
    color: var(--hero-subheading);
    font-size: font-size(lg);
    font-weight: font-weight(medium);
  }

  .section__description {
    max-width: 680px;
    margin: 0 auto;
    color: var(--hero-copy);
    font-size: font-size(base);
    line-height: 1.75;

    @include respond-to(md) {
      font-size: font-size(lg);
    }
  }

  .legal-content {
    max-width: 800px;
    margin: 0 auto;

    @include respond-to(2xl) {
      max-width: 1040px;
    }
  }
  
  .legal-section {
    margin-bottom: spacing(3xl);
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &__title {
      font-size: font-size(xl);
      font-weight: font-weight(semibold);
      color: var(--text-primary);
      margin-bottom: spacing(lg);
      padding-bottom: spacing(sm);
      border-bottom: 2px solid var(--primary);
    }
    
    &__content {
      color: var(--text-secondary);
      line-height: 1.7;
      font-size: font-size(base);
      margin: 0;
    }

    &__link {
      display: inline-block;
      margin-top: spacing(md);
      color: var(--primary-dark);
      font-weight: font-weight(semibold);
    }
  }
  
  // Animations
  .legal-section {
    animation: fadeInUp 0.6s ease-out;
    
    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
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
  
