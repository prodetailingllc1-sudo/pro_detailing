'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import type { GalleryItem } from '@/lib/site-data';

const PAGE_SIZE = 12;
const SWIPE_THRESHOLD = 56;

type GalleryClientProps = {
  items: readonly GalleryItem[];
};

export function GalleryClient({ items }: GalleryClientProps) {
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(PAGE_SIZE, items.length),
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  const activeItem =
    selectedIndex === null ? null : (items[selectedIndex] ?? null);
  const visibleItems = items.slice(0, visibleCount);
  const remainingCount = Math.max(items.length - visibleCount, 0);

  const showPrevious = useCallback(() => {
    setSelectedIndex((index) => {
      if (index === null || items.length < 2) return index;
      return (index - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((index) => {
      if (index === null || items.length < 2) return index;
      return (index + 1) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showNext, showPrevious]);

  const openImage = (index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setSelectedIndex(index);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) return;

    setSelectedIndex(null);
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    if (!touch) return;

    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const start = swipeStartRef.current;
    const touch = event.changedTouches[0];
    swipeStartRef.current = null;

    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD ||
      Math.abs(deltaX) <= Math.abs(deltaY) * 1.2
    ) {
      return;
    }

    if (deltaX < 0) showNext();
    else showPrevious();
  };

  if (items.length === 0) {
    return (
      <section className="gallery-empty mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">
        <p className="rounded-2xl border border-border bg-card p-8 text-muted-foreground">
          Gallery photographs are being prepared.
        </p>
      </section>
    );
  }

  return (
    <section
      className="gallery-section mx-auto max-w-[96rem] px-5 pb-24 sm:px-8 lg:px-12"
      aria-labelledby="gallery-heading"
    >
      <div className="gallery-toolbar mb-8 flex flex-col gap-3 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="gallery-heading"
          className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Selected work &amp; service visuals
        </h2>
        <p
          className="text-sm text-muted-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {visibleItems.length} of {items.length} images
        </p>
      </div>

      <div
        id="vehicle-gallery"
        className="gallery-grid columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
      >
        {visibleItems.map((item, index) => {
          const captionId = `gallery-caption-${item.id}`;

          return (
            <figure
              key={item.id}
              className="gallery-card mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card"
            >
              <button
                type="button"
                className="gallery-card-trigger group relative block w-full cursor-zoom-in overflow-hidden bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-label={`Open image ${index + 1} of ${items.length}`}
                aria-describedby={captionId}
                onClick={(event) => openImage(index, event.currentTarget)}
              >
                <Image
                  className="gallery-card-image h-auto w-full transition duration-500 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025] motion-reduce:transition-none"
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  loading={index < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span
                  className="gallery-card-expand absolute right-3 bottom-3 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  <Expand size={17} strokeWidth={1.75} />
                </span>
              </button>
              <figcaption
                id={captionId}
                className="gallery-card-caption px-4 py-3 text-sm leading-6 text-muted-foreground"
              >
                {item.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {remainingCount > 0 && (
        <div className="gallery-load-more mt-10 flex justify-center">
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/50 bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(156,245,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-reduce:transform-none motion-reduce:transition-none"
            aria-controls="vehicle-gallery"
            onClick={() =>
              setVisibleCount((count) =>
                Math.min(count + PAGE_SIZE, items.length),
              )
            }
          >
            Load {Math.min(PAGE_SIZE, remainingCount)} more
          </button>
        </div>
      )}

      <Dialog open={activeItem !== null} onOpenChange={handleOpenChange}>
        {activeItem && selectedIndex !== null && (
          <DialogContent
            className="gallery-lightbox max-h-[calc(100svh-1rem)] w-[calc(100vw-1rem)] max-w-none overflow-hidden border-white/15 bg-black/95 p-0 text-white shadow-2xl ring-white/10 sm:max-w-[min(96vw,96rem)]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <DialogTitle className="sr-only">
              Gallery image: {activeItem.caption}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Image {selectedIndex + 1} of {items.length}. Use the previous and
              next buttons, the left and right arrow keys, or swipe
              horizontally.
            </DialogDescription>

            <figure className="gallery-lightbox-figure flex min-h-0 flex-col">
              <div className="gallery-lightbox-media flex min-h-0 items-center justify-center px-4 pt-12 sm:px-20 sm:pt-8">
                <Image
                  key={activeItem.id}
                  className="max-h-[calc(100svh-8.5rem)] max-w-full select-none object-contain"
                  src={activeItem.src}
                  alt={activeItem.alt}
                  width={activeItem.width}
                  height={activeItem.height}
                  sizes="96vw"
                  decoding="async"
                  draggable={false}
                />
              </div>

              <figcaption className="gallery-lightbox-caption flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4 text-sm sm:px-8">
                <span className="text-white/75">{activeItem.caption}</span>
                <span
                  className="shrink-0 font-mono text-xs tracking-[0.14em] text-white/60"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {selectedIndex + 1} / {items.length}
                </span>
              </figcaption>
            </figure>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery-lightbox-previous absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:left-5 sm:size-12"
                  aria-label="Previous photograph"
                  onClick={showPrevious}
                >
                  <ChevronLeft aria-hidden="true" size={24} />
                </button>
                <button
                  type="button"
                  className="gallery-lightbox-next absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-5 sm:size-12"
                  aria-label="Next photograph"
                  onClick={showNext}
                >
                  <ChevronRight aria-hidden="true" size={24} />
                </button>
              </>
            )}
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
