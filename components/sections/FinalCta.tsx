import { AtSign, MessageCircle } from "lucide-react";
import { frentes } from "@/content/site";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, messages, whatsappLink } from "@/lib/whatsapp";
import { Button, external } from "../ds/Button";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import styles from "./FinalCta.module.css";

// Atalhos: cada um abre o WhatsApp com a frente já na mensagem.
const atalhos = [
  ...frentes.map((f) => ({ index: f.index, label: f.title, message: messages.frente(f.title) })),
  { index: "··", label: "Ainda não sei", message: messages.naoSei },
];

export function FinalCta() {
  return (
    <section id="contato" className={`section ${styles.section}`} aria-labelledby="contato-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <Reveal>
            <span className="cr-overline">Próximo passo</span>
          </Reveal>
          <SplitText id="contato-title" className="display-l title-l" text="Conte seu processo. Nós desenhamos a solução." />
          <Reveal delay={0.1}>
            <p className={`body-l ${styles.lead}`}>
              O primeiro contato é pelo WhatsApp. Você conta o que precisa resolver e nós respondemos com os próximos
              passos.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className={styles.cardWrap}>
          <div className={styles.card}>
            <div className={styles.head}>
              <span className="cr-overline">WhatsApp</span>
              <Button href={whatsappLink(messages.geral)} {...external} className={styles.cta}>
                <MessageCircle className={`icon ${styles.ctaIcon}`} aria-hidden="true" />
                Falar no WhatsApp <span aria-hidden="true">→</span>
              </Button>
            </div>

            <div className={styles.shortcuts}>
              <span className="cr-overline">Ou comece pela frente de interesse</span>
              <ul>
                {atalhos.map((a) => (
                  <li key={a.label}>
                    <a href={whatsappLink(a.message)} {...external} className={styles.shortcut}>
                      <span className={styles.shortcutIndex}>{a.index}</span>
                      <span className={styles.shortcutLabel}>{a.label}</span>
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <a className={styles.instagram} href={INSTAGRAM_URL} {...external}>
              <AtSign className="icon" aria-hidden="true" />
              {INSTAGRAM_HANDLE.replace("@", "")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
