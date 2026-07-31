"use client";

import { motion } from "framer-motion";
import { Memory } from "@/lib/types";
import { Heart } from "lucide-react";

interface Props {
  memories: Memory[];
}

// A vertical thread running down the center (desktop) with memories
// alternating left/right, each revealing as it scrolls into view.
export default function Timeline({ memories }: Props) {
  return (
    <div className="relative mx-auto max-w-4xl px-4">
      {/* central line */}
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-cream/20 to-transparent md:left-1/2 md:-translate-x-1/2" />

      <div className="flex flex-col gap-16">
        {memories.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={m.id} className="relative grid grid-cols-1 md:grid-cols-2 md:gap-10">
              {/* dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="absolute left-6 top-1 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full accent-gradient shadow-lg md:left-1/2"
              >
                <Heart className="h-2 w-2 text-midnight-900" fill="currentColor" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`glass ml-12 rounded-xl p-5 sm:p-6 md:ml-0 ${
                  isLeft ? "md:col-start-1 md:text-right" : "md:col-start-2"
                }`}
              >
                <span className="font-body text-xs uppercase tracking-widest text-gold-400">
                  {m.date}
                </span>
                <h3 className="mt-1 font-display text-xl italic text-cream sm:text-2xl">
                  {m.title}
                </h3>
                <p className="mt-2 font-body text-sm text-cream/70 sm:text-base">
                  {m.description}
                </p>
                {m.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.image}
                    alt={m.title}
                    className="mt-4 h-40 w-full rounded-lg object-cover"
                  />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
