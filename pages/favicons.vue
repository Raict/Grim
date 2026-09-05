<template>
    <div>
      <HeroSection />
      <FaviconConverter />
      <section class="seo-guide" aria-labelledby="favicon-guide-title">
        <div class="container">
          <h2 id="favicon-guide-title" class="seo-guide__title">{{ $t('converter.guide.title') }}</h2>
          <p class="seo-guide__intro">{{ $t('converter.guide.intro') }}</p>

          <div class="seo-guide__grid">
            <article v-for="section in guideSections" :key="section" class="seo-guide__card">
              <div class="seo-guide__icon" aria-hidden="true">
                <svg v-if="section === 'convert'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4" />
                  <path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4" />
                </svg>
                <svg v-else-if="section === 'sizes'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
                  <rect width="8" height="8" x="8" y="8" rx="2" />
                </svg>
                <Icon v-else-if="section === 'install'" name="lucide:code-2" />
                <Icon v-else name="lucide:shield-check" />
              </div>
              <h3>{{ $t(`converter.guide.sections.${section}.title`) }}</h3>
              <p>{{ $t(`converter.guide.sections.${section}.content`) }}</p>
            </article>
          </div>

          <div class="seo-guide__links">
            <p>{{ $t('converter.guide.nextSteps') }}</p>
            <NuxtLink :to="localePath('/favicons-text')">{{ $t('converter.guide.textGeneratorLink') }}</NuxtLink>
            <NuxtLink :to="localePath('/faq')">{{ $t('converter.guide.faqLink') }}</NuxtLink>
          </div>
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
  const { t, locale } = useI18n({ useScope: 'global' })
  const localePath = useLocalePath()
  const route = useRoute()
  const pageUrl = computed(() => `https://favicon-gen.com${route.path}`)
  const homeUrl = computed(() => `https://favicon-gen.com${localePath('/')}`)
  const guideSections = ['convert', 'sizes', 'install', 'privacy'] as const

  useHead(() => ({
      title: t('converter.fullTitle'),
      meta: [
        {
          name: 'description',
          content: t('converter.description'),
        },
        {
          property: 'og:title',
          content: t('converter.fullTitle')
        },
        {
          property: 'og:description',
          content: t('converter.description')
        },
        {
          property: 'og:type',
          content: 'website'
        },
        { name: 'twitter:title', content: t('converter.fullTitle') },
        { name: 'twitter:description', content: t('converter.description') }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            '@id': `${pageUrl.value}#application`,
            name: t('converter.pageHeading'),
            description: t('converter.description'),
            url: pageUrl.value,
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Web Browser',
            inLanguage: locale.value === 'uk' ? 'uk-UA' : 'en-US',
            isPartOf: { '@id': 'https://favicon-gen.com/#website' },
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            featureList: [
              t('converter.guide.sections.convert.title'),
              t('converter.guide.sections.sizes.title'),
              t('converter.guide.sections.install.title')
            ]
          })
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: t('nav.home'), item: homeUrl.value },
              { '@type': 'ListItem', position: 2, name: t('nav.converter'), item: pageUrl.value }
            ]
          })
        }
      ]
    }));
  </script>
  <style lang="scss" scoped>
.adsense-section {
  padding: spacing(3xl) 0;
  background: var(--bg-secondary);
  margin-bottom: spacing(3xl);
}

.seo-guide {
  padding: spacing(4xl) 0 spacing(5xl);
  background:
    radial-gradient(circle at 12% 15%, rgba(34, 199, 201, 0.07), transparent 28%),
    var(--bg-secondary);

  &__title {
    margin-bottom: spacing(md);
    text-align: center;

    @include respond-to(2xl) {
      font-size: font-size(5xl);
    }
  }

  &__intro {
    max-width: 850px;
    margin: 0 auto spacing(2xl);
    color: var(--text-secondary);
    line-height: 1.7;
    text-align: center;

    @include respond-to(2xl) {
      max-width: 1100px;
      margin-bottom: spacing(3xl);
      font-size: font-size(xl);
    }
  }

  &__grid {
    display: grid;
    gap: spacing(lg);
    grid-template-columns: 1fr;

    @include respond-to(md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include respond-to(xl) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    @include respond-to(2xl) {
      gap: spacing(xl);
    }
  }

  &__card {
    position: relative;
    min-width: 0;
    padding: spacing(xl);
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--border) 78%, var(--primary) 22%);
    border-radius: border-radius(xl);
    background: linear-gradient(155deg, var(--bg-primary), color-mix(in srgb, var(--bg-primary) 92%, var(--primary) 8%));
    box-shadow: 0 16px 34px rgba(0, 7, 22, 0.08);
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

    &::before {
      content: '';
      position: absolute;
      inset: 0 0 auto;
      height: 2px;
      background: linear-gradient(90deg, var(--primary), var(--secondary), transparent);
      opacity: 0.75;
    }

    &:hover {
      transform: translateY(-4px);
      border-color: color-mix(in srgb, var(--border) 48%, var(--primary) 52%);
      box-shadow: 0 24px 50px rgba(0, 7, 22, 0.14);
    }

    h3 {
      margin-bottom: spacing(sm);
      font-size: font-size(xl);
      line-height: 1.3;
    }

    p {
      margin: 0;
      color: var(--text-secondary);
      font-size: font-size(base);
      line-height: 1.7;
    }

    @include respond-to(2xl) {
      padding: spacing(2xl);

      h3 { font-size: font-size(2xl); }
      p { font-size: font-size(lg); }
    }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    margin-bottom: spacing(lg);
    color: var(--primary);
    background: color-mix(in srgb, var(--primary) 12%, transparent);
    border: 1px solid color-mix(in srgb, var(--primary) 28%, transparent);
    border-radius: border-radius(lg);

    svg {
      width: 22px;
      height: 22px;
    }
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: spacing(md);
    margin-top: spacing(2xl);

    p { flex-basis: 100%; text-align: center; }
    a { color: var(--primary); font-weight: font-weight(semibold); }
  }
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
