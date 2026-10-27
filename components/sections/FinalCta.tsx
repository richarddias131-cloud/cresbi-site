import { frentes } from "@/content/site";
import { INSTAGRAM_URL, messages, whatsappLink } from "@/lib/whatsapp";
import { Button, external } from "../ds/Button";
import { Reveal } from "../motion/Reveal";
import styles from "./FinalCta.module.css";

/** Convite final: uma pergunta, um botão e, para quem prefere, os atalhos por frente. */
export function FinalCta() {
  return (
    <section id="contato" data-nav="contato" className={`section ${styles.section}`} aria-labelledby="contato-title">
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <span className="cr-overline">Contato</span>
        </Reveal>
        <Reveal>
          <h2 id="contato-title" className={`display-l ${styles.title}`}>
            Vamos conversar sobre o seu <em>negócio</em>?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.lead}>
            O primeiro contato é pelo WhatsApp. Você conta o que precisa resolver e marcamos uma conversa.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Button href={whatsappLink(messages.conversa)} {...external}>
            Agendar uma conversa
          </Button>
        </Reveal>
        <Reveal delay={0.2} className={styles.more}>
          <span className={styles.moreLabel}>Ou fale direto sobre</span>
          <ul className={styles.shortcuts}>
            {frentes.map((f) => (
              <li key={f.id}>
                <a href={whatsappLink(messages.frente(f.title))} {...external}>
                  {f.title}
                </a>
              </li>
            ))}
          </ul>
          <a className={styles.instagram} href={INSTAGRAM_URL} {...external}>
            Instagram @cresbi.oficial
          </a>
        </Reveal>
      </div>
    </section>
  );
}
