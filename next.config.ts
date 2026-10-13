import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Caminhos relativos: o mesmo build funciona em cresbi.com.br e em
  // usuario.github.io/cresbi-site/.
  assetPrefix: ".",
};

export default nextConfig;
