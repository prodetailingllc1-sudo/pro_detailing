import { rmSync } from 'node:fs';
import { resolve, sep } from 'node:path';

const clientRoot = resolve(process.cwd(), 'dist', 'client');
const originalAssetCopies = [
  'assets/pro-detailing-wordmark.png',
  'brand/pro-ceramic.png',
  'brand/pro-detailing.png',
  'brand/pro-ppf.png',
  'brand/pro-tints.png',
  'c63/IMG_0437.jpeg',
  'c63/IMG_0558.jpeg',
  'c63/IMG_2082.jpeg',
  'c63/IMG_4159.jpeg',
  'c63/IMG_5126.jpeg',
  'c63/IMG_9260.jpeg',
  'vehicles/coupe.png',
  'vehicles/sedan.png',
  'vehicles/suv.png',
  'vehicles/tesla.png',
  'vehicles/truck.png',
  'vehicles/van.png',
];

for (const relativePath of originalAssetCopies) {
  const assetPath = resolve(clientRoot, relativePath);
  if (!assetPath.startsWith(`${clientRoot}${sep}`)) {
    throw new Error(`Refusing to prune outside the build client: ${assetPath}`);
  }
  rmSync(assetPath, { force: true });
}

console.log(
  `Removed ${originalAssetCopies.length} unused original asset copies from the production build.`,
);
