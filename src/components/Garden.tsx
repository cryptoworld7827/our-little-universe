"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerMemory } from "@/lib/types";
import { X } from "lucide-react";
import Fireflies from "./Fireflies";

interface Props {
  flowers: FlowerMemory[];
}

const PETAL_COLORS = ["var(--accent)", "var(--accent2)", "#FF9FC0", "#F6DFA6"];

function Flower({ index, onClick }: { index: number; onClick: () => void }) {
  const color = PETAL_COLORS[index % PETAL_COLORS.length];
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "backOut" }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28"
    >
      {/* petals */}
      {[0, 1, 2, 3, 4].map((p) => (
        <span
          key={p}
          className="absolute h-10 w-6 rounded-full opacity-90 transition-transform group-hover:scale-110 sm:h-12 sm:w-7"
          style={{
            background: color,
            transform: `rotate(${p * 72}deg) translateY(-14px)`,
          }}
        />
      ))}
      {/* center */}
      <span className="relative z-10 h-6 w-6 rounded-full bg-gold-300 shadow-md sm:h-7 sm:w-7" />
    </motion.button>
  );
}

export default function Garden({ flowers }: Props) {
  const [active, setActive] = useState<FlowerMemory | null>(null);

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-12">
      <div className="absolute inset-0 -z-0">
        <Fireflies />
      </div>
      <div className="relative z-10 flex flex-wrap items-end justify-center gap-6 sm:gap-10">
        {flowers.map((f, i) => (
          <div key={f.id} className="flex flex-col items-center gap-2">
            <Flower index={i} onClick={() => setActive(f)} />
            <span className="max-w-[7rem] truncate text-center font-body text-xs text-cream/50">
              {f.title}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950/90 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass relative max-w-md rounded-2xl p-8 text-center"
            >
              <button
                className="absolute right-4 top-4 text-cream/60 hover:text-cream"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="font-display text-2xl italic text-accent">{active.title}</h3>
              <p className="mt-4 font-body text-cream/85">{active.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
