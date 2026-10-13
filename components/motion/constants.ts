// Sistema de movimento da CRESBI: um só easing, três durações e um stagger.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

export const DURATION = {
  micro: 0.2,
  enter: 0.5,
  highlight: 0.8,
} as const;

/** Com redução de movimento, só fades curtos. */
export const REDUCED_FADE = 0.2;

export const STAGGER = {
  words: 0.05,
  cards: 0.07,
  rows: 0.08,
} as const;

/** Velocidade de digitação do Console, em ms por caractere. */
export const TYPE_SPEED = 18;

export const VIEWPORT = { once: true, amount: 0.2 } as const;
