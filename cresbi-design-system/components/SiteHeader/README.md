# SiteHeader

Cabeçalho fixo do site cresbi.com.br e das landing pages.

**Marcação:** `header.cr-header` com `img.cr-header__logo` (logo horizontal do grupo Logos, versão do tema), `nav.cr-header__nav` (cada link com `<span>01</span>` antes do nome em minúsculas), `span.cr-header__status` opcional e um botão primário pequeno.

**O consumidor fornece:** até 5 links (padrão: as cinco frentes, "01 sistemas" … "05 automações"), um status curto ("agenda aberta") e a ação comercial principal.

- Use `cresbi-logo-dark.svg` no tema escuro e `cresbi-logo-light.svg` no claro, com 28px de altura.
- Marque a página atual com `aria-current="page"`.
- O botão do cabeçalho é o canal de conversão (WhatsApp); não coloque dois botões.
