"use client";

import { motion } from "motion/react";
import { messages, whatsappLink } from "@/lib/whatsapp";
import { Button, external } from "../ds/Button";
import { Delta } from "../ds/Delta";
import { InsightCard } from "../ds/InsightCard";
import { KpiCard } from "../ds/KpiCard";
import { Tag } from "../ds/Tag";
import { CountUp } from "../motion/CountUp";
import { DURATION, EASE, REDUCED_FADE, STAGGER, VIEWPORT } from "../motion/constants";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { useReduced } from "../motion/useReduced";
import styles from "./DataShowcase.module.css";

// Painel de exemplo ilustrativo (dados do guia do design system).
const kpis = [
  {
    label: "Receita no período",
    value: { to: 1.28, decimals: 2, prefix: "R$ ", suffix: " mi" },
    spark: "M0 34 L25 30 L50 31 L75 24 L100 26 L125 18 L150 20 L175 10 L200 6",
    foot: (
      <>
        <Delta dir="up" value="+12,4%" /> vs. jan–set 2025
      </>
    ),
  },
  {
    label: "Ticket médio",
    value: { to: 342, decimals: 0, prefix: "R$ ", suffix: "" },
    spark: "M0 14 L25 16 L50 12 L75 18 L100 20 L125 19 L150 24 L175 26 L200 25",
    foot: (
      <>
        <Delta dir="down" value="−3,1%" /> vs. jan–set 2025
      </>
    ),
  },
  {
    label: "Receita em risco",
    gold: true,
    value: { to: 186, decimals: 0, prefix: "R$ ", suffix: " mil" },
    spark: "M0 30 L25 28 L50 29 L75 22 L100 20 L125 22 L150 16 L175 14 L200 12",
    foot: <>38 clientes sem compra há 90+ dias</>,
  },
];

const rows = [
  { rank: "01", name: "Auto Center Vila Nova", tag: <Tag>Campeões</Tag>, revenue: "148.320,00", orders: "42", delta: <Delta dir="up" value="+18,2%" /> },
  { rank: "02", name: "Mecânica Irmãos Sato", tag: <Tag>Campeões</Tag>, revenue: "121.904,50", orders: "37", delta: <Delta dir="up" value="+6,0%" /> },
  { rank: "03", name: "Oficina Ponto Certo", tag: <Tag tone="neutral">Leais</Tag>, revenue: "98.115,00", orders: "29", delta: <Delta dir="flat" value="0,0%" /> },
  { rank: "04", name: "Garage 41 Performance", tag: <Tag tone="negative">Em risco</Tag>, revenue: "87.660,00", orders: "18", delta: <Delta dir="down" value="−24,5%" /> },
];

function Spark({ d, reduced }: { d: string; reduced: boolean }) {
  const area = `${d} L200 40 L0 40Z`;
  return (
    <svg className="cr-kpi__spark" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        className="area"
        d={area}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: reduced ? REDUCED_FADE : DURATION.highlight, ease: EASE, delay: reduced ? 0 : 0.4 }}
      />
      <motion.path
        d={d}
        initial={reduced ? { opacity: 0 } : { pathLength: 0 }}
        whileInView={reduced ? { opacity: 1, pathLength: 1 } : { pathLength: 1 }}
        viewport={VIEWPORT}
        transition={reduced ? { duration: REDUCED_FADE } : { duration: 0.9, ease: EASE }}
      />
    </svg>
  );
}

export function DataShowcase() {
  const reduced = useReduced();

  return (
    <section id="dados" data-nav="dados" className="section" aria-labelledby="dados-title">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="cr-overline">{"// 04 dados"}</span>
          </Reveal>
          <SplitText id="dados-title" className="display-l title-l" text="Decisões com números, não com achismo." />
        </div>

        <Reveal className={styles.panel}>
          <div className={styles.panelBar}>
            <span>cresbi / painel_vendas</span>
            <span className={styles.note}>exemplo ilustrativo</span>
          </div>

          <div className={styles.kpis}>
            {kpis.map((k) => (
              <KpiCard
                key={k.label}
                label={k.label}
                gold={k.gold}
                value={<CountUp value={k.value.to} decimals={k.value.decimals} prefix={k.value.prefix} suffix={k.value.suffix} />}
                spark={<Spark d={k.spark} reduced={reduced} />}
                foot={k.foot}
                className={styles.kpi}
              />
            ))}
          </div>

          <div className={styles.lower}>
            <div className="cr-table-wrap" tabIndex={0} role="region" aria-label="Ranking de clientes, exemplo ilustrativo">
              <table className="cr-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Segmento</th>
                    <th scope="col" className="is-num">Receita</th>
                    <th scope="col" className="is-num">Pedidos</th>
                    <th scope="col" className="is-num">Var.</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <motion.tr
                      key={r.rank}
                      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT}
                      transition={
                        reduced ? { duration: REDUCED_FADE } : { duration: DURATION.enter, ease: EASE, delay: 0.2 + i * STAGGER.rows }
                      }
                    >
                      <td className="is-rank">{r.rank}</td>
                      <td>{r.name}</td>
                      <td>{r.tag}</td>
                      <td className="is-num">{r.revenue}</td>
                      <td className="is-num">{r.orders}</td>
                      <td className="is-num">{r.delta}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.insight}>
              <InsightCard
                index="01"
                title="Reative os 38 clientes que pararam de comprar"
                body="Eles respondiam por R$ 186 mil por ano. Uma oferta de recompra no mix que já levavam recupera parte desse valor."
                meta={
                  <>
                    <Tag tone="negative">Em risco</Tag>
                    <Tag tone="neutral">Impacto alto</Tag>
                  </>
                }
              />
            </div>
          </div>
        </Reveal>

        <Reveal className={styles.actions}>
          <Button variant="secondary" href="exemplo-analise-demonstrativa.html" {...external}>
            Ver relatório de exemplo
          </Button>
          <Button href={whatsappLink(messages.raioX)} {...external}>
            Quero meu Raio-X
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
