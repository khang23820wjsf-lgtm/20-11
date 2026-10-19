import React, { useState, useEffect } from "react";
import { Mail, MailOpen, Heart, Edit3, RotateCcw, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "../data/siteConfig";
import { FloatingParticles } from "./FloatingParticles";
import { BotanicalDivider } from "./BotanicalArt";
import { soundscape } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";
import { usePersonalization } from "../context/PersonalizationContext";

export const LetterExperience: React.FC = () => {
  const { lang } = useLanguage();
  const { recipientTo, senderFrom } = usePersonalization();
  const { scene05 } = siteConfig;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const activeLetterSource = lang === "vi" ? scene05.letter : scene05.letterEn;

  const getDefaultSalutation = () => {
    if (recipientTo) {
      return lang === "vi" ? `Gửi ${recipientTo} thân mến,` : `Dearest ${recipientTo},`;
    }
    return activeLetterSource.salutation;
  };

  const getDefaultSignature = () => {
    if (senderFrom) {
      return senderFrom;
    }
    return activeLetterSource.signature;
  };

  const [salutation, setSalutation] = useState<string>(getDefaultSalutation());
  const [bodyText, setBodyText] = useState<string>(
    activeLetterSource.paragraphs.join("\n\n")
  );
  const [signature, setSignature] = useState<string>(getDefaultSignature());

  // Sync letter content when language or personalization changes
  useEffect(() => {
    const src = lang === "vi" ? scene05.letter : scene05.letterEn;
    setSalutation(
      recipientTo
        ? lang === "vi"
          ? `Gửi ${recipientTo} thân mến,`
          : `Dearest ${recipientTo},`
        : src.salutation
    );
    setBodyText(src.paragraphs.join("\n\n"));
    setSignature(senderFrom ? senderFrom : src.signature);
  }, [lang, recipientTo, senderFrom, scene05]);

  const handleOpenLetter = () => {
    setIsOpen(true);
    soundscape.playInteractionChime("envelope");
  };

  const handleCloseLetter = () => {
    setIsOpen(false);
    setIsEditing(false);
    soundscape.playInteractionChime("soft");
  };

  const handleResetDefault = () => {
    const src = lang === "vi" ? scene05.letter : scene05.letterEn;
    setSalutation(getDefaultSalutation());
    setBodyText(src.paragraphs.join("\n\n"));
    setSignature(getDefaultSignature());
  };

  const paragraphs = bodyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      id="letter"
      className={`relative py-28 md:py-40 transition-colors duration-1000 px-6 overflow-hidden ${
        isOpen
          ? "bg-gradient-to-b from-[#2c1522] via-[#3b1c2d] to-[#23111c]"
          : "bg-[#171018]"
      }`}
    >
      {/* Warm Golden Ambient Halo when letter is open */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
          isOpen ? "opacity-100" : "opacity-25"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(212, 180, 122, 0.22) 0%, rgba(201, 143, 154, 0.08) 45%, transparent 75%)",
        }}
      />

      {/* Floating particles & petals that burst when letter opens */}
      <FloatingParticles
        density={isOpen ? "high" : "low"}
        tint="gold"
        withPetals={true}
        burstTrigger={isOpen ? 2 : 0}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-sans tracking-[0.32em] uppercase text-[#D4B47A] mb-3 block">
            {lang === "vi" ? scene05.label : scene05.labelEn}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F0E7] leading-tight mb-4 text-balance">
            {recipientTo
              ? lang === "vi"
                ? `MỘT BỨC THƯ NHỎ, DÀNH RIÊNG CHO ${recipientTo.toUpperCase()}.`
                : `A SMALL LETTER, WRITTEN FOR ${recipientTo.toUpperCase()}.`
              : lang === "vi"
              ? scene05.title
              : scene05.titleEn}
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#F7F0E7]/75 font-light max-w-xl mx-auto mb-6">
            {lang === "vi" ? scene05.subtitle : scene05.subtitleEn}
          </p>
          <BotanicalDivider />
        </motion.div>

        {/* Interactive Envelope & Letter Stage */}
        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED TACTILE ARTISANAL ENVELOPE */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleOpenLetter}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleOpenLetter();
                  }
                }}
                aria-label={lang === "vi" ? "Mở bức thư 20/10" : "Open the 20.10 letter"}
                className="group cursor-pointer relative mx-auto max-w-2xl rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.75)] border border-[#D4B47A]/40 bg-gradient-to-b from-[#351C2A] to-[#21111a] p-8 sm:p-14 text-center transition-all duration-500 hover:border-[#D4B47A]/80 hover:shadow-[0_30px_90px_rgba(212,180,122,0.22)]"
              >
                {/* Decorative Envelope Diagonal Fold Lines (SVG) */}
                <svg
                  viewBox="0 0 600 360"
                  fill="none"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 w-full h-full opacity-35"
                  aria-hidden="true"
                >
                  <path
                    d="M0 0 L300 195 L600 0"
                    stroke="#D4B47A"
                    strokeWidth="1.5"
                    fill="rgba(17, 17, 20, 0.35)"
                  />
                  <path
                    d="M0 360 L230 160 M600 360 L370 160"
                    stroke="#D4B47A"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="572"
                    height="332"
                    rx="10"
                    stroke="#D4B47A"
                    strokeWidth="0.75"
                    opacity="0.6"
                  />
                </svg>

                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-[11px] font-sans tracking-[0.3em] text-[#D4B47A] uppercase mb-3">
                    {recipientTo
                      ? lang === "vi"
                        ? `GỬI TẬN TAY: ${recipientTo.toUpperCase()} · 20.10`
                        : `EXCLUSIVELY FOR: ${recipientTo.toUpperCase()} · 20.10`
                      : lang === "vi"
                      ? "NIÊM PHONG TRÂN TRỌNG · 20.10"
                      : "SEALED WITH APPRECIATION · 20.10"}
                  </span>

                  {/* Embossed Wax Seal */}
                  <div className="relative my-3">
                    <div className="absolute -inset-3 rounded-full bg-[#D4B47A]/20 blur-md group-hover:bg-[#D4B47A]/35 transition-all duration-500" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#9e2a40] via-[#751a2c] to-[#470f1b] flex flex-col items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_2px_6px_rgba(255,255,255,0.25)] border-2 border-[#D4B47A]/70 group-hover:scale-110 transition-transform duration-500">
                      <Heart className="w-6 h-6 text-[#F7F0E7] fill-[#D4B47A]/40 mb-0.5" />
                      <span className="text-[9px] font-mono tracking-widest text-[#D4B47A]">
                        20.10
                      </span>
                    </div>
                  </div>

                  <p className="text-xl sm:text-2xl font-serif text-[#F7F0E7] mt-5 mb-2 max-w-md">
                    {lang === "vi"
                      ? "Một bức thư viết về sự tự do, lòng can đảm và bình yên dành riêng cho bạn."
                      : "A letter about freedom, courage, and quiet peace, written especially for you."}
                  </p>
                  <p className="text-xs font-serif italic text-[#C98F9A] mb-8">
                    {lang === "vi"
                      ? "Chạm vào dấu niêm phong để mở bức thư"
                      : "Click the wax seal to unfold the letter"}
                  </p>

                  <span className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#D4B47A] via-[#F7F0E7] to-[#D4B47A] bg-[length:200%_auto] group-hover:bg-right text-[#111114] font-sans text-xs tracking-[0.22em] uppercase rounded-full font-medium transition-all duration-500 shadow-lg">
                    <MailOpen className="w-4 h-4" />
                    <span>
                      {lang === "vi" ? scene05.envelopeLabel : scene05.envelopeLabelEn}
                    </span>
                  </span>
                </div>
              </motion.div>
            ) : (
              /* OPENED WARM IVORY PARCHMENT LETTER */
              <motion.div
                key="opened-letter"
                initial={{ opacity: 0, y: 45, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 25, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl paper-texture text-[#1C1917] p-7 sm:p-12 md:p-16 shadow-[0_35px_90px_rgba(0,0,0,0.75)] border-2 border-[#D4B47A]/60"
              >
                {/* Inner Delicate Gold Hairline Frame */}
                <div className="pointer-events-none absolute inset-3 sm:inset-4 border border-[#8a2538]/15 rounded-xl" />

                {/* Top Action Bar inside Letter */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#1C1917]/12 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-serif italic text-[#8a2538] tracking-widest uppercase font-semibold">
                      {lang === "vi"
                        ? "Bức thư tháng Mười · 20.10"
                        : "An October Letter · 20.10"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-sans tracking-wider text-[#1C1917]/70 hover:text-[#8a2538] transition-colors py-1.5 px-3.5 border border-[#1C1917]/15 rounded-full hover:border-[#8a2538]/40 cursor-pointer"
                    >
                      {isEditing ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{lang === "vi" ? "Hoàn tất sửa" : "Done Editing"}</span>
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{lang === "vi" ? "Tùy chỉnh thư" : "Edit Letter"}</span>
                        </>
                      )}
                    </button>

                    {isEditing && (
                      <button
                        onClick={handleResetDefault}
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-sans text-[#1C1917]/60 hover:text-[#1C1917] py-1.5 px-3 border border-[#1C1917]/15 rounded-full cursor-pointer"
                        title={
                          lang === "vi" ? "Khôi phục bức thư gốc" : "Restore original letter"
                        }
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{lang === "vi" ? "Mặc định" : "Reset"}</span>
                      </button>
                    )}

                    <button
                      onClick={handleCloseLetter}
                      type="button"
                      className="text-xs font-sans tracking-wider text-[#F7F0E7] bg-[#351C2A] hover:bg-[#8a2538] transition-colors py-1.5 px-4 rounded-full cursor-pointer"
                    >
                      {lang === "vi" ? scene05.closeLabel : scene05.closeLabelEn}
                    </button>
                  </div>
                </div>

                {/* Editable Mode vs Reading Mode */}
                {isEditing ? (
                  <div className="relative z-10 space-y-4">
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#8a2538] mb-1">
                        {lang === "vi" ? "Lời chào mở đầu" : "Salutation"}
                      </label>
                      <input
                        type="text"
                        value={salutation}
                        onChange={(e) => setSalutation(e.target.value)}
                        className="w-full bg-white/70 border border-[#1C1917]/20 rounded-lg px-3.5 py-2 font-serif text-xl text-[#1C1917] focus:outline-none focus:border-[#8a2538]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#8a2538] mb-1">
                        {lang === "vi"
                          ? "Nội dung bức thư (cách đoạn bằng dòng trống)"
                          : "Letter body (separate paragraphs with a blank line)"}
                      </label>
                      <textarea
                        rows={10}
                        value={bodyText}
                        onChange={(e) => setBodyText(e.target.value)}
                        className="w-full bg-white/70 border border-[#1C1917]/20 rounded-lg p-4 font-serif text-lg leading-relaxed text-[#1C1917] focus:outline-none focus:border-[#8a2538]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans uppercase tracking-wider text-[#8a2538] mb-1">
                        {lang === "vi" ? "Chữ ký kết thư" : "Signature"}
                      </label>
                      <input
                        type="text"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        className="w-full bg-white/70 border border-[#1C1917]/20 rounded-lg px-3.5 py-2 font-serif text-lg text-[#1C1917] focus:outline-none focus:border-[#8a2538]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10">
                    {/* Salutation */}
                    <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917] mb-6">
                      {salutation}
                    </h3>

                    {/* Letter Paragraphs with staggered fade-in */}
                    <div className="space-y-4 font-serif text-lg sm:text-xl leading-[1.8] text-[#292524]">
                      {paragraphs.map((p, idx) => (
                        <motion.p
                          key={`${lang}-${idx}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: idx * 0.06 }}
                          className={
                            idx === 0
                              ? "first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:text-[#8a2538] first-letter:float-left first-letter:mr-3 first-letter:leading-none"
                              : ""
                          }
                        >
                          {p}
                        </motion.p>
                      ))}
                    </div>

                    {/* Signoff & Wax Seal Stamp */}
                    <div className="mt-12 pt-8 border-t border-[#1C1917]/12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                      <div>
                        <p className="text-sm font-sans italic text-[#1C1917]/70">
                          {activeLetterSource.signoff}
                        </p>
                        <p className="text-xl font-serif font-semibold text-[#8a2538] mt-1">
                          {signature}
                        </p>
                      </div>

                      <button
                        onClick={handleCloseLetter}
                        type="button"
                        className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-[#8a2538] hover:text-[#1C1917] transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        <span>
                          {lang === "vi" ? "Gấp lại bức thư" : "Fold the Letter"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
