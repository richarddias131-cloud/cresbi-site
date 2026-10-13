// Screenshots de página inteira do build estático (out/) em 390, 768 e 1440px,
// com e sem prefers-reduced-motion, e checagem de rolagem horizontal.
// Rode: npm run build && npm run shots   (saída em .shots/)
import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { launch } from "./browser.mjs";

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml" };
const root = join(process.cwd(), "out");
const server = createServer((req, res) => {
  let p = join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!existsSync(p)) {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, { "content-type": TYPES[extname(p)] ?? "application/octet-stream" });
  createReadStream(p).pipe(res);
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

mkdirSync(".shots", { recursive: true });
const browser = await launch();
const problems = [];

for (const width of [390, 768, 1440]) {
  for (const motion of ["no-preference", "reduce"]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: motion, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => problems.push(`[${width}/${motion}] erro JS: ${e.message}`));
    page.on("console", (m) => m.type() === "error" && problems.push(`[${width}/${motion}] console: ${m.text()}`));
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    // Rola a página toda para disparar as revelações.
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 400) {
      await page.evaluate((top) => (window.__lenis ? window.__lenis.scrollTo(top, { immediate: true }) : window.scrollTo(0, top)), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1200);
    await page.evaluate(() => (window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)));
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const wide = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.right > w + 1 && getComputedStyle(el).position !== "fixed" && !el.closest("[aria-hidden='true'], .cr-table-wrap, canvas");
        })
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
      return { scroll: document.documentElement.scrollWidth - w, wide };
    });
    if (overflow.scroll > 0) problems.push(`[${width}/${motion}] rolagem horizontal de ${overflow.scroll}px`);
    if (overflow.wide.length) problems.push(`[${width}/${motion}] elementos além da borda: ${overflow.wide.join(", ")}`);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll("a, button, input, select, textarea")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && r.height < 44 && !el.classList.contains("skip-link");
        })
        .slice(0, 8)
        .map((el) => `${el.tagName.toLowerCase()}("${(el.textContent || "").trim().slice(0, 24)}" ${Math.round(el.getBoundingClientRect().height)}px)`),
    );
    if (small.length && width === 390) problems.push(`[${width}/${motion}] alvos < 44px: ${small.join(", ")}`);
    const file = `.shots/${width}-${motion === "reduce" ? "reduced" : "motion"}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log("ok", file);
    await ctx.close();
  }
}

await browser.close();
server.close();
console.log(problems.length ? `\nProblemas:\n${problems.join("\n")}` : "\nSem rolagem horizontal, sem erros de JS.");
