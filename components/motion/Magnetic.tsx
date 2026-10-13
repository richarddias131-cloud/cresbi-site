"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, type ReactNode, type PointerEvent } from "react";
import { useReduced } from "./useReduced";

const MAX = 6;

/** O filho segue o cursor em até 6px. Só em desktop (pointer fine) e sem redução de movimento. */
export function Magnetic({ children }: { children: ReactNode }) {
  const reduced = useReduced();
  const [fine, setFine] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const active = fine && !reduced;

  const move = (e: PointerEvent<HTMLSpanElement>) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * MAX);
    y.set(Math.max(-1, Math.min(1, dy)) * MAX);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      style={{ display: "inline-flex", x, y }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </motion.span>
  );
}
