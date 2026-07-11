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
      @keydown.enter.space.prevent="triggerFileInput"
      role="button"
      :tabindex="isProcessing ? -1 : 0"
      :aria-label="$t('hero.dragDrop')"
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
            {{ $t('a11y.supportedUploadFormats') }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
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
  
  const validateAndEmitFile = async (file: File) => {
    // Simple and reliable validation
    if (!file.type.startsWith('image/')) {
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      return
    }

    if (file.size === 0) {
      return
    }

    // Proceed with file selection
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
  
