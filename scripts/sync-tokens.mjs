// Copia tokens.css do design system para app/styles/, sem os @font-face (eles
// ficam inline em app/layout.tsx, com caminho relativo, para o site funcionar
// tanto na raiz do domínio quanto numa subpasta), e garante as fontes em public/.
// O design system continua sendo a única fonte da verdade: não edite o arquivo gerado.
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ds = "cresbi-design-system";
mkdirSync(join("app", "styles"), { recursive: true });
const css = readFileSync(join(ds, "tokens.css"), "utf8").replace(/^@font-face[^\n]*\n/gm, "");
writeFileSync(
  join("app", "styles", "tokens.generated.css"),
  `/* GERADO por scripts/sync-tokens.mjs a partir de ${ds}/tokens.css. Não edite. */\n${css}`,
);

mkdirSync(join("public", "fonts"), { recursive: true });
for (const file of readdirSync(join(ds, "fonts"))) {
  if (file.endsWith(".woff2")) copyFileSync(join(ds, "fonts", file), join("public", "fonts", file));
}
