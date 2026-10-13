# CRESBI — cresbi.com.br

Landing page oficial da CRESBI: Next.js (App Router) + TypeScript, exportada
como site estático (`out/`). Animações com Motion, rolagem suave com Lenis e
um `<canvas>` próprio para a grade do hero.

A fonte da verdade visual é `cresbi-design-system/` (manual da marca, tokens,
componentes `cr-*`, logos e fontes). **Não edite essa pasta**: o site lê dela.

## Como rodar

Requer Node 20+ (testado com Node 22).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera o site estático em out/
npm run lint       # ESLint (sem avisos)
npm run typecheck  # TypeScript
npm run shots      # screenshots em 390/768/1440px, com e sem redução de movimento (.shots/)
```

`npm run dev` e `npm run build` rodam antes `scripts/sync-tokens.mjs`, que
copia `cresbi-design-system/tokens.css` para `app/styles/tokens.generated.css`
(trocando o caminho das fontes para `/fonts/`) e as fontes Geist para
`public/fonts/`. O arquivo gerado não vai para o git.

Para refazer a imagem de compartilhamento e o ícone do iPhone
(`public/og-image.png`, `public/apple-touch-icon.png`):

```bash
node scripts/generate-images.mjs
```

## Deploy

### Vercel (recomendado)

1. Em vercel.com, **Add New → Project** e importe este repositório.
2. A Vercel detecta o Next.js sozinha: build `npm run build`, saída `out/`
   (vem do `output: "export"` em `next.config.ts`). Não precisa de variáveis
   de ambiente.
3. Em **Settings → Domains**, adicione `cresbi.com.br` e `www.cresbi.com.br`
   e ajuste o DNS conforme a Vercel indicar.
4. Depois que o domínio estiver na Vercel, apague
   `.github/workflows/pages.yml` e o `public/CNAME`.

### GitHub Pages (como o site está hoje)

O domínio hoje é servido pelo GitHub Pages direto da branch `main`. Com o
Next.js, a raiz do repositório deixa de ter um `index.html`, então antes de
juntar esta versão na `main`:

- em **Settings → Pages → Build and deployment**, troque a origem para
  **GitHub Actions**; o workflow `.github/workflows/pages.yml` faz o build e
  publica `out/` a cada push na `main`.

Sem essa troca, o Pages passa a mostrar este README em vez do site.

## Onde trocar textos

- `content/site.ts`: frentes (cards de serviço e menu), linhas do Console do
  hero, faixa, fluxo de automação, etapas do método, diferenciais, projetos e
  FAQ.
- `lib/whatsapp.ts`: número, e-mail, Instagram e as mensagens prontas de
  cada botão do WhatsApp (incluindo a do formulário).
- Títulos e textos de cada seção: `components/sections/*.tsx`.
- Título, descrição e dados estruturados (SEO): `app/layout.tsx`.

## Prints dos projetos

1. Coloque as imagens em `public/projetos/` (ex.: `public/projetos/cliente-1.jpg`).
2. Em `content/site.ts`, no item do projeto, preencha `imagem: "/projetos/cliente-1.jpg"`,
   além de `cliente`, `url`, `frente` e `resultado`.

A "janela" mostra o topo do print e rola até o fim no hover. Use prints de
página inteira com proporção de cerca de 16:20 (por exemplo 1440 × 1800px),
em JPG ou WebP com até ~250 KB.

## Placeholders que faltam preencher

| Onde | Placeholder |
| --- | --- |
| `content/site.ts` → `projetos` (3 cards) | `[NOME DO CLIENTE]`, `[cliente].com.br`, `[RESULTADO EM UMA FRASE]`, print em `imagem` |
| `content/site.ts` → `faq` ("Quanto tempo leva?") | `[X]` a `[Y]` semanas |
| Seção "Por que a CRESBI" (opcional) | linha de métricas `[X] projetos entregues · [Y] empresas atendidas`: não foi publicada para não mostrar colchetes no ar. Se houver números reais, inclua em `components/sections/WhyCresbi.tsx` |

O painel da seção "Dados e BI" usa os números e nomes de exemplo do guia do
design system e está marcado como `exemplo ilustrativo` na tela.

## Estrutura

```
app/
  layout.tsx          metadata, Open Graph, JSON-LD, fontes, tema escuro, Lenis
  page.tsx            monta as seções
  globals.css         importa tokens (gerado) + bundle.css do design system
components/
  ds/                 wrappers React dos componentes cr-* (Button, Tag, Delta,
                      KpiCard, InsightCard, Console, Field, ServiceCard, Logo)
  sections/           Header, Hero, Ticker, Services, AutomationFlow, Process,
                      DataShowcase, WhyCresbi, Cases, Faq, FinalCta, Footer
  motion/             constantes de movimento, Reveal, SplitText, Typewriter,
                      CountUp, Magnetic, GridCanvas, ScrollProgress, SmoothScroll
content/site.ts       textos
lib/whatsapp.ts       links wa.me e mensagens
public/               fontes, logos, favicon, OG, robots, sitemap e as páginas antigas
scripts/              sync de tokens, geração de imagens e screenshots
cresbi-design-system/ referência da marca (não editar)
```

### Movimento

Tudo sai de `components/motion/constants.ts`: easing `cubic-bezier(0.22, 1, 0.36, 1)`,
durações de 200/500/800ms e stagger de 50–80ms. Com
`prefers-reduced-motion: reduce`, o Lenis, o holofote, a faixa, os pacotes do
fluxo, o pulso do símbolo e o cursor piscando ficam desligados, e o conteúdo
aparece já no estado final, com fades de até 200ms. Loops (faixa, fluxo,
canvas, pulso) pausam fora da tela e com a aba oculta.

A entrada do hero usa animação CSS (`components/motion/enter.module.css`) em
vez de JS, para o título aparecer na primeira pintura sem esperar a
hidratação (LCP).

## Páginas antigas

As páginas do site anterior continuam publicadas, sem alteração, a partir de
`public/`:

- `/analyzer/` e `/analyzer-varejo/`: páginas de vendas dos produtos, com os
  relatórios demonstrativos (`exemplo-analise-demonstrativa.html`) de cada um.
  Detalhes em `public/analyzer/README.md`.
- `/sobre/` e `/contato/`: páginas institucionais antigas, com `assets/` próprio.
- `/exemplo-analise-demonstrativa.html`: cópia do relatório demonstrativo do
  Cresbi Analyzer, usada pelo botão "Ver relatório de exemplo".

Elas ainda usam a identidade visual antiga. Vale migrar para o design system
ou redirecionar para a home.
