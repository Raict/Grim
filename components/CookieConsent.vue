
<template>
    <Teleport to="body">
      <transition name="cookie-fade">
        <div
          v-if="ready && !consentGiven"
          class="cookie-consent fancy-bg"
          role="dialog"
          aria-live="polite"
        >
          <div class="cookie-dots-bg"></div>
          <div class="cookie-content">
            <h2 class="cookie-title">
              🍪 {{ $t('cookieConsent.title', 'Privacy-friendly preferences') }}
            </h2>
            <p class="cookie-desc">
              {{ $t('cookieConsent.description', 'We do not use advertising cookies. We only remember essentials like language, theme, and generator settings on this device.') }}
            </p>
            <NuxtLink :to="localePath('/privacy')" class="cookie-consent__link">
              {{ $t('cookieConsent.privacy') }}
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
  </template>
  
  <script setup lang="ts">
  
  const consentGiven = ref(false)
  const ready = ref(false)
  const localePath = useLocalePath()
  onMounted(() => {
    consentGiven.value = localStorage.getItem('cookie_consent') === 'accepted'
    ready.value = true
  })
  
  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    consentGiven.value = true
  }
  
  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    consentGiven.value = true
  }
  </script>
  
  <style lang="scss" scoped>
  .cookie-fade-enter-active, .cookie-fade-leave-active {
    transition: opacity 0.4s cubic-bezier(.7, .3, .1, 1);
  }
  .cookie-fade-enter-from, .cookie-fade-leave-to {
    opacity: 0;
  }
  
  
  .cookie-consent {
    position: fixed;
    bottom: 32px;
    left: 0;
    right: 0;
    z-index: 9999;
    margin: 0 auto;
    max-width: 70%;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(20, 184, 166, 0.17);
    background: var(--bg-primary);
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 162px;
    animation: fadeInUp 0.7s cubic-bezier(.6, .7, .2, 1);


      &__link {
    color: var(--primary-light);
    font-size: font-size(sm);
    font-weight: font-weight(semibold);
    text-decoration: none;
    margin-bottom: 18px;

    &:hover {
      color: var(--primary);
    }
  }
  }
  
  .cookie-content {
    position: relative;
    z-index: 2;
    padding: 32px 28px 24px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .cookie-title {
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--primary);
    margin-bottom: 12px;
    letter-spacing: 0.01em;
    text-shadow: 0 2px 12px rgba(16,185,129,.03);
  }
  
  .cookie-desc {
    color: var(--text-secondary);
    font-size: 1.06rem;
    line-height: 1.5;
    margin-bottom: 8px;
    text-align: center;
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    font-weight: 500;
  }
  
  .cookie-actions {
    display: flex;
    gap: 18px;
    width: 100%;
    justify-content: center;
  }
  
  .cookie-btn {
    font-family: inherit;
    font-size: 1.12rem;
    padding: 14px 36px;
    border-radius: 16px;
    font-weight: 700;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.18s cubic-bezier(.7,.3,.1,1);
    box-shadow: 0 1px 4px rgba(16, 185, 129, .12);
    letter-spacing: 0.04em;
    margin: 0 4px;
    min-width: 120px;
  }
  
  .cookie-btn-primary {
    background: linear-gradient(90deg, #10b981 20%, #6366f1 90%);
    color: #fff;
    box-shadow: 0 3px 24px rgba(99, 102, 241, .12);
  }
  
  .cookie-btn-primary:hover {
    filter: brightness(1.12) saturate(1.2);
    transform: translateY(-2px) scale(1.035);
    box-shadow: 0 8px 36px rgba(20,184,166, .13);
  }
  
  .cookie-btn-secondary {
    background: #f1f5f9;
    color: #333;
    border: 1px solid #e0e7ef;
  }
  .cookie-btn-secondary:hover {
    background: #e0e7ef;
    color: #10b981;
    border: 1px solid #10b981;
  }
  
  .cookie-dots-bg {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.55;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.11'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  }
  
  /* Мобільна адаптація */
  @media (max-width: 600px) {
    .cookie-consent {
      max-width: 98vw;
      min-height: 110px;
      border-radius: 14px;
      padding: 0;
    }
    .cookie-content {
      padding: 20px 10px 16px 10px;
    }
    .cookie-btn {
      font-size: 1rem;
      padding: 12px 14px;
      border-radius: 10px;
      min-width: 90px;
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
