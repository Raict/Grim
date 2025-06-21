<template>
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <p class="footer__text">
            {{ $t('footer.copyright') }}
          </p>
          <p class="footer__love">
            {{ $t('footer.madeWith') }}
          </p>
        </div>
      </div>
    </footer>
  </template>
  
  <style lang="scss" scoped>
  .footer {
    background: var(--bg-secondary);
    border-top: 1px solid var(--border);
    padding: spacing(2xl) 0;
    
    &__content {
      text-align: center;
    }
    
    &__text {
      color: var(--text-secondary);
      margin-bottom: spacing(sm);
      font-size: font-size(base);
      font-weight: font-weight(medium);
    }
    
    &__love {
      color: var(--text-tertiary);
      font-size: font-size(sm);
      margin: 0;
      
      &::before {
        content: '';
        display: inline-block;
        margin-right: spacing(xs);
      }
    }
  }
  
  @include respond-to(md) {
    .footer {
      padding: spacing(3xl) 0;
      
      &__text {
        font-size: font-size(lg);
      }
    }
  }
  </style>
  