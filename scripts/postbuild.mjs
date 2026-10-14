// Troca a 404 gerada pelo Next por uma página estática e autossuficiente.
// O GitHub Pages serve out/404.html em qualquer endereço inexistente, inclusive
// em subpastas, onde os caminhos relativos do build (CSS, JS, fontes) quebrariam.
// Esta versão não depende de nenhum arquivo externo.
import { readFileSync, rmSync, writeFileSync } from "node:fs";

const mark = readFileSync("cresbi-design-system/assets/logos/cresbi-mark-dark.svg", "utf8");
const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Página não encontrada · CRESBI</title>
<meta name="robots" content="noindex">
<style>
:root { color-scheme: dark; }
body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box;
  background-color: #0A0A0B; background-image: linear-gradient(#141416 1px, transparent 1px), linear-gradient(90deg, #141416 1px, transparent 1px); background-size: 40px 40px;
  color: #F2EFE8; font: 15px/24px "Helvetica Neue", Arial, sans-serif; }
main { max-width: 480px; display: flex; flex-direction: column; gap: 16px; }
svg { width: 40px; height: 40px; }
.code { font: 500 11px/16px ui-monospace, Menlo, Consolas, monospace; letter-spacing: .08em; text-transform: uppercase; color: #A6A29A; }
h1 { margin: 0; font-size: 32px; line-height: 38px; letter-spacing: -0.03em; }
p { margin: 0; color: #A6A29A; }
.actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
a { display: inline-flex; align-items: center; height: 44px; padding: 0 20px; border-radius: 4px; font-weight: 600; font-size: 14px; text-decoration: none; }
.primary { background: #C9A961; color: #14110A; }
.secondary { border: 1px solid #6E6B72; color: #F2EFE8; }
a:focus-visible { outline: 2px solid #DDBF7A; outline-offset: 2px; }
</style>
</head>
<body>
<main>
${mark}
<span class="code">// erro 404</span>
<h1>Página não encontrada.</h1>
<p>O endereço pode ter mudado. As frentes, os projetos e o contato estão na página inicial.</p>
<div class="actions">
<a class="primary" id="home" href="/">Ir para a página inicial</a>
<a class="secondary" href="https://wa.me/5511932317374?text=${encodeURIComponent("Olá, CRESBI. Quero conversar sobre um projeto para a minha empresa.")}" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
</div>
</main>
<script>
// No GitHub Pages sem domínio próprio, o site fica em /cresbi-site/.
if (location.pathname.indexOf("/cresbi-site/") === 0) document.getElementById("home").setAttribute("href", "/cresbi-site/");
</script>
</body>
</html>
`;

writeFileSync("out/404.html", html);
rmSync("out/404", { recursive: true, force: true });
rmSync("out/_not-found", { recursive: true, force: true });
rmSync("out/_not-found.html", { force: true });

// out/links/ só guarda dados de navegação interna do Next (a página usa links comuns).
// Sem a pasta, o GitHub Pages serve out/links.html direto em /links.
rmSync("out/links", { recursive: true, force: true });
console.log("out/404.html estática gerada");
