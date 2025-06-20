<template>
    <div
      class="file-uploader"
      :class="{
        'file-uploader--dragover': isDragOver,
        'file-uploader--disabled': isProcessing
      }"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileInput"
      />
  
      <div class="file-uploader__content">
        <div class="file-uploader__icon">
          <Icon 
            :name="isProcessing ? 'lucide:loader-2' : 'lucide:upload'"
            :class="{ 'spin': isProcessing }"
          />
        </div>
        
        <div class="file-uploader__text">
          <p class="file-uploader__title">
            {{ $t('hero.dragDrop') }}
          </p>
          <p class="file-uploader__subtitle">
            PNG, JPG, JPEG, WEBP до 10MB
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface Props {
    isProcessing?: boolean
  }
  
  interface Emits {
    (e: 'file-selected', file: File): void
  }
  
  const props = withDefaults(defineProps<Props>(), {
    isProcessing: false
  })
  
  const emit = defineEmits<Emits>()
  
  const fileInput = ref<HTMLInputElement | null>(null)
  const isDragOver = ref(false)
  
  const triggerFileInput = () => {
    if (!props.isProcessing) {
      fileInput.value?.click()
    }
  }
  
  const handleFileInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      validateAndEmitFile(file)
    }
  }
  
  const handleDrop = (event: DragEvent) => {
    isDragOver.value = false
    const file = event.dataTransfer?.files[0]
    if (file) {
      validateAndEmitFile(file)
    }
  }
  
  const validateAndEmitFile = (file: File) => {
    // Перевірка типу файлу
    if (!file.type.startsWith('image/')) {
      console.error('Будь ласка, оберіть файл зображення')
      return
    }
  
    // Перевірка розміру файлу (10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error('Розмір файлу не повинен перевищувати 10MB')
      return
    }
  
    emit('file-selected', file)
  }
  </script>
  
  <style lang="scss" scoped>
  .file-uploader {
    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: spacing(lg);
    }
    
    &__title {
      font-size: font-size(lg);
      font-weight: font-weight(medium);
      color: var(--text-primary);
      margin-bottom: spacing(sm);
    }
    
    &__subtitle {
      font-size: font-size(sm);
      color: var(--text-tertiary);
      margin: 0;
    }
  }
  </style>
  