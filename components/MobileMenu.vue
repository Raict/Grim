<template>
  <div class="mobile-menu">
    <button
      class="mobile-menu__trigger"
      @click="isOpen = true"
      :aria-label="$t('nav.openMenu')"
      :aria-expanded="isOpen"
      aria-controls="mobile-navigation"
    >
      <Icon name="lucide:menu" />
    </button>

    <div 
      v-if="isOpen"
      class="mobile-menu__overlay mobile-menu__overlay--show"
      @click="isOpen = false"
    >
      <div id="mobile-navigation" class="mobile-menu__content" role="dialog" aria-modal="true" :aria-label="$t('a11y.mobileNavigation')" @click.stop>
        <div class="mobile-menu__header">
          <div class="mobile-menu__logo">
            <div class="mobile-menu__logo-icon">
              <Icon name="lucide:image" />
            </div>
            <span class="mobile-menu__logo-text">FaviconGen</span>
          </div>
          <button
            class="mobile-menu__close"
            @click="isOpen = false"
            :aria-label="$t('nav.closeMenu')"
          >
            <Icon name="lucide:x" />
          </button>
        </div>

        <div class="mobile-menu__body">
          <div class="mobile-menu__section">
            <h3 class="mobile-menu__section-title">{{ $t('nav.navigation') }}</h3>
            <nav class="mobile-menu__nav">
              <NuxtLink 
                :to="localePath('/')" 
                class="mobile-menu__nav-link"
                :class="{ 'mobile-menu__nav-link--active': $route.path === '/' }"
                @click="isOpen = false"
              >
                <Icon name="lucide:home" />
                <span>{{ $t('nav.home') }}</span>
              </NuxtLink>
              
              <NuxtLink 
              :to="localePath('/favicons')" 
                prefetch-on="interaction"
                class="mobile-menu__nav-link"
                :class="{ 'mobile-menu__nav-link--active': $route.path === '/favicons' }"
                @click="isOpen = false"
              >
                <Icon name="lucide:image"  class="home"/>
                <span>{{ $t('nav.converter') }}</span>
              </NuxtLink>
              
              <NuxtLink 
                :to="localePath('/favicons-text')" 
                prefetch-on="interaction"
                class="mobile-menu__nav-link"
                :class="{ 'mobile-menu__nav-link--active': $route.path === '/favicons-text' }"
                @click="isOpen = false"
              >
                <Icon name="lucide:type" />
                <span>{{ $t('nav.textGenerator') }}</span>
              </NuxtLink>
              <NuxtLink 
                :to="localePath('/faq')" 
                class="mobile-menu__nav-link"
                :class="{ 'mobile-menu__nav-link--active': $route.path === '/faq' }"
                @click="isOpen = false"
              >
                <Icon name="lucide:help-circle" />
                <span>{{ $t('nav.faq') }}</span>
              </NuxtLink>
              <!-- <NuxtLink 
                                :to="localePath('/favicon-ai')" 
                class="mobile-menu__nav-link"
                :class="{ 'mobile-menu__nav-link--active': $route.path === '/favicon-ai' }"
                @click="isOpen = false"
              >
                <Icon name="lucide:sparkles" />
                <span>{{ $t('nav.aiGenerator') }}</span>
              </NuxtLink> -->
            </nav>
          </div>
          
          <!-- Settings -->
          <div class="mobile-menu__section">
            <h3 class="mobile-menu__section-title">{{ $t('nav.settings') }}</h3>
            <div class="mobile-menu__controls">
              <div class="mobile-menu__control">
                <span class="mobile-menu__control-label">{{ $t('nav.language') }}</span>
                <LanguageSwitcher />
              </div>
              <div class="mobile-menu__control">
                <span class="mobile-menu__control-label">{{ $t('nav.theme') }}</span>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
          
        </div>

        <div class="mobile-menu__footer">
          <p class="mobile-menu__footer-text">
            {{ $t('footer.madeWith') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const isOpen = ref(false)
watch(isOpen, (newValue) => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.transition = 'padding-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)'

  if (newValue) {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
  } else {
    document.body.style.paddingRight = ''
    document.body.style.overflow = ''
  }
})
</script>

<style lang="scss" scoped>
@use 'sass:map';
.mobile-menu {
  &__trigger {
    width: 40px;
    height: 40px;
    padding: 0;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: border-radius(lg);
    color: var(--text-secondary);
    cursor: pointer;
    @include flex-center;
    @include transition();
    
    &:hover {
      background: var(--bg-secondary);
      border-color: var(--primary);
      color: var(--text-primary);
      transform: translateY(-1px);
    }
    
    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
  }
  
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    @include transition();

    &--show {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  }
  
  &__content {
    position: absolute;
    top: 0;
    right: 0;
    width: 320px;
    max-width: 90vw;
    height: 100vh;
    background: var(--bg-primary);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    z-index: 10000;
    @include transition();

    .mobile-menu__overlay--show & {
      transform: translateX(0);
    }
  }
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: spacing(xl);
    border-bottom: 1px solid var(--border);
    background: var(--bg-secondary);
  }
  
  &__logo {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    font-size: font-size(lg);
    font-weight: font-weight(bold);
    color: var(--text-primary);
  }
  
  &__logo-icon {
    width: 28px;
    height: 28px;
    @include gradient(135deg, var(--primary), var(--secondary));
    border-radius: border-radius(md);
    @include flex-center;
    color: white;
  }
  
  &__logo-text {
    @include gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    @supports not (-webkit-background-clip: text) {
      color: var(--primary);
    }
  }
  
  &__close {
    width: 32px;
    height: 32px;
    padding: 0;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    @include flex-center;
    @include transition();
    border-radius: border-radius(md);
    
    &:hover {
      background: var(--bg-tertiary);
      color: var(--text-primary);
    }
  }
  
  &__body {
    flex: 1;
    padding: spacing(xl);
    overflow-y: auto;
  }
  
  &__section {
    margin-bottom: spacing(2xl);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__section-title {
    font-size: font-size(base);
    font-weight: font-weight(semibold);
    color: var(--text-primary);
    margin-bottom: spacing(lg);
  }
  
  // Navigation links
  &__nav {
    display: flex;
    flex-direction: column;
    gap: spacing(xs);
  }
  
  &__nav-link {
    display: flex;
    align-items: center;
    gap: spacing(md);
    padding: spacing(md) spacing(lg);
    color: var(--text-secondary);
    text-decoration: none;
    border-radius: border-radius(lg);
    font-weight: font-weight(medium);
    @include transition();
    
    svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }
    
    &:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
      transform: translateX(spacing(xs));
    }
    
    &--active {
      background: rgba(16, 185, 129, 0.1);
      color: var(--primary);
      
      .dark-mode & {
        background: rgba(20, 184, 166, 0.1);
      }
      
      svg {
        color: var(--primary);
      }


    }
    .home {
      width: 18px;
    }
  }
  
  &__controls {
    display: flex;
    flex-direction: column;
    gap: spacing(lg);
  }
  
  &__control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: spacing(md);
  }
  
  &__control-label {
    font-size: font-size(sm);
    font-weight: font-weight(medium);
    color: var(--text-secondary);
  }

  .theme-switcher {
    width: 150px;
    min-width: 150px;
  }
  
  &__description {
    font-size: font-size(sm);
    line-height: 1.6;
    color: var(--text-secondary);
    margin: 0;
  }
  
  &__footer {
    padding: spacing(xl);
    border-top: 1px solid var(--border);
    text-align: center;
    background: var(--bg-secondary);
  }
  
  &__footer-text {
    font-size: font-size(xs);
    color: var(--text-tertiary);
    margin: 0;
  }
}

// Animations
.mobile-menu__content {
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu__nav-link {
  animation: slideInRight 0.4s ease-out;
  
  @for $i from 1 through 4 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.light-mode .mobile-menu {
  &__trigger:hover {
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
  }
  
  &__nav-link:hover {
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.1);
  }
}

.dark-mode .mobile-menu {
  &__trigger:hover {
    box-shadow: 0 2px 8px rgba(20, 184, 166, 0.15);
  }
  
  &__nav-link:hover {
    box-shadow: 0 2px 8px rgba(20, 184, 166, 0.1);
  }
}
</style>
