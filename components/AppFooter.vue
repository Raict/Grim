<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <!-- Main Footer Content -->
        <div class="footer__main">
          <!-- Brand Section -->
          <div class="footer__brand">
            <div class="footer__logo">
              <div class="footer__logo-icon">
                <Icon name="lucide:image" />
              </div>
              <span class="footer__logo-text">Faviconitys</span>
            </div>
            <p class="footer__description">
              {{ $t('footer.description') }}
            </p>
            <!-- <div class="footer__social">
              <h4 class="footer__social-title">{{ $t('footer.social.title') }}</h4>
              <div class="footer__social-links">
                <a href="#" class="footer__social-link" :title="$t('footer.social.github')">
                  <Icon name="lucide:github" />
                </a>
                <a href="#" class="footer__social-link" :title="$t('footer.social.twitter')">
                  <Icon name="lucide:twitter" />
                </a>
              </div>
            </div> -->
          </div>

          <!-- Links Group -->
          <div class="footer__links-group">
            <!-- Quick Links -->
            <div class="footer__section">
              <h4 class="footer__section-title">{{ $t('nav.navigation') }}</h4>
              <ul class="footer__links">
                <li>
                  <NuxtLink 
                    to="/" 
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path === '/' }"
                  >
                    {{ $t('nav.home') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/favicons" 
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path === '/favicons' }"
                  >
                    {{ $t('nav.converter') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/favicons-text" 
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path === '/favicons-text' }"
                  >
                    {{ $t('nav.textGenerator') }}
                  </NuxtLink>
                </li>
                <!-- <li><NuxtLink to="/favicon-ai" class="footer__link">{{ $t('nav.aiGenerator') }}</NuxtLink></li> -->
              </ul>
            </div>

            <!-- Legal Links -->
            <div class="footer__section">
              <h4 class="footer__section-title">{{ $t('nav.about') }}</h4>
              <ul class="footer__links">
                <li>
                  <NuxtLink 
                    to="/privacy" 
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path === '/privacy' }"
                  >
                    {{ $t('footer.links.privacy') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink 
                    to="/terms" 
                    class="footer__link"
                    :class="{ 'footer__link--active': $route.path === '/terms' }"
                  >
                    {{ $t('footer.links.terms') }}
                  </NuxtLink>
                </li>
                <!-- <li><a href="mailto:contact@faviconitys.com" class="footer__link">{{ $t('footer.links.contact') }}</a></li> -->
                <!-- <li><NuxtLink to="/about" class="footer__link">{{ $t('footer.links.about') }}</NuxtLink></li> -->
              </ul>
            </div>

            <!-- Tools -->
            <div class="footer__section">
              <h4 class="footer__section-title">{{ $t('nav.settings') }}</h4>
              <div class="footer__controls">
                <div class="footer__control">
                  <span class="footer__control-label">{{ $t('nav.language') }}</span>
                  <LanguageSwitcher />
                </div>
                <div class="footer__control">
                  <span class="footer__control-label">{{ $t('nav.theme') }}</span>
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer__bottom">
          <div class="footer__bottom-content">
            <p class="footer__copyright">
              {{ $t('footer.copyright') }}
            </p>
            <p class="footer__made-with">
              {{ $t('footer.madeWith') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  
  &__content {
    padding: spacing(3xl) 0 spacing(lg);
  }
  
  &__main {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(2xl);
    margin-bottom: spacing(2xl);
    
    @include respond-to(md) {
      grid-template-columns: 1.5fr 2fr;
      gap: spacing(4xl);
      align-items: start;
    }
  }
  
  &__brand {
  }
  
  &__logo {
    display: flex;
    align-items: center;
    gap: spacing(sm);
    margin-bottom: spacing(md);
    font-size: font-size(lg);
    font-weight: font-weight(bold);
    color: var(--text-primary);
  }
  
  &__logo-icon {
    width: 28px;
    height: 28px;
    @include gradient(135deg, var(--primary), var(--secondary));
    border-radius: border-radius(md);
    @include flex-center;
    color: white;
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
  
  &__description {
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
    font-size: font-size(sm);
    max-width: 280px;
  }
  
  &__links-group {
    display: grid;
    grid-template-columns: 1fr;
    gap: spacing(xl);
    
    @include respond-to(sm) {
      grid-template-columns: repeat(3, 1fr);
      gap: spacing(lg);
    }
  }
  
  &__section {
    &-title {
      font-size: font-size(sm);
      font-weight: font-weight(semibold);
      color: var(--text-primary);
      margin-bottom: spacing(md);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
  
  &__links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: spacing(xs);
  }
  
  &__link {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: font-size(sm);
    padding: spacing(xs) 0;
    @include transition();
    position: relative;
    
    &:hover {
      color: var(--primary);
    }
    
    &--active {
      color: var(--primary);
      font-weight: font-weight(medium);
    }
  }
  
  &__controls {
    display: flex;
    flex-direction: column;
    gap: spacing(md);
  }
  
  &__control {
    display: flex;
    flex-direction: column;
    gap: spacing(xs);
    
    &-label {
      font-size: font-size(xs);
      font-weight: font-weight(medium);
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
  
  &__bottom {
    padding-top: spacing(lg);
    border-top: 1px solid var(--border);
    
    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: spacing(xs);
      text-align: center;
      
      @include respond-to(sm) {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }
    }
  }
  
  &__copyright {
    color: var(--text-secondary);
    font-size: font-size(xs);
    margin: 0;
  }
  
  &__made-with {
    color: var(--text-tertiary);
    font-size: font-size(xs);
    margin: 0;
  }
  
  &__social {
    margin-top: spacing(lg);
    
    &-title {
      font-size: font-size(xs);
      font-weight: font-weight(semibold);
      color: var(--text-primary);
      margin-bottom: spacing(sm);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    &-links {
      display: flex;
      gap: spacing(xs);
    }
    
    &-link {
      width: 32px;
      height: 32px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: border-radius(md);
      @include flex-center;
      color: var(--text-secondary);
      text-decoration: none;
      @include transition();
      
      &:hover {
        background: var(--primary);
        border-color: var(--primary);
        color: white;
        transform: translateY(-1px);
      }
      
      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
}

// Анімації
.footer {
  animation: fadeInUp 0.6s ease-out;
}

.footer__section {
  animation: fadeInUp 0.4s ease-out;
  
  @for $i from 1 through 3 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}

// Responsive improvements
@include respond-to(lg) {
  .footer {
    &__main {
      grid-template-columns: 1fr 1.5fr;
    }
    
    &__links-group {
      grid-template-columns: repeat(3, 1fr);
      gap: spacing(2xl);
    }
  }
}
</style>
