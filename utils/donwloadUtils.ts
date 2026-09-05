// utils/downloadUtils.ts
import JSZip from 'jszip'

// Base file download function
export const downloadFile = (data: string | Blob, fileName: string, mimeType: string = 'application/octet-stream') => {
  const blob = typeof data === 'string' ? new Blob([data], { type: mimeType }) : data
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 0)
}

// Download a ZIP archive
export const downloadZipFile = async (base64Zip: string, fileName: string = 'favicons.zip') => {
  try {
    const binary = atob(base64Zip.split(',')[1])
    const array = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i)
    }
    const zipBlob = new Blob([array], { type: 'application/zip' })
    downloadFile(zipBlob, fileName, 'application/zip')
  } catch (error) {
    console.error('Failed to download ZIP file:', error)
    throw new Error('Invalid ZIP data')
  }
}

// Download multiple files
export const downloadMultipleFiles = (files: { data: string | Blob; fileName: string; mimeType?: string }[]) => {
  files.forEach(({ data, fileName, mimeType }) => {
    downloadFile(data, fileName, mimeType)
  })
}

// Download a JSON file
export const downloadJsonFile = (data: object, fileName: string = 'data.json') => {
  const json = JSON.stringify(data, null, 2)
  downloadFile(json, fileName, 'application/json')
}

// Copy text to the clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}
