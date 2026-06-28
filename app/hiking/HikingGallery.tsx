"use client";

import type { GalleryImageConfig } from "@/lib/gallery";

type HikingGalleryProps = {
  images: GalleryImageConfig[];
  error?: boolean;
};

export default function HikingGallery({ images, error }: HikingGalleryProps) {
  if (error) {
    return (
      <p className="py-10 text-sm text-[color:var(--text-muted)]">
        Could not load hikes right now. Try again later.
      </p>
    );
  }

  if (!images.length) {
    return (
      <p className="py-10 text-sm text-[color:var(--text-muted)]">
        No hikes yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {images.map((image) => {
        const caption = image.location?.displayText || image.alt;

        return (
          <figure key={image.id} className="space-y-2">
            <img
              src={image.thumbnail}
              alt={image.alt}
              loading="lazy"
              className="aspect-[4/3] w-full border border-zinc-800 object-cover grayscale transition duration-300 hover:grayscale-0"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <figcaption className="text-[10px] uppercase tracking-[0.12em] text-[color:var(--text-muted)] font-mono">
              {caption}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
