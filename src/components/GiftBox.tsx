"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift } from "lucide-react";

interface Props {
  title: string;
  message: string;
}

export default function GiftBox({ title, message }: Props) {
  const [opened, setOpened] = useState(false);

  function handleOpen() {
    setOpened(true);
    const colors = ["#FF6FA5", "#F4C77A", "#FF9FC0", "#F8F5F0"];
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="box"
            onClick={handleOpen}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl accent-gradient shadow-2xl sm:h-40 sm:w-40">
              <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-cream/40" />
              <div className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-cream/40" />
              <Gift className="h-12 w-12 text-midnight-900 sm:h-16 sm:w-16" />
            </div>
            <span className="font-body text-sm tracking-wide text-cream/70">
              Tap to open your gift
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="glass rounded-2xl p-8 sm:p-12"
          >
            <h3 className="font-display text-2xl italic accent-gradient-text sm:text-3xl">
              {title}
            </h3>
            <p className="mt-5 font-body text-base leading-relaxed text-cream/85 sm:text-lg">
              {message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
