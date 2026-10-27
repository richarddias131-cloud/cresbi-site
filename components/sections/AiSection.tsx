import { Bot, FileText, GraduationCap, MessageCircle, PenLine, Search } from "lucide-react";
import { usosIa } from "@/content/site";
import { messages, whatsappLink } from "@/lib/whatsapp";
import { Button, external } from "../ds/Button";
import { STAGGER } from "../motion/constants";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import styles from "./AiSection.module.css";

const ICONS = [MessageCircle, FileText, PenLine, Search];

/** Frente 04: exemplos de IA em processos reais e o treinamento da equipe. */
export function AiSection() {
  return (
    <section id="ia" data-nav="ia" className="section" aria-labelledby="ia-title">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="cr-overline">03 · Inteligência artificial</span>
          </Reveal>
          <SplitText id="ia-title" className="display-l title-l" text="IA no dia a dia da empresa, com a equipe junto." />
          <Reveal delay={0.1}>
            <p className="body-l section-lead">
              Começamos pelos processos que já existem e aplicamos IA onde ela poupa tempo da equipe. Cada
              implementação é feita por etapas e inclui treinamento para quem vai usar.
            </p>
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {usosIa.map((u, i) => {
            const Icon = ICONS[i] ?? Bot;
            return (
              <Reveal key={u.label} as="li" delay={i * STAGGER.cards} className={styles.item}>
                <div className={styles.itemHead}>
                  <Icon className="icon" aria-hidden="true" />
                  <span className={styles.label}>{u.label}</span>
                </div>
                <h3 className="heading-3">{u.title}</h3>
                <p className={styles.body}>{u.body}</p>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className={styles.training}>
          <GraduationCap className="icon" aria-hidden="true" />
          <div className={styles.trainingText}>
            <span className="cr-overline">Treinamento incluso</span>
            <p>
              A equipe aprende a usar as ferramentas no próprio trabalho, com material de apoio e acompanhamento depois
              da entrega.
            </p>
          </div>
          <Button href={whatsappLink(messages.frente("Implementação de IA"))} {...external}>
            Conversar sobre IA na minha empresa
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
