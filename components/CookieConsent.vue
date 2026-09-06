
<template>
  <ClientOnly>
    <Teleport to="body">
      <transition name="cookie-fade">
        <div
          v-if="ready && !consentGiven"
          class="cookie-consent"
          role="dialog"
          aria-modal="false"
          aria-live="polite"
          :aria-label="$t('cookieConsent.title', 'Privacy-friendly preferences')"
        >
          <div class="cookie-dots-bg"></div>
          <div class="cookie-content">
            <div class="cookie-copy">
              <div class="cookie-icon" aria-hidden="true">
                <Icon name="lucide:shield-check" />
              </div>
              <div>
                <p class="cookie-title">
                  {{ $t('cookieConsent.title', 'Privacy-friendly preferences') }}
                </p>
                <p class="cookie-desc">
                  {{ $t('cookieConsent.description', 'We do not use advertising cookies. We only remember essentials like language, theme, and generator settings on this device.') }}
                </p>
              </div>
            </div>
            <NuxtLink :to="localePath('/privacy')" class="cookie-consent__link">
              <span>{{ $t('cookieConsent.privacy') }}</span>
              <Icon name="lucide:arrow-up-right" aria-hidden="true" />
            </NuxtLink>
            <div class="cookie-actions">
              <button @click="accept" class="cookie-btn cookie-btn-primary">
                {{ $t('cookieConsent.accept', 'Got it') }}
              </button>
              <button @click="decline" class="cookie-btn cookie-btn-secondary">
                {{ $t('cookieConsent.decline', 'Decline') }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </ClientOnly>
  </template>
  
  <script setup lang="ts">
  
  const consentGiven = ref(false)
  const ready = ref(false)
  const localePath = useLocalePath()
  const storageKey = 'cookie_consent'
  const legacyStorageKey = 'fg-cookie-consent'

  onMounted(() => {
    const savedConsent = localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey)
    consentGiven.value = ['accepted', 'declined'].includes(savedConsent || '')
    ready.value = true
  })
  
  function accept() {
    localStorage.setItem(storageKey, 'accepted')
    localStorage.setItem(legacyStorageKey, 'accepted')
    consentGiven.value = true
  }
  
  function decline() {
    localStorage.setItem(storageKey, 'declined')
    localStorage.setItem(legacyStorageKey, 'declined')
    consentGiven.value = true
  }
  </script>
  
  <style lang="scss" scoped>
  .cookie-fade-enter-active, .cookie-fade-leave-active {
    transition: opacity 0.35s ease, transform 0.35s ease;
  }
  .cookie-fade-enter-from, .cookie-fade-leave-to {
    opacity: 0;
    transform: translateY(18px);
  }
  
  
  .cookie-consent {
    position: fixed;
    right: spacing(md);
    bottom: spacing(md);
    left: spacing(md);
    z-index: 9999;
    margin: 0 auto;
    max-width: 920px;
    border: 1px solid var(--hero-border);
    border-radius: border-radius(xl);
    overflow: hidden;
    box-shadow: 0 24px 80px rgba(3, 15, 30, 0.38), 0 0 46px rgba(34, 211, 238, 0.12);
    background:
      radial-gradient(circle at 14% 20%, rgba(34, 211, 238, 0.2), transparent 30%),
      radial-gradient(circle at 86% 0%, rgba(99, 102, 241, 0.2), transparent 34%),
      var(--hero-surface);
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    color: var(--hero-heading);
    backdrop-filter: blur(18px);
    animation: fadeInUp 0.7s cubic-bezier(.6, .7, .2, 1);

    @include respond-to(md) {
      max-width: 720px;
    }

    &__link {
      display: inline-flex;
      align-items: center;
      gap: spacing(xs);
      justify-self: center;
      padding: spacing(xs) spacing(sm);
      border-radius: border-radius(md);
      color: var(--hero-accent);
      font-size: font-size(base);
      font-weight: font-weight(semibold);
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 5px;
      white-space: nowrap;
      line-height: 1.25;
      background: rgba(34, 211, 238, 0.08);
      transition: color 0.18s ease, background 0.18s ease, transform 0.18s ease;

      svg {
        width: 16px;
        height: 16px;
        flex: 0 0 auto;
      }

      &:hover {
        color: var(--primary-light);
        background: rgba(34, 211, 238, 0.14);
        transform: translateY(-1px);
      }
    }
  }
  
  .cookie-content {
    position: relative;
    z-index: 2;
    padding: spacing(lg);
    display: grid;
    gap: spacing(md);

    @include respond-to(md) {
      padding: spacing(xl);
    }
  }

  .cookie-copy {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: spacing(md);
    max-width: 600px;
    margin: 0 auto;
  }

  .cookie-icon {
    width: 44px;
    height: 44px;
    border-radius: border-radius(lg);
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: #041b28;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    box-shadow: 0 14px 30px rgba(34, 211, 238, 0.22);

    svg {
      width: 22px;
      height: 22px;
    }
  }
  
  .cookie-title {
    margin: 0 0 spacing(xs);
    font-size: font-size(lg);
    font-weight: font-weight(extrabold);
    color: var(--hero-heading);
    line-height: 1.2;
  }
  
  .cookie-desc {
    color: var(--hero-body);
    font-size: font-size(sm);
    line-height: 1.55;
    margin: 0;
    max-width: 520px;
  }
  
  .cookie-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: spacing(sm);
    flex-wrap: wrap;
  }
  
  .cookie-btn {
    font-family: inherit;
    font-size: font-size(sm);
    padding: spacing(sm) spacing(lg);
    border-radius: border-radius(md);
    font-weight: font-weight(bold);
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease;
    min-width: 96px;
  }
  
  .cookie-btn-primary {
    border: 0;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: #041b28;
    box-shadow: 0 10px 24px rgba(34, 211, 238, 0.16);
  }
  
  .cookie-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 32px rgba(34, 211, 238, 0.22);
  }
  
  .cookie-btn-secondary {
    border: 1px solid var(--hero-border);
    background: rgba(255, 255, 255, 0.03);
    color: var(--hero-body);
  }
  .cookie-btn-secondary:hover {
    color: var(--hero-heading);
    border-color: var(--primary-light);
    transform: translateY(-1px);
  }
  
  .cookie-dots-bg {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.75;
    background-image: radial-gradient(circle, var(--hero-dots) 2px, transparent 2.8px);
    background-size: 38px 38px;
    mask-image: linear-gradient(to right, black 0%, rgba(0, 0, 0, 0.4) 100%);
  }
  
  @media (max-width: 600px) {
    .cookie-consent {
      right: spacing(sm);
      bottom: spacing(sm);
      left: spacing(sm);
      border-radius: border-radius(lg);
    }
    .cookie-content {
      padding: spacing(md);
    }
    .cookie-copy {
      gap: spacing(sm);
      justify-content: flex-start;
    }
    .cookie-icon {
      width: 38px;
      height: 38px;
    }
    .cookie-btn {
      flex: 1;
    }
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  </style>
