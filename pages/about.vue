<template>
  <div class="about-page">
    <section class="section section--hero fixed-header-section" aria-labelledby="about-title">
      <div class="container">
        <div class="hero-content fixed-header-content">
          <p class="hero-eyebrow">FaviconGen</p>
          <h1 id="about-title" class="section__title">{{ $t('pages.about.title') }}</h1>
          <p class="section__subtitle">{{ $t('pages.about.subtitle') }}</p>
          <p class="section__description">{{ $t('pages.about.intro') }}</p>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="principles-title">
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
      <div class="container project-section__content">
        <div>
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
  padding: spacing(4xl) 0 spacing(3xl);
  background: radial-gradient(circle at 75% 20%, rgba(99, 102, 241, 0.16), transparent 40%);

  @include respond-to(2xl) {
    padding: spacing(6xl) 0 spacing(5xl);
  }

  @include respond-to(3xl) {
    padding: spacing(7xl) 0 spacing(6xl);
  }
}

.hero-content {
  max-width: 820px;

  @include respond-to(2xl) {
    max-width: 1120px;
  }
}

.hero-eyebrow {
  color: var(--primary);
  font-weight: font-weight(bold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section__title {
  margin: spacing(sm) 0;
}

.section__subtitle,
.section__description,
.project-section p,
.principle-card p {
  color: var(--text-secondary);
  line-height: 1.75;
}

.section-heading {
  margin-bottom: spacing(xl);
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
  border-radius: border-radius(xl);
  background: var(--bg-secondary);

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
  gap: spacing(xl);

  @include respond-to(md) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: spacing(md);
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: spacing(sm);
  padding: spacing(md) spacing(lg);
  border-radius: border-radius(lg);
  background: var(--primary);
  color: #052e2b;
  font-weight: font-weight(semibold);
  text-decoration: none;

  &:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 3px;
  }
}

.project-link--secondary {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
}
</style>
