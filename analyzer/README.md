# Site — CRESBI Analyzer

Landing page estática e independente de frameworks.

## Arquivos

- `index.html`: conteúdo, SEO e estrutura semântica.
- `styles.css`: design system, layout e responsividade.
- `script.js`: configuração comercial e interações.
- `exemplo-analise-demonstrativa.html`: cópia do relatório real gerado pelo CRESBI Analyzer para a
  "Empresa Demonstração" (dados fictícios). Linkado nas seções de demonstração e exemplo visual
  ("VER EXEMPLO DE ANÁLISE") e no rodapé. Ao gerar uma nova demonstração oficial
  (`scripts/generate_demo_reports.py`), substitua este arquivo mantendo o mesmo nome para não
  quebrar os links.

## Visualização local

Abra `index.html` diretamente no navegador. Nenhuma instalação é necessária.

## Configuração antes da publicação

No início de `script.js`, o objeto `SITE_CONFIG` já aponta para o WhatsApp oficial
((11) 93231-7374), com mensagem pré-preenchida. Para trocar o número ou o texto, altere só isso:

```js
const SITE_CONFIG = Object.freeze({
  primaryCtaUrl: "https://wa.me/55DDDNUMERO?text=" + encodeURIComponent("Sua mensagem aqui.")
});
```

Todos os botões principais (`[data-cta]`) usam essa configuração central e abrem em nova aba.
O site não exibe preço — todas as chamadas levam para contato direto com a equipe CRESBI.
