import { GalleryClient } from '@/components/site/GalleryClient';
import { createPageMetadata } from '@/lib/metadata';
import { galleryItems } from '@/lib/site-data';

export const metadata = createPageMetadata({
  title: 'Vehicle Gallery Manassas, VA | PRO Detailing',
  description:
    "Browse PRO Detailing's vehicle photo gallery, including cars, SUVs, trucks and performance vehicles. Explore our Manassas services or request a quote.",
  keywords: [
    'premium auto detailing gallery',
    'auto detailing Manassas VA',
    'car detailing Manassas',
    'Northern Virginia auto detailing',
    'PRO Detailing gallery',
  ],
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <main
      id="main-content"
      className="gallery-page min-h-[100svh] bg-background text-foreground"
    >
      <header className="gallery-page-header mx-auto max-w-[96rem] px-5 pt-20 pb-12 sm:px-8 sm:pt-28 sm:pb-16 lg:px-12">
        <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          PRO Detailing · Manassas, Virginia
        </p>
        <h1 className="max-w-5xl text-balance text-4xl font-bold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
          PRO Detailing Vehicle Gallery
        </h1>
        <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          Cars, SUVs, trucks and performance vehicles from the current PRO
          Detailing and owner-provided photo library, plus clearly labeled
          interior service visualizations. Captions do not assign an unverified
          service to a customer vehicle.
        </p>
      </header>

      <GalleryClient items={galleryItems} />
    </main>
  );
}
