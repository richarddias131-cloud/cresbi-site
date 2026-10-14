import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Sem barra final: cada página vira um .html na raiz (ex.: out/links.html), então os
  // caminhos relativos de CSS, JS e fontes funcionam também em /links.
  trailingSlash: false,
  images: { unoptimized: true },
  // Caminhos relativos: o mesmo build funciona em cresbi.com.br e em
  // usuario.github.io/cresbi-site/.
  assetPrefix: ".",
};

export default nextConfig;
