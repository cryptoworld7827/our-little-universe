"use client";

import { useMemo } from "react";
import { Heart } from "lucide-react";

// A soft field of hearts drifting upward, used as ambient background
// texture behind several sections. Pure CSS animation (see tailwind
// "driftUp" keyframes) so it never fights the scroll performance.
export default function FloatingHearts({ count = 14 }: { count?: number }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 animate-driftUp text-blush-500"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            opacity: h.opacity,
          }}
        >
          <Heart size={h.size} fill="currentColor" strokeWidth={0} />
        </span>
      ))}
    </div>
  );
}
