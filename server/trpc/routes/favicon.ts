import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import sharp from "sharp"
import JSZip from "jszip"
import pngToIco from "png-to-ico"

// Server-side file validation
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_DIMENSION = 4096 // Maximum width/height
const ALLOWED_SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512]

// Validate image buffer using Sharp metadata
async function validateImageBuffer(buffer: Buffer): Promise<{ isValid: boolean; error?: string }> {
  try {
    const metadata = await sharp(buffer).metadata()

    if (!metadata.width || !metadata.height) {
      return { isValid: false, error: 'Invalid image: missing dimensions' }
    }

    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
      return { isValid: false, error: `Image too large. Maximum dimension is ${MAX_DIMENSION}px` }
    }

    // Check for suspicious metadata
    if (metadata.density && metadata.density > 1000) {
      return { isValid: false, error: 'Suspicious image density' }
    }

    return { isValid: true }
  } catch (error) {
    return { isValid: false, error: 'Invalid or corrupted image file' }
  }
}

export const faviconRouter = router({
  convert: publicProcedure
    .input(
      z.object({
        imageData: z.string().max(MAX_FILE_SIZE * 1.5), // Base64 is ~33% larger
        sizes: z.array(z.number().int().min(16).max(512)).max(10), // Limit array size
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Validate sizes against allowed values
        const invalidSizes = input.sizes.filter(size => !ALLOWED_SIZES.includes(size))
        if (invalidSizes.length > 0) {
          throw new Error(`Invalid sizes: ${invalidSizes.join(', ')}`)
        }

        // Validate and decode base64
        if (!input.imageData.startsWith('data:image/')) {
          throw new Error('Invalid image data format')
        }

        const base64Data = input.imageData.split(",")[1]
        if (!base64Data) {
          throw new Error('Missing image data')
        }

        const imageBuffer = Buffer.from(base64Data, "base64")

        // Validate buffer size
        if (imageBuffer.length > MAX_FILE_SIZE) {
          throw new Error('File too large')
        }

        // Validate image using Sharp
        const validation = await validateImageBuffer(imageBuffer)
        if (!validation.isValid) {
          throw new Error(validation.error)
        }

        // Створюємо ZIP архів
        const zip = new JSZip()

        const processedImages = await Promise.all(
          input.sizes.map(async (size) => {
            const resizedBuffer = await sharp(imageBuffer)
              .resize(size, size, {
                fit: "contain",
                background: { r: 0, g: 0, b: 0, alpha: 0 },
              })
              .png()
              .toBuffer()

            const dataUrl = `data:image/png;base64,${resizedBuffer.toString("base64")}`

            let fileName = `favicon-${size}x${size}.png`
            if (size === 180) fileName = "apple-touch-icon.png"
            if (size === 192) fileName = "android-chrome-192x192.png"
            if (size === 512) fileName = "android-chrome-512x512.png"

            zip.file(fileName, resizedBuffer)

            return {
              size,
              dataUrl,
              fileName,
            }
          }),
        )

        // Генеруємо справжній ICO файл
        const icoSizes = [16, 32].filter(size => input.sizes.includes(size))
        if (icoSizes.length === 0) {
          icoSizes.push(input.sizes.includes(16) ? 16 : 32)
        }

        const icoPngBuffers = await Promise.all(
          icoSizes.map(async (size) => {
            return await sharp(imageBuffer)
              .resize(size, size, {
                fit: "contain",
                background: { r: 0, g: 0, b: 0, alpha: 0 },
              })
              .png()
              .toBuffer()
          })
        )

        const icoBuffer = await pngToIco(icoPngBuffers)
        zip.file("favicon.ico", icoBuffer)

        const manifest = {
          name: "My Website",
          short_name: "Website",
          icons: [] as Array<{ src: string; sizes: string; type: string }>,
          theme_color: "#10b981",
          background_color: "#ffffff",
          display: "standalone",
        }

        processedImages.forEach(({ size, fileName }) => {
          if (size >= 192) {
            manifest.icons.push({
              src: `/${fileName}`,
              sizes: `${size}x${size}`,
              type: "image/png",
            })
          }
        })

        zip.file("site.webmanifest", JSON.stringify(manifest, null, 2))

        const zipBuffer = await zip.generateAsync({ type: "nodebuffer" })
        const zipBase64 = zipBuffer.toString("base64")

        return {
          zipData: `data:application/zip;base64,${zipBase64}`,
          images: processedImages,
          manifest,
        }
      } catch (error) {
        console.error("Error processing image:", error)
        throw new Error("Failed to process image")
      }
    }),
})
