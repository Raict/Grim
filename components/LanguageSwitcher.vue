
   <template>
    <div class="language-switcher" ref="dropdownRef">
      <button 
        class="language-switcher__trigger"
        @click="toggleDropdown"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
        :aria-label="currentLocaleAriaLabel"
      >
        <span class="language-switcher__flag">
          {{ getFlagEmoji(currentLocale.code) }}
        </span>
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
          v-if="isOpen" 
          class="language-switcher__dropdown"
          role="menu"
          :aria-label="'Оберіть мову'"
        >
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            class="language-switcher__option"
            :class="{ 'language-switcher__option--active': locale.code === currentLocale.code }"
            @click="switchLanguage(locale.code)"
            role="menuitem"
            :aria-label="`Перемкнути на ${locale.name}`"
          >
            <span class="language-switcher__option-flag">
              {{ getFlagEmoji(locale.code) }}
            </span>
            <span class="language-switcher__option-name">
              {{ locale.name }}
            </span>
            <Icon 
              v-if="locale.code === currentLocale.code"
              name="lucide:check" 
              class="language-switcher__check"
            />
          </button>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, ref, onMounted, onUnmounted } from 'vue';
  
  const { locale, locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const isOpen = ref(false)
  const dropdownRef = ref<HTMLElement | null>(null)
  
  const currentLocale = computed(() => {
    return locales.value.find(l => l.code === locale.value) || locales.value[0]
  })
  
  const availableLocales = computed(() => {
    return locales.value.filter(l => l.code !== locale.value)
  })
  
  const getFlagEmoji = (code: string): string => {
    const flags: Record<string, string> = {
      'uk': '🇺🇦',
      'en': '🇺🇸'
    }
    return flags[code] || '🌐'
  }
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }
  
  const switchLanguage = async (code: string) => {
    try {
      await navigateTo(switchLocalePath(code as "uk" | "en"))
      isOpen.value = false
    } catch (error) {
      console.error('Error switching language:', error)
      isOpen.value = false
    }
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
    return `Поточна мова: ${currentLocale.value.name}. Натисніть для зміни мови`
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
    
    &__trigger {
      display: flex;
      align-items: center;
      gap: spacing(xs);
      padding: spacing(sm) spacing(md);
      background: transparent;
      border: 1px solid var(--border);
      border-radius: border-radius(lg);
      color: var(--text-secondary);
      font-size: font-size(sm);
      font-weight: font-weight(medium);
      cursor: pointer;
      min-width: 100px;
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
    
    &__flag {
      font-size: font-size(base);
      line-height: 1;
    }
    
    &__name {
      flex: 1;
      text-align: left;
      white-space: nowrap;
      
      // Ховаємо назву на дуже маленьких екранах
      @media (max-width: 380px) {
        display: none;
      }
    }
    
    &__chevron {
      width: 16px;
      height: 16px;
      @include transition();
      
      &--open {
        transform: rotate(180deg);
      }
    }
    
    &__dropdown {
      position: absolute;
      top: calc(100% + spacing(xs));
      left: 0;
      right: 0;
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
      gap: spacing(xs);
      width: 100%;
      padding: spacing(sm) spacing(md);
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-size: font-size(sm);
      font-weight: font-weight(medium);
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
      
      &:first-child {
        border-radius: border-radius(lg) border-radius(lg) 0 0;
      }
      
      &:last-child {
        border-radius: 0 0 border-radius(lg) border-radius(lg);
      }
      
      &:only-child {
        border-radius: border-radius(lg);
      }
    }
    
    &__option-flag {
      font-size: font-size(base);
      line-height: 1;
    }
    
    &__option-name {
      flex: 1;
      text-align: left;
    }
    
    &__check {
      width: 16px;
      height: 16px;
      color: var(--primary);
    }
  }
  
  // Анімації для dropdown
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
  
  // Стилі для різних станів теми
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
  
  // Responsive стилі
  @include respond-to(sm) {
    .language-switcher {
      &__trigger {
        min-width: 120px;
      }
    }
  }
  </style>
  