"use client";

import { useState } from "react";
import type { Frente } from "@/content/site";
import { messages, whatsappLink } from "@/lib/whatsapp";
import { Typewriter } from "../motion/Typewriter";
import { external } from "./Button";
import styles from "./ServiceCard.module.css";

/** Card de frente (.cr-service). No hover: borda ouro, feixe de luz na borda e o índice digitado de novo. */
export function ServiceCard({ frente }: { frente: Frente }) {
  const [round, setRound] = useState(0);

  return (
    <article
      id={`frente-${frente.id}`}
      data-nav={frente.id}
      className={`cr-service ${styles.card}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setRound((r) => r + 1)}
      aria-labelledby={`frente-${frente.id}-title`}
    >
      <span className={styles.beam} aria-hidden="true" key={`beam-${round}`} data-run={round > 0 || undefined} />
      <span className="cr-service__index">
        {round === 0 ? frente.index : <Typewriter key={round} text={frente.index} speed={90} />}
      </span>
      <h3 id={`frente-${frente.id}-title`} className="cr-service__title">
        {frente.title}
      </h3>
      <p className="cr-service__body">{frente.body}</p>
      <ul className="cr-service__list">
        {frente.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a
        className={`cr-btn cr-btn--ghost cr-btn--sm cr-service__link ${styles.link}`}
        href={whatsappLink(messages.frente(frente.title))}
        {...external}
        aria-label={`Ver detalhes de ${frente.title} no WhatsApp`}
      >
        Ver detalhes <span className="arrow" aria-hidden="true">→</span>
      </a>
    </article>
  );
}
