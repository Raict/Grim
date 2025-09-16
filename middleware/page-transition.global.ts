export default defineNuxtRouteMiddleware((to, from) => {
  if (typeof window === 'undefined') return

  // Page order for determining navigation direction
  const pageOrder = [
    '/',
    '/en',
    '/favicons',
    '/en/favicons',
    '/favicons-text',
    '/en/favicons-text',
    '/faq',
    '/en/faq'
  ]

  const fromIndex = pageOrder.indexOf(from.path)
  const toIndex = pageOrder.indexOf(to.path)

  let direction = 'right'

  if (fromIndex !== -1 && toIndex !== -1) {
    direction = toIndex > fromIndex ? 'right' : 'left'
  }

  // Update CSS classes for transition direction
  const htmlElement = document.documentElement
  const bodyElement = document.body

  htmlElement.style.setProperty('--transition-direction', direction)

  // Add direction class for CSS transitions
  htmlElement.classList.remove('nav-left', 'nav-right')
  htmlElement.classList.add(`nav-${direction}`)

  // Lock scroll and disable animations during transition
  bodyElement.classList.add('page-transitioning')
  htmlElement.classList.add('page-transitioning')

  // Store current scroll position to restore after transition
  const scrollY = window.scrollY

  // Re-enable after transition completes
  setTimeout(() => {
    bodyElement.classList.remove('page-transitioning')
    htmlElement.classList.remove('page-transitioning')

    // Restore scroll position if needed
    if (window.scrollY !== scrollY) {
      window.scrollTo(0, 0) // Reset to top for new page
    }
  }, 450) // Just before transition ends (400ms)
})