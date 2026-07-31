"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import { HiddenStarMessage } from "@/lib/types";

interface Props {
  stars: HiddenStarMessage[];
}

// Interactive stars scattered across a night sky. Tapping one reveals
// a hidden message. Background is filled with extra decorative,
// non-interactive twinkling stars for depth.
export default function StarNight({ stars }: Props) {
  const [active, setActive] = useState<HiddenStarMessage | null>(null);

  const bgStars = useMemo(
    () =>
      Array.from({ length: 70 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
      })),
    []
  );

  // Deterministic scatter positions for the interactive stars.
  const positions = useMemo(
    () =>
      stars.map((_, i) => ({
        top: 15 + ((i * 53) % 65),
        left: 8 + ((i * 37) % 84),
      })),
    [stars]
  );

  return (
    <div className="relative mx-auto h-[70vh] max-w-5xl overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 to-midnight-800" />

      {bgStars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-cream animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {stars.map((s, i) => (
        <motion.button
          key={s.id}
          onClick={() => setActive(s)}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ scale: 1.4 }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${positions[i].top}%`, left: `${positions[i].left}%` }}
          aria-label="Reveal hidden message"
        >
          <Star
            className="h-6 w-6 text-gold-300 drop-shadow-[0_0_8px_rgba(244,199,122,0.8)] sm:h-8 sm:w-8"
            fill="currentColor"
          />
        </motion.button>
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-6 text-center font-body text-xs text-cream/40">
        Tap a star to reveal a secret
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-midnight-950/85 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative max-w-sm rounded-2xl p-8 text-center"
            >
              <button
                className="absolute right-4 top-4 text-cream/60 hover:text-cream"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <Star className="mx-auto mb-4 h-7 w-7 text-gold-300" fill="currentColor" />
              <p className="font-display text-lg italic text-cream/90">{active.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
