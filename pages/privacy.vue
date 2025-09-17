<template>
    <div>
      <!-- Hero Section -->
      <section class="section section--hero fixed-header-section">
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
  useHead({
    title: 'Privacy Policy - FaviconGen',
    meta: [
      {
        name: 'description',
        content: 'Privacy Policy for FaviconGen favicon generator. Learn how we collect, use, and protect your data.'
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
  
  // Анімації
  .legal-section {
    animation: fadeInUp 0.6s ease-out;
    
    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }
  </style>
  