/* eslint-disable @next/next/no-img-element -- export estático; prints servidos de public/projetos */
import type { Metadata } from "next";
import { Bot, Cpu, Globe, MessageCircle, Workflow } from "lucide-react";
import { frentes, projetos, ticker } from "@/content/site";
import { whatsappLink } from "@/lib/whatsapp";
import { external } from "@/components/ds/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { HeroConsole } from "@/components/sections/HeroConsole";
import { LinksGrid } from "./LinksGrid";
import styles from "./links.module.css";

// Página de links da bio do Instagram (@cresbi.oficial). Endereço: /links

export const metadata: Metadata = {
  title: "CRESBI · Links",
  description:
    "Fale com a CRESBI no WhatsApp e conheça as frentes e os projetos: sistemas, presença digital, automações e IA.",
  alternates: { canonical: "/links" },
};

const mensagemInstagram = "Olá, CRESBI. Vim pelo Instagram e quero conversar sobre um projeto.";

const ICONES = [Cpu, Globe, Workflow, Bot];

const consoleBio = [
  { name: "instagram", status: "conectado" },
  { name: "whatsapp", status: "online" },
  { name: "agenda", status: "aberta" },
  { name: "seu_projeto", status: "aguardando", wait: true },
];

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
      {/* Topo: grade técnica com holofote, marcas de precisão e o perfil. */}
      <header className={styles.top}>
        <LinksGrid />
        <div className={styles.topInner}>
          <Reveal onMount delay={0.05} className={styles.avatarWrap}>
            <div className={styles.avatar}>
              <Barras className={styles.avatarMark} />
            </div>
          </Reveal>
          <Reveal onMount delay={0.15}>
            <Wordmark />
          </Reveal>
          <Reveal onMount delay={0.2}>
            <span className={styles.handle}>@cresbi.oficial</span>
          </Reveal>
          <SplitText
            as="h1"
            className={styles.title}
            text="Tecnologia sob medida para empresas que querem crescer."
            highlight="crescer"
            delay={0.3}
            onMount
          />
          <Reveal onMount delay={0.7} className={styles.pills}>
            <span className="cr-header__status">agenda aberta</span>
            <span className={styles.pill}>sistemas · presença · automações · ia</span>
          </Reveal>
        </div>
      </header>

      <div className={styles.column}>
        {/* Console: a assinatura da marca, digitado na entrada. */}
        <Reveal onMount delay={0.8}>
          <HeroConsole startAt={1.1} lines={consoleBio} title="cresbi / bio.log" />
        </Reveal>

        <Reveal onMount delay={0.9} className={styles.ctaWrap}>
          <Magnetic>
            <a className={`cr-btn cr-btn--primary ${styles.cta}`} href={whatsappLink(mensagemInstagram)} {...external}>
              <MessageCircle className={`icon ${styles.ctaIcon}`} aria-hidden="true" />
              Falar no WhatsApp
              <span aria-hidden="true">→</span>
            </a>
          </Magnetic>
          <span className={styles.note}>{"// a conversa abre com a mensagem pronta"}</span>
        </Reveal>

        <section aria-labelledby="links-frentes" className={styles.group}>
          <Reveal className={styles.groupHead}>
            <h2 id="links-frentes" className="cr-overline">
              {"// 01–04 frentes"}
            </h2>
          </Reveal>
          <ul className={styles.frentes}>
            {frentes.map((f, i) => {
              const Icon = ICONES[i];
              return (
                <Reveal as="li" key={f.id} delay={i * 0.07}>
                  <a className={styles.frente} href={`./#frente-${f.id}`}>
                    <span className={styles.frenteTop}>
                      <span className={styles.index}>{f.index}</span>
                      <Icon className="icon" aria-hidden="true" />
                    </span>
                    <span className={styles.frenteTitle}>{f.title}</span>
                    <span className={styles.frenteBody}>{f.resumo}</span>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="links-projetos" className={styles.group}>
          <Reveal className={styles.groupHead}>
            <h2 id="links-projetos" className="cr-overline">
              {"// projetos"}
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
                    <span className={styles.shotBar} aria-hidden="true">
                      <span className={styles.dots}>● ● ●</span>
                      <span className={styles.url}>{p.url}</span>
                    </span>
                    <img src={p.imagem} alt={`Página inicial de ${p.cliente}`} loading="lazy" decoding="async" />
                    <span className={styles.phone}>
                      <img src={p.imagemMobile} alt="" loading="lazy" decoding="async" />
                    </span>
                  </span>
                  <span className={styles.projetoMeta}>
                    <span className={styles.projetoFrente}>{p.frente}</span>
                    <span className={styles.projetoNome}>
                      {p.cliente} <span className="arrow">→</span>
                    </span>
                    {p.local ? <span className={styles.projetoLocal}>{p.local}</span> : null}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          </Reveal>
        </section>
      </div>

      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[0, 1].map((copy) => (
            <span key={copy} className={styles.tickerGroup}>
              {ticker.map((t) => (
                <span key={`${copy}-${t}`} className={styles.tickerItem}>
                  {t}
                  <span className={styles.sep}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.column}>
        <Reveal className={styles.siteWrap}>
          <a className={`cr-btn cr-btn--code ${styles.site}`} href="./">
            ver_site_completo
          </a>
        </Reveal>

        <footer className={styles.footer}>
          <Wordmark className={styles.footerMark} />
          <div className={styles.footerLine}>
            <span>© 2026 CRESBI · cresbi.com.br</span>
            <span>
              status: operacional <span className={styles.dot}>●</span>
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
