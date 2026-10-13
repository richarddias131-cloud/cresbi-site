"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { useReduced } from "./useReduced";

type Props = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Conta de 0 até o valor ao entrar na tela, com formatação pt-BR. */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "", duration = 0.9, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReduced();
  const format = (n: number) =>
    `${prefix}${new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n)}${suffix}`;

  // Antes de entrar na tela, mostra 0; o HTML estático já traz o valor final.
  useEffect(() => {
    if (!ref.current) return;
    if (reduced) ref.current.textContent = format(value);
    else if (!inView) ref.current.textContent = format(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (!inView || reduced || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (n) => {
        node.textContent = format(n);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
