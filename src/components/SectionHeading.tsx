"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-14 max-w-2xl px-4 text-center"
    >
      <span className="font-body text-xs uppercase tracking-[0.3em] text-gold-400">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl italic text-cream sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-body text-sm text-cream/60 sm:text-base">{subtitle}</p>
      )}
    </motion.div>
  );
}
