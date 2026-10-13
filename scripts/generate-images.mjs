// Gera public/og-image.png (1200 × 630) e public/apple-touch-icon.png (180 × 180)
// a partir do logo e dos tokens do design system. Rode: node scripts/generate-images.mjs
import { readFileSync } from "node:fs";
import { launch } from "./browser.mjs";

const tokens = readFileSync("cresbi-design-system/tokens.css", "utf8").replace(
  /url\("fonts\//g,
  `url("file://${process.cwd()}/cresbi-design-system/fonts/`,
);
const logo = readFileSync("cresbi-design-system/assets/logos/cresbi-logo-dark.svg", "utf8");
const mark = readFileSync("cresbi-design-system/assets/logos/cresbi-mark-dark.svg", "utf8");

const og = `<!doctype html><html data-theme="dark"><head><meta charset="utf-8"><style>${tokens}
html,body{margin:0}
.og{width:1200px;height:630px;box-sizing:border-box;position:relative;overflow:hidden;padding:72px 80px;display:flex;flex-direction:column;
background-color:var(--ground);background-image:linear-gradient(var(--surface) 1px,transparent 1px),linear-gradient(90deg,var(--surface) 1px,transparent 1px);background-size:40px 40px;color:var(--text);font-family:var(--font-sans)}
.logo svg{height:48px;width:auto;display:block}
.over{margin-top:auto;font:500 18px/24px var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted)}
h1{margin:20px 0 0;font:600 64px/68px var(--font-sans);letter-spacing:-.045em;max-width:820px}
h1 em{font-style:normal;color:var(--gold)}
.foot{margin-top:40px;display:flex;justify-content:space-between;font:500 18px/24px var(--font-mono);color:var(--text-subtle)}
.cross{position:absolute;font:400 22px/1 var(--font-mono);color:var(--line-strong)}
.facet{position:absolute;right:-110px;top:60px;width:400px;height:400px}
.facet path{fill:none;stroke:var(--gold-deep);stroke-width:2}
.facet rect{fill:var(--gold)}
</style></head><body><div class="og">
<span class="cross" style="left:24px;top:24px">+</span><span class="cross" style="right:24px;top:24px">+</span>
<span class="cross" style="left:24px;bottom:24px">+</span><span class="cross" style="right:24px;bottom:24px">+</span>
<svg class="facet" viewBox="0 0 64 64"><path d="M45 19 L32 6 L6 32 L32 58 L45 45"/><rect x="26" y="26" width="12" height="12" transform="rotate(45 32 32)"/></svg>
<div class="logo">${logo}</div>
<div class="over">// estúdio de tecnologia para PMEs</div>
<h1>Tecnologia sob medida para empresas que querem <em>crescer</em>.</h1>
<div class="foot"><span>sistemas · sites · presença · dados · automações</span><span>cresbi.com.br</span></div>
</div></body></html>`;

const touch = `<!doctype html><html><head><style>html,body{margin:0}
.i{width:180px;height:180px;background:#0A0A0B;display:flex;align-items:center;justify-content:center}
.i svg{width:116px;height:116px}</style></head><body><div class="i">${mark}</div></body></html>`;

const browser = await launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(og, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.locator(".og").screenshot({ path: "public/og-image.png" });
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(touch, { waitUntil: "load" });
await page.locator(".i").screenshot({ path: "public/apple-touch-icon.png" });
await browser.close();
console.log("og-image.png e apple-touch-icon.png gerados em public/");
