<template>
  <div class="error-page">
    <div class="error-background">
      <div class="error-gradient"></div>
      <div class="error-glow"></div>
      <div class="error-particles">
        <div class="particle" v-for="i in 8" :key="i"></div>
      </div>
    </div>

    <div class="error-content">
      <div class="error-icon">
        <Icon name="lucide:search-x" class="error-icon__svg" />
      </div>

      <h1 class="error-title">{{ $t('error.title') }}</h1>

      <p class="error-message">{{ $t('error.message') }}</p>

      <div class="error-actions">
        <NuxtLink :to="localePath('/')" class="btn btn--hero btn--cta">
          <div class="btn-glow"></div>
          <Icon name="lucide:home" class="btn-icon" />
          <span class="btn-text">{{ $t('error.goHome') }}</span>
          <Icon name="lucide:arrow-right" class="btn-arrow" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp()
const localePath = useLocalePath()

// Get error from props
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

// Auto-redirect to home page for 404 errors after 3 seconds
const handleError = () => {
  clearError({ redirect: localePath('/') })
}

// For SEO and accessibility
useSeoMeta({
  title: $i18n.t('error.title'),
  description: $i18n.t('error.message'),
  robots: 'noindex, nofollow'
})

// Auto-redirect after 3 seconds for 404 errors
if (props.error.statusCode === 404) {
  setTimeout(() => {
    handleError()
  }, 3000)
}
</script>

<style lang="scss" scoped>
@use 'sass:math';

.error-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  overflow: hidden;
  background: var(--bg-primary);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    pointer-events: none;
    z-index: 0;
  }
}

.error-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.error-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.12) 0%,
    rgba(20, 184, 166, 0.18) 25%,
    rgba(99, 102, 241, 0.15) 50%,
    rgba(168, 85, 247, 0.12) 75%,
    rgba(236, 72, 153, 0.15) 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

.error-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(
    ellipse at center,
    rgba(16, 185, 129, 0.08) 0%,
    rgba(99, 102, 241, 0.06) 30%,
    rgba(168, 85, 247, 0.04) 60%,
    transparent 80%
  );
  animation: glowPulse 6s ease-in-out infinite;
  filter: blur(40px);
}

.error-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    border-radius: 50%;
    opacity: 0.6;
    animation: particleFloat 6s ease-in-out infinite;

    @for $i from 1 through 8 {
      &:nth-child(#{$i}) {
        top: math.random(100) * 1%;
        left: math.random(100) * 1%;
        animation-delay: #{$i * 0.7}s;
        animation-duration: #{4 + math.random(4)}s;
      }
    }
  }
}

.error-content {
  position: relative;
  text-align: center;
  max-width: 600px;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}

.error-icon {
  margin-bottom: 2rem;
  opacity: 0.8;

  &__svg {
    width: 80px;
    height: 80px;
    color: var(--primary);
    animation: iconPulse 3s ease-in-out infinite;
  }
}

.error-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (min-width: 640px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.5rem;
  }
}

.error-message {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
}

.error-actions {
  display: flex;
  justify-content: center;
}

.btn--cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow:
    0 20px 40px rgba(16, 185, 129, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow:
      0 30px 60px rgba(16, 185, 129, 0.5),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }

    .btn-glow {
      opacity: 1;
      transform: scale(1.2);
    }

    .btn-arrow {
      transform: translateX(6px);
    }

    .btn-icon {
      transform: rotate(15deg) scale(1.1);
    }
  }

  .btn-glow {
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border-radius: inherit;
    z-index: -1;
    filter: blur(15px);
    opacity: 0.7;
    transition: all 0.4s ease;
  }

  .btn-icon,
  .btn-arrow {
    width: 20px;
    height: 20px;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

// Animations
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
  }
  33% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.1);
  }
  66% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.9);
  }
}

@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-40px) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-20px) rotate(270deg);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}
</style>
