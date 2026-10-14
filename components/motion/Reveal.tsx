"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE, REDUCED_FADE, VIEWPORT } from "./constants";
import { useReduced } from "./useReduced";
import styles from "./enter.module.css";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "p" | "span";
  /** Anima ao montar em vez de ao entrar na tela. */
  onMount?: boolean;
  y?: number;
};

/** Revela o conteúdo (opacity + translateY 16px) uma vez, ao entrar na tela ou ao montar. */
export function Reveal({ children, delay = 0, className, as = "div", onMount = false, y = 16 }: Props) {
  const reduced = useReduced();
  const Tag = motion[as];
  const hidden = { opacity: 0, y: reduced ? 0 : y };
  const shown = { opacity: 1, y: 0 };
  const transition = reduced
    ? { duration: REDUCED_FADE }
    : { duration: DURATION.enter, ease: EASE, delay };

  // Ao montar (hero): animação CSS, que começa na primeira pintura sem esperar
  // a hidratação do JS — o texto do hero é o LCP da página.
  if (onMount) {
    const Plain = as;
    return (
      <Plain className={`${styles.enter} ${className ?? ""}`.trim()} style={{ animationDelay: `calc(var(--intro-delay, 0s) + ${delay}s)` }}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag className={className} initial={hidden} whileInView={shown} viewport={VIEWPORT} transition={transition}>
      {children}
    </Tag>
  );
}
