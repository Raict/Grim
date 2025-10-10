export default defineEventHandler(async (event) => {
  const baseURL = 'https://favicon-gen.com'
  const languages = ['uk', 'en']
  const pages = [
    '',
    '/favicons',
    '/favicons-text',
    '/faq',
    '/privacy',
    '/terms'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${languages.map(lang => {
  return pages.map(page => {
    const url = lang === 'uk' ? `${baseURL}${page}` : `${baseURL}/${lang}${page}`
    const alternateUrls = languages.map(altLang => {
      const altUrl = altLang === 'uk' ? `${baseURL}${page}` : `${baseURL}/${altLang}${page}`
      return `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`
    }).join('\n')

    const priority = page === '' ? '1.0' :
                    page === '/favicons' || page === '/favicons-text' ? '0.9' :
                    page === '/faq' ? '0.7' : '0.6'
    const changefreq = page === '' ? 'daily' :
                      page === '/faq' ? 'monthly' :
                      page === '/privacy' || page === '/terms' ? 'yearly' : 'weekly'

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternateUrls}
  </url>`
  }).join('\n')
}).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})