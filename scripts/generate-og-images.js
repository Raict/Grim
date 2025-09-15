import { createCanvas, loadImage, registerFont } from 'canvas';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dnqperiuu',
  api_key: '547162818762999',
  api_secret: 'NcGZp8HA1wQuo5hsOGTtkZBCV7k'
});

const translations = {
  en: {
    title: 'Faviconitys',
    subtitle: 'Create Professional Favicons Instantly',
    description: 'Free online favicon generator • Convert images • Generate from text • AI-powered',
    features: ['🖼️ Image Converter', '✏️ Text Generator', '🤖 AI-Powered', '📱 PWA Ready']
  },
  uk: {
    title: 'Faviconitys',
    subtitle: 'Створюйте професійні фавіконки миттєво',
    description: 'Безкоштовний онлайн генератор фавіконок • Конвертуй зображення • Генеруй з тексту • На основі ШІ',
    features: ['🖼️ Конвертер зображень', '✏️ Генератор з тексту', '🤖 На основі ШІ', '📱 PWA готовий']
  },
  ru: {
    title: 'Faviconitys',
    subtitle: 'Создавайте профессиональные фавиконки мгновенно',
    description: 'Бесплатный онлайн генератор фавиконок • Конвертируй изображения • Генерируй из текста • На основе ИИ',
    features: ['🖼️ Конвертер изображений', '✏️ Генератор из текста', '🤖 На основе ИИ', '📱 PWA готовый']
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

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1e40af'); // Blue-700
  gradient.addColorStop(0.5, '#3b82f6'); // Blue-500
  gradient.addColorStop(1, '#10b981'); // Emerald-500

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add subtle pattern overlay
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < width; i += 40) {
    for (let j = 0; j < height; j += 40) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(i, j, 2, 2);
    }
  }
  ctx.globalAlpha = 1;

  const t = translations[lang];

  // Set text properties
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw title
  ctx.font = 'bold 92px Arial, sans-serif';
  ctx.fillText(t.title, width / 2, 200);

  // Draw subtitle
  ctx.font = 'bold 42px Arial, sans-serif';
  ctx.fillText(t.subtitle, width / 2, 280);

  // Draw description
  ctx.font = '28px Arial, sans-serif';
  ctx.fillStyle = '#e5e7eb'; // Gray-200
  ctx.fillText(t.description, width / 2, 360);

  // Draw features
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.fillStyle = '#ffffff';

  const featureY = 450;
  const featureSpacing = 280;
  const startX = (width - (t.features.length - 1) * featureSpacing) / 2;

  t.features.forEach((feature, index) => {
    const x = startX + index * featureSpacing;
    ctx.fillText(feature, x, featureY);
  });

  // Add website URL
  ctx.font = '20px Arial, sans-serif';
  ctx.fillStyle = '#cbd5e1'; // Gray-300
  ctx.fillText('faviconitys.com', width / 2, 550);

  // Add favicon icon in top-right corner
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, width - 120, 40, 80, 80, 15);
  ctx.fill();

  ctx.fillStyle = '#3b82f6';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.fillText('F', width - 80, 80);

  return canvas.toBuffer('image/png');
}

async function uploadToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: 'image',
        format: 'png',
        folder: 'faviconitys'
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