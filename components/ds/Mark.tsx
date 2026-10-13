/**
 * Símbolo Facetado inline: losango aberto (o "C") com a pedra de ouro.
 * Nunca gira, nunca é preenchido. Cores sempre por token.
 */
export function Mark({ className, stroke = "var(--text)" }: { className?: string; stroke?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M45 19 L32 6 L6 32 L32 58 L45 45" fill="none" stroke={stroke} strokeWidth="6" strokeLinejoin="miter" />
      <rect x="26" y="26" width="12" height="12" transform="rotate(45 32 32)" fill="var(--gold)" />
    </svg>
  );
}
