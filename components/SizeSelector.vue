<template>
    <div class="size-selector" role="group" aria-labelledby="size-selector-title">
      <h3 id="size-selector-title" class="size-selector__title">{{ t('converter.selectSize') }}</h3>

      <div class="size-grid" role="group" :aria-label="t('a11y.chooseFaviconSizes')">
        <label
          v-for="size in availableSizes"
          :key="size.value"
          class="size-option"
          :class="{
            'size-option--selected': modelValue.includes(size.value)
          }"
        >
          <input
            type="checkbox"
            :value="size.value"
            :checked="modelValue.includes(size.value)"
            @change="toggleSize(size.value)"
            class="size-option__input"
            :aria-label="t('a11y.faviconSize', { size: size.value, label: size.label })"
            :aria-describedby="`size-${size.value}-desc`"
          />
          
          <div class="size-option__checkbox">
            <Icon
              v-if="modelValue.includes(size.value)"
              name="lucide:check"
              class="size-option__check"
              aria-hidden="true"
            />
          </div>
          
          <div class="size-option__content">
            <div class="size-option__label">{{ size.label }}</div>
            <div class="size-option__description" :id="`size-${size.value}-desc`">{{ size.description }}</div>
          </div>
        </label>
      </div>
  
      <div class="size-selector__actions">
        <button
          type="button"
          class="btn btn--ghost btn--sm"
          @click="selectAll"
        >
          {{ t('size.selectAll') }}
        </button>
        <button
          type="button"
          class="btn btn--ghost btn--sm"
          @click="clearAll"
        >
          {{ t('size.clear') }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  
  interface Props {
    modelValue: number[]
  }
  
  interface Emits {
    (e: 'update:modelValue', value: number[]): void
  }
  
  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  
  const availableSizes = computed(() => [
    { value: 16, label: '16×16', description: t('size.16x16') },
    { value: 32, label: '32×32', description: t('size.32x32') },
    { value: 48, label: '48×48', description: t('size.48x48') },
    { value: 64, label: '64×64', description: t('size.64x64') },
    { value: 96, label: '96×96', description: t('size.96x96') },
    { value: 128, label: '128×128', description: t('size.128x128') },
    { value: 152, label: '152×152', description: t('size.152x152') },
    { value: 180, label: '180×180', description: t('size.180x180') },
    { value: 192, label: '192×192', description: t('size.192x192') },
    { value: 512, label: '512×512', description: t('size.512x512') }
  ])
  
  const toggleSize = (size: number) => {
    const currentSizes = [...props.modelValue]
    const index = currentSizes.indexOf(size)
    
    if (index > -1) {
      currentSizes.splice(index, 1)
    } else {
      currentSizes.push(size)
    }
    
    emit('update:modelValue', currentSizes)
  }
  
  const selectAll = () => {
    emit('update:modelValue', availableSizes.value.map(s => s.value))
  }
  
  const clearAll = () => {
    emit('update:modelValue', [])
  }
  </script>
  
  <style lang="scss" scoped>
  .size-selector {
    &__title {
      font-size: font-size(lg);
      font-weight: font-weight(semibold);
      color: var(--text-primary);
      text-align: center;
      margin-bottom: spacing(lg);
    }
    
    &__actions {
      display: flex;
      justify-content: center;
      gap: spacing(md);
      margin-top: spacing(lg);
    }
  }
  
  .size-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(sm);
    
    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
    
    @include respond-to(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .size-option {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    padding: spacing(md);
    border: 2px solid var(--border);
    border-radius: border-radius(lg);
    cursor: pointer;
    @include transition();
    background: var(--bg-primary);
    
    &:hover {
      background: var(--bg-secondary);
      border-color: var(--primary-light);
      transform: translateY(-1px);
    }
    
    &--selected {
      border-color: var(--primary);
      background: rgba(16, 185, 129, 0.05);
      
      .dark-mode & {
        background: rgba(20, 184, 166, 0.1);
      }
    }
    
    &__input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
    
    &__checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid var(--border);
      border-radius: border-radius(sm);
      @include flex-center;
      @include transition();
      flex-shrink: 0;
      
      .size-option:hover & {
        border-color: var(--primary);
      }
      
      .size-option--selected & {
        border-color: var(--primary);
        background: var(--primary);
      }
    }
    
    &__check {
      width: 12px;
      height: 12px;
      color: white;
      opacity: 0;
      transform: scale(0);
      @include transition();
      
      .size-option--selected & {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    &__content {
      flex: 1;
      min-width: 0;
    }
    
    &__label {
      font-size: font-size(base);
      font-weight: font-weight(medium);
      color: var(--text-primary);
      margin-bottom: spacing(xs);
    }
    
    &__description {
      font-size: font-size(sm);
      color: var(--text-secondary);
      line-height: 1.4;
    }
  }
  
  .size-option {
    animation: fadeInUp 0.4s ease-out;
    
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.05}s;
      }
    }
  }
  

  .size-option__input:focus + .size-option__checkbox {
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  }
  
  .size-option:active {
    transform: translateY(0);
    
    &:not(.size-option--selected) {
      background: var(--bg-tertiary);
    }
  }
  
  .size-option__content {
    @include transition();
  }
  
  .size-option:hover .size-option__content {
    .size-option__label {
      color: var(--primary);
    }
  }
  
  .size-option--selected .size-option__content {
    .size-option__label {
      color: var(--primary);
      font-weight: font-weight(semibold);
    }
  }
  </style>
  
