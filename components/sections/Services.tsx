import { frentes } from "@/content/site";
import { ServiceCard } from "../ds/ServiceCard";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { STAGGER } from "../motion/constants";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="servicos" className="section" aria-labelledby="servicos-title">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="cr-overline">{"// 01 serviços"}</span>
          </Reveal>
          <SplitText
            id="servicos-title"
            className="display-l title-l"
            text="Cinco frentes. Um único parceiro de tecnologia."
          />
        </div>
        <div className={styles.grid}>
          {frentes.map((f, i) => (
            <Reveal key={f.id} delay={i * STAGGER.cards} className={styles.cell}>
              <ServiceCard frente={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
