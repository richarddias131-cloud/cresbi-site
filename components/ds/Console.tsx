import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

/** Painel em estilo terminal (.cr-console). As linhas vêm como filhos (ConsoleLine). */
export function Console({ title, children, className = "" }: Props) {
  return (
    <div className={`cr-console ${className}`.trim()}>
      <div className="cr-console__bar">
        <span>{title}</span>
        <span aria-hidden="true">● ● ●</span>
      </div>
      <ul className="cr-console__body">{children}</ul>
    </div>
  );
}

type LineProps = {
  name: ReactNode;
  status?: ReactNode;
  wait?: boolean;
  cursor?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function ConsoleLine({ name, status, wait, cursor, className = "", style }: LineProps) {
  return (
    <li className={`cr-console__line${wait ? " is-wait" : ""} ${className}`.trim()} style={style}>
      <span className="cr-console__name">{name}</span>
      {status !== undefined || cursor ? (
        <span className="cr-console__status">
          {status}
          {cursor ? <span className="cr-console__cursor" aria-hidden="true" /> : null}
        </span>
      ) : null}
    </li>
  );
}
