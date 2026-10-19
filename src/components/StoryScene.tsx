import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "../data/siteConfig";
import { ArchetypeEmblem, BotanicalDivider } from "./BotanicalArt";
import { soundscape } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";

export const StoryScene: React.FC = () => {
  const { lang } = useLanguage();
  const { scene02, images } = siteConfig;
  const [activeStatementIdx, setActiveStatementIdx] = useState<number>(0);

  // Visual chapters corresponding to the 8 statements
  const stageVisuals = [
    {
      image: images.portraitStages,
      emblem: "caregiver",
      captionTitleVi: "Sự dịu dàng bền bỉ",
      captionTitleEn: "Enduring Gentleness",
      captionTextVi:
        "Ánh nắng ban mai bên khung cửa gỗ — nơi bình yên bắt đầu từ những quan tâm lặng lẽ.",
      captionTextEn:
        "Morning sunlight beside a wooden window — where peace begins with quiet, tender care.",
      filterClass: "saturate-[0.95] contrast-[1.05]",
    },
    {
      image: images.galleryCreator,
      emblem: "scientist",
      captionTitleVi: "Khát vọng tri thức",
      captionTitleEn: "The Thirst for Discovery",
      captionTextVi:
        "Những câu hỏi mở ra chân trời mới, nơi trí tuệ và sự tò mò không bao giờ ngừng nghỉ.",
      captionTextEn:
        "Questions that unlock new horizons, where intellect and curiosity never rest.",
      filterClass: "saturate-[0.88] contrast-[1.08]",
    },
    {
      image: images.hero,
      emblem: "explorer",
      captionTitleVi: "Dũng khí khởi đầu mới",
      captionTitleEn: "Courage to Begin Anew",
      captionTextVi:
        "Bước qua bóng tối để đón nhận tia sáng của một chặng đường hoàn toàn mới.",
      captionTextEn:
        "Stepping through the shadows to embrace the golden light of an unwritten chapter.",
      filterClass: "saturate-[1.05] contrast-[1.1]",
    },
    {
      image: images.galleryCreator,
      emblem: "creator",
      captionTitleVi: "Tự do kiến tạo",
      captionTitleEn: "Freedom to Create",
      captionTextVi:
        "Mỗi nét vẽ, mỗi quyết định là một tuyên ngôn dịu dàng về con đường riêng.",
      captionTextEn:
        "Every sketch and every choice is a quiet declaration of her own independent path.",
      filterClass: "saturate-[0.92] contrast-[1.04]",
    },
    {
      image: images.hero,
      emblem: "leader",
      captionTitleVi: "Quyền được ước mơ lớn",
      captionTitleEn: "The Right to Dream Boldly",
      captionTextVi:
        "Không có giới hạn nào cho những hoài bão mà cô ấy muốn vươn tới.",
      captionTextEn:
        "There is no ceiling to the ambitions and horizons she chooses to pursue.",
      filterClass: "saturate-[1.1] contrast-[1.08]",
    },
    {
      image: images.botanicalWarm,
      emblem: "dreamer",
      captionTitleVi: "Khoảnh khắc buông thư",
      captionTitleEn: "Permission to Rest",
      captionTextVi:
        "Được phép dừng lại, thở chậm và không cần gồng mình mạnh mẽ trong mọi lúc.",
      captionTextEn:
        "Allowed to pause, breathe slowly, and set down the weight of being strong every moment.",
      filterClass: "saturate-[0.85] contrast-[1.02]",
    },
    {
      image: images.portraitStages,
      emblem: "athlete",
      captionTitleVi: "Vẻ đẹp của sự chuyển mình",
      captionTitleEn: "The Grace of Becoming",
      captionTextVi:
        "Thời gian không lấy đi vẻ đẹp, thời gian chỉ làm tâm hồn thêm sâu sắc.",
      captionTextEn:
        "Time never diminishes her beauty; it only deepens the wisdom of her spirit.",
      filterClass: "saturate-[0.9] contrast-[1.06]",
    },
    {
      image: images.galleryCreator,
      emblem: "hero",
      captionTitleVi: "Trọn vẹn là chính mình",
      captionTitleEn: "Wholly Herself",
      captionTextVi:
        "Một vũ trụ độc bản, tự do và xứng đáng được trân trọng nguyên vẹn.",
      captionTextEn:
        "A universe of her own, free and worthy of being cherished just as she is.",
      filterClass: "saturate-[1.0] contrast-[1.05]",
    },
  ];

  const currentStage = stageVisuals[activeStatementIdx] || stageVisuals[0];
  const currentCaptionTitle =
    lang === "vi" ? currentStage.captionTitleVi : currentStage.captionTitleEn;
  const currentCaptionText =
    lang === "vi" ? currentStage.captionTextVi : currentStage.captionTextEn;

  const handleSelectStatement = (idx: number) => {
    if (idx !== activeStatementIdx) {
      setActiveStatementIdx(idx);
      soundscape.playInteractionChime("soft");
    }
  };

  return (
    <section
      id="stories"
      className="relative py-28 md:py-36 bg-gradient-to-b from-[#111114] via-[#1a131b] to-[#1e141f] text-[#F7F0E7] px-6 overflow-hidden"
    >
      {/* Subtle ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-0 w-96 h-96 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4B47A 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-16 md:mb-24"
        >
          <span className="text-xs font-sans tracking-[0.32em] uppercase text-[#C98F9A] mb-3">
            {lang === "vi" ? scene02.label : scene02.labelEn}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-[#F7F0E7] tracking-wide mb-4 text-balance">
            {lang === "vi" ? scene02.vietnameseTitle : scene02.title}
          </h2>
          <p className="text-xs font-sans tracking-[0.25em] text-[#D4B47A]/80 uppercase mb-6">
            {lang === "vi" ? scene02.title : scene02.vietnameseTitle}
          </p>
          <BotanicalDivider />
        </motion.div>

        {/* 2-Column Split: Sticky Interactive Portrait Stage + 8 Statements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Dynamic Documentary Portrait Frame */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.65)] border border-[#D4B47A]/25 aspect-[4/5] bg-[#181219]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStatementIdx}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  src={currentStage.image}
                  alt={currentCaptionTitle}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-center ${currentStage.filterClass}`}
                />
              </AnimatePresence>

              {/* Measured Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/35 to-transparent" />

              {/* Top Emblem & Frame Index */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="text-[11px] font-mono tabular-nums tracking-[0.2em] uppercase text-[#F7F0E7]/85 bg-[#111114]/65 backdrop-blur-md px-3 py-1 rounded">
                  {lang === "vi" ? "KHUNG HÌNH" : "FRAME"} 0{activeStatementIdx + 1} / 08
                </span>
                <div className="w-11 h-11 rounded-full bg-[#111114]/65 backdrop-blur-md border border-[#D4B47A]/30 flex items-center justify-center">
                  <ArchetypeEmblem archetypeId={currentStage.emblem} className="w-7 h-7" />
                </div>
              </div>

              {/* Bottom Curatorial Caption */}
              <div className="absolute bottom-6 left-6 right-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeStatementIdx}-${lang}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-xs font-serif italic text-[#D4B47A] tracking-wider mb-1">
                      {currentCaptionTitle}
                    </p>
                    <p className="text-sm font-sans text-[#F7F0E7]/90 font-light leading-relaxed mb-3">
                      {currentCaptionText}
                    </p>
                    <p className="text-xs font-serif italic text-[#C98F9A] border-t border-[#F7F0E7]/15 pt-2.5">
                      &ldquo;
                      {lang === "vi"
                        ? scene02.statements[activeStatementIdx]?.en
                        : scene02.statements[activeStatementIdx]?.vi}
                      &rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Metadata strip under image */}
            <div className="mt-4 flex items-center justify-between text-[11px] font-sans tracking-widest text-[#F7F0E7]/45 uppercase px-1">
              <span>
                {lang === "vi"
                  ? "Chạm vào từng dòng suy ngẫm để chuyển cảnh"
                  : "Select any reflection to transition the frame"}
              </span>
              <span className="font-mono tabular-nums">20.10</span>
            </div>
          </div>

          {/* Right Column: Interactive Statement Journey */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-3.5">
            {scene02.statements.map((st, index) => {
              const isSelected = activeStatementIdx === index;
              const primaryLine = lang === "vi" ? st.vi : st.en;
              const secondaryLine = lang === "vi" ? st.en : st.vi;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onMouseEnter={() => setActiveStatementIdx(index)}
                  onClick={() => handleSelectStatement(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSelectStatement(index);
                    }
                  }}
                  className={`group cursor-pointer p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#351C2A]/65 via-[#351C2A]/40 to-[#1a131b] border-[#D4B47A]/55 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                      : "bg-[#161118]/70 border-[#F7F0E7]/6 hover:border-[#D4B47A]/25 hover:bg-[#351C2A]/25"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-xs font-mono tabular-nums pt-1 transition-colors ${
                        isSelected ? "text-[#D4B47A] font-semibold" : "text-[#F7F0E7]/35"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <div className="flex-1">
                      <p
                        className={`text-lg sm:text-xl font-serif transition-colors ${
                          isSelected
                            ? "text-[#D4B47A]"
                            : "text-[#F7F0E7] group-hover:text-[#D4B47A]"
                        }`}
                      >
                        &ldquo;{primaryLine}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm font-serif italic text-[#F7F0E7]/60 font-light mt-1.5 leading-relaxed">
                        {secondaryLine}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Core Closing Thesis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-8 p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-[#351C2A]/45 to-[#18121a] border border-[#D4B47A]/30 relative overflow-hidden"
            >
              <p className="text-xl sm:text-2xl font-serif text-[#F7F0E7] leading-relaxed text-balance">
                &ldquo;
                {lang === "vi" ? scene02.closingMessage : scene02.closingMessageEn}
                &rdquo;
              </p>
              <p className="text-xs sm:text-sm font-sans text-[#C98F9A] mt-4 font-light tracking-wide">
                {lang === "vi" ? scene02.note : scene02.noteEn}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
