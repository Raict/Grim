<template>
    <section class="section section--hero">
      <div class="container">
        <div class="hero-content fade-in-up">
          <h1 class="section__title">
            {{ $t('hero.title') }}
          </h1>
          
          <p class="section__subtitle">
            {{ $t('hero.subtitle') }}
          </p>
          
          <p class="section__description">
            {{ $t('hero.description') }}
          </p>
  
          <div class="hero-actions">
            <button
              class="btn btn--gradient btn--lg"
              @click="scrollToConverter"
            >
              <Icon name="lucide:upload" />
              <span class="upload-text">{{ $t('hero.uploadButton') }}</span>
            </button>
            
            <div class="hero-features">
              <div class="hero-feature">
                <Icon name="lucide:check" class="hero-feature__icon" />
                <span>{{ $t('hero.benefits.free') }}</span>
              </div>
              <div id="scroll-to-this" class="hero-feature">
                <Icon name="lucide:check" class="hero-feature'__icon'" />
                <span>{{ $t('hero.benefits.withoutRegistration') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  const scrollToConverter = () => {
    const element = document.getElementById('favicon-converter')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .hero-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: spacing(lg);
    
    @include respond-to(sm) {
      flex-direction: row;
      justify-content: center;
    }
  }
  
  .hero-features {
    display: flex;
    gap: spacing(lg);
    font-size: font-size(sm);
    color: var(--text-tertiary);
  }
  
  .hero-feature {
    display: flex;
    align-items: center;
    gap: spacing(xs);
    
    &__icon {
      width: 16px;
      height: 16px;
      color: var(--success);
    }
  }
  .upload-text{
    margin-left: spacing(sm);
  }
  </style>
  