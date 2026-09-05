export interface AppToastInput {
  title: string
  color?: string
  type?: string
}

export interface AppToast extends AppToastInput {
  id: number
  tone: 'success' | 'error' | 'info'
}

export const useAppToast = () => {
  const toasts = useState<AppToast[]>('app-toasts', () => [])

  const remove = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  const add = (input: AppToastInput) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    const tone = input.color === 'error' || input.type === 'background'
      ? 'error'
      : input.color === 'success' || input.type === 'foreground'
        ? 'success'
        : 'info'

    toasts.value.push({ ...input, id, tone })
    if (import.meta.client) {
      window.setTimeout(() => remove(id), 4500)
    }
  }

  return { toasts, add, remove }
}
