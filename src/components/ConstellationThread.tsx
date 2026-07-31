"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// The site's signature element: a hand-drawn constellation line that
// threads down the left edge of the page and "draws" itself in sync
// with scroll progress, like connecting stars into one story.
export default function ConstellationThread() {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        gsap.set(path, { strokeDashoffset: length * (1 - self.progress) });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <svg
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-full w-8 md:block lg:w-14"
      viewBox="0 0 100 3000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="constellation-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent2)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d="M50,0 C30,150 70,300 50,450 S20,700 60,850 S40,1100 55,1300 S30,1550 60,1750 S45,2000 55,2200 S30,2450 50,2650 S60,2850 50,3000"
        className="constellation-line"
      />
    </svg>
  );
}
