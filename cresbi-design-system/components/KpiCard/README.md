# KpiCard

Card de indicador para dashboards, painéis de sistema e relatórios: rótulo, número principal, tendência e comparação.

**Marcação:** um `.cr-kpi` contendo `.cr-overline` (rótulo), `.cr-kpi__value` (número), opcionalmente `svg.cr-kpi__spark` (linha de tendência com `path.area` + `path`) e `.cr-kpi__foot` (Delta + base de comparação).

**O consumidor fornece:** o rótulo, o valor formatado, a série da tendência (8–12 pontos) e a base de comparação.

- Números sempre em Geist Mono (`kpi`), formatados em pt-BR: "R$ 1,28 mi", "R$ 342", "41%".
- Diga sempre contra o quê se compara ("vs. jan–set 2025", "vs. meta").
- Use `--gold` (no rótulo e no valor) em apenas UM card da linha: o número que a reunião precisa discutir.
- Grade de 3 ou 4 cards por linha, gap `space-4`; nunca sombras.
