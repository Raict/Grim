<template>
  <header class="header" role="banner">
    <div class="container">
      <nav class="header__nav" role="navigation" :aria-label="$t('a11y.mainNavigation')">
        <NuxtLink :to="localePath('/')" class="header__logo" :aria-label="$t('a11y.logoHome')">
          <div class="header__logo-icon" aria-hidden="true">
            <DynamicLogo :size="logoSize" canvas-class="header__dynamic-logo" />
          </div>
          <span
            class="header__logo-text"
            :style="{
              fontFamily: logoTextStyles.fontFamily,
              background: logoTextStyles.background,
              '-webkit-background-clip': 'text',
              '-webkit-text-fill-color': 'transparent',
              'background-clip': 'text'
            }"
          >
            FaviconGen
          </span>
        </NuxtLink>

        

        <div class="header__menu" role="menubar" :aria-label="$t('a11y.siteNavigation')">
          <NuxtLink
                :to=" localePath('/')"
                class="header__link"
                :class="{ 'header__link--active': isHomePage }"
                role="menuitem"
                :aria-label="$t('a11y.goHome')"
              >
                <Icon name="lucide:home" aria-hidden="true" />
                <span>{{ $t('nav.home') }}</span>
              </NuxtLink>
          <NuxtLink
            :to=" localePath('/favicons')"
            class="header__link"
            :class="{ 'header__link--active': $route.path === '/favicons' || $route.path === '/uk/favicons' || $route.path === '/en/favicons' }"
            role="menuitem"
            :aria-label="$t('a11y.openConverter')"
          >
            <!-- <Icon name="lucide:image"  class="home"/> -->
            <span>{{ $t('nav.converter') }}</span>
          </NuxtLink>

          <NuxtLink
            :to="localePath('/favicons-text')"
            class="header__link"
            :class="{ 'header__link--active': $route.path === '/favicons-text' || $route.path === '/uk/favicons-text' || $route.path === '/en/favicons-text' }"
            role="menuitem"
            :aria-label="$t('a11y.openTextGenerator')"
          >
            <!-- <Icon name="lucide:type" /> -->
            <span>{{ $t('nav.textGenerator') }}</span>
          </NuxtLink>

          <NuxtLink
            :to="localePath('/faq')"
            class="header__link"
            :class="{ 'header__link--active': $route.path.includes('/faq') }"
            role="menuitem"
            :aria-label="$t('a11y.openFaq')"
          >
            <Icon name="lucide:help-circle" aria-hidden="true" />
            <span>{{ $t('nav.faq') }}</span>
          </NuxtLink>
          
          <!-- <NuxtLink 
                                            :to="localePath('/favicon-ai')" 
            class="header__link"
            :class="{ 'header__link--active': $route.path === '/favicon-ai' }"
          >
            <Icon name="lucide:sparkles" />
            <span>{{ $t('nav.aiGenerator') }}</span>
          </NuxtLink> -->
        </div>

        <div class="header__controls">
          <!-- Ko-fi Support Button -->
          <a
            href="https://ko-fi.com/serhieie"
            target="_blank"
            rel="noopener noreferrer"
            class="header__kofi-btn"
            :title="$t('buyMeCoffee')"
            :aria-label="$t('a11y.supportNewWindow')"
          >
            <Icon name="lucide:coffee" aria-hidden="true" />
            <span class="header__kofi-text">{{ $t('supportMe') }}</span>
          </a>

          <LanguageSwitcher class="header__control--desktop-only" />
          <ThemeSwitcher class="header__control--desktop-only" />
          <MobileMenu class="header__mobile-menu" />
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()

const isHomePage = computed(() => {
  return route.name === 'index' || route.name === 'index___en' || route.path === '/' || route.path === '/en'
})

// Reactive logo size based on screen size
const logoSize = ref(32)

// Dynamic logo text styles
const logoTextStyles = reactive({
  fontFamily: 'system-ui',
  background: 'linear-gradient(135deg, var(--primary), var(--secondary))'
})

// Listen for logo settings changes
const handleLogoSettingsChange = (e: CustomEvent) => {
  const settings = e.detail
  if (settings.fontFamily) {
    logoTextStyles.fontFamily = settings.fontFamily
  }
  if (settings.backgroundType === 'gradient' && settings.backgroundColor && settings.gradientColor) {
    logoTextStyles.background = `linear-gradient(135deg, ${settings.backgroundColor}, ${settings.gradientColor})`
  } else if (settings.backgroundColor) {
    logoTextStyles.background = settings.backgroundColor
  }
}

onMounted(() => {
  const updateLogoSize = () => {
    if (window.innerWidth >= 768) {
      logoSize.value = 36 // md and up
    } else {
      logoSize.value = 32 // default
    }
  }

  updateLogoSize()
  window.addEventListener('resize', updateLogoSize)

  // Load initial settings from localStorage
  try {
    const saved = localStorage.getItem('favicon-text-settings')
    if (saved) {
      const settings = JSON.parse(saved)
      handleLogoSettingsChange({ detail: settings } as CustomEvent)
    }
  } catch (error) {
    console.warn('Failed to load logo text settings:', error)
  }

  // Listen for settings changes
  window.addEventListener('logo-settings-changed', handleLogoSettingsChange as EventListener)

  onUnmounted(() => {
    window.removeEventListener('resize', updateLogoSize)
    window.removeEventListener('logo-settings-changed', handleLogoSettingsChange as EventListener)
  })
})
</script>

<style lang="scss" scoped>
@use 'sass:map';

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: map.get($z-index, sticky);
  @include glass-effect;
  border-bottom: 1px solid var(--border-light);
  
  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: spacing(xs) 0;
    min-height: 50px;

    @include respond-to(sm) {
      min-height: 60px;
    }

    @include respond-to(md) {
      min-height: 70px;
    }
  }
  
  &__logo {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    font-size: font-size(xl);
    font-weight: font-weight(bold);
    color: var(--text-primary);
    text-decoration: none;
    @include transition();
    
    &:hover {
      transform: scale(1.02);
      
      // .header__logo-icon {
      //   transform: scale(1.1);
      // }
    }
  }
  
  &__logo-icon {
    width: 32px;
    height: 32px;
    @include flex-center;
    @include transition();
    // Remove overflow: hidden to allow dynamic border-radius
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
  
  &__menu {
    display: none;
  align-items: center;
  gap: spacing(sm);

  @include respond-to(xl) {
    display: flex;
    gap: spacing(md);
  }
  }
  
  &__link {
    display: flex;
    align-items: center;
    gap: spacing(xs);
    color: var(--text-secondary);
    font-weight: font-weight(medium);
    font-size: font-size(sm);
    text-decoration: none;
    padding: spacing(sm) spacing(md);
    border-radius: border-radius(lg);
    position: relative;
    @include transition();
    
    svg {
      width: 16px;
      height: 16px;
      @include transition();
    }
    
    &:hover {
      color: var(--primary);
      background: var(--bg-secondary);
      transform: translateY(-1px);
      
      svg {
        transform: scale(1.1);
      }
    }
    
    &--active {
      color: var(--primary);
      background: rgba(16, 185, 129, 0.1);
      
      .dark-mode & {
        background: rgba(20, 184, 166, 0.1);
      }
      
      svg {
        color: var(--primary);
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: spacing(md);
        right: spacing(md);
        height: 2px;
        background: var(--primary);
        border-radius: border-radius(full);
      }
    }
  
    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background: var(--primary);
      border-radius: border-radius(full);
      @include transition();
      transform: translateX(-50%);
    }
    
    &:hover::before {
      width: calc(100% - #{spacing(md) * 2});
    }
    
    &--active::before {
      display: none;
    }
  }
  
  &__controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    @include respond-to(sm) {
      gap: spacing(sm);
    }
  }

  &__kofi-btn {
    display: flex;
    align-items: center;
    gap: spacing(xs);
    background: #FF5E5B;
    color: white;
    text-decoration: none;
    padding: spacing(sm) spacing(md);
    border-radius: border-radius(lg);
    font-size: font-size(sm);
    font-weight: font-weight(medium);
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(255, 94, 91, 0.25);
    height: 40px;
    @include transition();

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    &:hover {
      background: #E8504C;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(255, 94, 91, 0.4);
      color: white;
      text-decoration: none;
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__kofi-text {
    white-space: nowrap;

    @media (max-width: 520px) {
      display: none;
    }
  }
  
  &__mobile-menu {
    display: flex;
  @include respond-to(xl) {
    display: none;
  }
  }

  &__control--desktop-only {
    display: none;

    @include respond-to(xl) {
      display: flex;
    }
  }
}

@include respond-to(sm) {
  .header {
    &__nav {
      padding: spacing(lg) 0;
    }
  }
}

@include respond-to(md) {
  .header {
    &__logo {
      font-size: font-size(2xl);
    }
    
    &__logo-icon {
      width: 36px;
      height: 36px;
    }
    
    &__menu {
      gap: spacing(sm);
    }
    
    &__link {
      font-size: font-size(base);
      
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}

@include respond-to(lg) {
  .header {
    &__nav {
      justify-content: space-between;
      gap: spacing(2xl);
    }
    
    &__menu {
      flex: 1;
      justify-content: center;
      max-width: 600px;
      gap: spacing(lg);
    }
  }
}


.light-mode .header {
  background: rgba(255, 255, 255, 0.8);
  
  &:hover {
    background: rgba(255, 255, 255, 0.95);
  }
  
  .header__link:hover {
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
  }
}

.dark-mode .header {
  background: rgba(31, 41, 55, 0.8);
  
  &:hover {
    background: rgba(31, 41, 55, 0.95);
  }
  
  .header__link:hover {
    box-shadow: 0 2px 8px rgba(20, 184, 166, 0.15);
  }
}

.header {
  animation: slideInDown 0.6s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header__logo-icon {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background: var(--success);
    border-radius: 50%;
    opacity: 0;
    transform: scale(0);
    @include transition();
  }

  // .header__logo:hover &::after {
  //   opacity: 1;
  //   transform: scale(1);
  //   animation: pulse 1.5s infinite;
  // }
}

.header__link {
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  
  animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.home {
      width: 18px;
    }
</style>
