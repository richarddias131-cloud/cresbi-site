/** Variação com seta (desenhada pelo CSS) e sinal. Use o sinal de menos tipográfico −. */
export function Delta({ value, dir }: { value: string; dir: "up" | "down" | "flat" }) {
  return <span className={`cr-delta cr-delta--${dir}`}>{value}</span>;
}
