"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { frentes } from "@/content/site";
import { messages, whatsappLink } from "@/lib/whatsapp";
import { Button, external } from "../ds/Button";
import { Logo } from "../ds/Logo";
import { DURATION, EASE, REDUCED_FADE } from "../motion/constants";
import { scrollToTarget } from "../motion/SmoothScroll";
import { useReduced } from "../motion/useReduced";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReduced();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const clickedRef = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Link ativo: o elemento [data-nav] que cruza a linha do meio da tela.
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    const compute = () => {
      const mid = window.innerHeight / 2;
      const hits = targets.filter((t) => {
        const r = t.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      // Com os cinco cards na mesma linha (desktop), mantém o último link clicado.
      const clicked = hits.find((t) => t.dataset.nav === clickedRef.current);
      setActive((clicked ?? hits[0])?.dataset.nav ?? null);
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#frente-"]');
      if (link) {
        clickedRef.current = link.hash.replace("#frente-", "");
        setActive(clickedRef.current);
      }
    };
    document.addEventListener("click", onClick);
    const io = new IntersectionObserver(compute, { rootMargin: "-50% 0px -50% 0px" });
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const goMobile = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // espera o menu liberar a rolagem
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToTarget(`#${id}`)));
  };

  const fade = reduced ? { duration: REDUCED_FADE } : { duration: DURATION.micro, ease: EASE };

  return (
    <header className={`${styles.wrap} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`cr-header ${styles.header}`}>
        <a href="#topo" className={styles.logoLink} aria-label="CRESBI, voltar ao início">
          <Logo height={19} />
        </a>
        <nav className={`cr-header__nav ${styles.nav}`} aria-label="Frentes">
          {frentes.map((f) => (
            <a key={f.id} href={`#frente-${f.id}`} aria-current={active === f.id ? "true" : undefined}>
              <span>{f.index}</span>
              {f.nav}
            </a>
          ))}
        </nav>
        <span className={`cr-header__status ${styles.status}`}>agenda aberta</span>
        <Button size="sm" href={whatsappLink(messages.geral)} {...external} className={styles.cta}>
          Falar no WhatsApp
        </Button>
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="icon" aria-hidden="true" /> : <Menu className="icon" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            className={styles.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
          >
            <nav aria-label="Menu" className={styles.menuNav}>
              {frentes.map((f, i) => (
                <motion.a
                  key={f.id}
                  href={`#frente-${f.id}`}
                  onClick={goMobile(`frente-${f.id}`)}
                  className={styles.menuLink}
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduced ? fade : { duration: DURATION.enter, ease: EASE, delay: 0.05 + i * 0.06 }}
                >
                  <span className={styles.menuIndex}>{f.index}</span>
                  {f.title}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className={styles.menuFoot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduced ? fade : { duration: DURATION.enter, ease: EASE, delay: 0.4 }}
            >
              <span className="cr-header__status">agenda aberta</span>
              <Button href={whatsappLink(messages.geral)} {...external} magnetic={false}>
                Falar no WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
