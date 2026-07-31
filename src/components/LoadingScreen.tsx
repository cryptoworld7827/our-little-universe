"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  tagline: string;
  onBegin: () => void;
}

// The very first thing a visitor sees: a night sky, a moon, and a
// typewriter-style tagline, ending with the "Begin Our Story" button.
export default function LoadingScreen({ tagline, onBegin }: Props) {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
      })),
    []
  );

  useEffect(() => {
    setTyped("");
    setDone(false);
    let i = 0;
    const text = tagline || "";
    const interval = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [tagline]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-800"
    >
      {/* Stars */}
      {stars.map((s) => (
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

      {/* Moon */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative mb-10 h-24 w-24 rounded-full sm:h-32 sm:w-32"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #FFFDF6 0%, #F4C77A 55%, #E3AC4F 100%)",
          boxShadow: "0 0 60px 15px rgba(244,199,122,0.35)",
        }}
      >
        <div className="absolute left-6 top-8 h-3 w-3 rounded-full bg-black/10" />
        <div className="absolute right-8 top-14 h-2 w-2 rounded-full bg-black/10" />
        <div className="absolute left-10 top-16 h-4 w-4 rounded-full bg-black/10" />
      </motion.div>

      <h1 className="px-6 text-center font-display text-2xl italic tracking-wide text-cream sm:text-3xl md:text-4xl">
        Our Little Universe <span className="not-italic">❤️</span>
      </h1>

      <p className="mt-6 h-14 max-w-md px-8 text-center font-body text-sm text-cream/70 sm:text-base">
        {typed}
        <span className="animate-pulse">|</span>
      </p>

      <AnimatePresence>
        {done && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBegin}
            className="mt-8 rounded-full px-8 py-3 font-body text-sm font-medium tracking-wide text-midnight-900 shadow-lg accent-gradient sm:text-base"
          >
            Begin Our Story ❤️
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
