# CRESBI — cresbi.com.br

Landing page oficial da CRESBI: Next.js (App Router) + TypeScript, exportada
como site estático (`out/`). Animações com Motion, rolagem suave com Lenis e
um `<canvas>` próprio para a grade do hero.

A CRESBI entrega tecnologia sob medida para pequenas e médias empresas, em
quatro frentes, nesta ordem: **01 Sistemas sob medida** (inclui o Cresbi
Analyzer), **02 Presença digital** (sites, Google Meu Negócio e Instagram),
**03 Automações** e **04 Implementação de IA**.

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

- `content/site.ts`: as quatro frentes (cards de serviço, menu, rodapé, atalhos
  do WhatsApp e JSON-LD), linhas do Console do hero, faixa, fluxo de automação,
  exemplos de IA, etapas do método, diferenciais, projetos e FAQ.
- `lib/whatsapp.ts`: número do WhatsApp, Instagram e as mensagens prontas de
  cada botão do WhatsApp (incluindo os atalhos por frente da seção de contato).
  O e-mail foi tirado do site até a caixa contato@cresbi.com.br estar configurada.
- Títulos e textos de cada seção: `components/sections/*.tsx`.
- Título, descrição e dados estruturados (SEO): `app/layout.tsx`.

## Prints dos projetos

Cada projeto tem dois prints reais em `public/projetos/`: o do computador
(`cliente.jpg`, 960 × 1200px, tirado de uma tela de 1440 × 1800px) e o do celular
(`cliente-mobile.jpg`, 360 × 780px, tirado de uma tela de 390 × 844px). Em
`content/site.ts`, preencha `imagem` e `imagemMobile` (sem barra inicial), além de
`cliente`, `local`, `url`, `link`, `frente` e `resultado`.

A "janela" mostra o topo do print do computador e rola até o fim no hover; o
celular fica sobreposto no canto. Use JPG ou WebP com até ~250 KB.

## Placeholders que faltam preencher

| Onde | Placeholder |
| --- | --- |
| Seção "Por que a CRESBI" (opcional) | linha de métricas `[X] projetos entregues · [Y] empresas atendidas`: não foi publicada para não mostrar colchetes no ar. Se houver números reais, inclua em `components/sections/WhyCresbi.tsx` |

## Estrutura

```
app/
  layout.tsx          metadata, Open Graph, JSON-LD, fontes, tema escuro, Lenis
  page.tsx            monta as seções
  globals.css         importa tokens (gerado) + bundle.css do design system
components/
  ds/                 wrappers React dos componentes cr-* (Button, Tag, Console,
                      ServiceCard, Logo)
  sections/           Header, Hero, Ticker, Services, AutomationFlow, AiSection,
                      Process, WhyCresbi, Cases, Faq, FinalCta, Footer
  motion/             constantes de movimento, Reveal, SplitText, Typewriter,
                      Magnetic, GridCanvas, ScrollProgress, SmoothScroll
content/site.ts       textos
lib/whatsapp.ts       links wa.me e mensagens
public/               fontes, logos, favicon, OG, robots, sitemap, prints e as páginas do Cresbi Analyzer
scripts/              sync de tokens, geração de imagens e screenshots
cresbi-design-system/ referência da marca (cores, fontes e componentes; não editar)
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

## Página de links da bio (`/links`)

`app/links/page.tsx` é a página para a bio do Instagram (@cresbi.oficial): botão
do WhatsApp com a mensagem "Vim pelo Instagram", as quatro frentes (levam aos
cards do site), os projetos e o link para o site completo. Ela lê as frentes e
os projetos de `content/site.ts`, então acompanha qualquer mudança neles.

O símbolo do topo é o do perfil do Instagram (três barras, a do meio em ouro),
desenhado em SVG no próprio arquivo.

O endereço é `/links`, sem barra no final (`trailingSlash: false` em
`next.config.ts`): o build gera `out/links.html`, e o GitHub Pages serve esse
arquivo em `/links`.

## Cresbi Analyzer e redirecionamentos

O Cresbi Analyzer é um sistema da frente 01 (Sistemas sob medida): um
analisador de vendas. As páginas dele são HTML estático em `public/`:

- `/analyzer/` e `/analyzer-varejo/`: páginas do produto, com os relatórios
  demonstrativos (`exemplo-analise-demonstrativa.html`) de cada um. Detalhes em
  `public/analyzer/README.md`.

Páginas antigas que viraram redirecionamento (HTML com `meta refresh`,
`canonical` e `noindex`, porque o GitHub Pages não redireciona no servidor):

| Endereço antigo | Vai para |
| --- | --- |
| `/sobre/` | `/#diferenciais` |
| `/contato/` | `/#contato` |
| `/exemplo-analise-demonstrativa.html` | `/analyzer/exemplo-analise-demonstrativa.html` |
