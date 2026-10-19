/**
 * SHE IS — A Cinematic Tribute to Vietnamese Women (20/10)
 * An interactive, emotionally compelling digital tribute celebrating
 * Vietnamese Women's Day on October 20.
 */

import React, { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { PersonalizationProvider } from "./context/PersonalizationContext";
import { TopNav } from "./components/TopNav";
import { CinematicIntro } from "./components/CinematicIntro";
import { StoryScene } from "./components/StoryScene";
import { ReflectionSection } from "./components/ReflectionSection";
import { EditorialGallery } from "./components/EditorialGallery";
import { LetterExperience } from "./components/LetterExperience";
import { MysteryBloomOracle } from "./components/MysteryBloomOracle";
import { CelebrationScene } from "./components/CelebrationScene";
import { MessageComposer } from "./components/MessageComposer";
import { FinalScene } from "./components/FinalScene";

export default function App() {
  const [inspiredMessage, setInspiredMessage] = useState<string | null>(null);

  const scrollToScene = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LanguageProvider>
      <PersonalizationProvider>
        <div className="relative min-h-screen bg-[#111114] text-[#F7F0E7] selection:bg-[#C98F9A]/30 selection:text-[#F7F0E7] film-grain">
          {/* Top Bar Header adhering to strict 3-zone contract + Chapter Rail + VI/EN Switcher */}
          <TopNav />

          {/* Main Narrative Journey */}
          <main id="main-content">
            {/* Scene 01: Before The World Wakes */}
            <CinematicIntro onExploreClick={() => scrollToScene("stories")} />

            {/* Scene 02: She Is More Than One Story */}
            <StoryScene />

            {/* Scene 03: The Stories We Don't Always See */}
            <ReflectionSection />

            {/* Scene 04: A Gallery of Possibility */}
            <EditorialGallery onInspireMessage={(msg) => setInspiredMessage(msg)} />

            {/* Scene 05: A Letter To Every Woman */}
            <LetterExperience />

            {/* Interactive Feature: Draw Your 20.10 Botanical Oracle Card */}
            <MysteryBloomOracle onSelectForComposer={(msg) => setInspiredMessage(msg)} />

            {/* Scene 06: More Than A Greeting */}
            <CelebrationScene />

            {/* Scene 07: Pass The Light Forward (Interactive Message Composer & Link Builder) */}
            <MessageComposer inspiredMessage={inspiredMessage} />

            {/* Scene 08: The World Is Brighter With You (Finale) */}
            <FinalScene onRestart={handleRestart} />
          </main>
        </div>
      </PersonalizationProvider>
    </LanguageProvider>
  );
}
