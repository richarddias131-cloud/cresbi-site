import type { ReactNode } from "react";

export function Overline({ children, gold, className = "" }: { children: ReactNode; gold?: boolean; className?: string }) {
  return <span className={`cr-overline${gold ? " cr-overline--gold" : ""} ${className}`.trim()}>{children}</span>;
}
