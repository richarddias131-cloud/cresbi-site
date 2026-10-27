import { Header } from "@/components/sections/Header";
import { Intro } from "@/components/sections/Intro";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Frentes } from "@/components/sections/Frentes";
import { Metodo } from "@/components/sections/Metodo";
import { Cases } from "@/components/sections/Cases";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Manifesto />
        <Frentes />
        <Metodo />
        <Cases />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
