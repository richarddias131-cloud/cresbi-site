"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { processo } from "@/content/site";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { useReduced } from "../motion/useReduced";
import styles from "./Process.module.css";

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReduced();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 55%"] });
  const [reached, setReached] = useState(0);

  const railRef = useRef<HTMLSpanElement>(null);
  const markers = useRef<(HTMLSpanElement | null)[]>([]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // Uma etapa é alcançada quando a ponta da linha passa pelo centro do seu marcador.
    const rail = railRef.current;
    if (!rail) return;
    const tip = rail.offsetTop + p * rail.offsetHeight;
    setReached(markers.current.filter((m) => m && m.offsetParent && (m.offsetParent as HTMLElement).offsetTop + m.offsetTop + 5 <= tip).length);
  });

  const count = reduced ? processo.length : reached;

  return (
    <section id="metodo" className="section" aria-labelledby="metodo-title">
      <div className={`container ${styles.layout}`}>
        <div className={`section-head ${styles.head}`}>
          <Reveal>
            <span className="cr-overline">{"// 04 método"}</span>
          </Reveal>
          <SplitText id="metodo-title" className="display-l title-l" text="Do diagnóstico ao acompanhamento." />
        </div>

        <ol ref={listRef} className={styles.timeline}>
          <span ref={railRef} className={styles.rail} aria-hidden="true">
            <motion.span className={styles.fill} style={{ scaleY: reduced ? 1 : scrollYProgress }} />
          </span>
          {processo.map((s, i) => (
            <li key={s.step} className={styles.step}>
              <span
                ref={(el) => {
                  markers.current[i] = el;
                }}
                className={`${styles.marker} ${i < count ? styles.reached : ""}`}
                aria-hidden="true"
              />
              <Reveal className={styles.body}>
                <span className={styles.label}>{s.step}</span>
                <h3 className="heading-2">{s.title}</h3>
                <p className={styles.text}>{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
