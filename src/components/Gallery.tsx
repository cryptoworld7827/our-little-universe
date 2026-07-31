"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { GalleryPhoto } from "@/lib/types";

interface Props {
  photos: GalleryPhoto[];
}

// A scattered polaroid wall. Each photo tilts slightly at random,
// straightens and lifts on hover, and opens a full lightbox on click.
export default function Gallery({ photos }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const rotations = photos.map((_, i) => ((i * 37) % 11) - 5); // deterministic pseudo-random tilt

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:grid-cols-3 md:grid-cols-4">
      {photos.map((photo, i) => (
        <motion.button
          key={photo.id}
          onClick={() => setActiveIndex(i)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
          whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
          style={{ rotate: rotations[i] }}
          className="relative aspect-[4/5] rounded-sm bg-cream p-2 pb-6 shadow-xl transition-shadow hover:shadow-2xl"
        >
          <div className="relative h-full w-full overflow-hidden bg-midnight-800">
            {photo.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo.image} alt={photo.caption || "memory"} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-midnight-700/50">
                <ImageOff className="h-8 w-8" />
                <span className="text-[10px] text-midnight-700/60">Add a photo in /admin</span>
              </div>
            )}
          </div>
          {photo.caption && (
            <p className="absolute bottom-1 left-0 w-full truncate px-2 text-center font-display text-[11px] italic text-midnight-900/80">
              {photo.caption}
            </p>
          )}
        </motion.button>
      ))}

      <AnimatePresence>
        {activeIndex !== null && photos[activeIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950/95 p-6"
            onClick={() => setActiveIndex(null)}
          >
            <button
              className="absolute right-6 top-6 text-cream/70 hover:text-cream"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
            >
              <X className="h-7 w-7" />
            </button>

            {activeIndex > 0 && (
              <button
                className="absolute left-4 text-cream/60 hover:text-cream sm:left-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((idx) => (idx !== null ? idx - 1 : idx));
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-9 w-9" />
              </button>
            )}
            {activeIndex < photos.length - 1 && (
              <button
                className="absolute right-4 text-cream/60 hover:text-cream sm:right-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((idx) => (idx !== null ? idx + 1 : idx));
                }}
                aria-label="Next photo"
              >
                <ChevronRight className="h-9 w-9" />
              </button>
            )}

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-2xl rounded-md bg-cream p-3 pb-8 shadow-2xl"
            >
              {photos[activeIndex].image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photos[activeIndex].image}
                  alt={photos[activeIndex].caption || "memory"}
                  className="max-h-[65vh] w-full rounded-sm object-contain"
                />
              ) : (
                <div className="flex h-64 w-80 items-center justify-center text-midnight-700/50">
                  No photo uploaded yet
                </div>
              )}
              {photos[activeIndex].caption && (
                <p className="mt-3 text-center font-display italic text-midnight-900/80">
                  {photos[activeIndex].caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
