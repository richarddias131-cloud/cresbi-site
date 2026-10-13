import type { ReactNode } from "react";

type Props = {
  label: string;
  value: ReactNode;
  gold?: boolean;
  spark?: ReactNode;
  foot?: ReactNode;
  className?: string;
};

/** Card de indicador (.cr-kpi). Ouro em apenas UM card por linha. */
export function KpiCard({ label, value, gold, spark, foot, className = "" }: Props) {
  return (
    <div className={`cr-kpi ${className}`.trim()}>
      <span className={`cr-overline${gold ? " cr-overline--gold" : ""}`}>{label}</span>
      <span className={`cr-kpi__value${gold ? " cr-kpi__value--gold" : ""}`}>{value}</span>
      {spark}
      {foot ? <div className="cr-kpi__foot">{foot}</div> : null}
    </div>
  );
}
