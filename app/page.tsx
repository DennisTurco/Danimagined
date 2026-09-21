import Hero from "@/components/Hero";
import WorkIntro from "@/components/WorkIntro";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import Marquee from "@/components/Marquee";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import CtaBand from "@/components/CtaBand";

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkIntro />
      <PortfolioCarousel />
      <Marquee />
      <Pricing />
      <About />
      <CtaBand />
    </main>
  );
}
