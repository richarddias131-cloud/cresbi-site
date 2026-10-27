/* eslint-disable @next/next/no-img-element -- export estático; prints servidos de public/projetos */
import { projetos } from "@/content/site";
import { external } from "../ds/Button";
import { STAGGER } from "../motion/constants";
import { Reveal } from "../motion/Reveal";
import styles from "./Cases.module.css";

export function Cases() {
  return (
    <section id="projetos" data-nav="projetos" className="section" aria-labelledby="projetos-title">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <span className="cr-overline">Projetos</span>
          </Reveal>
          <Reveal>
            <h2 id="projetos-title" className="display-l title-l">
              Trabalho <em>recente</em>.
            </h2>
          </Reveal>
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
                {/* Print do computador com o do celular sobreposto, ambos reais. */}
                <div className={styles.stage}>
                  <div className={styles.screen}>
                    <div className={styles.page}>
                      <img src={p.imagem} alt={`Página inicial de ${p.cliente} no computador`} loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <div className={styles.phone}>
                    <img src={p.imagemMobile} alt={`Página inicial de ${p.cliente} no celular`} loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className={styles.meta}>
                  <span className={styles.frente}>
                    {p.frente.replace(/^\d+ /, "")}
                    {p.local ? ` · ${p.local}` : ""}
                  </span>
                  <h3 className={`headline ${styles.name}`}>
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
