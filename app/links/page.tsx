/* eslint-disable @next/next/no-img-element -- export estático; prints servidos de public/projetos */
import type { Metadata } from "next";
import { frentes, projetos } from "@/content/site";
import { INSTAGRAM_URL, whatsappLink } from "@/lib/whatsapp";
import { external } from "@/components/ds/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import styles from "./links.module.css";

// Página de links da bio do Instagram (@cresbi.oficial). Endereço: /links

export const metadata: Metadata = {
  title: "CRESBI · Links",
  description:
    "Agende uma conversa com a CRESBI e conheça as frentes e os projetos: sistemas, presença digital, automações e IA.",
  alternates: { canonical: "/links" },
};

const mensagemInstagram = "Olá, CRESBI. Vim pelo Instagram e gostaria de agendar uma conversa sobre o meu negócio.";

/** Símbolo do perfil do Instagram: três barras, a do meio em ouro e mais curta. */
function Barras({ className, stretch }: { className?: string; stretch?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 85"
      preserveAspectRatio={stretch ? "none" : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="100" height="18" fill="var(--text)" />
      <rect x="0" y="33.5" width="77" height="18" fill="var(--gold)" />
      <rect x="0" y="67" width="100" height="18" fill="var(--text)" />
    </svg>
  );
}

/** Wordmark como nos posts do Instagram: o "E" de CRESBI vira o símbolo de barras. */
function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`${styles.wordmark} ${className ?? ""}`} role="img" aria-label="CRESBI">
      <span aria-hidden="true">CR</span>
      <Barras className={styles.wordmarkE} stretch />
      <span aria-hidden="true">SBI</span>
    </span>
  );
}

export default function Links() {
  return (
    <main id="conteudo" tabIndex={-1} className={styles.page} data-page="links">
      <div className={styles.column}>
        <header className={styles.profile}>
          <Reveal onMount delay={0.05}>
            <div className={styles.avatar}>
              <Barras className={styles.avatarMark} />
            </div>
          </Reveal>
          <Reveal onMount delay={0.15}>
            <Wordmark />
          </Reveal>
          <SplitText
            as="h1"
            className={`headline ${styles.title}`}
            text="Tecnologia sob medida para empresas que querem crescer."
            highlight="crescer"
            delay={0.25}
            onMount
          />
        </header>

        <Reveal onMount delay={0.6} className={styles.ctaWrap}>
          <a className={`cr-btn cr-btn--primary ${styles.cta}`} href={whatsappLink(mensagemInstagram)} {...external}>
            Agendar uma conversa
          </a>
          <span className={styles.note}>Pelo WhatsApp, com a mensagem pronta.</span>
        </Reveal>

        <section aria-labelledby="links-frentes" className={styles.group}>
          <Reveal>
            <h2 id="links-frentes" className="cr-overline">
              Frentes
            </h2>
          </Reveal>
          <ul className={styles.list}>
            {frentes.map((f, i) => (
              <Reveal as="li" key={f.id} delay={i * 0.06}>
                <a className={styles.row} href={`./#frente-${f.id}`}>
                  <span className={styles.index}>{f.index}</span>
                  <span className={styles.rowText}>
                    <span className={`headline ${styles.rowTitle}`}>{f.title}</span>
                    <span className={styles.rowBody}>{f.resumo}</span>
                  </span>
                  <span className={`arrow ${styles.arrow}`} aria-hidden="true">
                    →
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </section>

        <section aria-labelledby="links-projetos" className={styles.group}>
          <Reveal className={styles.groupHead}>
            <h2 id="links-projetos" className="cr-overline">
              Projetos
            </h2>
            <span className={styles.hint} aria-hidden="true">
              arraste →
            </span>
          </Reveal>
          <Reveal>
            <ul className={styles.carousel}>
              {projetos.map((p) => (
                <li key={p.cliente} className={styles.slide}>
                  <a className={styles.projeto} href={p.link} {...(p.link.startsWith("http") ? external : {})}>
                    <span className={styles.shot}>
                      <img src={p.imagem} alt={`Página inicial de ${p.cliente}`} loading="lazy" decoding="async" />
                      <span className={styles.phone}>
                        <img src={p.imagemMobile} alt="" loading="lazy" decoding="async" />
                      </span>
                    </span>
                    <span className={styles.projetoMeta}>
                      <span className={`headline ${styles.projetoNome}`}>{p.cliente}</span>
                      <span className={styles.projetoLocal}>
                        {p.frente.replace(/^\d+ /, "")}
                        {p.local ? ` · ${p.local}` : ""}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <Reveal className={styles.siteWrap}>
          <a className={`cr-btn cr-btn--secondary ${styles.site}`} href="./">
            Ver o site completo
          </a>
          <a className={styles.instagram} href={INSTAGRAM_URL} {...external}>
            @cresbi.oficial
          </a>
        </Reveal>

        <footer className={styles.footer}>
          <span>© 2026 CRESBI · cresbi.com.br</span>
        </footer>
      </div>
    </main>
  );
}
