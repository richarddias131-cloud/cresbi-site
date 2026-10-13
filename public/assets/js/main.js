/* ==========================================================================
   CRESBI — SITE INSTITUCIONAL
   Comportamento compartilhado por todas as páginas.
   ========================================================================== */

/* Configuração comercial central. Altere aqui antes de publicar. */
const SITE_CONFIG = Object.freeze({
  whatsappNumber: "5511932317374",
  whatsappMessage: "Olá! Vim do site institucional da CRESBI e gostaria de entender como as soluções podem ajudar no meu negócio.",
  email: "contato@cresbi.com.br"
});

const primaryCtaUrl = "https://wa.me/" + SITE_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(SITE_CONFIG.whatsappMessage);

document.querySelectorAll("[data-cta]").forEach((link) => {
  link.href = primaryCtaUrl;
  link.target = "_blank";
  link.rel = "noopener";
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ---------- header: sombra ao rolar ---------- */
const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".main-nav");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 14);
};
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* ---------- menu mobile ---------- */
navToggle?.addEventListener("click", () => {
  const open = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Abrir menu");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("nav-open")) {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.focus();
  }
});

/* ---------- dropdown "SOLUÇÕES" (clique no mobile, hover no desktop via CSS) ---------- */
document.querySelectorAll(".nav-item > button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".nav-item");
    const isOpen = item.classList.contains("is-open");
    document.querySelectorAll(".nav-item.is-open").forEach((el) => el.classList.remove("is-open"));
    if (!isOpen) item.classList.add("is-open");
    btn.setAttribute("aria-expanded", String(!isOpen));
  });
});

/* ---------- animação de entrada (fade + subida), respeita reduced motion ---------- */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
}
