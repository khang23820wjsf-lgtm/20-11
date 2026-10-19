import React, { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "../data/siteConfig";
import { BotanicalDivider } from "./BotanicalArt";
import { FloatingParticles } from "./FloatingParticles";
import { soundscape } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";

export const CelebrationScene: React.FC = () => {
  const { lang } = useLanguage();
  const { scene06, images } = siteConfig;
  const [illuminatedWishes, setIlluminatedWishes] = useState<Record<number, boolean>>({
    0: true,
    5: true,
  });
  const [burstCount, setBurstCount] = useState<number>(0);

  const activeWishes = lang === "vi" ? scene06.wishes : scene06.wishesEn;

  const toggleWish = (idx: number) => {
    setIlluminatedWishes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
    soundscape.playInteractionChime("soft");
  };

  const illuminateAll = () => {
    const all: Record<number, boolean> = {};
    activeWishes.forEach((_, idx) => {
      all[idx] = true;
    });
    setIlluminatedWishes(all);
    setBurstCount((c) => c + 1);
    soundscape.playInteractionChime("bloom");
  };

  const litCount = Object.values(illuminatedWishes).filter(Boolean).length;
  const allLit = litCount === activeWishes.length;

  return (
    <section
      id="wishes"
      className="relative py-28 md:py-36 bg-gradient-to-b from-[#1e121c] via-[#2b1826] to-[#161119] text-[#F7F0E7] px-6 overflow-hidden"
    >
      {/* Background botanical imagery with soft ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
        <img
          src={images.botanicalWarm}
          alt={
            lang === "vi"
              ? "Họa tiết thực vật và hoa khô thanh nhã"
              : "Delicate botanical flora on warm linen"
          }
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-center filter saturate-75 contrast-115"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161119] via-[#2b1826]/65 to-[#1e121c]" />
      </div>

      {/* Golden floating particles */}
      <FloatingParticles
        density="medium"
        tint="gold"
        withPetals={true}
        burstTrigger={burstCount}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="text-xs font-sans tracking-[0.32em] uppercase text-[#D4B47A] mb-3 block">
            {lang === "vi" ? scene06.label : scene06.labelEn}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F0E7] leading-tight mb-4 text-balance">
            {lang === "vi" ? scene06.title : scene06.titleEn}
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#F7F0E7]/75 font-light mb-6">
            {lang === "vi" ? scene06.subtitle : scene06.subtitleEn}
          </p>
          <BotanicalDivider />
        </motion.div>

        {/* Wishes Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeWishes.map((wish, index) => {
            const isLast = index === activeWishes.length - 1;
            const isLit = Boolean(illuminatedWishes[index]);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                onClick={() => toggleWish(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleWish(index);
                  }
                }}
                className={`group cursor-pointer p-7 sm:p-9 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                  isLast ? "md:col-span-2" : ""
                } ${
                  isLit
                    ? "bg-gradient-to-br from-[#351C2A]/85 via-[#2a1723]/90 to-[#1e121a] border-[#D4B47A]/65 shadow-[0_15px_45px_rgba(212,180,122,0.18)]"
                    : "bg-[#111114]/60 border-[#F7F0E7]/10 hover:border-[#D4B47A]/35 hover:bg-[#1e141f]/80"
                }`}
              >
                {/* Subtle golden corner glow when illuminated */}
                {isLit && (
                  <div
                    className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-35 blur-2xl"
                    style={{
                      background: "radial-gradient(circle, #D4B47A 0%, transparent 70%)",
                    }}
                  />
                )}

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-sm font-mono tabular-nums pt-1 transition-transform duration-500 ${
                        isLit
                          ? "text-[#D4B47A] scale-125"
                          : "text-[#F7F0E7]/35 group-hover:text-[#D4B47A]"
                      }`}
                    >
                      ✦
                    </span>
                    <p
                      className={`font-serif leading-relaxed transition-colors ${
                        isLast
                          ? "text-xl sm:text-2xl text-[#F7F0E7] font-normal"
                          : isLit
                          ? "text-lg sm:text-xl text-[#F7F0E7]"
                          : "text-lg sm:text-xl text-[#F7F0E7]/80 font-light"
                      }`}
                    >
                      {wish}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 text-[11px] font-mono tabular-nums tracking-widest uppercase px-2.5 py-1 rounded transition-colors ${
                      isLit
                        ? "text-[#D4B47A] bg-[#D4B47A]/15"
                        : "text-[#F7F0E7]/30 group-hover:text-[#F7F0E7]/60"
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Constellation Action */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={illuminateAll}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-sans tracking-[0.2em] uppercase bg-[#D4B47A]/20 hover:bg-[#D4B47A] text-[#D4B47A] hover:text-[#111114] border border-[#D4B47A]/50 transition-all duration-300 font-medium cursor-pointer shadow-lg"
          >
            {allLit ? (
              <>
                <Check className="w-4 h-4" />
                <span>
                  {lang === "vi"
                    ? "Đã thắp sáng trọn vẹn 6 lời nguyện cầu"
                    : "All 6 Wishes Illuminated"}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  {lang === "vi"
                    ? `Thắp sáng tất cả lời chúc (${litCount}/6)`
                    : `Illuminate All Wishes (${litCount}/6)`}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
