import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Magnetic } from "../motion/Magnetic";

type Variant = "primary" | "secondary" | "code" | "ghost";

type Common = {
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  children: ReactNode;
  /** Faz o botão seguir o cursor (desligado por padrão). */
  magnetic?: boolean;
};

type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** Botão do design system (.cr-btn). Vira <a> quando recebe href. */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className = "", magnetic, children, ...rest } = props;
  const cls = ["cr-btn", `cr-btn--${variant}`, size === "sm" ? "cr-btn--sm" : "", className]
    .filter(Boolean)
    .join(" ");

  const el =
    "href" in rest && rest.href !== undefined ? (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    ) : (
      <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );

  // No acabamento premium, nenhum botão segue o cursor por padrão.
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

/** Atributos de link externo (WhatsApp, Instagram). */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
