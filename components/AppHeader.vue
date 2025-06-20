<template>
    <header class="header">
      <div class="container">
        <nav class="header__nav">
          <NuxtLink to="/" class="header__logo">
            <div class="header__logo-icon">
              <Icon name="lucide:image" />
            </div>
            <span class="header__logo-text">Faviconitys</span>
          </NuxtLink>

  
          <div class="header__controls">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <MobileMenu class="header__mobile-menu" />
          </div>
        </nav>
      </div>
    </header>
  </template>
  <style lang="scss" scoped>
  @use 'sass:map';
  .header {
    position: sticky;
    top: 0;
    z-index: map.get($z-index, sticky);
    @include glass-effect;
    border-bottom: 1px solid var(--border-light);
    
    &__nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: spacing(lg) 0;
      min-height: 70px;
    }
    
    &__logo {
      display: flex;
      align-items: center;
      gap: spacing(sm);
      font-size: font-size(xl);
      font-weight: font-weight(bold);
      color: var(--text-primary);
      text-decoration: none;
      @include transition();
      
      &:hover {
        transform: scale(1.02);
        
        .header__logo-icon {
          transform: scale(1.1);
        }
      }
    }
    
    &__logo-icon {
      width: 32px;
      height: 32px;
      @include gradient(135deg, var(--primary), var(--secondary));
      border-radius: border-radius(lg);
      @include flex-center;
      color: white;
      @include transition();
    }
    
    &__logo-text {
      @include gradient(135deg, var(--primary), var(--secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      
      @supports not (-webkit-background-clip: text) {
        color: var(--primary);
      }
    }
    
    &__menu {
      display: none;
      align-items: center;
      gap: spacing(xl);
      
      @include respond-to(md) {
        display: flex;
      }
    }
    
    &__link {
      color: var(--text-secondary);
      font-weight: font-weight(medium);
      text-decoration: none;
      padding: spacing(sm) 0;
      position: relative;
      @include transition();
      
      &:hover {
        color: var(--primary);
      }
      
      &--active {
        color: var(--primary);
        
        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--primary);
          border-radius: border-radius(full);
        }
      }
    
      &::before {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        width: 0;
        height: 2px;
        background: var(--primary);
        border-radius: border-radius(full);
        @include transition();
        transform: translateX(-50%);
      }
      
      &:hover::before {
        width: 100%;
      }
      
      &--active::before {
        display: none;
      }
    }
    
    &__controls {
      display: flex;
      align-items: center;
      gap: spacing(sm);
    }
    
    &__mobile-menu {
      @include respond-to(md) {
        display: none;
      }
    }
  }
  
  @include respond-to(sm) {
    .header {
      &__nav {
        padding: spacing(xl) 0;
      }
      
      &__controls {
        gap: spacing(md);
      }
    }
  }
  
  @include respond-to(md) {
    .header {
      &__logo {
        font-size: font-size(2xl);
      }
      
      &__logo-icon {
        width: 36px;
        height: 36px;
      }
    }
  }
  
  .light-mode .header {
    background: rgba(255, 255, 255, 0.8);
    
    &:hover {
      background: rgba(255, 255, 255, 0.95);
    }
  }
  
  .dark-mode .header {
    background: rgba(31, 41, 55, 0.8);
    
    &:hover {
      background: rgba(31, 41, 55, 0.95);
    }
  }
  
  .header {
    animation: slideInDown 0.6s ease-out;
  }
  
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  