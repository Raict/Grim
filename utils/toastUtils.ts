// utils/toastUtils.ts
import { ref, computed } from 'vue'

interface Toast {
  id: number
  title: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const useToast = () => {
  const toasts = ref<Toast[]>([])
  let toastId = 0

  const add = (options: { title: string; type?: Toast['type']; duration?: number }) => {
    const { title, type = 'info', duration = 3000 } = options
    const id = toastId++

    // Додаємо тост
    toasts.value.push({ id, title, type, duration })

    // Тимчасова реалізація з браузерними сповіщеннями
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: type.charAt(0).toUpperCase() + type.slice(1),
        icon: `/favicon-${type}.png` // Припускаємо, що у вас є іконки для кожного типу
      })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, {
            body: type.charAt(0).toUpperCase() + type.slice(1),
            icon: `/favicon-${type}.png`
          })
        }
      })
    }

    // Автоматичне видалення через вказаний час
    setTimeout(() => {
      remove(id)
    }, duration)
  }

  const remove = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  return {
    toasts: computed(() => toasts.value),
    add,
    remove,
    success: (title: string, duration?: number) => add({ title, type: 'success', duration }),
    error: (title: string, duration?: number) => add({ title, type: 'error', duration }),
    warning: (title: string, duration?: number) => add({ title, type: 'warning', duration }),
    info: (title: string, duration?: number) => add({ title, type: 'info', duration })
  }
}