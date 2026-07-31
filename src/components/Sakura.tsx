"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Gently falling petals, drifting side to side as they fall.
// Used behind the Gallery / Timeline sections for extra atmosphere.
export default function Sakura({ count = 12 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 10,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 10,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 rounded-full bg-blush-400/70"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            borderRadius: "60% 40% 60% 40%",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, 30, -20, 15, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
