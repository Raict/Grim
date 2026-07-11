<template>
    <button
      class="theme-switcher"
      @click="toggleTheme"
      :title="title"
      :aria-label="title"
      :aria-pressed="isDark.toString()"
      role="switch"
    >
      <Icon
        :name="iconName"
        class="theme-switcher__icon"
      />
    </button>
  </template>
  
  <script setup lang="ts">
  
  const colorMode = useColorMode()
  const {t} = useI18n()
  const isDark = computed(() => colorMode.value === 'dark')
  
  const title = computed(() => isDark.value ? t('a11y.switchToLight') : t('a11y.switchToDark'))
  const iconName = computed(() => isDark.value ? 'lucide:sun' : 'lucide:moon')
  const themeText = computed(() => isDark.value ? t('theme.light') : t('theme.dark'))
  
  const toggleTheme = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }
  </script>
  
<style lang="scss" scoped>
  @use 'sass:map';
  .theme-switcher {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 40px;
    padding: 0;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: border-radius(lg);
    color: var(--text-secondary);
    cursor: pointer;
    @include transition();

    &:hover {
      background: var(--bg-secondary);
      border-color: var(--primary);
      color: var(--primary);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    &__icon {
      width: 18px;
      height: 18px;
      @include transition();

      .theme-switcher:hover & {
        transform: scale(1.1);
      }
    }
  }
  
  .theme-switcher .theme-switcher__icon {
    animation: iconChange 0.3s ease-in-out;
  }
  
  @keyframes iconChange {
    0% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: scale(0.8) rotate(90deg);
      opacity: 0.5;
    }
    100% {
      transform: scale(1) rotate(180deg);
      opacity: 1;
    }
  }
  
  .light-mode .theme-switcher {
    &:hover {
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
    }
  }
  
  .dark-mode .theme-switcher {
    &:hover {
      box-shadow: 0 2px 8px rgba(20, 184, 166, 0.15);
    }
  }
  
</style>
