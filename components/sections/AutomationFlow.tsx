"use client";

import { Database, FileText, MessageCircle, Sheet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fluxo } from "@/content/site";
import { Console, ConsoleLine } from "../ds/Console";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { useInViewport } from "../motion/useInViewport";
import { useReduced } from "../motion/useReduced";
import styles from "./AutomationFlow.module.css";

const ICONS = [MessageCircle, Database, Sheet, FileText];
const TRAVEL_MS = 900; // pacote atravessando uma conexão
const GLOW_MS = 600; // nó aceso quando o pacote chega
const REST_MS = 1400; // pausa entre ciclos
const LOG_SIZE = 5;

type Log = { id: number; time: string; text: string };

const clock = (s: number) => {
  const h = 8 + Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => String(n).padStart(2, "0")).join(":");
};

const staticLogs: Log[] = fluxo.map((f, i) => ({ id: i, time: clock(i + 1), text: f.log }));

export function AutomationFlow() {
  const ref = useRef<HTMLElement>(null);
  const running = useInViewport(ref, "-10% 0px");
  const reduced = useReduced();
  const [lit, setLit] = useState<number | null>(null);
  const [packet, setPacket] = useState<{ edge: number; id: number } | null>(null);
  const [logs, setLogs] = useState<Log[]>(staticLogs);
  const seq = useRef({ seconds: staticLogs.length, id: staticLogs.length });

  useEffect(() => {
    if (reduced || !running) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    const arrive = (node: number) => {
      const s = seq.current;
      s.seconds += 1;
      s.id += 1;
      const entry = { id: s.id, time: clock(s.seconds), text: fluxo[node].log };
      setLit(node);
      setLogs((prev) => [...prev, entry].slice(-LOG_SIZE));
    };

    (async () => {
      while (!cancelled) {
        arrive(0);
        await wait(GLOW_MS);
        for (let edge = 0; edge < fluxo.length - 1 && !cancelled; edge++) {
          setLit(null);
          setPacket({ edge, id: seq.current.id });
          await wait(TRAVEL_MS);
          if (cancelled) return;
          setPacket(null);
          arrive(edge + 1);
          await wait(GLOW_MS);
        }
        setLit(null);
        await wait(REST_MS);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      setPacket(null);
      setLit(null);
    };
  }, [running, reduced]);

  const shownLogs = reduced ? staticLogs : logs;

  return (
    <section ref={ref} id="automacoes" data-nav="automacoes" className="section" aria-labelledby="automacoes-title">
      <div className="container">
        <div className={styles.top}>
          <div className="section-head">
            <Reveal>
              <span className="cr-overline">{"// 02 automações"}</span>
            </Reveal>
            <SplitText id="automacoes-title" className="display-l title-l" text="Seu negócio trabalhando enquanto você dorme." />
            <Reveal delay={0.1}>
              <p className="body-l section-lead">
                Conectamos WhatsApp, planilhas, sistemas e relatórios para que as tarefas repetitivas aconteçam sozinhas.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className={styles.log}>
            <Console title="cresbi / rotina.log" className={styles.console}>
              {Array.from({ length: LOG_SIZE }).map((_, i) => {
                const l = shownLogs[shownLogs.length - LOG_SIZE + i];
                return l ? (
                  <ConsoleLine
                    key={l.id}
                    className={styles.logLine}
                    name={
                      <>
                        <span className={styles.time}>{l.time}</span> {l.text}
                      </>
                    }
                  />
                ) : (
                  <li key={`empty-${i}`} className={styles.empty} aria-hidden="true" />
                );
              })}
            </Console>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ol className={styles.flow} aria-label="Exemplo de automação, em quatro etapas">
            {fluxo.map((node, i) => {
              const Icon = ICONS[i];
              return (
                <li key={node.event} className={styles.step}>
                  <div className={`${styles.node} ${lit === i ? styles.lit : ""}`}>
                    <Icon className="icon" aria-hidden="true" />
                    <span className={styles.system}>{node.system}</span>
                    <span className={styles.event}>{node.event}</span>
                  </div>
                  {i < fluxo.length - 1 ? (
                    <div className={styles.edge} aria-hidden="true">
                      {packet?.edge === i ? (
                        <span key={packet.id} className={styles.carrier}>
                          <span className={styles.packet} />
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
