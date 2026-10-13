import { diferenciais } from "@/content/site";
import { STAGGER } from "../motion/constants";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import styles from "./WhyCresbi.module.css";

export function WhyCresbi() {
  return (
    <section id="diferenciais" className="section" aria-labelledby="diferenciais-title">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="cr-overline">{"// 05 diferenciais"}</span>
          </Reveal>
          <SplitText
            id="diferenciais-title"
            className="display-l title-l"
            text="Tecnologia sob medida, com cuidado de consultoria."
          />
        </div>
        <dl className={styles.sheet}>
          {diferenciais.map((d, i) => (
            <Reveal key={d.index} delay={i * STAGGER.cards} className={styles.item}>
              <dt>
                <span className={styles.index}>{d.index}</span>
                <span className="heading-3">{d.title}</span>
              </dt>
              <dd className={styles.body}>{d.body}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
