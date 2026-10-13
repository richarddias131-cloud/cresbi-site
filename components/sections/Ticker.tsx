"use client";

import { useEffect, useRef } from "react";
import { ticker } from "@/content/site";
import { useInViewport } from "../motion/useInViewport";
import { useReduced } from "../motion/useReduced";
import styles from "./Ticker.module.css";

const LOOP_MS = 40_000;

/** Faixa infinita. Desacelera no hover, pausa fora da tela e para com redução de movimento. */
export function Ticker() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const reduced = useReduced();
  const inView = useInViewport(wrapRef);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;
    const anim = track.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
      duration: LOOP_MS,
      iterations: Infinity,
      easing: "linear",
    });
    animRef.current = anim;
    return () => {
      anim.cancel();
      animRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    const anim = animRef.current;
    if (!anim) return;
    if (inView) anim.play();
    else anim.pause();
  }, [inView, reduced]);

  const items = (copy: number) =>
    ticker.map((t) => (
      <span key={`${copy}-${t}`} className={styles.item}>
        {t}
        <span className={styles.sep}>◆</span>
      </span>
    ));

  return (
    <div
      ref={wrapRef}
      className={styles.ticker}
      aria-hidden="true"
      onPointerEnter={() => animRef.current?.updatePlaybackRate(0.3)}
      onPointerLeave={() => animRef.current?.updatePlaybackRate(1)}
    >
      <div ref={trackRef} className={styles.track}>
        <div className={styles.group}>{items(0)}</div>
        <div className={styles.group}>{items(1)}</div>
      </div>
    </div>
  );
}
