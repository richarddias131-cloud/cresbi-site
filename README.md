# CRESBI — Site Institucional

Site oficial da marca CRESBI. HTML/CSS/JS estático, sem build, sem
dependências externas — abrir `index.html` diretamente no navegador já
funciona.

A CRESBI é posicionada como a marca de inteligência de negócios; os
produtos (CRESBI Analyzer, CRESBI Analyzer Varejo) são soluções dentro
dela, não o contrário. Esse é o motivo da estrutura de pastas abaixo: a
home nunca deveria precisar ser reconstruída para receber um produto novo.

## Estrutura

```
CRESBI SITE/
├── index.html              → Home institucional
├── analyzer/                → Página de vendas completa do CRESBI Analyzer
│   ├── index.html            (self-contained: styles.css/script.js próprios,
│   ├── styles.css             não usa assets/ da raiz — ver "Páginas de
│   ├── script.js               produto" abaixo)
│   └── exemplo-analise-demonstrativa.html
├── analyzer-varejo/          → Página de vendas completa do CRESBI Analyzer
│   ├── index.html              Varejo, mesma estrutura da de analyzer/ acima
│   ├── styles.css               (também self-contained; styles.css/script.js
│   ├── script.js                 são cópias, não os mesmos arquivos)
│   └── exemplo-analise-demonstrativa.html
├── sobre/index.html        → Página institucional (curta)
├── contato/index.html      → Canais de contato
├── assets/
│   ├── css/styles.css      → Design system único, compartilhado por todas as páginas
│   ├── js/main.js          → Header, menu mobile, dropdown, animação de entrada, CTA
│   └── logo/
│       ├── cresbi.png       → Arte original fornecida (ícone + "CRESBI"), não
│       │                       usada no site — mantida só de referência
│       ├── cresbi-mark.png  → Recorte só do ícone, também não usado no site
│       └── favicon.png      → Ícone da aba do navegador (chip de cor ink/petrol,
│                               sem ilustração — ver "Marca" abaixo)
├── robots.txt
└── sitemap.xml
```

Todas as páginas institucionais (home, sobre, contato, analyzer-varejo)
importam o **mesmo** `assets/css/styles.css` e `assets/js/main.js` — não
crie folhas de estilo por página. A exceção é `analyzer/`: como é a página
de vendas completa do produto, ela é self-contained com seu próprio
`styles.css`/`script.js` (design system idêntico, mas copiado, não
compartilhado — ver "Páginas de produto" abaixo).

Um produto novo (ex.: `CRESBI Analyzer X`) deve virar uma nova pasta e
ganhar um item no dropdown "SOLUÇÕES" do header (repetido em todas as
páginas) e no rodapé.

## Marca

A marca CRESBI no site é **só tipográfica** — a palavra "CRESBI" em
Bahnschrift, sem ícone/monograma ao lado, no header e no rodapé (classe
`.brand-word`). Uma ilustração (cérebro + gráfico) foi testada como marca
d'água do header/rodapé e removida a pedido — não usar `cresbi.png` nem
`cresbi-mark.png` como logo visível no site. O favicon é apenas um chip
de cor (ink + barra petróleo), sem ilustração, para não repetir o mesmo
problema em miniatura.

## Identidade visual

Os tokens de cor e tipografia em `assets/css/styles.css` são os mesmos do
site do CRESBI Analyzer (`CRESBI ANALYZER/Site/styles.css`): `--ink`,
`--petrol`, `--cobalt`, `--paper`, fonte de destaque Bahnschrift/Roboto
Condensed. Isso é intencional — o institucional e os produtos precisam
parecer a mesma marca. Ao editar cores, atualize os dois lugares ou migre
ambos para um arquivo de tokens compartilhado.

Princípio central do layout: alternância entre blocos claros e escuros
(ver comentários `<!-- ======= -->` dentro de `index.html`). Não adicione
uma seção nova sem decidir conscientemente se ela é clara ou escura.

## Configuração antes de publicar

No topo de `assets/js/main.js`:

```js
const SITE_CONFIG = Object.freeze({
  whatsappNumber: "5511932317374",
  whatsappMessage: "...",
  email: "contato@cresbi.com.br"
});
```

Todo botão/link com `data-cta` recebe automaticamente o link de WhatsApp
configurado ali e abre em nova aba. Não escreva `href` de WhatsApp direto
no HTML — sempre use `data-cta`.

## Páginas de produto (`/analyzer/` e `/analyzer-varejo/`)

Por design, a Home **não** lista todos os recursos dos produtos — ela
posiciona a marca e direciona para a página certa (ver seção 19 do
briefing original).

- **`/analyzer/`** já é a página de vendas completa do CRESBI Analyzer
  (a mesma que vivia em `CRESBI ANALYZER/Site/`, copiada para cá). Ela é
  self-contained — não depende de `assets/` da raiz. Ao integrá-la, o
  header/rodapé dela ganharam links de volta para o site institucional
  (`CRESBI` → `../index.html`, `CRESBI Analyzer Varejo` → o outro
  produto) além dos links internos que ela já tinha (`Fale com a gente`,
  `Contato`, `Exemplo de análise`, `Privacidade`) — esses últimos não
  foram alterados.
  A página também foi enxugada (~24.900px → ~17.850px, 28% menor): foram
  removidas as seções "Dinheiro em risco", "Inteligência sobre
  vendedores", "Visão 360º da operação", "Momentos de uso", "Exemplo
  visual" e "Antes de analisar sua base" — redundantes com outras
  seções que ficaram (ex.: vendedores continua coberto em "O que o
  Analyzer analisa" e no que-você-recebe da oferta) — e o FAQ caiu de 15
  para 8 perguntas (mantidas as que removem objeção de compra; cortadas
  as mais operacionais/nicho). As seções restantes foram renumeradas em
  sequência (01–13). Se essa página for atualizada de novo por fora
  (copiada de `CRESBI ANALYZER/Site/` mais recente), repita esses ajustes
  de link e, se o objetivo continuar sendo uma página mais curta, os
  cortes acima — ou eles se perdem.
- **`/analyzer-varejo/`** segue exatamente a mesma estrutura de `/analyzer/`
  (13 seções numeradas + hero + qualificação + FAQ + CTA final), com o
  copy adaptado para varejo/consumidor final. Diferente do Analyzer, ela
  não foi copiada de um site externo — foi escrita do zero seguindo o
  padrão do Analyzer, com o conteúdo (RFM, cohorts, cesta de compras,
  curva ABC, segmentos de comportamento) baseado na metodologia real do
  produto em `CRESBI ANALYZER B2C/docs/METODOLOGIA.md`. O `exemplo-
  analise-demonstrativa.html` dela é o relatório demonstrativo real da
  "Loja Demonstração" (copiado de `CRESBI ANALYZER B2C/Relatorios
  Demonstrativos/`). Se a metodologia do produto mudar, revise se o copy
  desta página ainda reflete o que o Analyzer Varejo realmente entrega.

## O que falta antes de ir ao ar

- [ ] Confirmar o domínio final e atualizar `canonical` e os links em
      `robots.txt` / `sitemap.xml` (estão apontando para `cresbi.com.br`).
- [ ] Validar textos com o time (todo o copy segue as regras do
      briefing: sem "revolucione seu negócio", "leve para o próximo
      nível" etc.).
