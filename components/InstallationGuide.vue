<template>
  <div class="installation-guide">
    <div class="installation-guide__header">
      <h2 class="installation-guide__title">
        <Icon name="lucide:download" class="installation-guide__icon" />
        {{ $t('installation.title') }}
      </h2>
    </div>

    <div class="installation-guide__content">
      <!-- Step 1: Download files -->
      <div class="installation-step">
        <h3 class="installation-step__title">
          <span class="installation-step__number">1</span>
          {{ $t('installation.steps.download.title') }}
        </h3>
        <p class="installation-step__description">
          {{ $t('installation.steps.download.description') }}
        </p>
        
        <div class="file-list">
          <div class="file-list__header">
            <Icon name="lucide:folder" />
            <span>{{ $t('installation.steps.download.fileList') }}</span>
          </div>
          <ul class="file-list__items">
            <li 
              v-for="file in generatedFiles" 
              :key="file.name"
              class="file-list__item"
            >
              <Icon :name="getFileIcon(file.name)" class="file-list__item-icon" />
              <span class="file-list__item-name">{{ file.name }}</span>
              <span class="file-list__item-size">{{ file.description }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Step 2: HTML tags -->
      <div class="installation-step">
        <h3 class="installation-step__title">
          <span class="installation-step__number">2</span>
          {{ $t('installation.steps.htmlTags.title') }}
        </h3>
        <p class="installation-step__description">
          {{ $t('installation.steps.htmlTags.description') }}
          <code class="inline-code">&lt;head&gt;</code>
          {{ $t('installation.steps.htmlTags.descriptionTwo') }}
        </p>

        <div class="code-block">
          <div class="code-block__header">
            <span class="code-block__title">
              <Icon name="lucide:code" />
              {{ $t('installation.steps.htmlTags.codeTitle') }}
            </span>
            <button
              class="code-block__copy-btn"
              @click="copyToClipboard(staticHtmlTags)"
              :class="{ 'code-block__copy-btn--copied': isCopied }"
            >
              <Icon :name="isCopied ? 'lucide:check' : 'lucide:copy'" />
              {{ isCopied ? $t('installation.copy.copied') : $t('installation.copy.copy') }}
            </button>
          </div>
          <pre class="code-block__content"><code>{{ staticHtmlTags }}</code></pre>
        </div>
      </div>

      <!-- Step 3: Verify -->
      <div class="installation-step">
        <h3 class="installation-step__title">
          <span class="installation-step__number">3</span>
          {{ $t('installation.steps.verify.title') }}
        </h3>
        <p class="installation-step__description">
          {{ $t('installation.steps.verify.description') }}
        </p>
        
        <div class="tips">
          <div class="tips__header">
            <Icon name="lucide:lightbulb" />
            <span>{{ $t('installation.steps.verify.tipsTitle') }}</span>
          </div>
          <ul class="tips__list">
            <li>{{ $t('installation.steps.verify.tips.clearCache') }}</li>
            <li>{{ $t('installation.steps.verify.tips.checkConsole') }}</li>
            <li>{{ $t('installation.steps.verify.tips.verifyPaths') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  generatedSizes: number[]
}

const props = defineProps<Props>()
const isCopied = ref(false)
const { t } = useI18n()

// Generate file list based on sizes with descriptions
const generatedFiles = computed(() => {
  const files = []
  
  // Map of sizes to descriptions
  const sizeDescriptions: Record<number, string> = {
    16: t('size.16x16'),
    32: t('size.32x32'),
    48: t('size.48x48'),
    64: t('size.64x64'),
    96: t('size.96x96'),
    128: t('size.128x128'),
    152: t('size.152x152'),
    180: t('size.180x180'),
    192: t('size.192x192'),
    512: t('size.512x512')
  }
  
  // Standard favicons
  if (props.generatedSizes.includes(16)) {
    files.push({ 
      name: 'favicon-16x16.png', 
      description: sizeDescriptions[16] || '16×16'
    })
  }
  if (props.generatedSizes.includes(32)) {
    files.push({ 
      name: 'favicon-32x32.png', 
      description: sizeDescriptions[32] || '32×32'
    })
  }
  
  // Apple Touch Icon
  if (props.generatedSizes.includes(180)) {
    files.push({ 
      name: 'apple-touch-icon.png', 
      description: sizeDescriptions[180] || '180×180'
    })
  }
  
  // Android Chrome
  if (props.generatedSizes.includes(192)) {
    files.push({ 
      name: 'android-chrome-192x192.png', 
      description: sizeDescriptions[192] || '192×192'
    })
  }
  if (props.generatedSizes.includes(512)) {
    files.push({ 
      name: 'android-chrome-512x512.png', 
      description: sizeDescriptions[512] || '512×512'
    })
  }
  
  // Other sizes
  props.generatedSizes.forEach(size => {
    if (![16, 32, 180, 192, 512].includes(size)) {
      files.push({ 
        name: `favicon-${size}x${size}.png`, 
        description: sizeDescriptions[size] || `${size}×${size}`
      })
    }
  })
  
  // Always include these files
  files.push({ name: 'favicon.ico', description: t('installation.fileDescriptions.ico') })
  files.push({ name: 'site.webmanifest', description: t('installation.fileDescriptions.webmanifest') })
  
  return files
})

// Dynamic HTML tags based on generated files
const staticHtmlTags = computed(() => {
  const tags = []
  
  // Add favicon.ico
  tags.push(`<link rel="icon" type="image/x-icon" href="/favicon.ico">`)
  
  // Add PNG favicons
  props.generatedSizes.forEach(size => {
    let fileName
    if (size === 180) {
      fileName = 'apple-touch-icon.png'
      tags.push(`<link rel="apple-touch-icon" sizes="180x180" href="/${fileName}">`)
    } else if (size === 192) {
      fileName = 'android-chrome-192x192.png'
    } else if (size === 512) {
      fileName = 'android-chrome-512x512.png'
    } else {
      fileName = `favicon-${size}x${size}.png`
      tags.push(`<link rel="icon" type="image/png" sizes="${size}x${size}" href="/${fileName}">`)
    }
  })
  
  // Add manifest
  tags.push(`<link rel="manifest" href="/site.webmanifest">`)
  
  // Add theme color
  tags.push(`<meta name="theme-color" content="#10b981">`)
  
  return tags.join('\n')
})

const getFileIcon = (fileName: string): string => {
  if (fileName.endsWith('.png')) return 'lucide:image'
  if (fileName.endsWith('.ico')) return 'lucide:star'
  if (fileName.endsWith('.webmanifest')) return 'lucide:file-code'
  return 'lucide:file'
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error(t('installation.copy.error'), error)
  }
}
</script>

<style lang="scss" scoped>
.installation-guide {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: border-radius(xl);
  padding: spacing(2xl);
  margin-top: spacing(2xl);
  
  &__header {
    margin-bottom: spacing(2xl);
  }
  
  &__title {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    font-size: font-size(2xl);
    font-weight: font-weight(bold);
    color: var(--text-primary);
    margin: 0;
  }
  
  &__icon {
    width: 28px;
    height: 28px;
    color: var(--primary);
  }
}

.installation-step {
  margin-bottom: spacing(3xl);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &__title {
    display: flex;
    align-items: center;
    gap: spacing(md);
    font-size: font-size(xl);
    font-weight: font-weight(semibold);
    color: var(--text-primary);
    margin-bottom: spacing(md);
  }
  
  &__number {
    width: 32px;
    height: 32px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: font-size(sm);
    font-weight: font-weight(bold);
    flex-shrink: 0;
  }
  
  &__description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: spacing(lg);
  }
}

.file-list {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: border-radius(lg);
  padding: spacing(lg);
  
  &__header {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    font-weight: font-weight(semibold);
    color: var(--text-primary);
    margin-bottom: spacing(md);
    
    svg {
      width: 18px;
      height: 18px;
      color: var(--primary);
    }
  }
  
  &__items {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  &__item {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    padding: spacing(xs) 0;
    color: var(--text-secondary);
    font-size: font-size(sm);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    
    &:not(:last-child) {
      border-bottom: 1px solid var(--border-light);
    }
  }
  
  &__item-icon {
    width: 16px;
    height: 16px;
    color: var(--text-tertiary);
    flex-shrink: 0;
  }
  
  &__item-name {
    flex: 1;
    color: var(--text-primary);
  }
  
  &__item-size {
    color: var(--text-tertiary);
    font-size: font-size(xs);
    font-family: 'Inter', sans-serif;
  }
}

.code-block {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: border-radius(lg);
  overflow: hidden;
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: spacing(md) spacing(lg);
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border);
  }
  
  &__title {
    display: flex;
    align-items: center;
    gap: spacing(xs);
    font-size: font-size(sm);
    font-weight: font-weight(medium);
    color: var(--text-primary);
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  &__copy-btn {
    display: flex;
    align-items: center;
    gap: spacing(xs);
    padding: spacing(xs) spacing(sm);
    background: var(--primary);
    color: white;
    border: none;
    border-radius: border-radius(md);
    font-size: font-size(xs);
    font-weight: font-weight(medium);
    cursor: pointer;
    transition: background 0.3s ease-out, transform 0.3s ease-out;
    
    &:hover {
      background: var(--primary-dark);
      transform: translateY(-1px);
    }
    
    &--copied {
      background: var(--success);
    }
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
  
  &__content {
    padding: spacing(lg);
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: font-size(sm);
    line-height: 1.6;
    color: var(--text-primary);
    overflow-x: auto;
    margin: 0;
    
    code {
      color: inherit;
    }
  }
}

.tips {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: border-radius(lg);
  padding: spacing(lg);
  
  .dark-mode & {
    background: rgba(20, 184, 166, 0.1);
    border-color: rgba(20, 184, 166, 0.2);
  }
  
  &__header {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    font-weight: font-weight(semibold);
    color: var(--primary);
    margin-bottom: spacing(md);
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  &__list {
    margin: 0;
    padding-left: spacing(lg);
    color: var(--text-secondary);
    
    li {
      margin-bottom: spacing(xs);
      line-height: 1.5;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.inline-code {
  background: var(--bg-tertiary);
  color: var(--primary);
  padding: spacing(xs) spacing(sm);
  border-radius: border-radius(sm);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

// Animations
.installation-guide {
  animation: fadeInUp 0.6s ease-out;
}

.installation-step {
  animation: fadeInUp 0.4s ease-out;
  
  @for $i from 1 through 3 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}
</style>