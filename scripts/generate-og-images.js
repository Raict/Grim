import { createCanvas, loadImage, registerFont } from 'canvas';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dnqperiuu',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const translations = {
  en: {
    title: 'FaviconGen',
    subtitle: 'Generate Favicons for Free',
    description: 'Free online favicon generator without ads • Convert images • Create from text',
    features: ['✓ Completely Free', '✓ No Ads', '✓ Fast & Easy', '✓ Multiple Sizes']
  },
  uk: {
    title: 'FaviconGen',
    subtitle: 'Генеруй фавіконки безкоштовно',
    description: 'Безкоштовний онлайн генератор фавіконок без реклами • Конвертуй зображення • Створюй з тексту',
    features: ['✓ Повністю безкоштовно', '✓ Без реклами', '✓ Швидко і легко', '✓ Різні розміри']
  },
  ru: {
    title: 'FaviconGen',
    subtitle: 'Генерируй фавиконки бесплатно',
    description: 'Бесплатный онлайн генератор фавиконок без рекламы • Конвертируй изображения • Создавай из текста',
    features: ['✓ Полностью бесплатно', '✓ Без рекламы', '✓ Быстро и легко', '✓ Разные размеры']
  }
};

function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function generateOGImage(lang, type = 'og') {
  const width = 1200;
  const height = type === 'twitter' ? 600 : 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient using site colors
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#10b981'); // Primary emerald
  gradient.addColorStop(0.5, '#14b8a6'); // Secondary teal
  gradient.addColorStop(1, '#059669'); // Primary dark

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add subtle geometric pattern overlay
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < width; i += 60) {
    for (let j = 0; j < height; j += 60) {
      ctx.fillStyle = '#ffffff';
      roundRect(ctx, i, j, 4, 4, 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  const t = translations[lang];

  // Add main logo area with FG
  const logoSize = 120;
  const logoX = 80;
  const logoY = 60;

  // Logo background - rounded square with gradient
  const logoGradient = ctx.createLinearGradient(logoX, logoY, logoX + logoSize, logoY + logoSize);
  logoGradient.addColorStop(0, '#ffffff');
  logoGradient.addColorStop(1, '#f3f4f6');

  ctx.fillStyle = logoGradient;
  roundRect(ctx, logoX, logoY, logoSize, logoSize, 20);
  ctx.fill();

  // Logo border
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 2;
  roundRect(ctx, logoX, logoY, logoSize, logoSize, 20);
  ctx.stroke();

  // FG letters in logo
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FG', logoX + logoSize / 2, logoY + logoSize / 2);

  // Main content area
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';

  // Title
  ctx.font = 'bold 88px Arial, sans-serif';
  ctx.fillText(t.title, 250, 140);

  // Subtitle
  ctx.font = 'bold 38px Arial, sans-serif';
  ctx.fillStyle = '#f3f4f6';
  ctx.fillText(t.subtitle, 250, 200);

  // Description
  ctx.font = '26px Arial, sans-serif';
  ctx.fillStyle = '#e5e7eb';
  ctx.fillText(t.description, 80, 280);

  // Features in a grid layout
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillStyle = '#ffffff';

  const featuresPerRow = 2;
  const featureSpacingX = 280;
  const featureSpacingY = 50;
  const featuresStartX = 80;
  const featuresStartY = 350;

  t.features.forEach((feature, index) => {
    const row = Math.floor(index / featuresPerRow);
    const col = index % featuresPerRow;
    const x = featuresStartX + col * featureSpacingX;
    const y = featuresStartY + row * featureSpacingY;

    // Feature background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    roundRect(ctx, x - 10, y - 15, 260, 30, 8);
    ctx.fill();

    // Feature text
    ctx.fillStyle = '#ffffff';
    ctx.fillText(feature, x, y);
  });

  // Website URL at bottom
  ctx.font = '18px Arial, sans-serif';
  ctx.fillStyle = '#d1d5db';
  ctx.textAlign = 'center';
  ctx.fillText('favicon-gen.com', width / 2, height - 40);

  // Decorative elements
  // Add small favicon icons as decoration
  const iconSize = 24;
  const iconsY = height - 100;

  for (let i = 0; i < 5; i++) {
    const iconX = 100 + i * 100;

    // Icon background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    roundRect(ctx, iconX, iconsY, iconSize, iconSize, 4);
    ctx.fill();

    // Icon content (different sizes to represent favicon formats)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial, sans-serif';
    ctx.textAlign = 'center';
    const sizes = ['16', '32', '48', '96', '192'];
    ctx.fillText(sizes[i], iconX + iconSize/2, iconsY + iconSize/2);
  }

  return canvas.toBuffer('image/png');
}

async function uploadToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: 'image',
        format: 'png',
        folder: 'favicon-gen'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
}

async function generateAllImages() {
  const languages = ['en', 'uk', 'ru'];
  const types = ['og', 'twitter'];

  for (const lang of languages) {
    for (const type of types) {
      try {
        console.log(`Generating ${type} image for ${lang}...`);
        const buffer = await generateOGImage(lang, type);

        const publicId = `${type}-image-${lang}`;
        console.log(`Uploading ${publicId} to Cloudinary...`);

        const result = await uploadToCloudinary(buffer, publicId);
        console.log(`✅ Uploaded: ${result.secure_url}`);

        // Also save locally for backup
        const filename = `${type}-image-${lang}.png`;
        fs.writeFileSync(filename, buffer);
        console.log(`💾 Saved locally: ${filename}`);

      } catch (error) {
        console.error(`❌ Error generating ${type} image for ${lang}:`, error);
      }
    }
  }

  console.log('🎉 All images generated and uploaded successfully!');
}

generateAllImages().catch(console.error);