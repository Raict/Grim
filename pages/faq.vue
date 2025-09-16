<template>
    <div>
      <!-- Hero Section -->
      <section class="section section--hero">
        <div class="hero-background">
          <div class="hero-gradient"></div>
          <div class="hero-glow"></div>
        </div>

        <div class="container">
          <div class="hero-content fade-in-up">
            <h1 class="section__title">
              {{ $t('pages.faq.title') }}
            </h1>

            <p class="section__subtitle">
              {{ $t('pages.faq.subtitle') }}
            </p>

            <p class="section__description">
              {{ $t('pages.faq.description') }}
            </p>
          </div>
        </div>
      </section>
  
      <!-- FAQ Content -->
      <section class="section">
        <div class="container">
          <div class="faq-content">
            <!-- Search -->
            <div class="faq-search" role="search">
              <div class="search-input-group">
                <Icon name="lucide:search" class="search-icon" aria-hidden="true" />
                <input
                  v-model="searchQuery"
                  type="search"
                  class="search-input"
                  :placeholder="$t('pages.faq.search.placeholder')"
                  aria-label="Пошук по частих питаннях"
                  id="faq-search-input"
                />
              </div>
            </div>
  
            <!-- FAQ Categories -->
            <div class="faq-categories" role="tablist" aria-label="Категорії питань">
              <button
                v-for="category in categories"
                :key="category"
                class="category-btn"
                :class="{ 'category-btn--active': activeCategory === category }"
                @click="activeCategory = category"
                role="tab"
                :aria-selected="activeCategory === category"
                :aria-controls="`category-${category}-panel`"
                :id="`category-${category}-tab`"
                type="button"
              >
                {{ $t(`pages.faq.categories.${category}`) }}
              </button>
            </div>
  
            <!-- FAQ Items -->
            <div
              class="faq-list"
              role="tabpanel"
              :id="`category-${activeCategory}-panel`"
              :aria-labelledby="`category-${activeCategory}-tab`"
            >
              <div
                v-for="(item, index) in filteredFAQ"
                :key="index"
                class="faq-item"
                :class="{ 'faq-item--open': openItems.includes(index) }"
              >
                <button
                  class="faq-question"
                  @click="toggleItem(index)"
                  :aria-expanded="openItems.includes(index)"
                  :aria-controls="`faq-answer-${index}`"
                  :id="`faq-question-${index}`"
                  type="button"
                >
                  <span class="faq-question__text">
                    {{ $t(`pages.faq.items.${item.key}.question`) }}
                  </span>
                  <Icon
                    name="lucide:chevron-down"
                    class="faq-question__icon"
                    :class="{ 'faq-question__icon--open': openItems.includes(index) }"
                    aria-hidden="true"
                  />
                </button>
                
                <Transition name="faq-answer">
                  <div
                    v-if="openItems.includes(index)"
                    class="faq-answer"
                    :id="`faq-answer-${index}`"
                    role="region"
                    :aria-labelledby="`faq-question-${index}`"
                  >
                    <div class="faq-answer__content">
                      <component :is="'div'" v-html="getFormattedAnswer(item.key)"></component>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
  
            <!-- Contact Section -->
            <div class="faq-contact">
              <div class="faq-contact__background">
                <div class="faq-contact__gradient"></div>
                <div class="faq-contact__glow"></div>
                <div class="faq-contact__particles">
                  <div class="particle" v-for="i in 12" :key="i"></div>
                </div>
              </div>

              <div class="faq-contact__content">
                <h3 class="faq-contact__title">
                  {{ $t('pages.faq.contact.title') }}
                </h3>

                <p class="faq-contact__description">
                  {{ $t('pages.faq.contact.description') }}
                </p>

                <div class="faq-contact__actions">
                  <NuxtLink to="/favicons" class="btn btn--hero btn--cta">
                    <div class="btn-glow"></div>
                    <Icon name="lucide:rocket" class="btn-icon" />
                    <span class="btn-text">{{ $t('pages.faq.contact.tryNow') }}</span>
                    <Icon name="lucide:arrow-right" class="btn-arrow" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">

  const { t } = useI18n()
  
  // State
  const searchQuery = ref('')
  const activeCategory = ref('general')
  const openItems = ref<number[]>([])
  
  // Categories
  const categories = ['general', 'technical', 'design', 'seo']
  
  // FAQ Items
  const faqItems = [
    { key: 'whatIsFaviconly', category: 'general' },
    { key: 'whyNeedFaviconly', category: 'general' },
    { key: 'howToCreate', category: 'general' },
    { key: 'bestSizes', category: 'technical' },
    { key: 'fileFormats', category: 'technical' },
    { key: 'howToInstall', category: 'technical' },
    { key: 'notShowing', category: 'technical' },
    { key: 'designTips', category: 'design' },
    { key: 'colorChoice', category: 'design' },
    { key: 'textVsImage', category: 'design' },
    { key: 'seoImpact', category: 'seo' },
    { key: 'googleSearch', category: 'seo' },
    { key: 'pwaRequirements', category: 'technical' }
  ]

  // SEO with structured data
  useHead({
    title: 'FAQ - Часті питання про фавіконки | FaviconGen',
    meta: [
      {
        name: 'description',
        content: 'Відповіді на найпоширеніші питання про фавіконки: що це таке, як створити, встановити та налаштувати. Повний гід по фавіконкам.'
      },
      {
        name: 'keywords',
        content: 'FAQ favicon, питання фавіконки, як створити фавіконку, розміри фавіконок, встановлення фавіконки'
      },
      { name: 'robots', content: 'index, follow' },
      {
        property: 'og:title',
        content: 'FAQ - Часті питання про фавіконки | FaviconGen'
      },
      {
        property: 'og:description',
        content: 'Відповіді на найпоширеніші питання про фавіконки: що це таке, як створити, встановити та налаштувати.'
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map(item => ({
            '@type': 'Question',
            name: t(`pages.faq.items.${item.key}.question`),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t(`pages.faq.items.${item.key}.answer`).replace(/\*\*(.*?)\*\*/g, '$1').replace(/`(.*?)`/g, '$1')
            }
          }))
        })
      }
    ]
  })
  
  
  // Computed
  const filteredFAQ = computed(() => {
    let items = faqItems
  
    // Filter by category
    if (activeCategory.value !== 'general') {
      items = items.filter(item => item.category === activeCategory.value)
    }
  
    // Filter by search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      items = items.filter(item => {
        const question = t(`pages.faq.items.${item.key}.question`).toLowerCase()
        const answer = t(`pages.faq.items.${item.key}.answer`).toLowerCase()
        return question.includes(query) || answer.includes(query)
      })
    }
  
    return items
  })
  
  // Methods
  const toggleItem = (index: number) => {
    const itemIndex = openItems.value.indexOf(index)
    if (itemIndex > -1) {
      openItems.value.splice(itemIndex, 1)
    } else {
      openItems.value.push(index)
    }
  }
  
  const getFormattedAnswer = (key: string) => {
    const answer = t(`pages.faq.items.${key}.answer`)
    
    // Форматування тексту з HTML тегами
    return answer
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>')
  }
  </script>
  
  <style lang="scss" scoped>
  .section--hero {
    position: relative;
    overflow: hidden;
    min-height: 60vh;
    display: flex;
    align-items: center;
    padding: spacing(4xl) 0 spacing(3xl);

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
      padding: spacing(6xl) 0 spacing(4xl);
    }
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
    width: 800px;
    height: 600px;
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
    position: relative;
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    z-index: 2;
  }

  .section__title {
    font-size: font-size(3xl);
    font-weight: font-weight(extrabold);
    line-height: 1.1;
    margin-bottom: spacing(lg);
    color: var(--text-primary);
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    @include respond-to(sm) {
      font-size: font-size(4xl);
    }

    @include respond-to(lg) {
      font-size: font-size(5xl);
    }
  }

  .section__subtitle {
    font-size: font-size(lg);
    font-weight: font-weight(medium);
    color: var(--text-secondary);
    margin-bottom: spacing(md);

    @include respond-to(sm) {
      font-size: font-size(xl);
    }
  }

  .section__description {
    font-size: font-size(base);
    color: var(--text-tertiary);
    margin-bottom: spacing(2xl);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @include respond-to(sm) {
      font-size: font-size(lg);
    }
  }

  .faq-content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .faq-search {
    margin-bottom: spacing(2xl);
    
    .search-input-group {
      position: relative;
      max-width: 400px;
      margin: 0 auto;
    }
    
    .search-icon {
      position: absolute;
      left: spacing(md);
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      color: var(--text-tertiary);
    }
    
    .search-input {
      width: 100%;
      padding: spacing(md) spacing(md) spacing(md) spacing(3xl);
      border: 1px solid var(--border);
      border-radius: border-radius(xl);
      background: var(--bg-primary);
      color: var(--text-primary);
      font-size: font-size(base);
      @include transition();
      
      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      }
      
      &::placeholder {
        color: var(--text-tertiary);
      }
    }
  }
  
  .faq-categories {
    display: flex;
    flex-wrap: wrap;
    gap: spacing(sm);
    justify-content: center;
    margin-bottom: spacing(3xl);
    
    .category-btn {
      padding: spacing(sm) spacing(lg);
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: border-radius(xl);
      color: var(--text-secondary);
      font-size: font-size(sm);
      font-weight: font-weight(medium);
      cursor: pointer;
      @include transition();
      
      &:hover {
        background: var(--bg-tertiary);
        color: var(--text-primary);
      }
      
      &--active {
        background: var(--primary);
        border-color: var(--primary);
        color: white;
        
        &:hover {
          background: var(--primary-dark);
        }
      }
    }
  }
  
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: spacing(md);
    margin-bottom: spacing(4xl);
  }
  
  .faq-item {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: border-radius(xl);
    overflow: hidden;
    @include transition();
    
    &:hover {
      border-color: var(--primary-light);
    }
    
    &--open {
      border-color: var(--primary);
      box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.1);
    }
  }
  
  .faq-question {
    width: 100%;
    padding: spacing(lg) spacing(xl);
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: spacing(md);
    @include transition();
    
    &:hover {
      background: var(--bg-tertiary);
    }
    
    &__text {
      font-size: font-size(base);
      font-weight: font-weight(semibold);
      color: var(--text-primary);
      line-height: 1.5;
    }
    
    &__icon {
      width: 20px;
      height: 20px;
      color: var(--text-secondary);
      @include transition();
      flex-shrink: 0;
      
      &--open {
        transform: rotate(180deg);
        color: var(--primary);
      }
    }
  }
  
  .faq-answer {
    border-top: 1px solid var(--border);
    
    &__content {
      padding: spacing(lg) spacing(xl);
      color: var(--text-secondary);
      line-height: 1.6;
      
      :deep(p) {
        margin: 0;
        
        &:not(:last-child) {
          margin-bottom: spacing(md);
        }
      }
      
      :deep(strong) {
        color: var(--text-primary);
        font-weight: font-weight(semibold);
      }
      
      :deep(code) {
        background: var(--bg-tertiary);
        color: var(--primary);
        padding: spacing(xs) spacing(sm);
        border-radius: border-radius(sm);
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 0.9em;
      }
      
      :deep(br) {
        margin-bottom: spacing(sm);
      }
    }
  }
  
  .faq-contact {
    position: relative;
    border-radius: border-radius(xl);
    padding: spacing(3xl);
    text-align: center;
    overflow: hidden;

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }

    &__gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(16, 185, 129, 0.15) 0%,
        rgba(20, 184, 166, 0.2) 25%,
        rgba(99, 102, 241, 0.18) 50%,
        rgba(168, 85, 247, 0.15) 75%,
        rgba(236, 72, 153, 0.2) 100%
      );
      background-size: 400% 400%;
      animation: gradientShift 12s ease infinite;
    }

    &__glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 400px;
      background: radial-gradient(
        ellipse at center,
        rgba(16, 185, 129, 0.15) 0%,
        rgba(99, 102, 241, 0.1) 30%,
        rgba(168, 85, 247, 0.08) 60%,
        transparent 80%
      );
      animation: glowPulse 8s ease-in-out infinite;
      filter: blur(60px);
    }

    &__particles {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, var(--primary), var(--secondary));
        border-radius: 50%;
        opacity: 0.6;
        animation: particleFloat 6s ease-in-out infinite;

        @for $i from 1 through 12 {
          &:nth-child(#{$i}) {
            top: random(100) * 1%;
            left: random(100) * 1%;
            animation-delay: #{$i * 0.5}s;
            animation-duration: #{3 + random(6)}s;
          }
        }
      }
    }

    &__content {
      position: relative;
      z-index: 2;
      max-width: 500px;
      margin: 0 auto;
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
      margin-bottom: spacing(xl);
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    &__actions {
      display: flex;
      flex-wrap: wrap;
      gap: spacing(md);
      justify-content: center;
    }
  }

  .btn--cta {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: spacing(sm);
    padding: spacing(lg) spacing(2xl);
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    border-radius: border-radius(xl);
    font-size: font-size(lg);
    font-weight: font-weight(semibold);
    text-decoration: none;
    box-shadow:
      0 20px 40px rgba(16, 185, 129, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.6s ease;
    }

    &:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow:
        0 30px 60px rgba(16, 185, 129, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);

      &::before {
        left: 100%;
      }

      .btn-glow {
        opacity: 1;
        transform: scale(1.2);
      }

      .btn-arrow {
        transform: translateX(6px);
      }

      .btn-icon {
        transform: rotate(15deg) scale(1.1);
      }
    }

    .btn-glow {
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border-radius: inherit;
      z-index: -1;
      filter: blur(15px);
      opacity: 0.7;
      transition: all 0.4s ease;
    }

    .btn-icon,
    .btn-arrow {
      width: 20px;
      height: 20px;
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }

  
  // Анімації
  .faq-answer-enter-active,
  .faq-answer-leave-active {
    @include transition();
    transition-property: opacity, max-height, padding;
    transition-duration: 0.3s;
    overflow: hidden;
  }
  
  .faq-answer-enter-from,
  .faq-answer-leave-to {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  
  .faq-answer-enter-to,
  .faq-answer-leave-from {
    opacity: 1;
    max-height: 500px;
  }
  
  .faq-item {
    animation: fadeInUp 0.4s ease-out;
    
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.05}s;
      }
    }
  }
  
  // Responsive
  @include respond-to(sm) {
    .faq-contact {
      &__actions {
        flex-direction: row;
      }
    }
  }

  // Hero animations
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

  @keyframes particleFloat {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.6;
    }
    25% {
      transform: translateY(-20px) rotate(90deg);
      opacity: 1;
    }
    50% {
      transform: translateY(-40px) rotate(180deg);
      opacity: 0.8;
    }
    75% {
      transform: translateY(-20px) rotate(270deg);
      opacity: 1;
    }
  }

  </style>