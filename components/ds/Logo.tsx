import styles from "./Logo.module.css";

/**
 * Marca no estilo do CRESBI Atende e do Instagram: três barras (a do meio em ouro,
 * mais curta) + "CRESBI" em Geist 600. `height` é a altura das letras em px.
 */
export function Logo({ className, height = 20 }: { className?: string; height?: number }) {
  return (
    <span className={`${styles.brand} ${className ?? ""}`} style={{ fontSize: height }} role="img" aria-label="CRESBI">
      <svg className={styles.bars} viewBox="0 0 100 85" aria-hidden="true" focusable="false">
        <rect x="0" y="0" width="100" height="18" fill="var(--text)" />
        <rect x="0" y="33.5" width="77" height="18" fill="var(--gold)" />
        <rect x="0" y="67" width="100" height="18" fill="var(--text)" />
      </svg>
      <b className={styles.word} aria-hidden="true">
        CRESBI
      </b>
    </span>
  );
}
