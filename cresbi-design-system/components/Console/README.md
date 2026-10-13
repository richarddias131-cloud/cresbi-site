# Console

Painel em estilo terminal que mostra entregas, status ou etapas de um processo — o elemento mais reconhecível da linguagem tech da CRESBI.

**Marcação:** `div.cr-console` com `.cr-console__bar` (nome do "arquivo" à esquerda, `● ● ●` à direita) e `ul.cr-console__body` de `li.cr-console__line`, cada uma com `.cr-console__name` e `.cr-console__status`. O prefixo `[ok]` em ouro vem do CSS; `is-wait` troca por `[..]` para o item em andamento, que pode levar `.cr-console__cursor` no fim.

**O consumidor fornece:** o título do painel (`cresbi / <assunto>.log`), de 3 a 6 linhas reais e o status de cada uma.

- Um Console por página, no hero do site, numa proposta ou no relatório (etapas do projeto).
- Nomes em minúsculas com underscore (`sistema_pedidos`); status em uma palavra (`online`, `publicado`, `em_teste`).
- Só um item `is-wait` por vez; o cursor anima só nele e para com redução de movimento.
- Conteúdo sempre verdadeiro: nunca liste entregas que não existem.
