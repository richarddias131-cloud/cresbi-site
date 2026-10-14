import type { Metadata } from "next";
import { frentes, projetos } from "@/content/site";
import { whatsappLink } from "@/lib/whatsapp";
import { external } from "@/components/ds/Button";
import styles from "./links.module.css";

// Página de links da bio do Instagram (@cresbi.oficial). Endereço: /links

export const metadata: Metadata = {
  title: "CRESBI · Links",
  description: "Fale com a CRESBI no WhatsApp e conheça as frentes e os projetos: sistemas, presença digital, automações e IA.",
  alternates: { canonical: "/links" },
};

const mensagemInstagram = "Olá, CRESBI. Vim pelo Instagram e quero conversar sobre um projeto.";

/** Símbolo do perfil do Instagram: três barras, a do meio em ouro e mais curta. */
function Simbolo() {
  return (
    <svg className={styles.symbol} viewBox="0 0 100 85" aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="100" height="18" fill="var(--text)" />
      <rect x="0" y="33.5" width="77" height="18" fill="var(--gold)" />
      <rect x="0" y="67" width="100" height="18" fill="var(--text)" />
    </svg>
  );
}

function Seta() {
  return (
    <span className={`arrow ${styles.arrow}`} aria-hidden="true">
      →
    </span>
  );
}

export default function Links() {
  return (
    <main id="conteudo" tabIndex={-1} className={`cr-grid ${styles.page}`}>
      <div className={styles.column}>
        <header className={styles.profile}>
          <div className={styles.avatar}>
            <Simbolo />
          </div>
          <h1 className={styles.name}>CRESBI</h1>
          <span className={styles.handle}>@cresbi.oficial</span>
          <p className={styles.tagline}>Tecnologia sob medida para empresas que querem crescer.</p>
          <span className="cr-header__status">agenda aberta</span>
        </header>

        <a className={`cr-btn cr-btn--primary ${styles.cta}`} href={whatsappLink(mensagemInstagram)} {...external}>
          Falar no WhatsApp <span aria-hidden="true">→</span>
        </a>

        <section aria-labelledby="links-frentes" className={styles.group}>
          <h2 id="links-frentes" className="cr-overline">
            {"// frentes"}
          </h2>
          <ul className={styles.list}>
            {frentes.map((f) => (
              <li key={f.id}>
                <a className={styles.row} href={`./#frente-${f.id}`}>
                  <span className={styles.index}>{f.index}</span>
                  <span className={styles.label}>{f.title}</span>
                  <Seta />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="links-projetos" className={styles.group}>
          <h2 id="links-projetos" className="cr-overline">
            {"// projetos"}
          </h2>
          <ul className={styles.list}>
            {projetos.map((p) => (
              <li key={p.cliente}>
                <a className={styles.row} href={p.link} {...(p.link.startsWith("http") ? external : {})}>
                  <span className={styles.label}>
                    {p.cliente}
                    <span className={styles.meta}>{p.local ?? p.frente.replace(/^\d+ /, "")}</span>
                  </span>
                  <Seta />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <a className={`cr-btn cr-btn--secondary ${styles.site}`} href="./">
          Ver o site completo
        </a>

        <footer className={styles.footer}>
          <span>© 2026 CRESBI · cresbi.com.br</span>
        </footer>
      </div>
    </main>
  );
}
