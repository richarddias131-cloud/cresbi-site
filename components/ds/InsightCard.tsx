import type { ReactNode } from "react";

type Props = { index: string; title: string; body: string; meta?: ReactNode };

/** Recomendação numerada (.cr-insight). */
export function InsightCard({ index, title, body, meta }: Props) {
  return (
    <article className="cr-insight">
      <span className="cr-insight__index">{index}</span>
      <h3 className="cr-insight__title">{title}</h3>
      <p className="cr-insight__body">{body}</p>
      {meta ? <div className="cr-insight__meta">{meta}</div> : null}
    </article>
  );
}
