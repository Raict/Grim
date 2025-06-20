<template>
    <div class="mobile-menu">
      <button
        class="btn btn--ghost btn--sm mobile-menu__trigger"
        @click="isOpen = true"
      >
        <Icon name="lucide:menu" />
      </button>
  
      <div class="mobile-menu__overlay" :class="{ 'mobile-menu__overlay--show': isOpen }" @click="isOpen = false">
        <div class="mobile-menu__content" @click.stop>
          <div class="mobile-menu__header">
            <span class="mobile-menu__title">Меню</span>
            <button
              class="btn btn--ghost btn--sm"
              @click="isOpen = false"
            >
              <Icon name="lucide:x" />
            </button>
          </div>
  
          <nav class="mobile-menu__nav">
            <NuxtLink 
              to="/" 
              class="mobile-menu__link"
              @click="isOpen = false"
            >
              {{ $t('nav.home') }}
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="mobile-menu__link"
              @click="isOpen = false"
            >
              {{ $t('nav.about') }}
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="mobile-menu__link"
              @click="isOpen = false"
            >
              {{ $t('nav.contact') }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const isOpen = ref(false)
  </script>
  
  <style lang="scss" scoped>
  @use 'sass:map';

  .mobile-menu {
    &__trigger {
      width: 40px;
      height: 40px;
      padding: 0;
      @include flex-center;
    }
    
    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: map.get($z-index, modal);
      opacity: 0;
      visibility: hidden;
      @include transition();
      
      &--show {
        opacity: 1;
        visibility: visible;
      }
    }
    
    &__content {
      position: absolute;
      top: 0;
      right: 0;
      width: 280px;
      height: 100%;
      background: var(--bg-primary);
      padding: spacing(xl);
      transform: translateX(100%);
      @include transition();
      
      .mobile-menu__overlay--show & {
        transform: translateX(0);
      }
    }
    
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: spacing(2xl);
    }
    
    &__title {
      font-size: font-size(lg);
      font-weight: font-weight(semibold);
      color: var(--text-primary);
    }
    
    &__nav {
      display: flex;
      flex-direction: column;
      gap: spacing(lg);
    }
    
    &__link {
      display: block;
      padding: spacing(sm) 0;
      color: var(--text-secondary);
      font-weight: font-weight(medium);
      @include transition();
      
      &:hover {
        color: var(--primary);
      }
    }
  }
  </style>
  