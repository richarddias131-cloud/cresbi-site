"use client";

import { useRef } from "react";
import { GridCanvas } from "@/components/motion/GridCanvas";
import styles from "./links.module.css";

/** Grade técnica do topo, com holofote e marcas de precisão (mesmas do hero do site). */
export function LinksGrid() {
  const coordRef = useRef<HTMLSpanElement>(null);
  return (
    <>
      <GridCanvas coordRef={coordRef} />
      <div className={styles.marks} aria-hidden="true">
        <span className={`${styles.cross} ${styles.tl}`}>+</span>
        <span className={`${styles.cross} ${styles.tr}`}>+</span>
        <span className={`${styles.cross} ${styles.bl}`}>+</span>
        <span className={`${styles.cross} ${styles.br}`}>+</span>
        <span ref={coordRef} className={styles.coord}>
          X 0195 · Y 0240
        </span>
      </div>
    </>
  );
}
