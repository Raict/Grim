<template>
  <div role="main" itemscope itemtype="https://schema.org/WebPage">
    <!-- Hero Section -->
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
                  <div class="browser-url" role="textbox" :aria-label="$t('a11y.browserAddressBar')">
                    <Icon name="lucide:globe" aria-hidden="true" />
                    <span>mywebsite.com</span>
                    <div class="favicon-demo" :key="currentFaviconIndex" role="img" :aria-label="$t('a11y.faviconExample', { icon: currentFavicon.icon.replace('lucide:', '') })">
                      <Icon :name="currentFavicon.icon" :style="{ color: currentFavicon.color }" aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div class="browser-content" :aria-label="$t('a11y.demoWebsiteContent')">
                  <div class="demo-website">
                    <div class="demo-header" aria-hidden="true"></div>
                    <div class="demo-content" aria-hidden="true">
                      <div class="demo-line"></div>
                      <div class="demo-line"></div>
                      <div class="demo-bottom-section">
                        <div class="demo-lines-group">
                          <div class="demo-line short"></div>
                          <div class="demo-line short"></div>
                        </div>
                        <div class="demo-cta">
                          <NuxtLink :to="localePath('/favicons')" class="demo-generate-btn" :aria-label="$t('a11y.openConverter')">
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

    <!-- Features Section -->
    <section id="features-section" class="features-section" aria-labelledby="features-heading" itemscope itemtype="https://schema.org/ItemList" role="region">
      <div class="container">
        <header class="section-header">
          <h2 id="features-heading" class="section-title" itemprop="name">{{ $t('pages.home.features.title') }}</h2>
          <p class="section-description" itemprop="description">
            {{ $t('pages.home.features.description') }}
          </p>
        </header>

        <div class="features-grid" role="list">
          <article class="feature-card feature-card--primary" role="listitem">
            <NuxtLink :to="localePath('/favicons')" class="feature-link" @mouseenter="playHoverSound" aria-describedby="converter-desc" :aria-label="$t('a11y.openConverter')">
            <div class="feature-card__icon" aria-hidden="true">
              <Icon name="lucide:image" :size="46" aria-hidden="true"/>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">{{ $t('pages.home.features.converter.title') }}</h3>
              <p id="converter-desc" class="feature-card__description">
                {{ $t('pages.home.features.converter.description') }}
              </p>
              <ul class="feature-card__features" role="list">
                <li class="feature-item" role="listitem">
                  <Icon name="lucide:check" aria-hidden="true" />
                  <span>{{ $t('pages.home.features.converter.features.formats') }}</span>
                </li>
                <li class="feature-item" role="listitem">
                  <Icon name="lucide:check" aria-hidden="true" />
                  <span>{{ $t('pages.home.features.converter.features.zip') }}</span>
                </li>
                <li class="feature-item" role="listitem">
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

          <!-- Генератор з тексту -->
          <article class="feature-card feature-card--secondary" role="listitem">
            <NuxtLink :to="localePath('/favicons-text')" class="feature-link" @mouseenter="playHoverSound" aria-describedby="text-desc" :aria-label="$t('a11y.openTextGenerator')">
            <div class="feature-card__icon" aria-hidden="true">
              <Icon name="lucide:type" :size="46" aria-hidden="true"/>
            </div>
            <div class="feature-card__content">
              <h3 class="feature-card__title">{{ $t('pages.home.features.text.title') }}</h3>
              <p id="text-desc" class="feature-card__description">
                {{ $t('pages.home.features.text.description') }}
              </p>
              <ul class="feature-card__features" role="list">
                <li class="feature-item" role="listitem">
                  <Icon name="lucide:check" aria-hidden="true" />
                  <span>{{ $t('pages.home.features.text.features.fonts') }}</span>
                </li>
                <li class="feature-item" role="listitem">
                  <Icon name="lucide:check" aria-hidden="true" />
                  <span>{{ $t('pages.home.features.text.features.colors') }}</span>
                </li>
                <li class="feature-item" role="listitem">
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
const { t } = useI18n({ useScope: 'global' });
const localePath = useLocalePath()
const route = useRoute()
const pageUrl = computed(() => `https://favicon-gen.com${route.path === '/' ? '/' : route.path}`)

useHead({
  title: t('pages.home.fullTitle'),
  meta: [
    {
      name: 'description',
      content: t('pages.home.description'),
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: t('pages.home.fullTitle'),
        description: t('pages.home.description'),
        url: pageUrl.value,
        mainEntity: {
          '@type': 'SoftwareApplication',
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
    }
  ]
});

const faviconVariants = [
  { icon: 'lucide:heart', color: '#ef4444' },
  { icon: 'lucide:star', color: '#f59e0b' },
  { icon: 'lucide:coffee', color: '#8b5cf6' },
  { icon: 'lucide:home', color: '#10b981' },
  { icon: 'lucide:rocket', color: '#3b82f6' },
  { icon: 'lucide:camera', color: '#ec4899' }
]

const currentFaviconIndex = ref(0)
const currentFavicon = computed(() => faviconVariants[currentFaviconIndex.value])

let faviconInterval: number | undefined

const playHoverSound = () => {
  // Optimized for performance - no implementation needed
}

onMounted(() => {
  if (process.client) {
    faviconInterval = window.setInterval(() => {
      currentFaviconIndex.value = (currentFaviconIndex.value + 1) % faviconVariants.length
    }, 3000)
  }
})

onUnmounted(() => {
  if (faviconInterval && process.client) {
    window.clearInterval(faviconInterval)
    faviconInterval = undefined
  }
})
</script>

<style lang="scss" scoped>

.hero-section {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  padding: calc(spacing(xl) - 40px) 0;

  @include respond-to(sm) {
    min-height: calc(100vh - 60px);
  }

  @include respond-to(md) {
    min-height: calc(100vh - 70px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    pointer-events: none;
    z-index: 0;
  }

  @include respond-to(md) {
    padding: calc(spacing(3xl) - 40px) 0;
  }

  @include respond-to(xl) {
    padding: calc(spacing(6xl) - 40px) 0;
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
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.12) 0%,
    rgba(20, 184, 166, 0.18) 25%,
    rgba(99, 102, 241, 0.15) 50%,
    rgba(168, 85, 247, 0.12) 75%,
    rgba(236, 72, 153, 0.15) 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}


.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 800px;
  background: radial-gradient(
    ellipse at center,
    rgba(16, 185, 129, 0.08) 0%,
    rgba(99, 102, 241, 0.06) 30%,
    rgba(168, 85, 247, 0.04) 60%,
    transparent 80%
  );
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
  @include transition();
  cursor: default;

  &:hover {
    transform: translateY(-3px);
  }

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
  max-width: 400px;
  width: 100%;

  @include respond-to(md) {
    max-width: 500px;
  }

  @include respond-to(lg) {
    max-width: 600px;
  }

  @include respond-to(xl) {
    max-width: 650px;
  }
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
  padding: spacing(md);
  display: flex;
  align-items: center;
  gap: spacing(md);
  border-bottom: 1px solid var(--border);

  @include respond-to(lg) {
    padding: spacing(lg);
    gap: spacing(lg);
  }
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
  left: -spacing(2xl);
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  background: var(--bg-primary);
  border-radius: border-radius(sm);
  @include flex-center;
  color: white;
  font-size: 14px;
  border: 2px solid var(--border);
  box-shadow: shadow(sm);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;

  @include respond-to(lg) {
    width: 32px;
    height: 32px;
    font-size: 16px;
    left: -spacing(3xl);
  }

  &:not(:hover) {
    animation: faviconPulse 2s infinite;
  }

  &:hover {
    transform: translateY(-50%) scale(1.4);
    box-shadow:
      0 8px 25px rgba(0, 0, 0, 0.15),
      0 0 0 4px rgba(16, 185, 129, 0.1);
    border-color: var(--primary);
    z-index: 10;
    animation: none;
  }
}

@keyframes faviconPulse {
  0%, 100% {
    transform: translateY(-50%) scale(1);
    box-shadow: shadow(sm);
  }
  50% {
    transform: translateY(-50%) scale(1.05);
    box-shadow: shadow(md);
  }
}

.browser-content {
  padding: spacing(xl);

  @include respond-to(lg) {
    padding: spacing(2xl);
  }

  @include respond-to(xl) {
    padding: spacing(3xl);
  }
}

.demo-website {
  .demo-header {
    height: 40px;
    background: var(--bg-tertiary);
    border-radius: border-radius(md);
    margin-bottom: spacing(lg);

    @include respond-to(lg) {
      height: 50px;
      margin-bottom: spacing(xl);
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
    background: var(--bg-tertiary);
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
    align-items: flex-start;
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
      width: 100%; // Змушуємо рядки займати всю ширину контейнера

      &.short {
        width: 100%; // Перевизначаємо ширину для короткого рядка в цьому контексті
      }
    }
  }

  .demo-cta {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

.demo-generate-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: spacing(xs);
  padding: spacing(xs) spacing(sm);
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-radius: border-radius(md);
  text-decoration: none;
  font-weight: font-weight(medium);
  font-size: font-size(xs);
  box-shadow: shadow(sm);
  @include transition();
  position: relative;
  overflow: hidden;
  min-width: calc(80px + 100px); // +100px ширше

  // Висота двох рядків + gap між ними + 2px вище
  height: calc(12px + spacing(sm) + 12px + 2px);

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
    min-width: calc(100px + 100px); // +100px ширше для lg
    // Висота двох рядків + gap між ними + 2px вище для lg екранів
    height: calc(16px + spacing(md) + 16px + 2px);

    svg {
      width: 16px;
      height: 16px;
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
