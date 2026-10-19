import React, { useState } from "react";
import { Sparkles, RotateCcw, Download, Send, Shuffle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { bloomOracleCards, BloomOracleCard } from "../data/bloomOracleData";
import { BotanicalDivider } from "./BotanicalArt";
import { FloatingParticles } from "./FloatingParticles";
import { soundscape } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";
import { usePersonalization } from "../context/PersonalizationContext";

interface MysteryBloomOracleProps {
  onSelectForComposer?: (message: string) => void;
}

const FlowerIllustration: React.FC<{ flowerId: string; className?: string }> = ({
  flowerId,
  className = "w-28 h-28",
}) => {
  switch (flowerId) {
    case "lotus":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" stroke="#D4B47A" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
          <circle cx="60" cy="60" r="44" stroke="#D4B47A" strokeWidth="0.6" opacity="0.3" />
          <path
            d="M60 22C68 38 72 54 60 78C48 54 52 38 60 22Z"
            stroke="#D4B47A"
            strokeWidth="1.5"
            fill="rgba(212, 180, 122, 0.18)"
          />
          <path
            d="M60 78C74 68 84 52 82 36C70 42 64 54 60 78Z"
            stroke="#D4B47A"
            strokeWidth="1.3"
            fill="rgba(201, 143, 154, 0.12)"
          />
          <path
            d="M60 78C46 68 36 52 38 36C50 42 56 54 60 78Z"
            stroke="#D4B47A"
            strokeWidth="1.3"
            fill="rgba(201, 143, 154, 0.12)"
          />
          <path
            d="M60 78C80 74 94 62 96 48C82 50 70 60 60 78Z"
            stroke="#C98F9A"
            strokeWidth="1.1"
          />
          <path
            d="M60 78C40 74 26 62 24 48C38 50 50 60 60 78Z"
            stroke="#C98F9A"
            strokeWidth="1.1"
          />
          <path d="M36 86C50 92 70 92 84 86" stroke="#D4B47A" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="60" cy="15" r="2" fill="#D4B47A" />
        </svg>
      );

    case "sunflower":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="52" stroke="#D4B47A" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.5" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <ellipse
              key={deg}
              cx="60"
              cy="30"
              rx="6"
              ry="16"
              transform={`rotate(${deg} 60 60)`}
              stroke="#D4B47A"
              strokeWidth="1.2"
              fill="rgba(212, 180, 122, 0.12)"
            />
          ))}
          <circle cx="60" cy="60" r="16" stroke="#D4B47A" strokeWidth="1.5" fill="#2A1621" />
          <circle cx="60" cy="60" r="10" stroke="#C98F9A" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="60" cy="60" r="3" fill="#D4B47A" />
        </svg>
      );

    case "rose":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="50" stroke="#C98F9A" strokeWidth="0.8" opacity="0.45" />
          <path
            d="M60 26C78 26 90 40 88 58C86 76 72 86 60 86C48 86 34 76 32 58C30 40 42 26 60 26Z"
            stroke="#D4B47A"
            strokeWidth="1.3"
            fill="rgba(201, 143, 154, 0.14)"
          />
          <path
            d="M42 48C50 36 70 36 78 48C82 60 70 74 60 74C50 74 38 60 42 48Z"
            stroke="#C98F9A"
            strokeWidth="1.3"
          />
          <path
            d="M50 54C54 46 66 46 70 54C72 60 65 66 60 66C55 66 48 60 50 54Z"
            stroke="#D4B47A"
            strokeWidth="1.3"
            fill="rgba(212, 180, 122, 0.2)"
          />
          <path d="M60 86V104M60 95L70 89M60 98L50 92" stroke="#D4B47A" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );

    case "magnolia":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="50" stroke="#D4B47A" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.45" />
          <path
            d="M60 20C70 36 72 56 60 80C48 56 50 36 60 20Z"
            stroke="#F7F0E7"
            strokeWidth="1.4"
            fill="rgba(247, 240, 231, 0.12)"
          />
          <path
            d="M60 80C76 70 88 52 84 32C70 40 64 56 60 80Z"
            stroke="#D4B47A"
            strokeWidth="1.3"
            fill="rgba(212, 180, 122, 0.14)"
          />
          <path
            d="M60 80C44 70 32 52 36 32C50 40 56 56 60 80Z"
            stroke="#D4B47A"
            strokeWidth="1.3"
            fill="rgba(212, 180, 122, 0.14)"
          />
          <path d="M42 88L78 80" stroke="#C98F9A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "camellia":
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="50" stroke="#C98F9A" strokeWidth="0.9" opacity="0.4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <circle
              key={deg}
              cx="60"
              cy="42"
              r="14"
              transform={`rotate(${deg} 60 60)`}
              stroke="#C98F9A"
              strokeWidth="1.2"
              fill="rgba(201, 143, 154, 0.1)"
            />
          ))}
          <circle cx="60" cy="60" r="10" stroke="#D4B47A" strokeWidth="1.4" fill="rgba(212, 180, 122, 0.25)" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
          <circle cx="60" cy="60" r="50" stroke="#D4B47A" strokeWidth="0.8" opacity="0.4" />
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
            <ellipse
              key={deg}
              cx="60"
              cy="34"
              rx="5"
              ry="15"
              transform={`rotate(${deg} 60 60)`}
              stroke="#F7F0E7"
              strokeWidth="1.1"
              fill="rgba(247, 240, 231, 0.1)"
            />
          ))}
          <circle cx="60" cy="60" r="11" stroke="#D4B47A" strokeWidth="1.5" fill="#D4B47A" fillOpacity="0.35" />
        </svg>
      );
  }
};

export const MysteryBloomOracle: React.FC<MysteryBloomOracleProps> = ({
  onSelectForComposer,
}) => {
  const { lang } = useLanguage();
  const { recipientTo } = usePersonalization();
  const shouldReduceMotion = useReducedMotion();

  const [deckOrder, setDeckOrder] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [burstCount, setBurstCount] = useState<number>(0);
  const [downloadFeedback, setDownloadFeedback] = useState<string>("");

  const activeCard: BloomOracleCard | null =
    selectedCardIndex !== null ? bloomOracleCards[selectedCardIndex] : null;

  const handlePickCard = (cardIdx: number) => {
    setSelectedCardIndex(cardIdx);
    setBurstCount((c) => c + 1);
    soundscape.playInteractionChime("bloom");
  };

  const handleRandomDraw = () => {
    const randomIdx = Math.floor(Math.random() * bloomOracleCards.length);
    handlePickCard(randomIdx);
  };

  const handleResetAndShuffle = () => {
    setSelectedCardIndex(null);
    soundscape.playInteractionChime("soft");
    setTimeout(() => {
      setDeckOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
    }, 250);
  };

  const handleSendToComposer = (card: BloomOracleCard) => {
    if (!onSelectForComposer) return;
    const targetName = recipientTo || (lang === "vi" ? "bạn" : "you");
    const composed =
      lang === "vi"
        ? `Gửi ${targetName},\n\nLoài hoa 20/10 của bạn là ${card.flowerNameVi} (${card.auraVi}).\n"${card.quoteVi}"\n\n${card.blessingVi}`
        : `Dearest ${targetName},\n\nYour October 20th bloom is the ${card.flowerNameEn} (${card.auraEn}).\n"${card.quoteEn}"\n\n${card.blessingEn}`;

    onSelectForComposer(composed);
    const el = document.getElementById("composer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Download High-Res Botanical Oracle Tarot Card as PNG
  const handleDownloadOracleCard = (card: BloomOracleCard) => {
    const canvas = document.createElement("canvas");
    const width = 1080;
    const height = 1440;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Deep midnight-burgundy celestial background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#19111B");
    grad.addColorStop(0.5, "#2E1625");
    grad.addColorStop(1, "#120D14");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle radial golden aura in center
    const radial = ctx.createRadialGradient(width / 2, 420, 20, width / 2, 420, 420);
    radial.addColorStop(0, "rgba(212, 180, 122, 0.22)");
    radial.addColorStop(1, "rgba(212, 180, 122, 0)");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    // Ornate Tarot Gold Borders
    ctx.strokeStyle = "#D4B47A";
    ctx.lineWidth = 3;
    ctx.strokeRect(52, 52, width - 104, height - 104);

    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    ctx.strokeRect(70, 70, width - 140, height - 140);
    ctx.globalAlpha = 1;

    ctx.textAlign = "center";

    // Top Roman Numeral & Kicker
    ctx.fillStyle = "#D4B47A";
    ctx.font = "600 22px sans-serif";
    ctx.fillText(
      `✦  ARCANA ${card.romanNumeral} · VIETNAMESE WOMEN'S DAY 20.10  ✦`,
      width / 2,
      140
    );

    if (recipientTo) {
      ctx.fillStyle = "#C98F9A";
      ctx.font = "italic 30px Georgia, serif";
      ctx.fillText(
        lang === "vi"
          ? `Thông điệp dành riêng cho ${recipientTo}`
          : `Personal Bloom Oracle for ${recipientTo}`,
        width / 2,
        190
      );
    }

    // Center Emblem Circle
    ctx.strokeStyle = "#D4B47A";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, 340, 95, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "#D4B47A";
    ctx.font = "italic 58px Georgia, serif";
    ctx.fillText(card.romanNumeral, width / 2, 360);

    // Flower Title & Aura
    ctx.fillStyle = "#F7F0E7";
    ctx.font = "bold 54px Georgia, serif";
    ctx.fillText(
      lang === "vi" ? card.flowerNameVi.toUpperCase() : card.flowerNameEn.toUpperCase(),
      width / 2,
      520
    );

    ctx.fillStyle = "#D4B47A";
    ctx.font = "italic 28px Georgia, serif";
    ctx.fillText(lang === "vi" ? card.auraVi : card.auraEn, width / 2, 575);

    // Quote
    ctx.fillStyle = "#C98F9A";
    ctx.font = "italic 32px Georgia, serif";
    const quoteText = `"${lang === "vi" ? card.quoteVi : card.quoteEn}"`;
    wrapCenteredText(ctx, quoteText, width / 2, 660, width - 240, 46);

    // Main Oracle Message
    ctx.fillStyle = "#F7F0E7";
    ctx.font = "31px Georgia, serif";
    const bodyText = lang === "vi" ? card.messageVi : card.messageEn;
    const nextY = wrapCenteredText(ctx, bodyText, width / 2, 800, width - 220, 50);

    // Blessing Box
    ctx.fillStyle = "#D4B47A";
    ctx.font = "italic 30px Georgia, serif";
    const blessing = lang === "vi" ? card.blessingVi : card.blessingEn;
    wrapCenteredText(ctx, blessing, width / 2, Math.max(nextY + 55, 1120), width - 240, 44);

    // Footer
    ctx.fillStyle = "#C98F9A";
    ctx.font = "600 22px sans-serif";
    ctx.fillText("SHE IS · EVERY WOMAN IS A UNIVERSE OF HER OWN · 20.10", width / 2, height - 105);

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `que-hoa-20-10-${card.id}.png`;
    link.href = dataUrl;
    link.click();

    soundscape.playInteractionChime("bloom");
    setDownloadFeedback(
      lang === "vi"
        ? "Đã tải lá bài hoa PNG về máy của bạn!"
        : "Downloaded your Bloom Oracle Card as PNG!"
    );
    setTimeout(() => setDownloadFeedback(""), 3500);
  };

  return (
    <section
      id="oracle"
      className="relative py-28 md:py-36 bg-gradient-to-b from-[#171018] via-[#221320] to-[#1b121c] text-[#F7F0E7] px-6 border-t border-[#F7F0E7]/5 overflow-hidden"
    >
      <FloatingParticles
        density="medium"
        tint="gold"
        withPetals={true}
        burstTrigger={burstCount}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs font-sans tracking-[0.32em] uppercase text-[#D4B47A] mb-3 block">
            {lang === "vi"
              ? "GÓC TƯƠNG TÁC ĐẶC BIỆT · VƯỜN HOA TRI ÂN"
              : "INTERACTIVE ORACLE · THE GARDEN OF BLOOMS"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F0E7] leading-tight mb-4 text-balance">
            {lang === "vi"
              ? "HÁI HOA NHẬN THÔNG ĐIỆP VŨ TRỤ 20/10"
              : "DRAW YOUR 20.10 BOTANICAL ORACLE"}
          </h2>
          <p className="text-base sm:text-lg font-sans text-[#F7F0E7]/75 font-light leading-relaxed mb-6 text-balance">
            {recipientTo
              ? lang === "vi"
                ? `${recipientTo} ơi, hãy lắng nghe trực giác và chạm vào một lá bài bên dưới để đón nhận loài hoa đại diện cùng lời nhắn 20/10 dành riêng cho bạn.`
                : `${recipientTo}, follow your intuition and touch a card below to reveal your guardian bloom and personal October 20th blessing.`
              : lang === "vi"
              ? "Mỗi người phụ nữ là một đóa hoa độc bản. Hãy chạm vào một lá bài bất kỳ để nhận loài hoa hộ mệnh và thông điệp 20/10 dành riêng cho tâm hồn bạn hôm nay."
              : "Every woman is a rare bloom of her own. Touch any card below to reveal your guardian flower and personal October 20th message."}
          </p>
          <BotanicalDivider />
        </motion.div>

        <AnimatePresence mode="wait">
          {!activeCard ? (
            /* STAGE 1: 6 FACE-DOWN MYSTERY TAROT CARDS */
            <motion.div
              key="oracle-deck"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 max-w-5xl mx-auto">
                {deckOrder.map((cardIdx, displayPos) => {
                  const card = bloomOracleCards[cardIdx];
                  return (
                    <motion.button
                      key={card.id}
                      type="button"
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: displayPos * 0.07 }}
                      whileHover={shouldReduceMotion ? {} : { y: -10, scale: 1.03 }}
                      onClick={() => handlePickCard(cardIdx)}
                      className="group relative aspect-[2/3] rounded-2xl p-3 bg-gradient-to-b from-[#2f1725] via-[#1d111a] to-[#140d14] border border-[#D4B47A]/40 hover:border-[#D4B47A] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(212,180,122,0.28)] transition-colors duration-300 flex flex-col items-center justify-between cursor-pointer overflow-hidden text-center"
                    >
                      {/* Inner Gold Filigree Frame */}
                      <div className="pointer-events-none absolute inset-2.5 border border-[#D4B47A]/25 group-hover:border-[#D4B47A]/60 rounded-xl transition-colors" />

                      {/* Top Roman Numeral */}
                      <span className="relative z-10 text-xs font-serif tracking-[0.25em] text-[#D4B47A]/80 pt-2">
                        {card.romanNumeral}
                      </span>

                      {/* Center Geometric Mandala Back SVG */}
                      <div className="relative z-10 my-auto flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#D4B47A]/30 flex items-center justify-center group-hover:rotate-45 transition-transform duration-700">
                          <div className="w-11 h-11 rounded-full border border-[#C98F9A]/40 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-[#D4B47A] group-hover:scale-125 transition-transform" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Prompt */}
                      <span className="relative z-10 text-[10px] font-sans tracking-[0.2em] uppercase text-[#F7F0E7]/60 group-hover:text-[#D4B47A] pb-2 transition-colors">
                        {lang === "vi" ? "Chạm để mở" : "Tap to reveal"}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Quick Random Draw Action */}
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={handleRandomDraw}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-sans tracking-[0.2em] uppercase bg-[#351C2A]/70 hover:bg-[#D4B47A] text-[#D4B47A] hover:text-[#111114] border border-[#D4B47A]/45 transition-all duration-300 font-medium cursor-pointer shadow-lg"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>
                    {lang === "vi"
                      ? "Để vũ trụ chọn ngẫu nhiên cho bạn"
                      : "Let the Universe Choose for You"}
                  </span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* STAGE 2: REVEALED BOTANICAL ORACLE CARD */
            <motion.div
              key={`revealed-${activeCard.id}`}
              initial={{ opacity: 0, rotateY: 90, scale: 0.92 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative rounded-3xl bg-gradient-to-b from-[#291522] via-[#1c1019] to-[#130c13] border-2 border-[#D4B47A]/70 shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-7 sm:p-12 text-center overflow-hidden">
                {/* Inner Gold Frame */}
                <div className="pointer-events-none absolute inset-3.5 border border-[#D4B47A]/25 rounded-2xl" />

                {/* Top Arcana Kicker */}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#D4B47A] mb-2">
                    ✦ ARCANA {activeCard.romanNumeral} · {activeCard.latinName} ✦
                  </span>

                  {recipientTo && (
                    <span className="text-sm font-serif italic text-[#C98F9A] mb-3">
                      {lang === "vi"
                        ? `Đóa hoa hộ mệnh gửi tặng riêng ${recipientTo}`
                        : `Guardian Bloom Dedicated to ${recipientTo}`}
                    </span>
                  )}

                  {/* Bespoke Animated SVG Flower */}
                  <div className="my-4 p-4 rounded-full bg-[#111114]/60 border border-[#D4B47A]/30 shadow-[0_0_40px_rgba(212,180,122,0.2)]">
                    <FlowerIllustration flowerId={activeCard.id} className="w-28 h-28 sm:w-32 sm:h-32" />
                  </div>

                  {/* Flower Name & Aura */}
                  <h3 className="text-3xl sm:text-4xl font-serif text-gold-gradient font-normal tracking-wide mt-2 mb-2">
                    {lang === "vi" ? activeCard.flowerNameVi : activeCard.flowerNameEn}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans tracking-[0.22em] uppercase text-[#D4B47A] mb-6">
                    {lang === "vi" ? activeCard.auraVi : activeCard.auraEn}
                  </p>

                  {/* Quote */}
                  <div className="max-w-xl mx-auto py-4 px-6 border-y border-[#D4B47A]/25 mb-6">
                    <p className="text-lg sm:text-xl font-serif italic text-[#F7F0E7]">
                      &ldquo;
                      {lang === "vi" ? activeCard.quoteVi : activeCard.quoteEn}
                      &rdquo;
                    </p>
                  </div>

                  {/* Main Oracle Message */}
                  <p className="max-w-2xl mx-auto text-base sm:text-lg font-sans font-light text-[#F7F0E7]/85 leading-relaxed mb-6">
                    {lang === "vi" ? activeCard.messageVi : activeCard.messageEn}
                  </p>

                  {/* 20.10 Blessing */}
                  <div className="max-w-xl mx-auto p-4 rounded-xl bg-[#351C2A]/50 border border-[#D4B47A]/30 mb-8">
                    <p className="text-sm sm:text-base font-serif italic text-[#D4B47A]">
                      ✦ {lang === "vi" ? activeCard.blessingVi : activeCard.blessingEn}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleDownloadOracleCard(activeCard)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-sans tracking-wider uppercase font-medium bg-[#D4B47A] hover:bg-[#F7F0E7] text-[#111114] transition-all cursor-pointer shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {lang === "vi" ? "Tải Lá Bài Này (PNG)" : "Download Oracle Card (PNG)"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendToComposer(activeCard)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-sans tracking-wider uppercase font-medium border border-[#D4B47A]/50 bg-[#351C2A]/80 hover:bg-[#351C2A] text-[#F7F0E7] transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-[#D4B47A]" />
                      <span>
                        {lang === "vi" ? "Đưa vào Thiệp 20/10" : "Use in 20.10 Card"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetAndShuffle}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-sans tracking-wider uppercase text-[#F7F0E7]/75 hover:text-[#D4B47A] border border-[#F7F0E7]/15 hover:border-[#D4B47A]/40 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>
                        {lang === "vi" ? "Hái đóa hoa khác" : "Draw Another Bloom"}
                      </span>
                    </button>
                  </div>

                  {downloadFeedback && (
                    <p className="mt-4 text-xs font-sans text-[#D4B47A]">
                      {downloadFeedback}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

function wrapCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  startY: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  let y = startY;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), centerX, y);
      line = words[i] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    ctx.fillText(line.trim(), centerX, y);
    y += lineHeight;
  }
  return y;
}
