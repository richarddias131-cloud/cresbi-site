/* eslint-disable @next/next/no-img-element -- export estático; prints servidos de public/projetos */
import { projetos } from "@/content/site";
import { external } from "../ds/Button";
import { Tag } from "../ds/Tag";
import { STAGGER } from "../motion/constants";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import styles from "./Cases.module.css";

export function Cases() {
  return (
    <section id="projetos" className="section" aria-labelledby="projetos-title">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="cr-overline">{"// 06 projetos"}</span>
          </Reveal>
          <SplitText id="projetos-title" className="display-l title-l" text="Trabalho recente." />
        </div>
        <div className={styles.grid}>
          {projetos.map((p, i) => (
            <Reveal key={p.cliente} as="article" delay={i * STAGGER.cards} className={styles.card}>
              <a
                className={styles.link}
                href={p.link}
                {...(p.link.startsWith("http") ? external : {})}
                aria-label={`${p.cliente}: abrir ${p.url}`}
              >
                <div className={styles.window}>
                  <div className={styles.bar}>
                    <span className={styles.dots} aria-hidden="true">
                      ● ● ●
                    </span>
                    <span className={styles.url}>{p.url}</span>
                  </div>
                  <div className={styles.screen}>
                    <div className={styles.page}>
                      {p.imagem ? (
                        <img src={p.imagem} alt={`Página inicial do site ${p.cliente}`} loading="lazy" decoding="async" />
                      ) : (
                        <div className={styles.placeholder}>
                          <span>[PRINT DO PROJETO]</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.meta}>
                  <Tag tone="neutral">{p.frente}</Tag>
                  <h3 className="heading-3">
                    {p.cliente} <span className="arrow" aria-hidden="true">→</span>
                  </h3>
                  <p className={styles.result}>{p.resultado}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
