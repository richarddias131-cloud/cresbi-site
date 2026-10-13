"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useReduced } from "./useReduced";

export const HEADER_OFFSET = 88;

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Rolagem suave com Lenis; desligada com redução de movimento. */
export function SmoothScroll() {
  const reduced = useReduced();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.1,
      autoRaf: true,
      anchors: { offset: -HEADER_OFFSET },
    });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [reduced]);

  return null;
}

/** Rola até um seletor respeitando o cabeçalho, com ou sem Lenis. */
export function scrollToTarget(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -HEADER_OFFSET });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "auto" });
  }
}
