<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="hero-title__main">{{ $t('pages.home.title') }}</span>
              <span class="hero-title__sub">{{ $t('pages.home.subtitle') }}</span>
            </h1>
            
            <p class="hero-description">
              {{ $t('pages.home.description') }}
            </p>

            <!-- <div class="hero-stats">
              <div class="hero-stat">
                <div class="hero-stat__number">10K+</div>
                <div class="hero-stat__label">{{ $t('pages.home.stats.created') }}</div>
              </div>
              <div class="hero-stat">
                <div class="hero-stat__number">100%</div>
                <div class="hero-stat__label">{{ $t('pages.home.stats.free') }}</div>
              </div>
              <div class="hero-stat">
                <div class="hero-stat__number">5★</div>
                <div class="hero-stat__label">{{ $t('pages.home.stats.rating') }}</div>
              </div>
            </div> -->
          </div>

          <div class="hero-visual">
            <div class="hero-preview">
              <div class="browser-mockup">
                <div class="browser-header">
                  <div class="browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div class="browser-url">
                    <Icon name="lucide:globe" />
                    <span>mywebsite.com</span>
                    <div class="favicon-demo" :key="currentFaviconIndex">
                      <Icon :name="currentFavicon.icon" :style="{ color: currentFavicon.color }" />
                    </div>
                  </div>
                </div>
                <div class="browser-content">
                  <div class="demo-website">
                    <div class="demo-header"></div>
                    <div class="demo-content">
                      <div class="demo-line"></div>
                      <div class="demo-line short"></div>
                      <div class="demo-line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('pages.home.features.title') }}</h2>
          <p class="section-description">
            {{ $t('pages.home.features.description') }}
          </p>
        </div>

        <div class="features-grid">
          <NuxtLink to="/favicons" class="feature-card feature-card--primary">
            <div class="feature-card__icon">
              <Icon name="lucide:image" :size="46"/>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">{{ $t('pages.home.features.converter.title') }}</h3>
              <p class="feature-card__description">
                {{ $t('pages.home.features.converter.description') }}
              </p>
              <div class="feature-card__features">
                <div class="feature-item">
                  <Icon name="lucide:check" />
                  <span>{{ $t('pages.home.features.converter.features.formats') }}</span>
                </div>
                <div class="feature-item">
                  <Icon name="lucide:check" />
                  <span>{{ $t('pages.home.features.converter.features.zip') }}</span>
                </div>
                <div class="feature-item">
                  <Icon name="lucide:check" />
                  <span>{{ $t('pages.home.features.converter.features.guide') }}</span>
                </div>
              </div>
            </div>
            <div class="feature-card__arrow">
              <Icon name="lucide:arrow-right" />
            </div>
          </NuxtLink>

          <!-- Генератор з тексту -->
          <NuxtLink to="/favicons-text" class="feature-card feature-card--secondary">
            <div class="feature-card__icon">
              <Icon name="lucide:type" :size="46"/>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">{{ $t('pages.home.features.text.title') }}</h3>
              <p class="feature-card__description">
                {{ $t('pages.home.features.text.description') }}
              </p>
              <div class="feature-card__features">
                <div class="feature-item">
                  <Icon name="lucide:check" />
                  <span>{{ $t('pages.home.features.text.features.fonts') }}</span>
                </div>
                <div class="feature-item">
                  <Icon name="lucide:check" />
                  <span>{{ $t('pages.home.features.text.features.colors') }}</span>
                </div>
                <div class="feature-item">
                  <Icon name="lucide:check" />
                  <span>{{ $t('pages.home.features.text.features.effects') }}</span>
                </div>
              </div>
            </div>
            <div class="feature-card__arrow">
              <Icon name="lucide:arrow-right" />
            </div>
          </NuxtLink>

          <!-- ШІ генератор -->
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

    <!-- Google AdSense Section -->
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

    <!-- Benefits Section -->
    <!-- <section class="benefits-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('pages.home.benefits.title') }}</h2>
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
    </section> -->
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
useHead({
      title: t('pages.home.fullTitle'),
      meta: [
        {
          name: 'description',
          content: t('pages.home.description'),
        },
        {
          name: 'keywords',
          content: t('pages.home.keywords'),
        },
      ],
    });

const faviconVariants = [
  { icon: 'lucide:heart', color: '#ef4444' },
  { icon: 'lucide:star', color: '#f59e0b' },
  { icon: 'lucide:coffee', color: '#8b5cf6' },
  { icon: 'lucide:home', color: '#10b981' },
  { icon: 'lucide:rocket', color: '#3b82f6' },
  { icon: 'lucide:camera', color: '#ec4899' },
  { icon: 'lucide:music', color: '#06b6d4' },
  { icon: 'lucide:gamepad-2', color: '#84cc16' }
]

const currentFaviconIndex = ref(0)
const currentFavicon = computed(() => faviconVariants[currentFaviconIndex.value])

let faviconInterval: NodeJS.Timeout

onMounted(() => {
  faviconInterval = setInterval(() => {
    currentFaviconIndex.value = (currentFaviconIndex.value + 1) % faviconVariants.length
  }, 2000)
})

onUnmounted(() => {
  if (faviconInterval) {
    clearInterval(faviconInterval)
  }
})
</script>

<style lang="scss" scoped>

.hero-section {
  background: linear-gradient(135deg, 
    rgba(16, 185, 129, 0.1) 0%, 
    rgba(20, 184, 166, 0.1) 50%, 
    rgba(99, 102, 241, 0.1) 100%
  );
  overflow: hidden;
  position: relative;
  padding: spacing(xl) 0;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    pointer-events: none;
  }


  @include respond-to(md) {
    padding: spacing(3xl) 0;
  }

  @include respond-to(xl) {
    padding: spacing(6xl) 0;
  }
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: spacing(sm);
  align-items: center;
  position: relative;
  z-index: 1;
  max-width: 86%;
  margin: 0 auto;
  

  @include respond-to(md) {
    gap: spacing(xl);
  }

  @include respond-to(lg) {
    grid-template-columns: 1fr 1fr;
    gap: spacing(2xl);
  }

  @include respond-to(xl) {
    gap: spacing(3xl);
  }
}

.hero-text {
  text-align: center;
  
  @include respond-to(lg) {
    text-align: left;
  }
}

.hero-title {
  margin-bottom: spacing(lg);
  
  &__main {
    display: block;
    font-size: font-size(5xl);
    font-weight: font-weight(extrabold);
    @include gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
    
    @include respond-to(md) {
      font-size: font-size(6xl);
    }
  }
  
  &__sub {
    display: block;
    font-size: font-size(2xl);
    font-weight: font-weight(medium);
    color: var(--text-secondary);
    margin-top: spacing(sm);
    
    @include respond-to(md) {
      font-size: font-size(3xl);
    }
  }
}

.hero-description {
  font-size: font-size(lg);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: spacing(lg);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;


  @include respond-to(lg) {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: spacing(xl);
  }

  @include respond-to(xl) {
    margin-bottom: spacing(2xl);
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

// Browser Mockup
.hero-visual {
  display: flex;
  justify-content: center;
  
  @include respond-to(lg) {
    justify-content: flex-end;
  }
}

// Browser Mockup - збільшуємо розмір
.hero-preview {
  max-width: 500px; // було 400px
  width: 100%;
}

.browser-mockup {
  background: var(--bg-primary);
  border-radius: border-radius(xl);
  box-shadow: shadow(2xl);
  overflow: hidden;
  @include transition();
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
}

.browser-header {
  background: var(--bg-secondary);
  padding: spacing(lg); // було spacing(md)
  display: flex;
  align-items: center;
  gap: spacing(md);
  border-bottom: 1px solid var(--border);
}

.browser-dots {
  display: flex;
  gap: spacing(xs);
  
  span {
    width: 14px; // було 12px
    height: 14px; // було 12px
    border-radius: 50%;
    
    &:nth-child(1) { background: #ff5f57; }
    &:nth-child(2) { background: #ffbd2e; }
    &:nth-child(3) { background: #28ca42; }
  }
}

.browser-url {
  flex: 1;
  display: flex;
  align-items: center;
  gap: spacing(md);
  background: var(--bg-primary);
  padding: spacing(xs) spacing(sm);
  border-radius: border-radius(md);
  font-size: font-size(sm);
  color: var(--text-secondary);
  position: relative;
}

.favicon-demo {
  position: absolute;
  left: -spacing(xl);
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  background: var(--bg-primary);
  border-radius: border-radius(sm);
  @include flex-center;
  color: white;
  font-size: 14px;
  animation: faviconPulse 2s infinite;
  border: 2px solid var(--border);
  box-shadow: shadow(sm);
  @include transition();
}

@keyframes faviconPulse {
  0%, 100% {
    transform: translateY(-50%) scale(1);
    box-shadow: shadow(sm);
  }
  50% {
    transform: translateY(-50%) scale(1.1);
    box-shadow: shadow(md);
  }
}

.browser-content {
  padding: spacing(2xl);
}

.demo-website {
  .demo-header {
    height: 40px;
    background: var(--bg-tertiary);
    border-radius: border-radius(md);
    margin-bottom: spacing(lg);
  }
  
  .demo-content {
    display: flex;
    flex-direction: column;
    gap: spacing(sm);
  }
  
  .demo-line {
    height: 12px;
    background: var(--bg-tertiary);
    border-radius: border-radius(sm);
    
    &.short {
      width: 60%;
    }
  }
}

// Features Section
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
  text-decoration: none;
  color: inherit;
  @include transition();
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
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

.hero-section {
  animation: fadeIn 1s ease-out;
}

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
</style>