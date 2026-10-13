import type { ReactNode } from "react";

export function Tag({ children, tone }: { children: ReactNode; tone?: "neutral" | "positive" | "negative" }) {
  return <span className={`cr-tag${tone ? ` cr-tag--${tone}` : ""}`}>{children}</span>;
}
