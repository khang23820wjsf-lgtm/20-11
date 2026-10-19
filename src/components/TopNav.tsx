import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, Globe } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { soundscape } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";

export const TopNav: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("intro");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const toggleSound = () => {
    const active = soundscape.toggle();
    setIsAudioActive(active);
  };

  const navLinks = [
    { id: "intro", index: "01", labelVi: "Khởi nguồn", labelEn: "Prelude", href: "#intro" },
    { id: "stories", index: "02", labelVi: "Câu chuyện", labelEn: "Stories", href: "#stories" },
    { id: "reflections", index: "03", labelVi: "Góc nhìn", labelEn: "Unseen", href: "#reflections" },
    { id: "gallery", index: "04", labelVi: "Triển lãm", labelEn: "Gallery", href: "#gallery" },
    { id: "letter", index: "05", labelVi: "Bức thư", labelEn: "The Letter", href: "#letter" },
    { id: "oracle", index: "06", labelVi: "Quẻ hoa", labelEn: "Oracle", href: "#oracle" },
    { id: "wishes", index: "07", labelVi: "Nguyện cầu", labelEn: "Wishes", href: "#wishes" },
    { id: "composer", index: "08", labelVi: "Lời chúc", labelEn: "Tribute", href: "#composer" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#111114]/80 backdrop-blur-xl border-b border-[#F7F0E7]/8">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#intro"
            className="text-lg font-serif font-semibold tracking-[0.28em] text-[#F7F0E7] hover:text-[#D4B47A] transition-colors whitespace-nowrap shrink-0"
          >
            SHE IS
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-xs font-sans tracking-widest uppercase text-[#F7F0E7]/65"
          >
            {navLinks.slice(0, 6).map((link) => {
              const isCurrent = activeSection === link.id;
              const label = lang === "vi" ? link.labelVi : link.labelEn;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#D4B47A] after:transition-all after:duration-300 ${
                    isCurrent
                      ? "text-[#D4B47A] after:w-full"
                      : "hover:text-[#F7F0E7] after:w-0 hover:after:w-full"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Language Switcher & Sound Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                toggleLang();
                soundscape.playInteractionChime("soft");
              }}
              type="button"
              aria-label={lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 border border-[#F7F0E7]/15 hover:border-[#D4B47A]/60 bg-[#18121a]/80 text-[#F7F0E7] hover:text-[#D4B47A] whitespace-nowrap shrink-0 cursor-pointer"
              title={lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
            >
              <Globe className="w-3.5 h-3.5 text-[#D4B47A]" />
              <span className={lang === "vi" ? "text-[#D4B47A] font-semibold" : "text-[#F7F0E7]/50"}>
                VI
              </span>
              <span className="text-[#F7F0E7]/25">/</span>
              <span className={lang === "en" ? "text-[#D4B47A] font-semibold" : "text-[#F7F0E7]/50"}>
                EN
              </span>
            </button>

            <button
              onClick={toggleSound}
              type="button"
              aria-label={
                isAudioActive
                  ? lang === "vi"
                    ? "Tắt âm thanh không gian"
                    : "Mute ambient soundscape"
                  : lang === "vi"
                  ? "Bật âm thanh không gian"
                  : "Enable ambient soundscape"
              }
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider transition-all duration-300 border whitespace-nowrap shrink-0 cursor-pointer ${
                isAudioActive
                  ? "border-[#D4B47A]/60 bg-[#351C2A]/80 text-[#D4B47A] shadow-[0_0_20px_rgba(212,180,122,0.2)]"
                  : "border-[#D4B47A]/25 bg-[#351C2A]/30 hover:bg-[#351C2A]/60 text-[#F7F0E7]/80"
              }`}
              title={
                isAudioActive
                  ? lang === "vi"
                    ? "Tắt âm thanh không gian"
                    : "Mute ambient soundscape"
                  : lang === "vi"
                  ? "Bật âm thanh không gian"
                  : "Enable ambient soundscape"
              }
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D4B47A]" />
                  <span className="hidden sm:inline">
                    {lang === "vi" ? "Âm điệu: Bật" : "Sound: On"}
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#F7F0E7]/60" />
                  <span className="hidden sm:inline">
                    {lang === "vi" ? "Bật Âm Điệu" : "Soundscape"}
                  </span>
                </>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 text-[#F7F0E7]/70 hover:text-[#F7F0E7] cursor-pointer"
              aria-label={lang === "vi" ? "Mở menu di động" : "Open mobile menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Smooth Reading Progress Hairline */}
        <motion.div
          className="h-[1.5px] bg-gradient-to-r from-[#351C2A] via-[#D4B47A] to-[#C98F9A] origin-left"
          style={{ scaleX }}
        />

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111114]/95 border-b border-[#F7F0E7]/10 px-6 py-4 flex flex-col gap-2 backdrop-blur-xl">
            {navLinks.map((link) => {
              const label = lang === "vi" ? link.labelVi : link.labelEn;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-sans tracking-wider py-2.5 text-[#F7F0E7]/80 hover:text-[#D4B47A] transition-colors border-b border-[#F7F0E7]/5"
                >
                  <span>{label}</span>
                  <span className="text-xs font-mono tabular-nums text-[#D4B47A]/60">
                    {link.index}
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </header>

      {/* Discreet Desktop Chapter Timeline Rail */}
      <aside
        aria-label={lang === "vi" ? "Tiến trình chương" : "Chapter progress"}
        className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
      >
        {navLinks.map((item) => {
          const isActive = activeSection === item.id;
          const label = lang === "vi" ? item.labelVi : item.labelEn;
          return (
            <a
              key={item.id}
              href={item.href}
              className="group flex items-center gap-3 py-0.5 text-right"
              title={label}
            >
              <span
                className={`text-[10px] font-sans tracking-[0.2em] uppercase transition-all duration-300 ${
                  isActive
                    ? "opacity-100 text-[#D4B47A] translate-x-0"
                    : "opacity-0 group-hover:opacity-70 text-[#F7F0E7] translate-x-2 group-hover:translate-x-0"
                }`}
              >
                {label}
              </span>
              <span
                className={`font-mono text-[10px] tabular-nums transition-colors ${
                  isActive
                    ? "text-[#D4B47A] font-semibold"
                    : "text-[#F7F0E7]/30 group-hover:text-[#F7F0E7]/60"
                }`}
              >
                {item.index}
              </span>
              <span
                className={`h-[1px] transition-all duration-300 ${
                  isActive
                    ? "w-6 bg-[#D4B47A]"
                    : "w-2 bg-[#F7F0E7]/20 group-hover:w-4 group-hover:bg-[#F7F0E7]/50"
                }`}
              />
            </a>
          );
        })}
      </aside>
    </>
  );
};
