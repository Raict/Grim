<template>
    <div>
      <!-- Hero Section -->
      <section class="section section--hero fixed-header-section">
        <div class="container">
          <div class="hero-content fixed-header-content">
            <h1 class="section__title">
              {{ $t('pages.terms.title') }}
            </h1>
            
            <p class="section__subtitle">
              {{ $t('pages.terms.lastUpdated') }}
            </p>
            
            <p class="section__description">
              {{ $t('pages.terms.intro') }}
            </p>
          </div>
        </div>
      </section>
  
      <!-- Terms of Use Content -->
      <section class="section">
        <div class="container">
          <div class="legal-content">
            <div 
              v-for="(section, key) in termsSections" 
              :key="key"
              class="legal-section"
            >
              <h2 class="legal-section__title">
                {{ $t(`pages.terms.sections.${key}.title`) }}
              </h2>
              <p class="legal-section__content">
                {{ $t(`pages.terms.sections.${key}.content`) }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  
  // SEO
  const termsSections = {
    serviceDescription: {},
    userResponsibilities: {},
    intellectualProperty: {},
    limitations: {},
    modifications: {},
    termination: {}
  }
  
  const { t } = useI18n({ useScope: 'global' })
  const localePath = useLocalePath()
  const route = useRoute()
  const pageUrl = computed(() => `https://favicon-gen.com${route.path}`)
  const homeUrl = computed(() => `https://favicon-gen.com${localePath('/')}`)

  useHead(() => ({
    title: t('pages.terms.seoTitle'),
    meta: [
      {
        name: 'description',
        content: t('pages.terms.seoDescription')
      },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: t('pages.terms.seoTitle') },
      { property: 'og:description', content: t('pages.terms.seoDescription') },
      { name: 'twitter:title', content: t('pages.terms.seoTitle') },
      { name: 'twitter:description', content: t('pages.terms.seoDescription') }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('nav.home'), item: homeUrl.value },
            { '@type': 'ListItem', position: 2, name: t('pages.terms.title'), item: pageUrl.value }
          ]
        })
      }
    ]
  }))
  </script>
  
  <style lang="scss" scoped>
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
  }
  
  .legal-section {
    animation: fadeInUp 0.6s ease-out;
    
    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }
  </style>
  
