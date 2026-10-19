import React, { useState } from "react";
import { Flame, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "motion/react";
import { siteConfig } from "../data/siteConfig";
import { ArchetypeEmblem, BotanicalDivider } from "./BotanicalArt";
import { soundscape } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";

export const ReflectionSection: React.FC = () => {
  const { lang } = useLanguage();
  const { scene03, images } = siteConfig;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [litCandles, setLitCandles] = useState<Record<number, boolean>>({ 0: true });
  const shouldReduceMotion = useReducedMotion();

  const panelContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const panelItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const reflectionVisuals = [
    {
      image: images.hero,
      emblem: "explorer",
      atmosphereLabelVi: "Bình minh sau đêm dài",
      atmosphereLabelEn: "Dawn After a Long Night",
      meditationVi:
        "Bắt đầu lại chưa bao giờ là thất bại. Đó là lúc bạn mang theo tất cả sự trưởng thành của ngày hôm qua để bước vào một chương mới tự do hơn.",
      meditationEn:
        "Starting over is never a failure. It is carrying all the wisdom of yesterday into a freer, unwritten chapter.",
    },
    {
      image: images.galleryCreator,
      emblem: "dreamer",
      atmosphereLabelVi: "Ánh đèn khuya tĩnh lặng",
      atmosphereLabelEn: "Quiet Midnight Lamp",
      meditationVi:
        "Không sao cả nếu hôm nay bạn chưa có mọi câu trả lời. Những con đường đẹp nhất đôi khi chỉ hiện rõ từng bước một khi ta kiên nhẫn đi tới.",
      meditationEn:
        "It is okay if you do not have every answer today. The most meaningful paths often reveal themselves one patient step at a time.",
    },
    {
      image: images.botanicalWarm,
      emblem: "scientist",
      atmosphereLabelVi: "Hạt mầm trong đất ấm",
      atmosphereLabelEn: "Seeds Beneath Warm Earth",
      meditationVi:
        "Cây đại thụ lớn lên trong im lặng. Những nỗ lực âm thầm mỗi ngày của bạn đang dệt nên một điều kỳ diệu bền vững.",
      meditationEn:
        "The tallest trees grow in silence. Your quiet daily dedication is weaving something enduring and extraordinary.",
    },
    {
      image: images.portraitStages,
      emblem: "caregiver",
      atmosphereLabelVi: "Khoảnh khắc lắng nghe chính mình",
      atmosphereLabelEn: "A Quiet Moment for Yourself",
      meditationVi:
        "Yêu thương bản thân không phải là ích kỷ. Đó là khi bạn nhận ra mình cũng là một con người cần được vỗ về, nghỉ ngơi và tôn trọng.",
      meditationEn:
        "Choosing yourself is never selfish. It is recognizing that your own heart also deserves rest, gentleness, and respect.",
    },
    {
      image: images.galleryCreator,
      emblem: "creator",
      atmosphereLabelVi: "Trang giấy mở trước nắng sớm",
      atmosphereLabelEn: "An Open Page in Morning Light",
      meditationVi:
        "Câu chuyện của bạn chưa dừng lại ở bất kỳ định kiến nào. Bút vẫn nằm trong tay bạn, và những chương rực rỡ nhất vẫn đang chờ phía trước.",
      meditationEn:
        "Your story is never confined by anyone else's expectations. The pen remains in your hand, and your brightest chapters still lie ahead.",
    },
  ];

  const currentVisual = reflectionVisuals[activeIndex] || reflectionVisuals[0];
  const isCurrentLit = Boolean(litCandles[activeIndex]);
  const totalLitCount = Object.values(litCandles).filter(Boolean).length;

  const handleSelectPanel = (idx: number) => {
    setActiveIndex(idx);
    soundscape.playInteractionChime("soft");
  };

  const handleToggleCandle = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLitCandles((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      return next;
    });
    soundscape.playInteractionChime("bloom");
  };

  return (
    <section
      id="reflections"
      className="relative py-28 md:py-36 bg-[#141017] text-[#F7F0E7] px-6 border-t border-[#F7F0E7]/5 overflow-hidden"
    >
      {/* Warm window light ray background */}
      <div
        className="pointer-events-none absolute -top-20 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(212,180,122,0.5) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <span className="text-xs font-sans tracking-[0.32em] uppercase text-[#D4B47A] mb-3 block">
            {lang === "vi" ? scene03.label : scene03.labelEn}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F0E7] leading-tight mb-6 text-balance">
            {lang === "vi" ? scene03.title : scene03.titleEn}
          </h2>
          <p className="text-base sm:text-lg font-sans text-[#F7F0E7]/75 font-light leading-relaxed">
            {lang === "vi" ? scene03.supportingMessage : scene03.supportingMessageEn}
          </p>
        </motion.div>

        {/* Split Interactive Contemplation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: 5 Bilingual Editorial Panels with Staggered Fade-Up Reveal */}
          <motion.div
            variants={panelContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: "-50px" }}
            className="lg:col-span-7 space-y-4"
          >
            {scene03.panels.map((panel, idx) => {
              const isSelected = activeIndex === idx;
              const isLit = Boolean(litCandles[idx]);
              const mainHeading = lang === "vi" ? panel.vi : panel.en;
              const subKicker = lang === "vi" ? panel.en : panel.vi;
              const contextBody = lang === "vi" ? panel.context : panel.contextEn;

              return (
                <motion.div
                  key={idx}
                  variants={panelItemVariants}
                  onClick={() => handleSelectPanel(idx)}
                  className={`cursor-pointer rounded-2xl transition-colors duration-300 p-6 sm:p-7 border ${
                    isSelected
                      ? "bg-gradient-to-r from-[#351C2A]/60 to-[#1d1420] border-[#D4B47A]/50 shadow-[0_15px_40px_rgba(0,0,0,0.45)]"
                      : "bg-[#111114]/55 border-[#F7F0E7]/6 hover:border-[#F7F0E7]/20 hover:bg-[#1a131d]/80"
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSelectPanel(idx);
                    }
                  }}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-mono tabular-nums text-[#D4B47A]">
                          0{idx + 1}
                        </span>
                        <span aria-hidden="true" className="text-[#F7F0E7]/30">·</span>
                        <span className="font-sans tracking-widest uppercase text-[#C98F9A]">
                          {subKicker}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-serif text-[#F7F0E7]">
                        {mainHeading}
                      </h3>

                      <p className="text-sm font-sans text-[#F7F0E7]/75 font-light leading-relaxed pt-1">
                        {contextBody}
                      </p>
                    </div>

                    {/* Interactive Empathy Candle Button */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleCandle(idx, e)}
                      title={
                        isLit
                          ? lang === "vi"
                            ? "Ánh nến tri ân đang thắp sáng"
                            : "Tribute candle is lit"
                          : lang === "vi"
                          ? "Thắp một ánh nến đồng cảm"
                          : "Light a candle of empathy"
                      }
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer border ${
                        isLit
                          ? "bg-[#D4B47A]/20 border-[#D4B47A]/60 text-[#D4B47A] shadow-[0_0_20px_rgba(212,180,122,0.25)]"
                          : "bg-[#111114]/60 border-[#F7F0E7]/10 text-[#F7F0E7]/45 hover:text-[#D4B47A] hover:border-[#D4B47A]/35"
                      }`}
                    >
                      <Flame
                        className={`w-3.5 h-3.5 ${
                          isLit ? "text-[#D4B47A] fill-[#D4B47A]/40" : ""
                        }`}
                      />
                      <span className="hidden sm:inline">
                        {isLit
                          ? lang === "vi"
                            ? "Đã thắp sáng"
                            : "Candle Lit"
                          : lang === "vi"
                          ? "Gửi đồng cảm"
                          : "Light Candle"}
                      </span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column: Sticky Intimate Contemplation Stage */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden border border-[#D4B47A]/30 bg-[#1a131c] shadow-2xl">
              {/* Visual Frame */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#111114]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.75, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    src={currentVisual.image}
                    alt={
                      lang === "vi"
                        ? currentVisual.atmosphereLabelVi
                        : currentVisual.atmosphereLabelEn
                    }
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter saturate-[0.85] contrast-[1.08]"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#1a131c] via-[#1a131c]/30 to-transparent" />

                {/* Floating Emblem */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[11px] font-sans tracking-widest uppercase text-[#D4B47A] bg-[#111114]/75 backdrop-blur-md px-3 py-1 rounded">
                    {lang === "vi"
                      ? currentVisual.atmosphereLabelVi
                      : currentVisual.atmosphereLabelEn}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#111114]/70 border border-[#D4B47A]/30 flex items-center justify-center">
                    <ArchetypeEmblem archetypeId={currentVisual.emblem} className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Contemplative Text & Candle Illumination */}
              <div className="p-6 sm:p-8 space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeIndex}-${lang}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-3"
                  >
                    <p className="text-xs font-sans tracking-widest uppercase text-[#C98F9A]">
                      {lang === "vi" ? "Lời nhắn đồng hành" : "Companion Note"} · 0
                      {activeIndex + 1}
                    </p>
                    <h4 className="text-2xl font-serif text-[#F7F0E7]">
                      {lang === "vi"
                        ? scene03.panels[activeIndex]?.vi
                        : scene03.panels[activeIndex]?.en}
                    </h4>
                    <p className="text-sm sm:text-base font-serif italic text-[#D4B47A]/95 leading-relaxed">
                      &ldquo;
                      {lang === "vi"
                        ? currentVisual.meditationVi
                        : currentVisual.meditationEn}
                      &rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="pt-4 border-t border-[#F7F0E7]/10 flex items-center justify-between gap-4">
                  <div className="text-xs font-sans text-[#F7F0E7]/60">
                    {lang === "vi" ? "Đã thắp sáng " : "Lit "}
                    <span className="font-mono tabular-nums text-[#D4B47A] font-semibold">
                      {totalLitCount} / {scene03.panels.length}
                    </span>
                    {lang === "vi" ? " ngọn nến tri ân" : " tribute candles"}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleCandle(activeIndex)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all cursor-pointer ${
                      isCurrentLit
                        ? "bg-[#D4B47A] text-[#111114] font-medium shadow-[0_0_25px_rgba(212,180,122,0.4)]"
                        : "border border-[#D4B47A]/40 text-[#D4B47A] hover:bg-[#D4B47A]/15"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {isCurrentLit
                        ? lang === "vi"
                          ? "Ngọn nến đang sáng"
                          : "Candle Shining"
                        : lang === "vi"
                        ? "Thắp nến tri ân"
                        : "Light a Candle"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle curatorial quote */}
        <div className="mt-20 text-center">
          <BotanicalDivider className="mb-6" />
          <p className="text-base sm:text-lg font-serif italic text-[#C98F9A] tracking-wide max-w-2xl mx-auto">
            &ldquo;
            {lang === "vi" ? scene03.footerQuoteVi : scene03.footerQuoteEn}
            &rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
