// Global security middleware
export default defineNuxtRouteMiddleware((to) => {
  // Client-side monitoring and copyright
  if (typeof window !== 'undefined') {
    // Display copyright notice in console
    if (process.env.NODE_ENV === 'production') {
      console.log(
        '%c🎨 FaviconGen - Professional Favicon Generator',
        'color: #10b981; font-size: 16px; font-weight: bold;'
      )
      console.log(
        '%c© 2024 FaviconGen. Built with ❤️ using Nuxt 3 & Vue 3',
        'color: #6b7280; font-size: 12px;'
      )
      console.log(
        '%cWe appreciate developers who respect intellectual property! 🤝',
        'color: #059669; font-size: 12px;'
      )
    }

    // Basic monitoring (silent)
    const userAgent = navigator.userAgent.toLowerCase()
    const suspiciousPatterns = [
      'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget'
    ]

    // Memory monitoring for large file processing
    if ('memory' in performance) {
      const memory = (performance as any).memory
      if (memory.usedJSHeapSize > 150 * 1024 * 1024) { // 150MB
        console.warn('⚠️ High memory usage detected. Consider optimizing your images.')
      }
    }
  }
})