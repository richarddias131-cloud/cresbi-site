"use client";

import { useEffect, useState } from "react";
import { TYPE_SPEED } from "./constants";
import { useReduced } from "./useReduced";

type Props = {
  text: string;
  /** Começa a digitar quando true. */
  start?: boolean;
  speed?: number;
  onDone?: () => void;
};

/** Digita o texto caractere a caractere. Com redução de movimento, mostra o texto pronto. */
export function Typewriter({ text, start = true, speed = TYPE_SPEED, onDone }: Props) {
  const reduced = useReduced();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      onDone?.();
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        window.clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => window.clearInterval(id);
    // onDone muda a cada render do pai; só reinicia quando o texto ou o gatilho mudam.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, text, speed, reduced]);

  const visible = reduced ? text.length : start ? count : 0;
  return (
    <>
      <span>{text.slice(0, visible)}</span>
      <span style={{ visibility: "hidden" }} aria-hidden="true">
        {text.slice(visible)}
      </span>
    </>
  );
}
