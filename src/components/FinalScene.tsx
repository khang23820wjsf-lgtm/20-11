import React, { useState } from "react";
import { Share2, ArrowUp, Heart, Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "../data/siteConfig";
import { FloatingParticles } from "./FloatingParticles";
import { BotanicalDivider } from "./BotanicalArt";
import { soundscape } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";

interface FinalSceneProps {
  onRestart: () => void;
}

export const FinalScene: React.FC<FinalSceneProps> = ({ onRestart }) => {
  const { lang } = useLanguage();
  const { scene08, brand, images } = siteConfig;
  const [copied, setCopied] = useState<boolean>(false);
  const [petalBurst, setPetalBurst] = useState<number>(1);

  const handleTriggerBloom = () => {
    setPetalBurst((prev) => prev + 1);
    soundscape.playInteractionChime("bloom");
  };

  const handleShareSite = async () => {
    const shareData = {
      title: "SHE IS — A Cinematic Tribute to Women | 20.10",
      text:
        lang === "vi"
          ? "Mỗi người phụ nữ là một thế giới riêng. Dành tặng những người phụ nữ tuyệt vời nhân ngày 20/10."
          : "Every woman is a universe of her own. A cinematic tribute celebrating Vietnamese Women's Day (20/10).",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <footer className="relative min-h-[92vh] flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#21121d] via-[#351C2A] to-[#111114] text-[#F7F0E7] px-6 py-24 text-center">
      {/* Background warm floral illumination */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <img
          src={images.botanicalWarm}
          alt={
            lang === "vi"
              ? "Ánh sáng ấm áp và hoa cỏ tĩnh lặng"
              : "Warm golden light and tranquil botanical flora"
          }
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-center filter saturate-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#351C2A]/65 to-[#21121d]" />
      </div>

      {/* Central Warm Golden Light Field */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full opacity-35 blur-3xl transition-transform duration-1000"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 180, 122, 0.55) 0%, rgba(201, 143, 154, 0.25) 45%, transparent 70%)",
          transform: `translate(-50%, -50%) scale(${1 + (petalBurst % 3) * 0.08})`,
        }}
      />

      {/* Floating particles & petals gathering in center */}
      <FloatingParticles
        density="high"
        tint="gold"
        withPetals={true}
        burstTrigger={petalBurst}
      />

      {/* Centerpiece Tribute */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-3xl mx-auto my-auto py-12 flex flex-col items-center"
      >
        {/* Interactive Lotus / Heart Seal */}
        <button
          type="button"
          onClick={handleTriggerBloom}
          title={
            lang === "vi"
              ? "Chạm để gửi ngàn cánh hoa ánh sáng"
              : "Click to release a shower of golden petals"
          }
          className="group relative w-16 h-16 rounded-full border border-[#D4B47A]/55 flex items-center justify-center mb-8 bg-[#351C2A]/75 hover:bg-[#D4B47A]/25 hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(212,180,122,0.3)] cursor-pointer"
        >
          <Heart className="w-6 h-6 text-[#D4B47A] fill-[#D4B47A]/35 group-hover:scale-110 transition-transform" />
        </button>

        <span className="text-xs font-sans tracking-[0.34em] uppercase text-[#D4B47A] mb-3 block">
          {lang === "vi" ? scene08.title : scene08.titleVi}
        </span>

        <h2 className="text-6xl sm:text-8xl font-serif font-light text-gold-gradient tracking-wider mb-6">
          {scene08.date}
        </h2>

        <BotanicalDivider className="mb-8" />

        <p className="text-2xl sm:text-3xl font-serif text-[#F7F0E7] leading-relaxed mb-4 text-balance max-w-2xl">
          &ldquo;
          {lang === "vi" ? scene08.primaryMessage : scene08.primaryMessageEn}
          &rdquo;
        </p>

        <p className="text-base sm:text-xl font-serif italic text-[#C98F9A] mb-12 font-light">
          {lang === "vi" ? scene08.secondaryMessage : scene08.secondaryMessageEn}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleTriggerBloom}
            type="button"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-[#D4B47A]/60 bg-[#351C2A]/80 hover:bg-[#351C2A] text-[#D4B47A] text-xs font-sans tracking-[0.2em] uppercase rounded-full font-medium transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>
              {lang === "vi" ? "Gửi Ngàn Hoa Ánh Sáng" : "Release Golden Petals"}
            </span>
          </button>

          <button
            onClick={handleShareSite}
            type="button"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#D4B47A] hover:bg-[#F7F0E7] text-[#111114] text-xs font-sans tracking-[0.2em] uppercase rounded-full font-medium transition-all duration-300 shadow-lg cursor-pointer whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-800" />
                <span>
                  {lang === "vi" ? "Đã sao chép liên kết!" : "Link Copied!"}
                </span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>
                  {lang === "vi" ? scene08.shareAction : scene08.shareActionEn}
                </span>
              </>
            )}
          </button>

          <button
            onClick={onRestart}
            type="button"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-[#F7F0E7]/20 hover:border-[#D4B47A] hover:bg-[#351C2A]/50 text-[#F7F0E7] text-xs font-sans tracking-[0.2em] uppercase rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <ArrowUp className="w-4 h-4 text-[#D4B47A]" />
            <span>
              {lang === "vi" ? scene08.restartAction : scene08.restartActionEn}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Discreet Footer Crediting */}
      <div className="relative z-10 pt-10 border-t border-[#F7F0E7]/10 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#F7F0E7]/45 tracking-wider gap-4">
        <span>
          {lang === "vi" ? brand.footerCreditVi : brand.footerCredit}
        </span>
        <span className="font-serif italic text-sm text-[#C98F9A]/85">
          &ldquo;{lang === "vi" ? brand.vietnameseTagline : brand.tagline}&rdquo;
        </span>
      </div>
    </footer>
  );
};
