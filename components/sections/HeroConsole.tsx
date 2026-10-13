"use client";

import { useEffect, useState } from "react";
import { heroConsole } from "@/content/site";
import { Console } from "../ds/Console";
import { Typewriter } from "../motion/Typewriter";
import { useReduced } from "../motion/useReduced";
import styles from "./Hero.module.css";

type Step = { line: number; part: "prefix" | "name" | "status" | "done" };

/**
 * Console do hero: cada linha aparece com o prefixo [ok], depois o nome e o status
 * são digitados (~18ms por caractere). Todas as linhas já ocupam espaço desde o
 * início, então a digitação não desloca o layout.
 */
export function HeroConsole({ startAt }: { startAt: number }) {
  const reduced = useReduced();
  const [step, setStep] = useState<Step>({ line: -1, part: "prefix" });

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setStep({ line: 0, part: "prefix" }), startAt * 1000);
    return () => window.clearTimeout(id);
  }, [reduced, startAt]);

  // Prefixo visível por 120ms antes de digitar o nome.
  useEffect(() => {
    if (step.part !== "prefix" || step.line < 0) return;
    const id = window.setTimeout(() => setStep((s) => ({ ...s, part: "name" })), 120);
    return () => window.clearTimeout(id);
  }, [step]);

  const next = (line: number) => {
    setStep(line + 1 < heroConsole.length ? { line: line + 1, part: "prefix" } : { line, part: "done" });
  };

  return (
    <Console title="cresbi / entregas.log" className={styles.console}>
      {heroConsole.map((l, i) => {
        const shown = reduced || i <= step.line;
        const past = reduced || i < step.line || (i === step.line && step.part === "done");
        const typingName = i === step.line && step.part === "name";
        const typingStatus = i === step.line && step.part === "status";
        const nameStarted = past || typingName || typingStatus;
        const statusStarted = past || typingStatus;
        return (
          <li
            key={l.name}
            className={`cr-console__line${l.wait ? " is-wait" : ""} ${styles.consoleLine}`}
            style={{ opacity: shown ? 1 : 0 }}
          >
            <span className="cr-console__name">
              <Typewriter
                text={l.name}
                start={nameStarted}
                onDone={() => typingName && setStep({ line: i, part: "status" })}
              />
            </span>
            <span className="cr-console__status">
              <Typewriter text={l.status} start={statusStarted} onDone={() => typingStatus && next(i)} />
              {l.wait ? (
                <span
                  className="cr-console__cursor"
                  aria-hidden="true"
                  style={{ visibility: past || typingStatus ? "visible" : "hidden" }}
                />
              ) : null}
            </span>
          </li>
        );
      })}
    </Console>
  );
}
