import type { Metadata, Viewport } from "next";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { EMAIL, INSTAGRAM_URL, SITE_URL, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import "./globals.css";

const title = "CRESBI · Tecnologia sob medida para empresas que querem crescer";
const description =
  "Sistemas sob medida, sites, presença digital, dados e automações para pequenas e médias empresas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "CRESBI",
    title,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CRESBI · Tecnologia sob medida" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
};

const fontFaces = `
@font-face { font-family: "Geist"; src: url("fonts/Geist-Variable.woff2") format("woff2"); font-weight: 100 900; font-style: normal; font-display: swap; }
@font-face { font-family: "Geist Mono"; src: url("fonts/GeistMono-Variable.woff2") format("woff2"); font-weight: 100 900; font-style: normal; font-display: swap; }
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CRESBI",
  url: SITE_URL,
  logo: `${SITE_URL}/logos/cresbi-logo-dark.svg`,
  image: `${SITE_URL}/og-image.png`,
  description,
  email: EMAIL,
  telephone: `+${WHATSAPP_NUMBER}`,
  areaServed: "BR",
  sameAs: [INSTAGRAM_URL],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <head>
        <link rel="preload" href="fonts/Geist-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="fonts/GeistMono-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* @font-face de cresbi-design-system/tokens.css, com caminho relativo à página. */}
        <style>{fontFaces}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="cr-root">
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <ScrollProgress />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
