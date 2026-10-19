import Hero from "@/components/Hero";
import WorkIntro from "@/components/WorkIntro";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import Marquee from "@/components/Marquee";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import CtaBand from "@/components/CtaBand";
import { getAbout, getFeaturedWorks, getLanding, getPackages, getSettings } from "@/lib/content";

export default async function Home() {
  const [landing, featured, packages, about, settings] = await Promise.all([
    getLanding(),
    getFeaturedWorks(),
    getPackages(),
    getAbout(),
    getSettings(),
  ]);

  return (
    <main>
      <Hero landing={landing} />
      <WorkIntro landing={landing} />
      <PortfolioCarousel slides={featured} />
      <Marquee words={landing.marqueeWords} />
      <Pricing packages={packages} landing={landing} />
      <About about={about} />
      <CtaBand landing={landing} settings={settings} />
    </main>
  );
}
