<template>
    <div>
      <!-- Hero Section -->
      <section class="section section--hero">
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
            <div class="faq-search">
              <div class="search-input-group">
                <Icon name="lucide:search" class="search-icon" />
                <input
                  v-model="searchQuery"
                  type="text"
                  class="search-input"
                  :placeholder="$t('pages.faq.search.placeholder')"
                />
              </div>
            </div>
  
            <!-- FAQ Categories -->
            <div class="faq-categories">
              <button
                v-for="category in categories"
                :key="category"
                class="category-btn"
                :class="{ 'category-btn--active': activeCategory === category }"
                @click="activeCategory = category"
              >
                {{ $t(`pages.faq.categories.${category}`) }}
              </button>
            </div>
  
            <!-- FAQ Items -->
            <div class="faq-list">
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
                >
                  <span class="faq-question__text">
                    {{ $t(`pages.faq.items.${item.key}.question`) }}
                  </span>
                  <Icon 
                    name="lucide:chevron-down" 
                    class="faq-question__icon"
                    :class="{ 'faq-question__icon--open': openItems.includes(index) }"
                  />
                </button>
                
                <Transition name="faq-answer">
                  <div v-if="openItems.includes(index)" class="faq-answer">
                    <div class="faq-answer__content">
                      <component :is="'div'" v-html="getFormattedAnswer(item.key)"></component>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
  
            <!-- Contact Section -->
            <div class="faq-contact">
              <div class="faq-contact__content">
                <h3 class="faq-contact__title">
                  {{ $t('pages.faq.contact.title') }}
                </h3>
                <p class="faq-contact__description">
                  {{ $t('pages.faq.contact.description') }}
                </p>
                <div class="faq-contact__actions">
                  <NuxtLink to="/Faviconlys" class="btn btn--primary">
                    {{ $t('pages.faq.contact.tryNow') }}
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
  
  // SEO
  useHead({
    title: 'FAQ - Часті питання про фавіконки | Faviconly',
    meta: [
      { 
        name: 'description', 
        content: 'Відповіді на найпоширеніші питання про фавіконки: що це таке, як створити, встановити та налаштувати. Повний гід по фавіконкам.' 
      },
      { name: 'robots', content: 'index, follow' }
    ]
  })
  
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
    background: linear-gradient(135deg, 
      rgba(16, 185, 129, 0.1) 0%, 
      rgba(20, 184, 166, 0.1) 100%
    );
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: border-radius(xl);
    padding: spacing(3xl);
    text-align: center;
    
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
  </style>