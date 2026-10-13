/* eslint-disable @next/next/no-img-element -- export estático, SVG não precisa de otimização */
export function Logo({ className, height = 28 }: { className?: string; height?: number }) {
  return (
    <img
      className={className}
      src="logos/cresbi-logo-dark.svg"
      alt="CRESBI"
      width={Math.round((241.3 / 64) * height)}
      height={height}
    />
  );
}
