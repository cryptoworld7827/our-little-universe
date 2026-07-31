"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Reason } from "@/lib/types";

interface Props {
  reasons: Reason[];
}

export default function Reasons({ reasons }: Props) {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {reasons.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="glass group relative overflow-hidden rounded-2xl p-6"
        >
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full accent-gradient opacity-10 transition-opacity group-hover:opacity-25" />
          <Heart className="mb-4 h-6 w-6 text-accent transition-transform group-hover:scale-125" fill="currentColor" />
          <p className="font-display text-lg italic leading-snug text-cream/90">{r.text}</p>
          <span className="mt-4 block font-body text-xs uppercase tracking-widest text-cream/40">
            Reason #{String(i + 1).padStart(2, "0")}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
