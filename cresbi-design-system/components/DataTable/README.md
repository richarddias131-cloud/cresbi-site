# DataTable

Tabela de ranking e detalhamento para sistemas, relatórios e dashboards entregues pela CRESBI.

**Marcação:** `.cr-table-wrap > table.cr-table`. Em células numéricas use `.is-num` (Geist Mono, alinhado à direita); a posição usa `.is-rank`; texto secundário `.is-muted`.

**O consumidor fornece:** cabeçalhos curtos, linhas já ordenadas e números formatados em pt-BR (ponto de milhar, vírgula decimal).

- Ordene pela coluna que responde à pergunta da tabela e numere com dois dígitos ("01").
- Cabeçalhos em caixa alta pequena; sem zebrado — as linhas se separam por `line`.
- Números sempre à direita e com o mesmo número de casas na coluna.
- Até 10 linhas no relatório; o resto vai para anexo.
