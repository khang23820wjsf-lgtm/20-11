import React, { useState, useEffect } from "react";
import { X, Sparkles, ArrowLeft, ArrowRight, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig, GalleryItem } from "../data/siteConfig";
import { ArchetypeEmblem, BotanicalDivider } from "./BotanicalArt";
import { soundscape } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";

interface EditorialGalleryProps {
  onInspireMessage?: (quote: string) => void;
}

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({ onInspireMessage }) => {
  const { lang } = useLanguage();
  const { scene04 } = siteConfig;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem: GalleryItem | null =
    selectedIndex !== null ? scene04.items[selectedIndex] : null;

  // Distinct art-direction filter & crop per archetype so every card feels unique
  const cardArtStyles: Record<string, { crop: string; tint: string }> = {
    dreamer: {
      crop: "object-top scale-105",
      tint: "from-[#111114] via-[#2b1726]/45 to-transparent",
    },
    creator: {
      crop: "object-center",
      tint: "from-[#111114] via-[#1f161e]/40 to-transparent",
    },
    scientist: {
      crop: "object-right scale-110",
      tint: "from-[#111114] via-[#151b26]/50 to-transparent",
    },
    leader: {
      crop: "object-center scale-105",
      tint: "from-[#111114] via-[#2e1b18]/45 to-transparent",
    },
    explorer: {
      crop: "object-left scale-110",
      tint: "from-[#111114] via-[#241c15]/45 to-transparent",
    },
    caregiver: {
      crop: "object-top",
      tint: "from-[#111114] via-[#351C2A]/50 to-transparent",
    },
    athlete: {
      crop: "object-center scale-110",
      tint: "from-[#111114] via-[#261d18]/45 to-transparent",
    },
    hero: {
      crop: "object-bottom scale-105",
      tint: "from-[#111114] via-[#2a1822]/45 to-transparent",
    },
  };

  // Keyboard navigation (Escape, Left, Right) for modal accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % scene04.items.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null
            ? (prev - 1 + scene04.items.length) % scene04.items.length
            : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, scene04.items.length]);

  const handleOpenCard = (index: number) => {
    setSelectedIndex(index);
    soundscape.playInteractionChime("soft");
  };

  const handleUseInspiration = (item: GalleryItem) => {
    setSelectedIndex(null);
    if (onInspireMessage) {
      if (lang === "vi") {
        onInspireMessage(
          `Gửi người phụ nữ tuyệt vời,\n\n"${item.quote}"\n\nNhân ngày 20/10, chúc bạn luôn giữ trọn vẹn nguồn cảm hứng của riêng mình — ${item.reflection}`
        );
      } else {
        onInspireMessage(
          `To an extraordinary woman,\n\n"${item.englishQuote}"\n\nOn this October 20th, may you always cherish your own unique inspiration — ${item.englishReflection}`
        );
      }
    }
    const composerEl = document.getElementById("composer");
    if (composerEl) {
      composerEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="gallery"
      className="relative py-28 md:py-36 bg-[#111114] text-[#F7F0E7] px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Gallery Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="text-xs font-sans tracking-[0.32em] uppercase text-[#C98F9A] mb-3 block">
            {lang === "vi" ? scene04.label : scene04.labelEn}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F0E7] leading-tight mb-4 text-balance">
            {lang === "vi" ? scene04.title : scene04.titleEn}
          </h2>
          <p className="text-base sm:text-lg font-sans text-[#D4B47A]/85 font-light text-balance mb-6">
            {lang === "vi" ? scene04.subtitle : scene04.subtitleEn}
          </p>
          <BotanicalDivider />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scene04.items.map((item, idx) => {
            const styleConfig = cardArtStyles[item.id] || cardArtStyles.dreamer;
            const itemTitle = lang === "vi" ? item.vietnameseTitle : item.englishTitle;
            const itemTag = lang === "vi" ? item.tag : item.englishTag;
            const itemQuote = lang === "vi" ? item.quote : item.englishQuote;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
                onClick={() => handleOpenCard(idx)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-[#F7F0E7]/10 bg-[#19131c] hover:border-[#D4B47A]/55 transition-all duration-500 flex flex-col justify-between shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:shadow-[0_20px_50px_rgba(212,180,122,0.14)] hover:-translate-y-1.5"
                role="button"
                tabIndex={0}
                aria-label={
                  lang === "vi"
                    ? `Xem chi tiết ${item.vietnameseTitle}`
                    : `View details for ${item.theme}`
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleOpenCard(idx);
                  }
                }}
              >
                {/* Card visual aspect */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#221a24]">
                  <img
                    src={item.image}
                    alt={itemTitle}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className={`w-full h-full object-cover ${styleConfig.crop} group-hover:scale-110 transition-transform duration-700 ease-out filter saturate-[0.9] contrast-[1.06]`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${styleConfig.tint}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/35 to-transparent" />

                  {/* Top Unboxed Metadata + Bespoke Gold SVG Emblem */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-sans tracking-widest uppercase text-[#F7F0E7]/85">
                      <span className="font-mono tabular-nums text-[#D4B47A]">
                        0{idx + 1}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{itemTag}</span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#111114]/70 backdrop-blur-md border border-[#D4B47A]/35 flex items-center justify-center group-hover:scale-110 group-hover:border-[#D4B47A] transition-all duration-500">
                      <ArchetypeEmblem archetypeId={item.id} className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card Title & Quote on bottom */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#D4B47A] mb-1">
                      {item.theme}
                    </p>
                    <h3 className="text-xl font-serif text-[#F7F0E7] group-hover:text-[#D4B47A] transition-colors mb-2">
                      {itemTitle}
                    </h3>
                    <p className="text-xs font-serif italic text-[#F7F0E7]/80 line-clamp-2 leading-relaxed">
                      &ldquo;{itemQuote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card footer deck */}
                <div className="px-5 py-3.5 bg-[#151018] border-t border-[#F7F0E7]/8 flex items-center justify-between text-xs">
                  <span className="font-sans text-[#F7F0E7]/50 tracking-wider">
                    {lang === "vi" ? "Chạm để mở suy ngẫm" : "Tap to read reflection"}
                  </span>
                  <span className="shrink-0 font-sans text-[#D4B47A] group-hover:translate-x-1 transition-transform">
                    {lang === "vi" ? "Khám phá →" : "Explore →"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Animated Detail Reflection Modal */}
      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-[#1a131d] border border-[#D4B47A]/40 rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left Column: Portrait + Emblem */}
                <div className="md:col-span-5 relative min-h-[260px] md:min-h-full bg-[#111114]">
                  <img
                    src={selectedItem.image}
                    alt={
                      lang === "vi"
                        ? selectedItem.vietnameseTitle
                        : selectedItem.englishTitle
                    }
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a131d] via-transparent to-[#111114]/40 md:bg-gradient-to-r md:from-transparent md:to-[#1a131d]" />

                  <div className="absolute top-5 left-5 w-14 h-14 rounded-full bg-[#111114]/80 backdrop-blur-md border border-[#D4B47A]/45 flex items-center justify-center">
                    <ArchetypeEmblem archetypeId={selectedItem.id} className="w-9 h-9" />
                  </div>
                </div>

                {/* Right Column: Curatorial Text */}
                <div className="md:col-span-7 p-6 sm:p-9 flex flex-col justify-between">
                  <div>
                    {/* Top row with close button */}
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2 text-xs font-sans tracking-[0.2em] text-[#C98F9A] uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4B47A]" />
                        <span>{selectedItem.theme}</span>
                        <span aria-hidden="true">·</span>
                        <span>0{selectedIndex + 1} / 08</span>
                      </div>

                      <button
                        onClick={() => setSelectedIndex(null)}
                        type="button"
                        className="p-2 text-[#F7F0E7]/60 hover:text-[#F7F0E7] hover:bg-[#351C2A] rounded-full transition-colors cursor-pointer"
                        aria-label={lang === "vi" ? "Đóng cửa sổ" : "Close modal"}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <h3
                      id="modal-title"
                      className="text-2xl sm:text-3xl font-serif text-[#F7F0E7] mb-4"
                    >
                      {lang === "vi"
                        ? selectedItem.vietnameseTitle
                        : selectedItem.englishTitle}
                    </h3>

                    {/* Featured Quote */}
                    <div className="py-4 my-4 border-y border-[#D4B47A]/25">
                      <p className="text-lg sm:text-xl font-serif italic text-[#D4B47A] leading-relaxed">
                        &ldquo;
                        {lang === "vi"
                          ? selectedItem.quote
                          : selectedItem.englishQuote}
                        &rdquo;
                      </p>
                    </div>

                    {/* Reflection text */}
                    <div className="space-y-3.5 text-sm sm:text-base font-sans text-[#F7F0E7]/80 font-light leading-relaxed">
                      <p>
                        {lang === "vi"
                          ? selectedItem.reflection
                          : selectedItem.englishReflection}
                      </p>
                      <p>
                        {lang === "vi"
                          ? selectedItem.extendedStory
                          : selectedItem.englishExtendedStory}
                      </p>
                    </div>
                  </div>

                  {/* Footer navigation & inspiration CTA */}
                  <div className="mt-8 pt-5 border-t border-[#F7F0E7]/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedIndex(
                            (selectedIndex - 1 + scene04.items.length) %
                              scene04.items.length
                          )
                        }
                        className="p-2 rounded-full border border-[#F7F0E7]/15 hover:border-[#D4B47A] text-[#F7F0E7]/75 hover:text-[#D4B47A] transition-colors cursor-pointer"
                        title={lang === "vi" ? "Chủ đề trước" : "Previous archetype"}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedIndex(
                            (selectedIndex + 1) % scene04.items.length
                          )
                        }
                        className="p-2 rounded-full border border-[#F7F0E7]/15 hover:border-[#D4B47A] text-[#F7F0E7]/75 hover:text-[#D4B47A] transition-colors cursor-pointer"
                        title={lang === "vi" ? "Chủ đề tiếp theo" : "Next archetype"}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleUseInspiration(selectedItem)}
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans tracking-wider uppercase bg-[#D4B47A] hover:bg-[#F7F0E7] text-[#111114] rounded-full transition-colors font-medium cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {lang === "vi"
                          ? "Gửi lời chúc theo cảm hứng này"
                          : "Compose a Wish from This Theme"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
