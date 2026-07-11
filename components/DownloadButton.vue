<template>
  <button
    class="btn btn--gradient btn--lg download-btn"
    :class="{
      'download-btn--loading': isProcessing,
      'download-btn--success': showSuccess && !isProcessing,
      'download-btn--downloading': isDownloading
    }"
    :disabled="disabled || isProcessing"
    @click="handleClick"
    type="button"
    :aria-label="displayText + (isProcessing ? ` - ${t('a11y.progress', { progress })}` : '')"
    :aria-describedby="isProcessing ? 'download-progress' : undefined"
  >
    <div class="download-btn__content">
      <Icon
        v-if="!isProcessing && !showSuccess && !isDownloading"
        name="lucide:download"
        class="download-btn__icon"
        aria-hidden="true"
      />
      <Icon
        v-if="isDownloading"
        name="lucide:file-down"
        class="download-btn__icon download-btn__icon--downloading"
        aria-hidden="true"
      />
      <div
        v-if="isProcessing"
        class="download-btn__spinner"
        aria-hidden="true"
      ></div>
      <span class="download-btn__text">
        {{ displayText }}
      </span>
    </div>
    <div
      v-if="isProcessing"
      class="download-btn__progress"
      :style="{ width: `${progress}%` }"
      role="progressbar"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="t('a11y.downloadProgress', { progress })"
      id="download-progress"
      :aria-live="progress < 100 ? 'polite' : 'assertive'"
    ></div>
    <div
      v-if="isProcessing"
      class="download-btn__pulse"
      aria-hidden="true"
    ></div>
    <div
      v-if="isDownloading"
      class="download-btn__download-animation"
      aria-hidden="true"
    ></div>
    <div
      v-if="showSuccess"
      class="download-btn__success-particles"
      aria-hidden="true"
    >
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  isProcessing: boolean
  showSuccess: boolean
  progress: number
  disabled?: boolean
  defaultText: string
  successText: string
  processingText: string
}

const props = defineProps<Props>()
const { t } = useI18n()
const emit = defineEmits<{
  click: []
}>()

const isDownloading = ref(false)

const displayText = computed(() => {
  if (isDownloading.value) return t('a11y.downloading')
  if (props.isProcessing) return props.processingText
  if (props.showSuccess) return props.successText
  return props.defaultText
})

const handleClick = async () => {
  emit('click')
}

// Watch for when processing completes to trigger download animation
watch(() => props.progress, (newProgress, oldProgress) => {
  // When progress reaches 100%, trigger the download animation
  if (newProgress === 100 && oldProgress < 100) {
    setTimeout(() => {
      isDownloading.value = true

      // Reset downloading state after showing the animation
      setTimeout(() => {
        isDownloading.value = false
      }, 1500)
    }, 200) // Small delay to let the success state show first
  }
})

// Clean up when component resets
watch(() => props.showSuccess, (newSuccess) => {
  if (!newSuccess) {
    isDownloading.value = false
  }
})
</script>

<style lang="scss" scoped>
.download-btn {
  position: relative;
  overflow: hidden;
  min-width: 250px;
  min-height: 50px;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: spacing(sm);
    position: relative;
    z-index: 2;
  }

  &__icon {
    width: 20px;
    height: 20px;
    @include transition();

    &--success {
      color: #10b981 !important;
      animation: successBounce 0.8s ease-out;
    }

    &--downloading {
      color: #3b82f6 !important;
      animation: downloadBounce 1.2s ease-in-out infinite;
    }
  }

  &__spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: browserSpin 1s linear infinite;
  }

  &__text {
    font-weight: font-weight(medium);
    @include transition();
    white-space: nowrap;
    min-width: 150px;
    text-align: center;
  }

  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: #10b981;
    @include transition(width);
    transition-duration: 0.3s;
    border-radius: 0 0 border-radius(xl) border-radius(xl);
  }

  &__pulse {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: pulse 2s ease-in-out infinite;
  }

  &--loading {
    cursor: not-allowed;
    opacity: 0.8;

    .download-btn__content {
      opacity: 0.9;
    }
  }

  &--success {
    background: linear-gradient(135deg, #10b981, #059669) !important;
    animation: successGlow 1s ease-out, successPulse 1.5s ease-out;
    transform: scale(1.02);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);

    .download-btn__text {
      animation: successScale 0.8s ease-out;
      color: white !important;
    }
  }

  &--downloading {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
    animation: downloadingPulse 1.5s ease-in-out infinite;
    transform: scale(1.01);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);

    .download-btn__text {
      color: white !important;
      animation: downloadTextPulse 1.2s ease-in-out infinite;
    }
  }

  &__download-animation {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.15), transparent);
    animation: downloadFlow 2s ease-in-out infinite;
    border-radius: inherit;
  }

  &__success-particles {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #10b981;
      border-radius: 50%;
      animation: particleExplode 1.5s ease-out forwards;

      &:nth-child(1) {
        animation-delay: 0s;
        transform: rotate(0deg) translateX(30px);
      }
      &:nth-child(2) {
        animation-delay: 0.1s;
        transform: rotate(72deg) translateX(30px);
      }
      &:nth-child(3) {
        animation-delay: 0.2s;
        transform: rotate(144deg) translateX(30px);
      }
      &:nth-child(4) {
        animation-delay: 0.3s;
        transform: rotate(216deg) translateX(30px);
      }
      &:nth-child(5) {
        animation-delay: 0.4s;
        transform: rotate(288deg) translateX(30px);
      }
    }
  }
}

@keyframes browserSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes successBounce {
  0% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.3) rotate(10deg);
  }
  50% {
    transform: scale(1.1) rotate(-5deg);
  }
  75% {
    transform: scale(1.2) rotate(3deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes successGlow {
  0% {
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  }
  50% {
    box-shadow: 0 8px 35px rgba(16, 185, 129, 0.6);
  }
  100% {
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  }
}

@keyframes successScale {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes successPulse {
  0% {
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
  }
  50% {
    box-shadow: 0 15px 40px rgba(16, 185, 129, 0.7);
  }
  100% {
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
  }
}

@keyframes downloadBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes downloadingPulse {
  0%, 100% {
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    transform: scale(1.01);
  }
  50% {
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.5);
    transform: scale(1.02);
  }
}

@keyframes downloadTextPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes downloadFlow {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  50% {
    transform: translateX(50%) rotate(45deg);
  }
  100% {
    transform: translateX(200%) rotate(45deg);
  }
}

@keyframes particleExplode {
  0% {
    opacity: 1;
    transform: scale(0) rotate(var(--rotation, 0deg)) translateX(0);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(var(--rotation, 0deg)) translateX(20px);
  }
  100% {
    opacity: 0;
    transform: scale(0.5) rotate(var(--rotation, 0deg)) translateX(40px);
  }
}

.download-btn {
  @include transition();

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  }

  &:not(:disabled):active {
    transform: translateY(0);
  }
}
</style>
