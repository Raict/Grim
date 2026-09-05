
   <template>
    <div class="language-switcher" ref="dropdownRef">
      <button
        class="language-switcher__trigger"
        @click="toggleDropdown"
        :aria-expanded="isOpen"
        aria-haspopup="menu"
        aria-controls="locale-menu"
        :aria-label="currentLocaleAriaLabel"
      >
        <span class="language-switcher__name">
          {{ currentLocale.name }}
        </span>
        <Icon
          name="lucide:chevron-down"
          class="language-switcher__chevron"
          :class="{ 'language-switcher__chevron--open': isOpen }"
        />
      </button>
  
      <Transition name="dropdown">
        <div 
          id="locale-menu"
          v-show="isOpen"
          class="language-switcher__dropdown"
          role="menu"
          :aria-label="$t('a11y.chooseLanguage')"
        >
          <SwitchLocalePathLink
            v-for="availableLocale in availableLocales"
            :key="availableLocale.code"
            :locale="availableLocale.code"
            class="language-switcher__option"
            @click="isOpen = false"
            role="menuitem"
            :aria-label="$t('a11y.switchLanguage', { language: availableLocale.name })"
          >
            <span class="language-switcher__option-name">
              {{ availableLocale.name }}
            </span>
          </SwitchLocalePathLink>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  
  const { locale, locales, t } = useI18n({ useScope: 'global' })
  const isOpen = ref(false)
  const dropdownRef = ref<HTMLElement | null>(null)
  
  const currentLocale = computed(() => {
    return locales.value.find(l => l.code === locale.value) || locales.value[0]
  })
  
  const availableLocales = computed(() => {
    return locales.value.filter(l => l.code !== locale.value)
  })

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }
  
  const closeDropdown = (event: Event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false
    }
  }
  
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen.value) {
      isOpen.value = false
    }
  }
  
  const currentLocaleAriaLabel = computed(() => {
    return t('a11y.currentLanguage', { language: currentLocale.value.name })
  })
  
  onMounted(() => {
    document.addEventListener('click', closeDropdown)
    document.addEventListener('keydown', handleEscape)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
    document.removeEventListener('keydown', handleEscape)
  })
  </script>
  
  <style lang="scss" scoped>
  @use 'sass:map';

  
  .language-switcher {
    position: relative;
    display: inline-block;
    min-width: 150px;

    &__trigger {
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr) 20px;
      align-items: center;
      gap: spacing(sm);
      padding: spacing(sm) spacing(md);
      background: transparent;
      border: 1px solid var(--border);
      border-radius: border-radius(lg);
      color: var(--text-secondary);
      font-size: font-size(sm);
      font-weight: font-weight(medium);
      cursor: pointer;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
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
      
      &[aria-expanded="true"] {
        background: var(--bg-secondary);
        border-color: var(--primary);
        
        .language-switcher__chevron {
          transform: rotate(180deg);
        }
      }
    }
    
    &__name {
      grid-column: 2;
      text-align: center;
      white-space: nowrap;
    }
    
    &__chevron {
      grid-column: 3;
      width: 16px;
      height: 16px;
      @include transition();
      
      &--open {
        transform: rotate(180deg);
      }
    }
    
    &__dropdown {
      position: absolute;
      top: calc(100% + spacing(sm));
      left: 0;
      width: 100%;
      min-width: 100%;
      padding: spacing(xs);
      box-sizing: border-box;
      background: var(--bg-primary);
      border: 1px solid var(--border);
      border-radius: border-radius(lg);
      box-shadow: shadow(lg);
      z-index: map.get($z-index, dropdown);
      overflow: hidden;
      
      .light-mode & {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }
      
      .dark-mode & {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      }
    }
    
    &__option {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: spacing(sm);
      width: 100%;
      min-height: 40px;
      padding: spacing(sm) spacing(sm);
      box-sizing: border-box;
      background: transparent;
      border: none;
      border-radius: border-radius(md);
      color: var(--text-primary);
      font-size: font-size(sm);
      font-weight: font-weight(medium);
      line-height: 1.25;
      text-decoration: none;
      cursor: pointer;
      @include transition();

      &:hover {
        background: var(--bg-secondary);
        color: var(--primary);
      }
      
      &:focus-visible {
        background: var(--bg-secondary);
        outline: 2px solid var(--primary);
        outline-offset: -2px;
      }
      
      &--active {
        background: rgba(16, 185, 129, 0.1);
        color: var(--primary);
        
        .dark-mode & {
          background: rgba(20, 184, 166, 0.1);
        }
      }
      
    }
    
    &__option-name {
      display: block;
      width: 100%;
      text-align: center;
      white-space: nowrap;
    }

    &__check {
      width: 16px;
      height: 16px;
      color: var(--primary);
    }
  }

  :deep(.language-switcher__option) {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  // Dropdown animations
  .dropdown-enter-active,
  .dropdown-leave-active {
    @include transition(opacity, transform);
    transition-duration: 0.2s;
    transform-origin: top;
  }
  
  .dropdown-enter-from {
    opacity: 0;
    transform: translateY(-10px) scaleY(0.95);
  }
  
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px) scaleY(0.95);
  }
  
  // Theme-specific states
  .light-mode .language-switcher {
    &__trigger:hover,
    &__option:hover {
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);
    }
  }
  
  .dark-mode .language-switcher {
    &__trigger:hover,
    &__option:hover {
      box-shadow: 0 2px 8px rgba(20, 184, 166, 0.15);
    }
  }
  
  // Responsive styles
  @include respond-to(sm) {
    .language-switcher {
      &__trigger {
        min-width: 150px;
      }
    }
  }
  </style>
  
