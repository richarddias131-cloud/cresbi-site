# Button

Botão de ação da CRESBI em quatro pesos: primário (ouro), secundário (contorno), código (contorno com `$` em mono) e fantasma (link).

**Marcação:** `<button class="cr-btn cr-btn--primary">Texto</button>` — troque o modificador por `--secondary`, `--code` ou `--ghost`; acrescente `--sm` para 36px de altura. Funciona em `<a>` também.

**O consumidor fornece:** o rótulo (verbo + objeto, sem ponto final) e o destino.

- Um único `--primary` por tela ou por seção: é o próximo passo comercial ("Quero meu Raio-X", "Agendar conversa").
- `--secondary` para a alternativa de menor compromisso ("Ver relatório de exemplo").
- `--code` é o toque tech: rótulo em minúsculas com underscore ("ver_projetos"); o `$` em ouro vem do CSS. No máximo um por bloco, nunca como ação principal.
- `--ghost` para ações de texto dentro de cards e tabelas.
- Desabilitado: atributo `disabled`; não use cinza manual.
- O foco usa `focus` (2px sólido, 2px de afastamento). Não remova.
- Não use ícones decorativos nem emoji no rótulo; uma seta `→` no fantasma é permitida.
