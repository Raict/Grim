<template>
  <button
    class="btn btn--gradient btn--lg download-btn"
    :class="{
      'download-btn--loading': isProcessing,
      'download-btn--success': showSuccess && !isProcessing
    }"
    :disabled="disabled || isProcessing"
    @click="$emit('click')"
    type="button"
  >
    <div class="download-btn__content">
      <Icon
        v-if="!isProcessing && !showSuccess"
        name="lucide:download"
        class="download-btn__icon"
        aria-hidden="true"
      />
      <div
        v-if="isProcessing"
        class="download-btn__spinner"
        aria-hidden="true"
      ></div>
      <span class="download-btn__text">
        {{ isProcessing ? processingText : (showSuccess ? successText : defaultText) }}
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
      :aria-label="`Прогрес завантаження: ${progress}%`"
    ></div>
    <div
      v-if="isProcessing"
      class="download-btn__pulse"
      aria-hidden="true"
    ></div>
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

defineProps<Props>()
defineEmits<{
  click: []
}>()
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