import { messages, whatsappLink } from "@/lib/whatsapp";
import { Button, external } from "../ds/Button";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import styles from "./Hero.module.css";

/** Abertura da página: título grande em serifa, uma frase de apoio e um único convite. */
export function Hero() {
  return (
    <section id="topo" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <Reveal onMount delay={0.1}>
          <span className="cr-overline">Estúdio de tecnologia para pequenas e médias empresas</span>
        </Reveal>
        <SplitText
          as="h1"
          id="hero-title"
          className={`display-xl ${styles.title}`}
          text="Tecnologia sob medida para empresas que querem crescer."
          highlight="crescer"
          delay={0.2}
          onMount
        />
        <div className={styles.foot}>
          <Reveal onMount delay={0.7}>
            <p className={styles.lead}>
              Desenhamos sistemas, presença digital, automações e inteligência artificial para o jeito que o seu
              negócio funciona.
            </p>
          </Reveal>
          <Reveal onMount delay={0.85} className={styles.actions}>
            <Button href={whatsappLink(messages.conversa)} {...external}>
              Agendar uma conversa
            </Button>
            <a className="text-link" href="#projetos">
              Ver projetos <span className="arrow" aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
