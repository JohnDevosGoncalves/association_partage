import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { HistoireSection } from "@/components/sections/HistoireSection";
import { BridgeMapSection } from "@/components/sections/BridgeMapSection";
import { BledisSection } from "@/components/sections/BledisSection";
import { AstronomieSection } from "@/components/sections/AstronomieSection";
import { CooperativeSection } from "@/components/sections/CooperativeSection";
import { KiosqueSection } from "@/components/sections/KiosqueSection";
import { MecenatSection } from "@/components/sections/MecenatSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/navigation/Footer";
import { ThermalScrollOverlay } from "@/components/parallax/ThermalScrollOverlay";

export default function Home() {
  return (
    <>
      <ThermalScrollOverlay />
      <Navbar />
      <main id="top" className="flex flex-col w-full">
        <Hero />
        <HistoireSection />
        <BridgeMapSection />
        <BledisSection />
        <AstronomieSection />
        <CooperativeSection />
        <KiosqueSection />
        <MecenatSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
