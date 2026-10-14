"use client";

import { motion, useScroll } from "motion/react";
import styles from "./ScrollProgress.module.css";

/** Barra de 2px em ouro no topo, preenchida conforme a rolagem. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className={styles.bar} style={{ scaleX: scrollYProgress }} aria-hidden="true" data-scroll-progress />;
}
