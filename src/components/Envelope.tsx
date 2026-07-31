"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

interface Props {
  greeting: string;
  body: string;
  signature: string;
  girlfriendName: string;
  yourName: string;
}

// A sealed envelope the visitor taps. It "opens" and the letter
// slides out and expands into a full reading view.
export default function Envelope({ greeting, body, signature, girlfriendName, yourName }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col items-center justify-center px-4 py-24">
      <h2 className="mb-12 text-center font-display text-3xl italic text-cream sm:text-4xl">
        A Letter For{" "}
        <span className="accent-gradient-text not-italic">{girlfriendName}</span>
      </h2>

      <div className="relative flex w-full max-w-lg items-center justify-center" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="envelope"
              onClick={() => setOpened(true)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-[3/2] w-full max-w-sm"
            >
              {/* Envelope back */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-blush-500/20 to-gold-400/20 shadow-2xl glass" />
              {/* Envelope flap */}
              <motion.div
                className="absolute left-0 top-0 h-1/2 w-full origin-top"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                }}
                initial={{ rotateX: 0 }}
                whileHover={{ rotateX: -15 }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end gap-3 pb-8">
                <Mail className="h-8 w-8 text-cream/80 transition-transform group-hover:scale-110" />
                <span className="font-body text-sm tracking-wide text-cream/70">
                  Tap to open
                </span>
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass w-full rounded-2xl p-8 shadow-2xl sm:p-12"
            >
              <p className="mb-6 font-display text-xl italic text-accent">{greeting}</p>
              <p className="whitespace-pre-line font-body text-base leading-relaxed text-cream/90 sm:text-lg">
                {body}
              </p>
              <p className="mt-8 text-right font-display text-lg italic text-cream/80">
                {signature},
                <br />
                <span className="accent-gradient-text not-italic">{yourName}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
