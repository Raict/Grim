<template>
  <section class="section section--hero fixed-header-section" aria-labelledby="converter-hero-title">
    <div class="hero-background" aria-hidden="true">
      <div class="hero-gradient"></div>
      <div class="hero-glow hero-glow--primary"></div>
      <div class="hero-glow hero-glow--secondary"></div>
    </div>

    <div class="container">
      <div class="hero-content fixed-header-content">
        <div class="hero-copy">
          <div class="hero-kicker" aria-hidden="true">
            <Icon name="lucide:sparkles" />
            <span>PNG · JPG · WEBP → favicon.ico</span>
          </div>

          <h1 id="converter-hero-title" class="hero-title">
            <span class="hero-title__main">{{ $t('converter.pageHeading') }}</span>
          </h1>

          <p class="hero-subtitle">{{ $t('converter.subtitle') }}</p>
          <p class="hero-description">{{ $t('converter.intro') }}</p>

          <div class="hero-actions">
            <button class="btn btn--hero btn--lg" type="button" @click="scrollToConverter">
              <Icon name="lucide:upload" class="btn-icon" aria-hidden="true" />
              <span>{{ $t('hero.uploadButton') }}</span>
              <Icon name="lucide:arrow-down" class="btn-arrow" aria-hidden="true" />
            </button>
          </div>

          <div class="hero-formats" aria-hidden="true">
            <span>favicon.ico</span>
            <span>Apple Touch Icon</span>
            <span>PWA</span>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="converter-preview">
            <div class="preview-browser">
              <div class="preview-browser__toolbar">
                <div class="preview-browser__dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="preview-browser__tab">
                  <span class="preview-browser__favicon">
                    <Icon name="lucide:zap" />
                  </span>
                  <Icon name="lucide:x" class="preview-browser__tab-close" />
                </div>
                <div class="preview-browser__new-tab">
                  <Icon name="lucide:plus" />
                </div>
                <span class="preview-browser__spacer"></span>
              </div>

              <div class="preview-browser__body">
                <div class="preview-source">
                  <span class="preview-source__icon"><Icon name="lucide:image" /></span>
                  <span class="preview-source__name">logo.png</span>
                  <span class="preview-source__meta">1024 × 1024</span>
                </div>

                <div class="preview-flow">
                  <span></span>
                  <Icon name="lucide:arrow-right" />
                  <span></span>
                </div>

                <div class="preview-icons">
                  <div v-for="size in [64, 48, 34, 24]" :key="size" class="preview-icon">
                    <span class="preview-icon__tile" :style="{ width: `${size}px`, height: `${size}px` }">
                      <Icon name="lucide:zap" />
                    </span>
                    <span class="preview-icon__size">{{ size }}px</span>
                  </div>
                </div>

                <div class="preview-ready">
                  <Icon name="lucide:circle-check" />
                  <span>favicons.zip</span>
                  <Icon name="lucide:download" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToConverter = () => {
  const converter = document.getElementById('favicon-converter')

  if (!converter) return

  const header = document.querySelector<HTMLElement>('.header')
  const headerHeight = header?.getBoundingClientRect().height ?? 0
  const converterTop = converter.getBoundingClientRect().top + window.scrollY

  window.scrollTo({
    top: Math.max(0, converterTop - headerHeight),
    behavior: 'smooth'
  })
}
</script>

<style lang="scss" scoped>
.section--hero {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  min-height: calc((var(--vh, 1vh) * 100) - var(--header-height));
  overflow: hidden;
  padding: spacing(3xl) 0;
  color: var(--hero-heading);
  background: var(--hero-surface);
  border-bottom: 1px solid var(--hero-border);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image: radial-gradient(circle, var(--hero-dots) 2px, transparent 2.6px);
    background-size: 58px 58px;
    mask-image: linear-gradient(to bottom, black, rgba(0, 0, 0, 0.42));
  }

  @include respond-to(md) {
    padding: spacing(4xl) 0;
  }

  @include respond-to(2xl) {
    padding: spacing(4xl) 0;
  }

  @include respond-to(3xl) {
    padding: spacing(5xl) 0;
  }
}

.hero-background,
.hero-gradient {
  position: absolute;
  inset: 0;
  z-index: -2;
  pointer-events: none;
}

.hero-gradient {
  background: var(--hero-gradient);
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(32px);
  opacity: 0.55;

  &--primary {
    left: 42%;
    bottom: -180px;
    width: 520px;
    height: 360px;
    background: var(--hero-glow);
  }

  &--secondary {
    top: -180px;
    right: -120px;
    width: 480px;
    height: 380px;
    background: var(--hero-glow);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: spacing(2xl);
  max-width: 100%;
  margin: 0 auto;

  @include respond-to(lg) {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: spacing(2xl);
  }

  @include respond-to(2xl) {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: spacing(3xl);
    max-width: 1500px;
  }

  @include respond-to(3xl) {
    gap: spacing(4xl);
    max-width: 1580px;
  }
}

.hero-copy {
  max-width: 650px;
  margin: 0 auto;
  text-align: center;

  @include respond-to(lg) {
    margin: 0;
    text-align: left;
  }

  @include respond-to(2xl) {
    max-width: 700px;
  }
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: spacing(sm);
  margin-bottom: spacing(lg);
  padding: spacing(sm) spacing(md);
  color: var(--hero-chip-text);
  background: var(--hero-chip-bg);
  border: 1px solid var(--hero-chip-border);
  border-radius: border-radius(full);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  font-size: font-size(sm);
  font-weight: font-weight(semibold);
  letter-spacing: 0.02em;

    svg {
      width: 17px;
      height: 17px;
      color: var(--primary);
  }
}

.hero-title {
  margin-bottom: spacing(lg);
  line-height: 1.04;
  letter-spacing: -0.035em;

  &__main {
    display: block;
    font-size: font-size(4xl);
    font-weight: font-weight(extrabold);
    background: var(--hero-title-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @include respond-to(sm) {
      font-size: font-size(5xl);
    }

    @include respond-to(xl) {
      font-size: font-size(5xl);
    }

    @include respond-to(2xl) {
      font-size: font-size(6xl);
    }

    @include respond-to(3xl) {
      font-size: font-size(6xl);
    }
  }
}

.hero-subtitle {
  max-width: 620px;
  margin: 0 auto spacing(md);
  color: var(--hero-subheading);
  font-size: font-size(xl);
  font-weight: font-weight(semibold);
  line-height: 1.45;

  @include respond-to(lg) {
    margin-left: 0;
  }

  @include respond-to(2xl) {
    max-width: 660px;
    font-size: font-size(xl);
  }
}

.hero-description {
  max-width: 600px;
  margin: 0 auto spacing(xl);
  color: var(--hero-copy);
  font-size: font-size(base);
  line-height: 1.7;

  @include respond-to(lg) {
    margin-left: 0;
  }

  @include respond-to(2xl) {
    max-width: 650px;
    font-size: font-size(lg);
  }
}

.hero-actions {
  display: flex;
  justify-content: center;
  margin-bottom: spacing(lg);
}

.btn--hero {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: spacing(sm);
  min-height: 54px;
  padding: spacing(md) spacing(xl);
  overflow: hidden;
  color: white;
  background: linear-gradient(135deg, var(--primary) 0%, #397bdc 52%, var(--secondary) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: border-radius(xl);
  box-shadow: 0 18px 38px rgba(13, 114, 176, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.28);
  font-size: font-size(base);
  font-weight: font-weight(semibold);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(100deg, transparent 15%, rgba(255, 255, 255, 0.24) 50%, transparent 85%);
    transform: translateX(-120%);
    transition: transform 0.55s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 24px 46px rgba(13, 114, 176, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.32);

    &::before { transform: translateX(120%); }
    .btn-arrow { transform: translateY(3px); }
  }

  &:focus-visible {
    outline: 3px solid rgba(122, 237, 234, 0.72);
    outline-offset: 4px;
  }

  .btn-icon,
  .btn-arrow {
    position: relative;
    z-index: 1;
    width: 19px;
    height: 19px;
    flex: 0 0 auto;
  }

  .btn-arrow { transition: transform 0.25s ease; }
  span { position: relative; z-index: 1; }
}

.hero-formats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: spacing(sm);

  @include respond-to(lg) {
    justify-content: center;
  }

  span {
    padding: spacing(xs) spacing(sm);
    color: var(--hero-copy);
    background: var(--hero-chip-bg);
    border: 1px solid var(--hero-chip-border);
    border-radius: border-radius(full);
    font-size: font-size(xs);
  }
}

.hero-visual {
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 0;
}

.converter-preview {
  box-sizing: border-box;
  width: 100%;
  max-width: 560px;
  min-width: 0;
  overflow: hidden;
  padding: spacing(sm);
  background: var(--browser-frame-bg);
  border: 1px solid var(--browser-frame-border);
  border-radius: border-radius(3xl);
  box-shadow: var(--browser-frame-shadow);
  transform: none;

  @include respond-to(2xl) {
    max-width: 760px;
  }

  @include respond-to(3xl) {
    max-width: 840px;
  }
}

.preview-browser {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: var(--browser-surface);
  border: 1px solid var(--browser-border);
  border-radius: 18px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);

  &__toolbar {
    display: grid;
    grid-template-columns: auto minmax(150px, 340px) auto minmax(0, 1fr);
    align-items: center;
    gap: spacing(sm);
    min-height: 62px;
    padding: spacing(sm) spacing(lg) 0;
    background: var(--browser-toolbar);
    border-bottom: 1px solid var(--browser-toolbar-border);
  }

  &__dots {
    display: flex;
    gap: 7px;
    margin-right: spacing(sm);

    span {
      width: 11px;
      height: 11px;
      border-radius: 50%;

      &:nth-child(1) { background: #ff5f57; }
      &:nth-child(2) { background: #ffbd2e; }
      &:nth-child(3) { background: #28ca42; }
    }
  }

  &__tab {
    align-self: end;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: spacing(md);
    width: 100%;
    height: 52px;
    max-width: 340px;
    background: var(--browser-tab);
    border: 1px solid var(--browser-tab-border);
    border-bottom: 0;
    border-radius: 21px 21px 0 0;
    box-shadow: var(--browser-tab-shadow);
  }

  &__favicon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    color: white;
    background: linear-gradient(135deg, #20c7c5, #397bdc 50%, #774ff2);
    border: 1px solid rgba(177, 188, 255, 0.56);
    border-radius: border-radius(lg);
    box-shadow: 0 8px 18px rgba(32, 199, 197, 0.2);
    margin-left: spacing(md);

    svg { width: 22px; height: 22px; fill: white; }
  }

  &__tab-close {
    width: 18px;
    height: 18px;
    margin-right: spacing(md);
    margin-left: auto;
    color: var(--browser-chrome-icon);
  }

  &__new-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: start;
    color: var(--browser-chrome-icon);

    svg { width: 18px; height: 18px; }
  }

  &__spacer {
    min-width: 0;
  }

  &__body {
    flex: 1;
    padding: spacing(lg);
    background: var(--browser-content);
  }
}

.preview-source {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: spacing(md);
  padding: spacing(md);
  background: var(--browser-card-bg);
  border: 1px solid var(--browser-card-border);
  border-radius: border-radius(xl);

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    color: var(--primary);
    background: color-mix(in srgb, var(--primary) 10%, transparent);
    border-radius: border-radius(lg);
  }

  &__name { color: var(--browser-card-text); font-size: font-size(sm); font-weight: font-weight(semibold); }
  &__meta { color: var(--browser-muted); font-size: font-size(xs); }
}

.preview-flow {
  display: flex;
  align-items: center;
  gap: spacing(sm);
  padding: spacing(sm) spacing(xl);
  color: #50d8d6;

  span {
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, transparent, rgba(83, 216, 214, 0.5));

    &:last-child { background: linear-gradient(90deg, rgba(83, 216, 214, 0.5), transparent); }
  }

  svg { width: 18px; height: 18px; }
}

.preview-icons {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: spacing(md);
  min-height: 80px;
  padding: spacing(sm) spacing(md);
  background: var(--browser-preview-bg);
  border: 1px solid var(--browser-preview-border);
  border-radius: border-radius(xl);
}

.preview-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: spacing(xs);

  &__tile {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    color: white;
    background: linear-gradient(135deg, #20c7c5, #397bdc 50%, #774ff2);
    border-radius: 24%;
    box-shadow: 0 9px 20px rgba(32, 199, 197, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.3);

    svg { width: 54%; height: 54%; fill: white; }
  }

  &__size { color: var(--browser-muted); font-size: 10px; }
}

.preview-ready {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: spacing(sm);
  margin-top: spacing(md);
  padding: spacing(sm) spacing(md);
  color: var(--browser-ready-text);
  background: var(--browser-ready-bg);
  border: 1px solid var(--browser-ready-border);
  border-radius: border-radius(lg);
  font-size: font-size(sm);
  font-weight: font-weight(medium);

  svg {
    width: 17px;
    height: 17px;

    &:last-child { color: #8e9cff; }
  }
}

@media (max-width: 639px) {
  .section--hero {
    min-height: calc((var(--vh, 1vh) * 100) - var(--header-height));
    padding: spacing(2xl) 0 spacing(3xl);
  }

  .hero-content { gap: spacing(xl); }
  .converter-preview { transform: none; }

  .preview-browser__toolbar {
    grid-template-columns: auto minmax(140px, 1fr) auto;
    min-height: 58px;
    padding-inline: spacing(md);
  }

  .preview-browser__tab { height: 44px; }
  .preview-browser__favicon { width: 32px; height: 32px; }
  .preview-browser__spacer { display: none; }
  .preview-browser__body { padding: spacing(md); }
  .preview-source__meta,
  .preview-icon__size { display: none; }
  .preview-icons { gap: spacing(sm); }
}

@media (prefers-reduced-motion: reduce) {
  .btn--hero,
  .btn--hero::before,
  .btn-arrow {
    transition: none;
  }
}
</style>
