import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { HistoireSection } from "@/components/sections/HistoireSection";
import { BridgeMapSection } from "@/components/sections/BridgeMapSection";
import { BledisSection } from "@/components/sections/BledisSection";
import { AccessibiliteSection } from "@/components/sections/AccessibiliteSection";
import { AstronomieSection } from "@/components/sections/AstronomieSection";
import { CooperativeSection } from "@/components/sections/CooperativeSection";
import { KiosqueSection } from "@/components/sections/KiosqueSection";
import { MecenatSection } from "@/components/sections/MecenatSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/navigation/Footer";
import { ThermalScrollOverlay } from "@/components/parallax/ThermalScrollOverlay";
import { ScrollProgress } from "@/components/interactive/ScrollProgress";
import { Marquee } from "@/components/interactive/Marquee";
import { PartnersMarquee } from "@/components/interactive/PartnersMarquee";

const MARQUEE_ITEMS = [
  "Orléans",
  "Haut-Atlas",
  "2 700 km de fraternité",
  "Depuis 2015",
  "Reconnue d'intérêt général",
  "Loire & Atlas",
  "Sri Lanka",
  "Accueil PMR",
  "100 % bénévole",
];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ThermalScrollOverlay />
      <Navbar />
      <main id="top" className="flex flex-col w-full">
        <Hero />
        <Marquee items={MARQUEE_ITEMS} duration={55} />
        <HistoireSection />
        <BridgeMapSection />
        <BledisSection />
        <AccessibiliteSection />
        <AstronomieSection />
        <CooperativeSection />
        <KiosqueSection />
        <PartnersMarquee />
        <MecenatSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
