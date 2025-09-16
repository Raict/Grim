<template>
    <div>
      <!-- Hero Section -->
      <section class="section section--hero">
        <div class="container">
          <div class="hero-content">
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
  
  useHead({
    title: 'Terms of Use - Faviconitys',
    meta: [
      { 
        name: 'description', 
        content: 'Terms of Use for Faviconitys favicon generator. Read our terms and conditions for using our service.' 
      },
      { name: 'robots', content: 'index, follow' }
    ]
  })
  </script>
  
  <style lang="scss" scoped>
  .legal-content {
    max-width: 800px;
    margin: 0 auto;
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
  