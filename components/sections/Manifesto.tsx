import { diferenciais } from "@/content/site";
import { Reveal } from "../motion/Reveal";
import styles from "./Manifesto.module.css";

/** Quem é a CRESBI, em uma frase, e o que muda para quem contrata. */
export function Manifesto() {
  return (
    <section id="sobre" className="section" aria-labelledby="sobre-title">
      <div className={`container ${styles.layout}`}>
        <Reveal>
          <h2 id="sobre-title" className="cr-overline">
            Sobre a CRESBI
          </h2>
        </Reveal>
        <div className={styles.body}>
          <Reveal>
            <p className={`serif ${styles.statement}`}>
              Cada empresa tem um jeito próprio de trabalhar. Nosso trabalho é transformar esse jeito em tecnologia,
              sem pacote pronto e com a mesma equipe <em>do começo ao fim</em>.
            </p>
          </Reveal>
          <dl className={styles.facts}>
            {diferenciais.slice(0, 3).map((d, i) => (
              <Reveal key={d.title} delay={0.1 * i} className={styles.fact}>
                <dt>{d.title}</dt>
                <dd>{d.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
