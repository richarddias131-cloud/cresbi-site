"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import { heroStack } from "@/content/site";
import { messages, whatsappLink } from "@/lib/whatsapp";
import { Button, external } from "../ds/Button";
import { Tag } from "../ds/Tag";
import { DURATION, EASE, REDUCED_FADE } from "../motion/constants";
import { GridCanvas } from "../motion/GridCanvas";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { introDelay } from "../motion/intro";
import { useReduced } from "../motion/useReduced";
import { HeroConsole } from "./HeroConsole";
import styles from "./Hero.module.css";

// Linha do tempo da entrada (segundos). Tudo entra em até 1,6s; a digitação segue depois.
const T = { overline: 0.1, title: 0.2, text: 0.6, buttons: 0.75, console: 0.8, cards: 1.05 };

export function Hero() {
  const coordRef = useRef<HTMLSpanElement>(null);
  const reduced = useReduced();
  // Se a abertura estiver tocando, o console espera a cortina subir.
  const [extra] = useState(introDelay);

  return (
    <section id="topo" className={styles.hero} aria-labelledby="hero-title">
      <GridCanvas coordRef={coordRef} />
      <div className={styles.marks} aria-hidden="true">
        <span className={`${styles.cross} ${styles.tl}`}>+</span>
        <span className={`${styles.cross} ${styles.tr}`}>+</span>
        <span className={`${styles.cross} ${styles.bl}`}>+</span>
        <span className={`${styles.cross} ${styles.br}`}>+</span>
        <span ref={coordRef} className={styles.coord}>
          X 0640 · Y 0412
        </span>
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <Reveal onMount delay={T.overline}>
            <span className="cr-overline">{"// estúdio de tecnologia para PMEs"}</span>
          </Reveal>
          <SplitText
            as="h1"
            id="hero-title"
            className={`display-xl ${styles.title}`}
            text="Sistemas, presença digital, automações e IA para sua empresa crescer."
            highlight="crescer"
            delay={T.title}
            onMount
          />
          <Reveal onMount delay={T.text}>
            <p className={`body-l ${styles.lead}`}>
              Desenhamos e construímos a tecnologia do seu negócio: do sistema interno ao site, do Google às
              automações, com IA aplicada ao dia a dia da equipe.
            </p>
          </Reveal>
          <Reveal onMount delay={T.buttons} className={styles.actions}>
            <Button href={whatsappLink(messages.iniciar)} {...external}>
              Iniciar projeto <span aria-hidden="true">→</span>
            </Button>
            <Button variant="code" href="#projetos">
              ver_projetos
            </Button>
          </Reveal>
        </div>

        <div className={styles.side}>
          <motion.div
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduced ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
            transition={reduced ? { duration: REDUCED_FADE } : { duration: DURATION.enter, ease: EASE, delay: T.console + extra }}
          >
            <HeroConsole startAt={T.console + DURATION.enter + extra} />
          </motion.div>

          <div className={styles.cards}>
            <Reveal onMount delay={T.cards} className={`cr-kpi ${styles.mini}`}>
              <span className="cr-overline">Ferramentas</span>
              <div className={styles.stack}>
                {heroStack.map((s, i) => (
                  <Tag key={s} tone={i === heroStack.length - 1 ? undefined : "neutral"}>
                    {s}
                  </Tag>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
