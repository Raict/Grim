<template>
  <div class="about-page">
    <section class="section section--hero fixed-header-section" aria-labelledby="about-title">
      <div class="container">
        <div class="hero-content fixed-header-content">
          <div class="hero-copy">
            <p class="hero-eyebrow">FaviconGen</p>
            <h1 id="about-title" class="section__title">{{ $t('pages.about.title') }}</h1>
            <p class="section__subtitle">{{ $t('pages.about.subtitle') }}</p>
            <p class="section__description">{{ $t('pages.about.intro') }}</p>
          </div>

          <div class="hero-mark" aria-hidden="true">
            <DynamicLogo :size="88" canvas-class="hero-mark__logo" />
            <div class="hero-mark__text">
              <span>ICO</span>
              <span>PNG</span>
              <span>PWA</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section principles-section" aria-labelledby="principles-title">
      <div class="container">
        <h2 id="principles-title" class="section-heading">{{ $t('pages.about.principlesTitle') }}</h2>
        <div class="principles-grid">
          <article v-for="principle in principles" :key="principle.key" class="principle-card">
            <Icon :name="principle.icon" class="principle-card__icon" aria-hidden="true" />
            <h3>{{ $t(`pages.about.principles.${principle.key}.title`) }}</h3>
            <p>{{ $t(`pages.about.principles.${principle.key}.description`) }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section project-section" aria-labelledby="maintainer-title">
      <div class="container">
        <div class="project-section__content">
        <div class="project-section__copy">
          <h2 id="maintainer-title" class="section-heading">{{ $t('pages.about.maintainerTitle') }}</h2>
          <p>{{ $t('pages.about.maintainer') }}</p>
        </div>
        <div class="project-actions">
          <a href="https://github.com/Raict/Grim" target="_blank" rel="noopener noreferrer" class="project-link">
            <Icon name="lucide:github" aria-hidden="true" />
            {{ $t('pages.about.github') }}
          </a>
          <a href="https://ko-fi.com/serhieie" target="_blank" rel="noopener noreferrer" class="project-link project-link--secondary">
            <Icon name="lucide:coffee" aria-hidden="true" />
            {{ $t('pages.about.support') }}
          </a>
        </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n({ useScope: 'global' })
const localePath = useLocalePath()
const route = useRoute()
const siteUrl = 'https://favicon-gen.com'
const pageUrl = computed(() => `${siteUrl}${route.path}`)
const homeUrl = computed(() => `${siteUrl}${localePath('/')}`)

const principles = [
  { key: 'privacy', icon: 'lucide:shield-check' },
  { key: 'complete', icon: 'lucide:package-check' },
  { key: 'open', icon: 'lucide:code-2' }
]

useHead(() => ({
  title: t('pages.about.seoTitle'),
  meta: [
    { name: 'description', content: t('pages.about.seoDescription') },
    { property: 'og:title', content: t('pages.about.seoTitle') },
    { property: 'og:description', content: t('pages.about.seoDescription') },
    { name: 'twitter:title', content: t('pages.about.seoTitle') },
    { name: 'twitter:description', content: t('pages.about.seoDescription') }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': `${pageUrl.value}#about`,
        url: pageUrl.value,
        name: t('pages.about.title'),
        description: t('pages.about.seoDescription'),
        inLanguage: locale.value === 'uk' ? 'uk-UA' : 'en-US',
        mainEntity: { '@id': `${siteUrl}/#organization` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('nav.home'), item: homeUrl.value },
            { '@type': 'ListItem', position: 2, name: t('pages.about.title'), item: pageUrl.value }
          ]
        }
      })
    }
  ]
}))
</script>

<style lang="scss" scoped>
.about-page {
  color: var(--text-primary);
}

.section--hero {
  overflow: hidden;
  padding: spacing(3xl) 0 spacing(2xl);
  background:
    radial-gradient(circle at 74% 28%, rgba(104, 117, 245, 0.16), transparent 34%),
    radial-gradient(circle at 24% 64%, rgba(34, 199, 201, 0.1), transparent 32%);

  @include respond-to(md) {
    padding: spacing(4xl) 0 spacing(3xl);
  }

  @include respond-to(3xl) {
    padding: spacing(5xl) 0 spacing(4xl);
  }
}

.hero-content {
  display: grid;
  align-items: center;
  gap: spacing(2xl);
  max-width: 1180px;
  margin: 0 auto;
  text-align: left;

  @include respond-to(md) {
    grid-template-columns: minmax(0, 1.35fr) minmax(240px, 0.65fr);
  }
}

.hero-copy {
  max-width: 760px;

  @include respond-to(sm-down) {
    text-align: center;
  }
}

.hero-eyebrow {
  margin-bottom: spacing(sm);
  color: var(--primary);
  font-weight: font-weight(bold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section__title {
  margin: 0 0 spacing(md);
  line-height: 1.04;
}

.section__subtitle,
.section__description,
.project-section p,
.principle-card p {
  color: var(--text-secondary);
  line-height: 1.75;
}

.section__subtitle {
  margin-bottom: spacing(md);
  color: var(--text-primary);
  font-size: font-size(xl);
  font-weight: font-weight(semibold);
}

.section__description {
  max-width: 690px;
  margin: 0;
}

.hero-mark {
  position: relative;
  display: none;
  min-height: 240px;
  align-items: center;
  justify-content: center;

  @include respond-to(md) {
    display: flex;
  }

  &::before {
    content: '';
    position: absolute;
    width: 220px;
    height: 220px;
    border: 1px solid color-mix(in srgb, var(--primary) 28%, transparent);
    border-radius: 32px;
    background:
      linear-gradient(145deg, color-mix(in srgb, var(--bg-secondary) 82%, transparent), transparent),
      radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 46%);
    box-shadow: var(--browser-frame-shadow);
    transform: rotate(7deg);
  }

  &__logo {
    position: relative;
    z-index: 1;
    box-shadow: 0 18px 44px rgba(34, 199, 201, 0.18);
  }

  &__text {
    position: absolute;
    z-index: 2;
    right: 6%;
    bottom: 12%;
    display: flex;
    gap: spacing(xs);

    span {
      padding: 5px 8px;
      color: var(--hero-chip-text);
      background: var(--hero-chip-bg);
      border: 1px solid var(--hero-chip-border);
      border-radius: border-radius(full);
      font-size: 11px;
      font-weight: font-weight(bold);
    }
  }
}

.principles-section {
  padding-top: spacing(2xl);

  @include respond-to(md) {
    padding-top: spacing(3xl);
  }
}

.section-heading {
  margin-bottom: spacing(lg);
  font-size: font-size(2xl);
}

.principles-grid {
  display: grid;
  gap: spacing(lg);

  @include respond-to(md) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.principle-card {
  padding: spacing(xl);
  border: 1px solid var(--border);
  border-radius: border-radius(lg);
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--bg-secondary) 92%, var(--primary) 4%), var(--bg-secondary));
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.08);

  h3 {
    margin: spacing(md) 0 spacing(sm);
  }
}

.principle-card__icon {
  width: 32px;
  height: 32px;
  color: var(--primary);
}

.project-section__content {
  display: grid;
  gap: spacing(lg);
  padding: spacing(xl);
  border: 1px solid var(--border);
  border-radius: border-radius(lg);
  background:
    radial-gradient(circle at 92% 12%, color-mix(in srgb, var(--primary) 15%, transparent), transparent 34%),
    var(--bg-secondary);

  @include respond-to(md) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}

.project-section__copy {
  max-width: 780px;

  .section-heading {
    margin-bottom: spacing(sm);
  }

  p {
    margin: 0;
  }
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: spacing(md);
  justify-content: flex-start;

  @include respond-to(md) {
    justify-content: flex-end;
  }
}

.project-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: spacing(sm);
  min-height: 48px;
  padding: spacing(md) spacing(lg);
  border-radius: border-radius(lg);
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #041524;
  font-weight: font-weight(semibold);
  text-decoration: none;
  box-shadow: 0 14px 34px rgba(34, 199, 201, 0.16);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 42px rgba(34, 199, 201, 0.22);
  }

  &:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 3px;
  }
}

.project-link--secondary {
  background: color-mix(in srgb, var(--bg-secondary) 84%, var(--bg-primary) 16%);
  border: 1px solid var(--border);
  color: var(--text-primary);
  box-shadow: none;
}
</style>
