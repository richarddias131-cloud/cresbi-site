import { processo } from "@/content/site";
import { Reveal } from "../motion/Reveal";
import styles from "./Metodo.module.css";

/** Método em cinco etapas, lado a lado. */
export function Metodo() {
  return (
    <section id="metodo" data-nav="metodo" className="section" aria-labelledby="metodo-title">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <span className="cr-overline">Método</span>
          </Reveal>
          <Reveal>
            <h2 id="metodo-title" className="display-l title-l">
              Do diagnóstico ao <em>acompanhamento</em>.
            </h2>
          </Reveal>
        </div>
        <ol className={styles.steps}>
          {processo.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.06 * i} className={styles.step}>
              <span className={`serif ${styles.num}`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
