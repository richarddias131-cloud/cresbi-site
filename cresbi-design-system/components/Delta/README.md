# Delta

Selo de variação de um indicador contra o período ou a meta de comparação.

**Marcação:** `<span class="cr-delta cr-delta--up">+12,4%</span>`; `--down` (com sinal de menos tipográfico −) e `--flat`. O triângulo ▲/▼ ou o quadrado é desenhado pelo CSS — não digite o caractere.

**O consumidor fornece:** a variação já formatada em pt-BR (vírgula decimal) e a direção.

- Seta (automática) e sinal são obrigatórios: `positive` e `negative` se distinguem também por forma, não só por cor.
- Uma casa decimal para percentuais; valores monetários abreviados ("R$ 48 mil", "R$ 1,2 mi").
- "Para cima" nem sempre é bom (custo, churn): nesses casos, `--down` indica melhora — escolha pela leitura de negócio, não pelo sinal matemático.
