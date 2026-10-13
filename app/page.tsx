import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Services } from "@/components/sections/Services";
import { AutomationFlow } from "@/components/sections/AutomationFlow";
import { Process } from "@/components/sections/Process";
import { AiSection } from "@/components/sections/AiSection";
import { WhyCresbi } from "@/components/sections/WhyCresbi";
import { Cases } from "@/components/sections/Cases";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Ticker />
        <Services />
        <AutomationFlow />
        <AiSection />
        <Process />
        <WhyCresbi />
        <Cases />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
