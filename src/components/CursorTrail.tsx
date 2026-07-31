"use client";

import { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  life: number;
}

// A lightweight canvas-based trail of little sparkles that follows the
// cursor on desktop. Disabled on touch devices since there's no cursor.
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let sparkles: Sparkle[] = [];
    let raf = 0;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      sparkles.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (sparkles.length > 40) sparkles.shift();
    }
    window.addEventListener("mousemove", onMove);

    function loop() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      sparkles.forEach((s) => {
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(244, 199, 122, ${s.life})`;
        ctx!.arc(s.x, s.y, 2.5 * s.life, 0, Math.PI * 2);
        ctx!.fill();
        s.life -= 0.03;
      });
      sparkles = sparkles.filter((s) => s.life > 0);
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
    />
  );
}
