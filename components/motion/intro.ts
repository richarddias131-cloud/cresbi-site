// Atraso da entrada do hero enquanto a animação de abertura (components/sections/Intro.tsx) toca.
// O script da abertura marca <html data-intro="play">; o CSS usa --intro-delay.

/** Duração da abertura até a cortina começar a subir, em segundos. Igual a --intro-delay. */
export const INTRO_DELAY = 2.2;

/** Atraso extra para animações em JS (Motion, timers). No servidor, 0. */
export function introDelay(): number {
  if (typeof document === "undefined") return 0;
  return document.documentElement.dataset.intro === "play" ? INTRO_DELAY : 0;
}
