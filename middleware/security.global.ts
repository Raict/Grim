// Global security middleware
export default defineNuxtRouteMiddleware((to) => {
  // Client-side security checks
  if (typeof window !== 'undefined') {
    // Disable right-click context menu on production
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
      })
    }

    // Disable certain key combinations
    document.addEventListener('keydown', (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+U in production
      if (process.env.NODE_ENV === 'production') {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'u')
        ) {
          e.preventDefault()
        }
      }
    })

    // Basic bot detection
    const userAgent = navigator.userAgent.toLowerCase()
    const suspiciousPatterns = [
      'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget'
    ]

    if (suspiciousPatterns.some(pattern => userAgent.includes(pattern))) {
      console.warn('Potential bot detected')
    }

    // Memory monitoring for large file processing
    if ('memory' in performance) {
      const memory = (performance as any).memory
      if (memory.usedJSHeapSize > 100 * 1024 * 1024) { // 100MB
        console.warn('High memory usage detected')
      }
    }
  }
})