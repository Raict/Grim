import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import sharp from "sharp"
import JSZip from "jszip"

export const faviconRouter = router({
  convert: publicProcedure
    .input(
      z.object({
        imageData: z.string(), // base64 encoded image
        sizes: z.array(z.number()),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Видаляємо префікс data:image/...;base64,
        const base64Data = input.imageData.split(",")[1]
        const imageBuffer = Buffer.from(base64Data, "base64")

        // Створюємо ZIP архів
        const zip = new JSZip()

        // Генеруємо зображення для кожного розміру
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

            // Визначаємо ім'я файлу
            let fileName = `favicon-${size}x${size}.png`
            if (size === 180) fileName = "apple-touch-icon.png"
            if (size === 192) fileName = "android-chrome-192x192.png"
            if (size === 512) fileName = "android-chrome-512x512.png"

            // Додаємо файл до ZIP
            zip.file(fileName, resizedBuffer)

            return {
              size,
              dataUrl,
              fileName,
            }
          }),
        )

        // Створюємо favicon.ico (використовуємо розмір 32x32 або найближчий)
        const icoSize = input.sizes.includes(32) ? 32 : input.sizes.includes(16) ? 16 : input.sizes[0]
        const icoBuffer = await sharp(imageBuffer)
          .resize(icoSize, icoSize, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png()
          .toBuffer()

        // Додаємо favicon.ico до ZIP (як PNG, оскільки sharp не підтримує ICO)
        zip.file("favicon.ico", icoBuffer)

        // Створюємо site.webmanifest
        const manifest = {
          name: "My Website",
          short_name: "Website",
          icons: [] as Array<{ src: string; sizes: string; type: string }>,
          theme_color: "#10b981",
          background_color: "#ffffff",
          display: "standalone",
        }

        // Додаємо іконки до маніфесту
        processedImages.forEach(({ size, fileName }) => {
          if (size >= 192) {
            // Тільки великі іконки для PWA
            manifest.icons.push({
              src: `/${fileName}`,
              sizes: `${size}x${size}`,
              type: "image/png",
            })
          }
        })

        // Додаємо маніфест до ZIP
        zip.file("site.webmanifest", JSON.stringify(manifest, null, 2))

        // Генеруємо ZIP файл
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
