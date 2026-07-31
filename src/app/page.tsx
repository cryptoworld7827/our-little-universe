"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Settings } from "lucide-react";
import Link from "next/link";

import { useSiteData } from "@/lib/store";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTrail from "@/components/CursorTrail";
import ConstellationThread from "@/components/ConstellationThread";
import LoadingScreen from "@/components/LoadingScreen";
import Envelope from "@/components/Envelope";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import Garden from "@/components/Garden";
import Reasons from "@/components/Reasons";
import StarNight from "@/components/StarNight";
import GiftBox from "@/components/GiftBox";
import FloatingHearts from "@/components/FloatingHearts";
import Sakura from "@/components/Sakura";
import MusicPlayer from "@/components/MusicPlayer";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  const { data, isLoaded } = useSiteData();
  const [begun, setBegun] = useState(false);

  // Push admin-chosen colors into CSS variables so every component
  // (which reads var(--accent) / var(--accent2)) updates instantly.
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", data.accentColor);
    document.documentElement.style.setProperty("--accent2", data.secondaryColor);
  }, [data.accentColor, data.secondaryColor]);

  if (!isLoaded) {
    return <div className="min-h-screen bg-midnight-900" />;
  }

  return (
    <SmoothScroll>
      <CursorTrail />
      <ConstellationThread />
      <MusicPlayer src={data.musicUrl} active={begun} />

      <Link
        href="/admin"
        className="glass fixed left-5 top-5 z-40 flex h-10 w-10 items-center justify-center rounded-full text-cream/60 transition-colors hover:text-cream"
        aria-label="Open admin panel"
        title="Admin Panel"
      >
        <Settings className="h-4 w-4" />
      </Link>

      <AnimatePresence>
        {!begun && (
          <LoadingScreen tagline={data.loadingTagline} onBegin={() => setBegun(true)} />
        )}
      </AnimatePresence>

      {begun && (
        <main className="relative">
          {/* HERO */}
          <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
            <FloatingHearts count={16} />
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-gold-400"
            >
              welcome to
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="font-display text-4xl italic text-cream sm:text-5xl md:text-6xl"
            >
              Our Little Universe <span className="not-italic">❤️</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-6 max-w-lg font-body text-base text-cream/70 sm:text-lg"
            >
              For <span className="accent-gradient-text font-medium">{data.girlfriendName}</span> — every star here holds a piece of us.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 flex flex-col items-center gap-2 text-cream/40"
            >
              <span className="font-body text-xs tracking-widest">scroll</span>
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-6 w-px bg-cream/40"
              />
            </motion.div>
          </section>

          {/* ENVELOPE / LOVE LETTER */}
          <section className="relative">
            <Envelope
              greeting={data.letterGreeting}
              body={data.letterBody}
              signature={data.letterSignature}
              girlfriendName={data.girlfriendName}
              yourName={data.yourName}
            />
          </section>

          {/* GALLERY */}
          <section className="relative py-24">
            <Sakura count={10} />
            <SectionHeading
              eyebrow="Our Moments"
              title="Photo Gallery"
              subtitle="A little wall of us, one polaroid at a time."
            />
            <Gallery photos={data.gallery} />
          </section>

          {/* TIMELINE */}
          <section className="relative py-24">
            <SectionHeading
              eyebrow="Our Story So Far"
              title="Memory Timeline"
              subtitle="Every chapter that brought us here."
            />
            <Timeline memories={data.memories} />
          </section>

          {/* GARDEN */}
          <section className="relative py-24">
            <SectionHeading
              eyebrow="Grown With Love"
              title="Memory Garden"
              subtitle="Tap a flower to remember why it bloomed."
            />
            <Garden flowers={data.flowers} />
          </section>

          {/* REASONS */}
          <section className="relative py-24">
            <FloatingHearts count={10} />
            <SectionHeading
              eyebrow="No Particular Order"
              title="Reasons I Love You"
            />
            <Reasons reasons={data.reasons} />
          </section>

          {/* STAR NIGHT */}
          <section className="relative py-24">
            <SectionHeading
              eyebrow="Just Between Us"
              title="Star Night"
              subtitle="Secrets hidden among the stars."
            />
            <StarNight stars={data.stars} />
          </section>

          {/* GIFT BOX / ENDING */}
          <section className="relative py-24">
            <SectionHeading eyebrow="One Last Thing" title="A Little Gift" />
            <GiftBox title={data.endingTitle} message={data.endingMessage} />
          </section>

          <footer className="flex flex-col items-center gap-2 py-12 text-cream/30">
            <Heart className="h-4 w-4" fill="currentColor" />
            <span className="font-body text-xs">
              made with love, for {data.girlfriendName}
            </span>
          </footer>
        </main>
      )}
    </SmoothScroll>
  );
}
