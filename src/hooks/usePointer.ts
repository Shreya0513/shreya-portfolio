"use client";

import { useEffect, useRef } from "react";

export interface PointerPoint {
  x: number;
  y: number;
  t: number;
}

export function usePointer(onMove: (point: PointerPoint) => void) {
  const raf = useRef<number | null>(null);
  const latest = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      latest.current = { x: e.clientX, y: e.clientY };
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        if (latest.current) {
          onMove({ x: latest.current.x, y: latest.current.y, t: performance.now() });
        }
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [onMove]);
}
