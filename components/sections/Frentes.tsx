import { frentes } from "@/content/site";
import { messages, whatsappLink } from "@/lib/whatsapp";
import { external } from "../ds/Button";
import { Reveal } from "../motion/Reveal";
import styles from "./Frentes.module.css";

/** As quatro frentes como uma lista editorial: número, nome e uma frase. */
export function Frentes() {
  return (
    <section id="frentes" data-nav="frentes" className="section" aria-labelledby="frentes-title">
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <span className="cr-overline">Frentes</span>
          </Reveal>
          <Reveal>
            <h2 id="frentes-title" className="display-l title-l">
              Quatro frentes, <em>um único parceiro</em>.
            </h2>
          </Reveal>
        </div>
        <ol className={styles.list}>
          {frentes.map((f, i) => (
            <Reveal as="li" key={f.id} delay={0.06 * i}>
              <article id={`frente-${f.id}`} className={styles.row} aria-labelledby={`frente-${f.id}-title`}>
                <span className={styles.index}>{f.index}</span>
                <h3 id={`frente-${f.id}-title`} className={`serif ${styles.title}`}>
                  {f.title}
                </h3>
                <p className={styles.body}>{f.body}</p>
                <a
                  className={`text-link ${styles.link}`}
                  href={whatsappLink(messages.frente(f.title))}
                  {...external}
                  aria-label={`Conversar sobre ${f.title} no WhatsApp`}
                >
                  Conversar <span className="arrow" aria-hidden="true">→</span>
                </a>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
