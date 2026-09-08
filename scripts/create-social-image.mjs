import sharp from 'sharp';

const canvas = { width: 1200, height: 630 };
const source = 'public/generated/ppf-finished-clear-v2.webp';
const logo = await sharp('public/assets/pro-detailing-wordmark-optimized.webp')
  .resize({ width: 660, withoutEnlargement: true })
  .png()
  .toBuffer();

const overlay = Buffer.from(`
  <svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#050706" stop-opacity="0.98"/>
        <stop offset="0.5" stop-color="#050706" stop-opacity="0.70"/>
        <stop offset="1" stop-color="#050706" stop-opacity="0.10"/>
      </linearGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.55" stop-color="#050706" stop-opacity="0"/>
        <stop offset="1" stop-color="#050706" stop-opacity="0.94"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <rect width="1200" height="630" fill="url(#floor)"/>
    <rect x="58" y="504" width="56" height="3" fill="#9cf500"/>
    <text x="130" y="512" fill="#f4f7f4" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3">MANASSAS · NORTHERN VIRGINIA</text>
    <text x="58" y="559" fill="#9cf500" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3">TINT · CERAMIC · PPF · DETAILING · VEHICLE CARE</text>
  </svg>
`);

const image = sharp(source)
  .resize(canvas.width, canvas.height, { fit: 'cover', position: 'centre' })
  .modulate({ brightness: 0.78, saturation: 0.88 })
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: 58, top: 382 },
  ])
  .jpeg({ quality: 88, progressive: true, mozjpeg: true });

await image.clone().toFile('app/opengraph-image.jpg');
await image.toFile('app/twitter-image.jpg');
