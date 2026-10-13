import { frentes } from "@/content/site";
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY, messages, whatsappLink } from "@/lib/whatsapp";
import { external } from "../ds/Button";
import { Logo } from "../ds/Logo";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.tagline}>{"// tecnologia sob medida para quem quer crescer"}</p>
        </div>
        <nav className={styles.cols} aria-label="Rodapé">
          <div>
            <h2 className={`cr-overline ${styles.colTitle}`}>Frentes</h2>
            <ul>
              {frentes.map((f) => (
                <li key={f.id}>
                  <a href={`#frente-${f.id}`}>{f.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={`cr-overline ${styles.colTitle}`}>Contato</h2>
            <ul>
              <li>
                <a href={whatsappLink(messages.geral)} {...external}>
                  WhatsApp <span className={styles.muted}>{WHATSAPP_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} {...external}>
                  Instagram <span className={styles.muted}>{INSTAGRAM_HANDLE}</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={`cr-overline ${styles.colTitle}`}>Empresa</h2>
            <ul>
              <li>
                <a href="#projetos">Projetos</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container">
        <div className={styles.bottom}>
          <span>© 2026 CRESBI · cresbi.com.br</span>
          <span>
            status: operacional <span className={styles.dot} aria-hidden="true">●</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
