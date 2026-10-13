"use client";

import { motion } from "motion/react";
import { AtSign, MessageCircle } from "lucide-react";
import { useRef } from "react";
import { frentes } from "@/content/site";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, messages, whatsappLink } from "@/lib/whatsapp";
import { Button, external } from "../ds/Button";
import { EASE, REDUCED_FADE, VIEWPORT } from "../motion/constants";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { useInViewport } from "../motion/useInViewport";
import { useReduced } from "../motion/useReduced";
import styles from "./FinalCta.module.css";

// Atalhos: cada um abre o WhatsApp com a frente já na mensagem.
const atalhos = [
  ...frentes.map((f) => ({ index: f.index, label: f.title, message: messages.frente(f.title) })),
  { index: "··", label: "Ainda não sei", message: messages.naoSei },
];

export function FinalCta() {
  const reduced = useReduced();
  const sectionRef = useRef<HTMLElement>(null);
  const pulsing = useInViewport(sectionRef);

  return (
    <section ref={sectionRef} id="contato" className={`section cr-grid ${styles.section}`} aria-labelledby="contato-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <Reveal>
            <span className="cr-overline">{"// próximo passo"}</span>
          </Reveal>
          <SplitText id="contato-title" className="display-l title-l" text="Conte seu processo. Nós desenhamos a solução." />
          <Reveal delay={0.1}>
            <p className={`body-l ${styles.lead}`}>
              O primeiro contato é pelo WhatsApp. Você conta o que precisa resolver e nós respondemos com os próximos
              passos.
            </p>
          </Reveal>
          <svg className={styles.facet} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <motion.path
              d="M45 19 L32 6 L6 32 L32 58 L45 45"
              initial={reduced ? { opacity: 0 } : { pathLength: 0 }}
              whileInView={reduced ? { opacity: 1, pathLength: 1 } : { pathLength: 1 }}
              viewport={VIEWPORT}
              transition={reduced ? { duration: REDUCED_FADE } : { duration: 1.6, ease: EASE }}
            />
            <g className={`${styles.stone} ${pulsing && !reduced ? styles.pulse : ""}`}>
              <rect x="26" y="26" width="12" height="12" transform="rotate(45 32 32)" />
            </g>
          </svg>
        </div>

        <Reveal delay={0.1} className={styles.cardWrap}>
          <div className={styles.card}>
            <div className={styles.head}>
              <span className="cr-overline">WhatsApp</span>
              <a className={styles.number} href={whatsappLink(messages.geral)} {...external}>
                {WHATSAPP_DISPLAY}
              </a>
              <Button href={whatsappLink(messages.geral)} {...external} className={styles.cta}>
                <MessageCircle className={`icon ${styles.ctaIcon}`} aria-hidden="true" />
                Falar no WhatsApp <span aria-hidden="true">→</span>
              </Button>
            </div>

            <div className={styles.shortcuts}>
              <span className="cr-overline">Ou comece pela frente de interesse</span>
              <ul>
                {atalhos.map((a) => (
                  <li key={a.label}>
                    <a href={whatsappLink(a.message)} {...external} className={styles.shortcut}>
                      <span className={styles.shortcutIndex}>{a.index}</span>
                      <span className={styles.shortcutLabel}>{a.label}</span>
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <a className={styles.instagram} href={INSTAGRAM_URL} {...external}>
              <AtSign className="icon" aria-hidden="true" />
              {INSTAGRAM_HANDLE.replace("@", "")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
