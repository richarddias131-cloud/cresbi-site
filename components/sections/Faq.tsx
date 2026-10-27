"use client";

import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faq } from "@/content/site";
import { DURATION, EASE, REDUCED_FADE } from "../motion/constants";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { useReduced } from "../motion/useReduced";
import styles from "./Faq.module.css";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReduced();

  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={`container ${styles.layout}`}>
        <div className="section-head">
          <Reveal>
            <span className="cr-overline">Perguntas frequentes</span>
          </Reveal>
          <SplitText id="faq-title" className="display-l title-l" text="Antes de conversarmos." highlight="conversarmos" />
        </div>
        <Reveal>
          <ul className={styles.list}>
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className={styles.item}>
                  <h3 className={styles.q}>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className={styles.trigger}
                    >
                      <span className={styles.qIndex} aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.qText}>{item.q}</span>
                      <Plus className={`icon ${styles.plus} ${isOpen ? styles.plusOpen : ""}`} aria-hidden="true" />
                    </button>
                  </h3>
                  <motion.div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={styles.answer}
                    initial={false}
                    animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={reduced ? { duration: REDUCED_FADE } : { duration: DURATION.enter, ease: EASE }}
                    inert={!isOpen}
                    aria-hidden={!isOpen}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
