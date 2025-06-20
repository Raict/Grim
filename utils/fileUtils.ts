

// Конвертує файл у base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

// Валідує зображення (перевіряє тип і розмір)
export const validateImageFile = (file: File, options: { maxSizeMB?: number; allowedTypes?: string[] } = {}): { isValid: boolean; error?: string } => {
  const { maxSizeMB = 5, allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'] } = options

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Unsupported file type. Allowed: PNG, JPEG, GIF, WebP' }
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    return { isValid: false, error: `File size exceeds ${maxSizeMB}MB` }
  }

  return { isValid: true }
}

// Форматує розмір файлу в зручний формат (KB, MB)
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 KB'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
}

// Отримує розміри зображення
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

// Створює прев'ю зображення
export const createImagePreview = async (file: File, options: { maxWidth?: number; maxHeight?: number } = {}): Promise<string> => {
  const { maxWidth = 300, maxHeight = 300 } = options
  const img = new Image()
  img.src = await fileToBase64(file)

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let { width, height } = img

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width = width * ratio
        height = height * ratio
      }

      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Failed to get canvas context'))

      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => reject(new Error('Failed to load image for preview'))
  })
}