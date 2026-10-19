import React, { useState } from "react";
import { ArrowDown, Sparkles, UserCheck, X, Copy, Check, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "../data/siteConfig";
import { FloatingParticles } from "./FloatingParticles";
import { BotanicalDivider } from "./BotanicalArt";
import { soundscape } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";
import { usePersonalization } from "../context/PersonalizationContext";

interface CinematicIntroProps {
  onExploreClick: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onExploreClick }) => {
  const { lang } = useLanguage();
  const {
    recipientTo,
    senderFrom,
    setPersonalization,
    clearPersonalization,
    buildPersonalizedUrl,
  } = usePersonalization();
  const { scene01, images, brand } = siteConfig;

  const [isIlluminated, setIsIlluminated] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 40 });
  const [showPersonalizeModal, setShowPersonalizeModal] = useState<boolean>(false);
  const [quickVisitorName, setQuickVisitorName] = useState<string>("");
  const [tempTo, setTempTo] = useState<string>(recipientTo);
  const [tempFrom, setTempFrom] = useState<string>(senderFrom);
  const [copiedModalLink, setCopiedModalLink] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleBeginJourney = () => {
    if (quickVisitorName.trim() && !recipientTo) {
      setPersonalization(quickVisitorName.trim(), senderFrom);
    }
    setIsIlluminated(true);
    soundscape.playInteractionChime("bloom");
    setTimeout(() => {
      onExploreClick();
    }, 420);
  };

  const handleQuickNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickVisitorName.trim()) return;
    setPersonalization(quickVisitorName.trim(), senderFrom);
    setIsIlluminated(true);
    soundscape.playInteractionChime("bloom");
  };

  const handleOpenPersonalize = () => {
    setTempTo(recipientTo);
    setTempFrom(senderFrom);
    setCopiedModalLink(false);
    setShowPersonalizeModal(true);
  };

  const handleSavePersonalize = (e: React.FormEvent) => {
    e.preventDefault();
    setPersonalization(tempTo, tempFrom);
    setShowPersonalizeModal(false);
    soundscape.playInteractionChime("bloom");
  };

  const handleCopyModalLink = async () => {
    const url = buildPersonalizedUrl(tempTo, tempFrom);
    setPersonalization(tempTo, tempFrom);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedModalLink(true);
      soundscape.playInteractionChime("bloom");
      setTimeout(() => setCopiedModalLink(false), 3000);
    } catch {
      // ignore
    }
  };

  const activeTitle = lang === "vi" ? scene01.title : scene01.titleEn;
  const titleWords = activeTitle.split(" ");

  return (
    <section
      id="intro"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#111114] px-6 text-center select-none"
    >
      {/* Background cinematic imagery with dynamic illumination */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          initial={{ scale: 1.12, opacity: 0.15 }}
          animate={{
            scale: isIlluminated ? 1.02 : 1.06,
            opacity: isIlluminated ? 0.65 : 0.42,
          }}
          transition={{ duration: 2.4, ease: "easeOut" }}
          src={images.hero}
          alt={
            lang === "vi"
              ? "Tia sáng vàng điện ảnh rọi qua không gian tĩnh lặng"
              : "Cinematic golden beam of light shining through quiet space"
          }
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />

        {/* Volumetric Light Beam Overlay */}
        <div
          className="absolute -top-1/4 left-1/4 w-[90vw] h-[130vh] pointer-events-none animate-light-beam"
          style={{
            background:
              "conic-gradient(from 145deg at 20% 0%, transparent 0deg, rgba(212, 180, 122, 0.18) 22deg, rgba(201, 143, 154, 0.08) 40deg, transparent 65deg)",
            filter: "blur(45px)",
          }}
        />

        {/* Interactive Cursor Warm Spotlight */}
        <div
          className="hidden md:block absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}% ${mousePos.y}%, rgba(212, 180, 122, 0.13), rgba(201, 143, 154, 0.04) 40%, transparent 75%)`,
          }}
        />

        {/* Cinema Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/45 to-[#111114]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#111114_90%)]" />
      </div>

      {/* Multi-layered Floating Dust, Bokeh & Golden Petals */}
      <FloatingParticles
        density="high"
        tint="gold"
        withPetals={true}
        burstTrigger={isIlluminated ? 1 : 0}
      />

      {/* Subtle Editorial Frame Corners (Desktop) */}
      <div className="hidden lg:block pointer-events-none absolute inset-10 z-10 border border-[#D4B47A]/10 rounded-3xl">
        <div className="absolute top-5 left-6 text-[10px] font-mono tracking-[0.25em] text-[#D4B47A]/45 uppercase">
          {lang === "vi" ? brand.eventVietnameseLabel : brand.eventLabel}
        </div>
        <div className="absolute top-5 right-6 text-[10px] font-mono tracking-[0.25em] text-[#D4B47A]/45 uppercase">
          {lang === "vi" ? "CẢNH 01 / KHỞI NGUỒN" : "SCENE 01 / PRELUDE"}
        </div>
        <div className="absolute bottom-5 left-6 text-[10px] font-serif italic tracking-wider text-[#C98F9A]/55">
          &ldquo;{lang === "vi" ? brand.vietnameseTagline : brand.tagline}&rdquo;
        </div>
        <div className="absolute bottom-5 right-6 text-[10px] font-mono tracking-[0.25em] text-[#D4B47A]/45 uppercase">
          20 · 10 · TRIBUTE EDITION
        </div>
      </div>

      {/* Main Progressive Storytelling Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-20 pb-12">
        {/* Step 1: Progressive 20.10 & Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="flex flex-col items-center mb-5"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.35em] text-[#D4B47A] mb-2">
            {scene01.year}
          </span>
          <div className="flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.32em] uppercase text-[#F7F0E7]/70 font-sans">
            <span>{lang === "vi" ? scene01.eyebrow : scene01.eyebrowVi}</span>
          </div>
        </motion.div>

        {/* Personalized Recipient Banner (when ?to= is active) */}
        {recipientTo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#351C2A]/90 via-[#472337]/95 to-[#351C2A]/90 border border-[#D4B47A]/65 shadow-[0_0_35px_rgba(212,180,122,0.3)]"
          >
            <p className="text-xs sm:text-sm font-sans tracking-[0.22em] uppercase text-[#D4B47A] font-medium">
              ✦{" "}
              {lang === "vi"
                ? `DÀNH TẶNG RIÊNG ${recipientTo}`
                : `DEDICATED ESPECIALLY TO ${recipientTo}`}{" "}
              ✦
            </p>
            {senderFrom && (
              <p className="text-xs font-serif italic text-[#F7F0E7]/85 mt-1">
                {lang === "vi"
                  ? `Gửi từ: ${senderFrom}`
                  : `With appreciation from ${senderFrom}`}
              </p>
            )}
          </motion.div>
        )}

        <BotanicalDivider className="mb-7 opacity-80" />

        {/* Step 2: Staggered Word-by-Word Reveal of Title */}
        <h1
          key={lang}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide leading-[1.14] mb-6 max-w-3xl text-balance flex flex-wrap justify-center gap-x-3 gap-y-1"
        >
          {titleWords.map((word, idx) => (
            <motion.span
              key={`${lang}-${idx}`}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.15 + idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                idx >= titleWords.length - 2
                  ? "text-gold-gradient font-normal italic"
                  : "text-[#F7F0E7]"
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Step 3: Poetic Subtitle */}
        <motion.p
          key={`sub-${lang}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl font-sans text-[#F7F0E7]/80 font-light max-w-2xl leading-relaxed mb-8 text-balance"
        >
          {lang === "vi" ? scene01.subtitle : scene01.subtitleEn}
        </motion.p>

        {/* Inline Self-Personalization Box when visitor opens a general link without ?to= */}
        {!recipientTo && (
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            onSubmit={handleQuickNameSubmit}
            className="w-full max-w-md mb-7 p-1.5 pl-4 rounded-full bg-[#1a121c]/85 border border-[#D4B47A]/35 focus-within:border-[#D4B47A] flex items-center justify-between gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md"
          >
            <input
              type="text"
              maxLength={40}
              value={quickVisitorName}
              onChange={(e) => setQuickVisitorName(e.target.value)}
              placeholder={
                lang === "vi"
                  ? "Nhập tên của bạn để nhận thư & quẻ hoa riêng..."
                  : "Enter your name for a personal letter & oracle..."
              }
              className="flex-1 bg-transparent text-xs sm:text-sm font-sans text-[#F7F0E7] placeholder-[#F7F0E7]/45 focus:outline-none min-w-0"
            />
            <button
              type="submit"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase font-medium bg-[#D4B47A]/25 hover:bg-[#D4B47A] text-[#D4B47A] hover:text-[#111114] transition-all cursor-pointer whitespace-nowrap"
            >
              <Heart className="w-3 h-3" />
              <span>{lang === "vi" ? "Nhận quà" : "Personalize"}</span>
            </button>
          </motion.form>
        )}

        {/* Step 4: Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            onClick={handleBeginJourney}
            type="button"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-sans tracking-[0.22em] uppercase text-[#111114] bg-gradient-to-r from-[#D4B47A] via-[#F7F0E7] to-[#D4B47A] bg-[length:200%_auto] hover:bg-right rounded-full font-medium transition-all duration-500 shadow-[0_0_35px_rgba(212,180,122,0.35)] hover:shadow-[0_0_50px_rgba(247,240,231,0.55)] hover:scale-[1.02] cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#351C2A]" />
            <span>{lang === "vi" ? scene01.cta : scene01.ctaEn}</span>
          </button>

          <a
            href="#oracle"
            className="inline-flex items-center justify-center px-6 py-4 text-xs font-sans tracking-[0.18em] uppercase text-[#D4B47A] hover:text-[#F7F0E7] border border-[#D4B47A]/40 hover:border-[#D4B47A] bg-[#351C2A]/45 hover:bg-[#351C2A]/80 rounded-full transition-all duration-300 whitespace-nowrap"
          >
            {lang === "vi" ? "Hái hoa 20/10 ✦" : "Draw 20.10 Bloom ✦"}
          </a>

          <button
            type="button"
            onClick={handleOpenPersonalize}
            className="inline-flex items-center gap-2 px-5 py-4 text-xs font-sans tracking-[0.15em] uppercase text-[#F7F0E7]/75 hover:text-[#D4B47A] border border-[#F7F0E7]/15 hover:border-[#D4B47A]/50 bg-[#18121a]/70 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#D4B47A]" />
            <span>
              {recipientTo
                ? lang === "vi"
                  ? `Tạo link / Đổi tên (${recipientTo})`
                  : `Share Link / Edit (${recipientTo})`
                : lang === "vi"
                ? "Tạo link gửi riêng từng bạn"
                : "Create Personal Link"}
            </span>
          </button>
        </motion.div>

        {/* Brand Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-8 text-sm font-serif italic text-[#C98F9A]/85 tracking-wider"
        >
          &ldquo;{lang === "vi" ? brand.vietnameseTagline : brand.tagline}&rdquo;
        </motion.p>
      </div>

      {/* Discreet Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
        className="relative z-10 mt-auto pb-8 flex flex-col items-center gap-2 text-xs tracking-widest uppercase text-[#F7F0E7]/45"
      >
        <span className="text-[10px] tracking-[0.28em]">
          {lang === "vi" ? scene01.scrollHint : scene01.scrollHintEn}
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-[#D4B47A]/70 animate-bounce" />
      </motion.div>

      {/* Quick Personalize & Link Generator Modal */}
      <AnimatePresence>
        {showPersonalizeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-left"
            onClick={() => setShowPersonalizeModal(false)}
          >
            <motion.form
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSavePersonalize}
              className="relative w-full max-w-md rounded-2xl bg-[#1c131e] border border-[#D4B47A]/50 p-6 sm:p-8 shadow-2xl space-y-4"
            >
              <button
                type="button"
                onClick={() => setShowPersonalizeModal(false)}
                className="absolute top-4 right-4 p-2 text-[#F7F0E7]/60 hover:text-[#F7F0E7] rounded-full cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#D4B47A] block mb-1">
                  {lang === "vi" ? "TẠO LINK TẶNG RIÊNG 20/10" : "CREATE PERSONALIZED 20.10 LINK"}
                </span>
                <h3 className="text-2xl font-serif text-[#F7F0E7]">
                  {lang === "vi"
                    ? "Dành tặng trang web này cho ai?"
                    : "Who is this tribute dedicated to?"}
                </h3>
                <p className="text-xs font-sans text-[#F7F0E7]/65 mt-1 leading-relaxed">
                  {lang === "vi"
                    ? "Nhập tên bạn nữ để tạo đường link có gắn sẵn tên bạn ấy (ví dụ: ?to=Minh+Anh). Khi bạn ấy bấm vào link đó, web sẽ tự động chào đúng tên bạn ấy!"
                    : "Enter her name to generate a custom link (?to=Name). When she clicks that link, the entire website will automatically greet her by name!"}
                </p>
              </div>

              <div>
                <label className="block text-xs font-sans tracking-wider uppercase text-[#D4B47A] mb-1.5">
                  {lang === "vi" ? "Tên bạn nữ / Người nhận" : "Recipient's Name"}
                </label>
                <input
                  type="text"
                  maxLength={45}
                  value={tempTo}
                  onChange={(e) => setTempTo(e.target.value)}
                  placeholder={
                    lang === "vi" ? "Ví dụ: Minh Anh, Lan Khuê..." : "e.g. Minh Anh, Sarah..."
                  }
                  className="w-full bg-[#111114] border border-[#F7F0E7]/20 rounded-xl px-4 py-3 text-sm text-[#F7F0E7] focus:outline-none focus:border-[#D4B47A]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-sans tracking-wider uppercase text-[#D4B47A] mb-1.5">
                  {lang === "vi"
                    ? "Tên người gửi / Tập thể (Tùy chọn)"
                    : "From / Sender (Optional)"}
                </label>
                <input
                  type="text"
                  maxLength={45}
                  value={tempFrom}
                  onChange={(e) => setTempFrom(e.target.value)}
                  placeholder={
                    lang === "vi"
                      ? "Ví dụ: Tập thể nam 12A, Các bạn nam..."
                      : "e.g. The Boys of Class 12A..."
                  }
                  className="w-full bg-[#111114] border border-[#F7F0E7]/20 rounded-xl px-4 py-3 text-sm text-[#F7F0E7] focus:outline-none focus:border-[#D4B47A]"
                />
              </div>

              {/* Live URL preview & copy button */}
              {tempTo.trim() && (
                <div className="p-3 rounded-xl bg-[#111114] border border-[#D4B47A]/25 space-y-2">
                  <div className="text-[11px] font-mono text-[#D4B47A] truncate">
                    {buildPersonalizedUrl(tempTo, tempFrom)}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyModalLink}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-sans tracking-wider uppercase font-medium bg-[#D4B47A]/20 hover:bg-[#D4B47A] text-[#D4B47A] hover:text-[#111114] transition-all cursor-pointer"
                  >
                    {copiedModalLink ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>
                          {lang === "vi" ? "Đã sao chép Link!" : "Link Copied!"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>
                          {lang === "vi"
                            ? `Sao chép Link gửi cho ${tempTo.trim()}`
                            : `Copy Link for ${tempTo.trim()}`}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2">
                {recipientTo && (
                  <button
                    type="button"
                    onClick={() => {
                      clearPersonalization();
                      setShowPersonalizeModal(false);
                    }}
                    className="px-4 py-2.5 rounded-full text-xs font-sans text-[#F7F0E7]/60 hover:text-[#F7F0E7] border border-[#F7F0E7]/15 cursor-pointer"
                  >
                    {lang === "vi" ? "Xóa tên" : "Clear"}
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase font-medium bg-[#D4B47A] hover:bg-[#F7F0E7] text-[#111114] transition-colors cursor-pointer"
                >
                  {lang === "vi" ? "Áp dụng lên trang" : "Apply to Page"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
