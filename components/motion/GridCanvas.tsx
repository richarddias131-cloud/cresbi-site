"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { DURATION, EASE, REDUCED_FADE } from "./constants";
import { useReduced } from "./useReduced";
import styles from "./GridCanvas.module.css";

const CELL = 40; // mesmo passo de .cr-grid
const RADIUS = 240;
const FRAME_MS = 1000 / 60;

type Props = {
  /** Nó que recebe a coordenada "X 0000 · Y 0000" do cursor. */
  coordRef?: React.RefObject<HTMLElement | null>;
};

function token(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Grade técnica do hero com holofote que segue o cursor.
 * Só redesenha enquanto o holofote está se movendo, a no máximo 60fps,
 * e para fora da tela ou com a aba oculta.
 */
export function GridCanvas({ coordRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReduced();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const base = document.createElement("canvas");
    const bright = document.createElement("canvas");
    const spot = document.createElement("canvas");
    const baseCtx = base.getContext("2d")!;
    const brightCtx = bright.getContext("2d")!;
    const spotCtx = spot.getContext("2d")!;

    // Grade em --surface (como .cr-grid); no holofote, --line-strong a 45%:
    // a grade só fica "levemente mais clara", sem cor nova.
    const colors = { grid: token("--surface"), light: token("--line-strong") };

    let w = 0;
    let h = 0;
    let dpr = 1;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const spotlight = !reduced;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;
    let visible = true;

    const drawGrid = (c: CanvasRenderingContext2D, color: string, alpha: number) => {
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, w, h);
      c.globalAlpha = alpha;
      c.strokeStyle = color;
      c.lineWidth = 1;
      c.beginPath();
      for (let x = 0; x <= w; x += CELL) {
        c.moveTo(x + 0.5, 0);
        c.lineTo(x + 0.5, h);
      }
      for (let y = 0; y <= h; y += CELL) {
        c.moveTo(0, y + 0.5);
        c.lineTo(w, y + 0.5);
      }
      c.stroke();
      c.globalAlpha = 1;
    };

    const render = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0);
      if (!spotlight) return;
      spotCtx.setTransform(1, 0, 0, 1, 0, 0);
      spotCtx.globalCompositeOperation = "source-over";
      spotCtx.clearRect(0, 0, spot.width, spot.height);
      spotCtx.drawImage(bright, 0, 0);
      spotCtx.globalCompositeOperation = "destination-in";
      const g = spotCtx.createRadialGradient(pos.x * dpr, pos.y * dpr, 0, pos.x * dpr, pos.y * dpr, RADIUS * dpr);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      spotCtx.fillStyle = g;
      spotCtx.fillRect(0, 0, spot.width, spot.height);
      ctx.drawImage(spot, 0, 0);
      if (coordRef?.current) {
        const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, "0");
        coordRef.current.textContent = `X ${pad(pos.x)} · Y ${pad(pos.y)}`;
      }
    };

    const tick = (t: number) => {
      raf = 0;
      if (!visible) return;
      if (t - last < FRAME_MS - 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      last = t;
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      render();
      if (Math.abs(target.x - pos.x) > 0.3 || Math.abs(target.y - pos.y) > 0.3) {
        raf = requestAnimationFrame(tick);
      }
    };
    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.round(rect.width);
      h = Math.round(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [canvas, base, bright, spot]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      drawGrid(baseCtx, colors.grid, 1);
      drawGrid(brightCtx, colors.light, 0.45);
      if (coarse || !spotlight || (target.x === 0 && target.y === 0)) {
        target.x = pos.x = w / 2;
        target.y = pos.y = h / 2;
      }
      render();
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      wake();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && document.visibilityState === "visible";
      if (visible) wake();
    });
    io.observe(canvas);
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) wake();
    };
    document.addEventListener("visibilitychange", onVisibility);
    if (spotlight && !coarse) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [reduced, coordRef]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduced ? { duration: REDUCED_FADE } : { duration: DURATION.highlight, ease: EASE }}
    />
  );
}
