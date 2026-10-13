"use client";

import { motion } from "motion/react";
import { AtSign, Mail } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { frentes } from "@/content/site";
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, leadMessage, whatsappLink } from "@/lib/whatsapp";
import { Button, external } from "../ds/Button";
import { Console, ConsoleLine } from "../ds/Console";
import { Input, Select, Textarea } from "../ds/Field";
import { DURATION, EASE, REDUCED_FADE, VIEWPORT } from "../motion/constants";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { useInViewport } from "../motion/useInViewport";
import { useReduced } from "../motion/useReduced";
import styles from "./FinalCta.module.css";

type Fields = { nome: string; whatsapp: string; frente: string; mensagem: string };
type Errors = Partial<Record<keyof Fields, string>>;

const OPCOES = [...frentes.map((f) => f.title), "Ainda não sei"];

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.nome.trim().length < 2) e.nome = "Escreva seu nome para sabermos com quem falar.";
  const digits = f.whatsapp.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) e.whatsapp = "Informe DDD e os 9 dígitos.";
  if (!f.frente) e.frente = "Escolha uma frente ou “Ainda não sei”.";
  if (f.mensagem.trim().length < 10) e.mensagem = "Conte em uma ou duas frases o que precisa resolver.";
  return e;
}

export function FinalCta() {
  const reduced = useReduced();
  const sectionRef = useRef<HTMLElement>(null);
  const pulsing = useInViewport(sectionRef);
  const [fields, setFields] = useState<Fields>({ nome: "", whatsapp: "", frente: "", mensagem: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const set = (key: keyof Fields) => (e: { target: { value: string } }) => {
    const value = key === "whatsapp" ? formatPhone(e.target.value) : e.target.value;
    const next = { ...fields, [key]: value };
    setFields(next);
    if (tried) setErrors(validate(next));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTried(true);
    const found = validate(fields);
    setErrors(found);
    const firstError = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstError) {
      document.getElementById(`lead-${firstError}`)?.focus();
      return;
    }
    const url = whatsappLink(leadMessage(fields));
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section ref={sectionRef} id="contato" className={`section cr-grid ${styles.section}`} aria-labelledby="contato-title">

      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <Reveal>
            <span className="cr-overline">{"// próximo passo"}</span>
          </Reveal>
          <SplitText id="contato-title" className="display-l title-l" text="Conte seu processo. Nós desenhamos a solução." />
          <Reveal delay={0.1}>
            <ul className={styles.direct}>
              <li>
                <a href={`mailto:${EMAIL}`}>
                  <Mail className="icon" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} {...external}>
                  <AtSign className="icon" aria-hidden="true" />
                  {INSTAGRAM_HANDLE.replace("@", "")}
                </a>
              </li>
            </ul>
          </Reveal>
            <svg className={styles.facet} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <motion.path
                d="M45 19 L32 6 L6 32 L32 58 L45 45"
                initial={reduced ? { opacity: 0 } : { pathLength: 0 }}
                whileInView={reduced ? { opacity: 1, pathLength: 1 } : { pathLength: 1 }}
                viewport={VIEWPORT}
                transition={reduced ? { duration: REDUCED_FADE } : { duration: 1.6, ease: EASE }}
              />
              <g className={`${styles.stone} ${pulsing && !reduced ? styles.pulse : ""}`}>
                <rect x="26" y="26" width="12" height="12" transform="rotate(45 32 32)" />
              </g>
            </svg>
        </div>

        <Reveal delay={0.1} className={styles.formWrap}>
          <form className={styles.form} onSubmit={submit} noValidate aria-describedby="lead-nota">
            <Input
              id="lead-nome"
              label="Nome"
              autoComplete="name"
              placeholder="Ex.: Ana Souza"
              value={fields.nome}
              onChange={set("nome")}
              error={errors.nome}
            />
            <Input
              id="lead-whatsapp"
              label="WhatsApp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="(11) 91234-5678"
              value={fields.whatsapp}
              onChange={set("whatsapp")}
              error={errors.whatsapp}
              help="Com DDD."
            />
            <Select
              id="lead-frente"
              label="Frente de interesse"
              value={fields.frente}
              onChange={set("frente")}
              error={errors.frente}
              className={styles.select}
            >
              <option value="" disabled>
                Selecione
              </option>
              {OPCOES.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Select>
            <Textarea
              id="lead-mensagem"
              label="O que você precisa resolver?"
              rows={4}
              placeholder="Ex.: os pedidos chegam pelo WhatsApp e alguém passa tudo para a planilha à mão."
              value={fields.mensagem}
              onChange={set("mensagem")}
              error={errors.mensagem}
              className={styles.textarea}
            />
            <div className={styles.submit}>
              {sentUrl ? (
                <motion.div
                  initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduced ? { duration: REDUCED_FADE } : { duration: DURATION.micro, ease: EASE }}
                  role="status"
                >
                  <Console title="cresbi / contato.log" className={styles.sent}>
                    <ConsoleLine name="mensagem_preparada" status="abrindo_whatsapp" />
                  </Console>
                  <p className={styles.fallback}>
                    O WhatsApp não abriu?{" "}
                    <a href={sentUrl} {...external}>
                      Abrir a conversa
                    </a>
                  </p>
                </motion.div>
              ) : (
                <Button type="submit">
                  Enviar pelo WhatsApp <span aria-hidden="true">→</span>
                </Button>
              )}
            </div>
            <p id="lead-nota" className={styles.note}>
              Ao enviar, abrimos o WhatsApp com sua mensagem pronta. Nada é guardado neste site.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
