"use client";

import { motion } from "motion/react";
import { Fragment } from "react";
import { DURATION, EASE, REDUCED_FADE, STAGGER, VIEWPORT } from "./constants";
import { useReduced } from "./useReduced";
import styles from "./SplitText.module.css";
import enter from "./enter.module.css";

type Props = {
  text: string;
  /** Palavra (sem pontuação) que recebe o destaque em ouro. */
  highlight?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  delay?: number;
  onMount?: boolean;
};

/** Título revelado palavra por palavra, com máscara de baixo para cima. */
export function SplitText({ text, highlight, as = "h2", className, id, delay = 0, onMount = false }: Props) {
  const reduced = useReduced();
  const Tag = as;
  const words = text.split(" ");

  const container = {
    hidden: {},
    shown: { transition: { staggerChildren: reduced ? 0 : STAGGER.words, delayChildren: delay } },
  };
  const word = {
    hidden: reduced ? { opacity: 0 } : { y: "105%" },
    shown: reduced
      ? { opacity: 1, y: "0%", transition: { duration: REDUCED_FADE } }
      : { y: "0%", transition: { duration: DURATION.highlight, ease: EASE } },
  };
  // Ao montar (hero): animação CSS, sem depender da hidratação.
  if (onMount) {
    return (
      <Tag id={id} className={className}>
        {words.map((w, i) => {
          const isGold = highlight !== undefined && w.replace(/[.,;:]/g, "") === highlight;
          return (
            <Fragment key={i}>
              <span className={styles.mask}>
                <span
                  className={`${styles.word} ${enter.word} ${isGold ? styles.gold : ""}`}
                  style={{ animationDelay: `calc(var(--intro-delay, 0s) + ${delay + i * STAGGER.words}s)` }}
                >
                  {w}
                </span>
              </span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className}>
      <motion.span className={styles.line} variants={container} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
        {words.map((w, i) => {
          const isGold = highlight !== undefined && w.replace(/[.,;:]/g, "") === highlight;
          return (
            <Fragment key={i}>
              <span className={styles.mask}>
                <motion.span className={`${styles.word} ${isGold ? styles.gold : ""}`} variants={word}>
                  {w}
                </motion.span>
              </span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </motion.span>
    </Tag>
  );
}
