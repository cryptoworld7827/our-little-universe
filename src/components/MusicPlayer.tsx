"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  src: string;
  active: boolean; // whether the main experience has begun (autoplay only after user interacted)
}

// A small floating control, bottom-right, to toggle the ambient
// background music that the admin uploaded.
export default function MusicPlayer({ src, active }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!active || !src || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [active, src]);

  if (!src) return null;

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        className="glass fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full text-cream shadow-lg"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <Volume2 className="h-5 w-5 text-accent" />
        ) : (
          <VolumeX className="h-5 w-5 text-cream/60" />
        )}
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border border-accent/50"
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>
    </>
  );
}
