"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

// Soft glowing dots that wander slowly, giving the Memory Garden
// section a dusk-lit, magical feel.
export default function Fireflies({ count = 18 }: { count?: number }) {
  const flies = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 4,
        duration: 6 + Math.random() * 6,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flies.map((f) => (
        <motion.span
          key={f.id}
          className="absolute rounded-full bg-gold-300"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            boxShadow: "0 0 8px 2px rgba(244,199,122,0.8)",
          }}
          animate={{
            x: [0, 20, -15, 10, 0],
            y: [0, -25, 10, -10, 0],
            opacity: [0.2, 1, 0.4, 0.9, 0.2],
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
