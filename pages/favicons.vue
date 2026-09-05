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
  const guideSections = ['convert', 'sizes', 'install', 'privacy']

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
  padding: spacing(4xl) 0;
  background: var(--bg-secondary);

  &__title {
    margin-bottom: spacing(md);
    text-align: center;
  }

  &__intro {
    max-width: 850px;
    margin: 0 auto spacing(2xl);
    color: var(--text-secondary);
    line-height: 1.7;
    text-align: center;
  }

  &__grid {
    display: grid;
    gap: spacing(lg);
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  &__card {
    padding: spacing(xl);
    border: 1px solid var(--border);
    border-radius: border-radius(lg);
    background: var(--bg-primary);

    h3 { margin-bottom: spacing(sm); }
    p { color: var(--text-secondary); line-height: 1.7; }
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
