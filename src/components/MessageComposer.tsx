import React, { useState, useEffect } from "react";
import {
  Check,
  Copy,
  Share2,
  RefreshCw,
  Printer,
  Download,
  Palette,
  Heart,
  Link2,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "../data/siteConfig";
import { generateGreeting } from "../data/greetingTemplates";
import { BotanicalDivider } from "./BotanicalArt";
import { soundscape } from "../utils/audioSynth";
import { useLanguage } from "../context/LanguageContext";
import { usePersonalization } from "../context/PersonalizationContext";

interface MessageComposerProps {
  inspiredMessage?: string | null;
}

type CardThemeId = "ivory" | "burgundy" | "rose";

export const MessageComposer: React.FC<MessageComposerProps> = ({ inspiredMessage }) => {
  const { lang } = useLanguage();
  const { recipientTo, senderFrom, setPersonalization, buildPersonalizedUrl } =
    usePersonalization();
  const { scene07 } = siteConfig;

  const [recipientName, setRecipientName] = useState<string>(recipientTo || "");
  const [senderName, setSenderName] = useState<string>(senderFrom || "");
  const [relationshipId, setRelationshipId] = useState<string>("friend");
  const [toneId, setToneId] = useState<string>("heartfelt");
  const [cardTheme, setCardTheme] = useState<CardThemeId>("ivory");
  const [message, setMessage] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");
  const [linkCopyStatus, setLinkCopyStatus] = useState<boolean>(false);
  const [shareStatus, setShareStatus] = useState<string>("");

  // Sync when global personalization changes
  useEffect(() => {
    if (recipientTo) setRecipientName(recipientTo);
    if (senderFrom) setSenderName(senderFrom);
  }, [recipientTo, senderFrom]);

  // Initialize or regenerate text when relationship, tone, or language changes
  useEffect(() => {
    const preset = generateGreeting(recipientName, relationshipId, toneId, lang);
    setMessage(preset);
  }, [relationshipId, toneId, lang]);

  // Apply external inspiration message if chosen from Gallery or Bloom Oracle
  useEffect(() => {
    if (inspiredMessage) {
      setMessage(inspiredMessage);
    }
  }, [inspiredMessage]);

  const handleRegenerate = () => {
    const preset = generateGreeting(recipientName, relationshipId, toneId, lang);
    setMessage(preset);
    soundscape.playInteractionChime("soft");
  };

  // Real copy to clipboard
  const handleCopy = async () => {
    try {
      if (!message.trim()) return;
      const fullCopy = senderName.trim()
        ? `${message}\n\n— ${senderName.trim()}`
        : message;
      await navigator.clipboard.writeText(fullCopy);
      setCopyStatus("success");
      soundscape.playInteractionChime("soft");
      setTimeout(() => setCopyStatus("idle"), 3000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 3000);
    }
  };

  // Copy Personalized Link (?to=...&from=...)
  const handleCopyPersonalizedLink = async () => {
    const url = buildPersonalizedUrl(recipientName, senderName);
    setPersonalization(recipientName, senderName);
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopyStatus(true);
      soundscape.playInteractionChime("bloom");
      setTimeout(() => setLinkCopyStatus(false), 3500);
    } catch {
      setShareStatus(url);
    }
  };

  // Apply personalization across entire website & preview from top
  const handlePreviewPersonalizedSite = () => {
    setPersonalization(recipientName, senderName);
    soundscape.playInteractionChime("bloom");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Real native share with fallback
  const handleShare = async () => {
    if (!message.trim()) return;
    const fullText = senderName.trim()
      ? `${message}\n\n— ${senderName.trim()}`
      : message;
    const shareUrl = buildPersonalizedUrl(recipientName, senderName);

    const shareData = {
      title: recipientName.trim()
        ? `Dành tặng ${recipientName.trim()} — SHE IS | 20.10`
        : lang === "vi"
        ? "SHE IS — Lời chúc 20/10"
        : "SHE IS — 20.10 Tribute",
      text: fullText,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setShareStatus(
          lang === "vi" ? "Đã chia sẻ thành công!" : "Shared successfully!"
        );
        setTimeout(() => setShareStatus(""), 3000);
      } catch (err: unknown) {
        if ((err as Error)?.name !== "AbortError") {
          handleCopy();
          setShareStatus(
            lang === "vi"
              ? "Đã sao chép lời chúc vào bộ nhớ tạm để chia sẻ!"
              : "Copied to clipboard for sharing!"
          );
          setTimeout(() => setShareStatus(""), 3000);
        }
      }
    } else {
      handleCopy();
      setShareStatus(
        lang === "vi"
          ? "Đã sao chép lời chúc vào bộ nhớ tạm để bạn gửi tặng!"
          : "Message copied to clipboard ready to share!"
      );
      setTimeout(() => setShareStatus(""), 3500);
    }
  };

  // Real HTML5 Canvas High-Resolution Greeting Card Download
  const handleDownloadCardImage = () => {
    const canvas = document.createElement("canvas");
    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palettes: Record<
      CardThemeId,
      { bg1: string; bg2: string; text: string; accent: string; sub: string; border: string }
    > = {
      ivory: {
        bg1: "#F7F0E7",
        bg2: "#EDE2D3",
        text: "#1C1917",
        accent: "#8A2538",
        sub: "#57534E",
        border: "#D4B47A",
      },
      burgundy: {
        bg1: "#2A1420",
        bg2: "#190B13",
        text: "#F7F0E7",
        accent: "#D4B47A",
        sub: "#C98F9A",
        border: "#D4B47A",
      },
      rose: {
        bg1: "#3B222C",
        bg2: "#24141B",
        text: "#F7F0E7",
        accent: "#D4B47A",
        sub: "#E2BAC2",
        border: "#C98F9A",
      },
    };

    const pal = palettes[cardTheme];

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, pal.bg1);
    grad.addColorStop(1, pal.bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = pal.border;
    ctx.lineWidth = 3;
    ctx.strokeRect(48, 48, width - 96, height - 96);

    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.55;
    ctx.strokeRect(64, 64, width - 128, height - 128);
    ctx.globalAlpha = 1;

    ctx.fillStyle = pal.accent;
    ctx.font = "600 20px sans-serif";
    ctx.fillText(
      lang === "vi"
        ? "THIỆP CHÚC MỪNG · VIETNAMESE WOMEN'S DAY 20.10"
        : "TRIBUTE CARD · VIETNAMESE WOMEN'S DAY 20.10",
      110,
      145
    );

    ctx.fillStyle = pal.text;
    ctx.font = "italic 54px Georgia, serif";
    const headingText = recipientName.trim()
      ? lang === "vi"
        ? `Gửi ${recipientName.trim()}`
        : `To ${recipientName.trim()}`
      : lang === "vi"
      ? "Gửi người phụ nữ tuyệt vời"
      : "To an Extraordinary Woman";
    ctx.fillText(headingText, 110, 225);

    ctx.strokeStyle = pal.border;
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(110, 265);
    ctx.lineTo(width - 110, 265);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = pal.text;
    ctx.font = "34px Georgia, serif";
    const maxLineWidth = width - 220;
    const lineHeight = 54;
    let y = 345;

    const rawLines = (message || "").split("\n");
    for (const rawLine of rawLines) {
      if (!rawLine.trim()) {
        y += 28;
        continue;
      }
      const words = rawLine.split(" ");
      let currentLine = "";
      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxLineWidth && i > 0) {
          ctx.fillText(currentLine, 110, y);
          currentLine = words[i] + " ";
          y += lineHeight;
        } else {
          currentLine = testLine;
        }
      }
      ctx.fillText(currentLine, 110, y);
      y += lineHeight;
    }

    if (senderName.trim()) {
      y += 35;
      ctx.fillStyle = pal.accent;
      ctx.font = "italic 36px Georgia, serif";
      ctx.fillText(`— ${senderName.trim()}`, 110, Math.min(y, height - 210));
    }

    ctx.strokeStyle = pal.border;
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(110, height - 150);
    ctx.lineTo(width - 110, height - 150);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = pal.sub;
    ctx.font = "italic 24px Georgia, serif";
    ctx.fillText(
      lang === "vi"
        ? "Mỗi người phụ nữ là một thế giới riêng."
        : "Every woman is a universe of her own.",
      110,
      height - 100
    );

    ctx.fillStyle = pal.accent;
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("SHE IS ✦ 20.10", width - 310, height - 100);

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `she-is-20-10-${recipientName.trim() || "card"}.png`;
    link.href = dataUrl;
    link.click();

    soundscape.playInteractionChime("bloom");
    setShareStatus(
      lang === "vi"
        ? "Đã tải xuống thiệp ảnh PNG chất lượng cao!"
        : "Downloaded high-resolution PNG card!"
    );
    setTimeout(() => setShareStatus(""), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  const cardThemeClasses: Record<
    CardThemeId,
    { wrapper: string; kicker: string; title: string; body: string; border: string; footer: string }
  > = {
    ivory: {
      wrapper: "paper-texture text-[#1C1917] border-[#D4B47A]/60",
      kicker: "text-[#8a2538]",
      title: "text-[#1C1917]",
      body: "text-[#292524]",
      border: "border-[#1C1917]/12",
      footer: "text-[#1C1917]/65",
    },
    burgundy: {
      wrapper: "burgundy-texture text-[#F7F0E7] border-[#D4B47A]/55",
      kicker: "text-[#D4B47A]",
      title: "text-[#F7F0E7]",
      body: "text-[#F7F0E7]/90",
      border: "border-[#D4B47A]/20",
      footer: "text-[#C98F9A]",
    },
    rose: {
      wrapper: "rose-texture text-[#F7F0E7] border-[#C98F9A]/55",
      kicker: "text-[#D4B47A]",
      title: "text-[#F7F0E7]",
      body: "text-[#F7F0E7]/90",
      border: "border-[#F7F0E7]/15",
      footer: "text-[#D4B47A]/80",
    },
  };

  const activeTheme = cardThemeClasses[cardTheme];
  const generatedLinkPreview = buildPersonalizedUrl(recipientName, senderName);

  return (
    <section
      id="composer"
      className="relative py-28 md:py-36 bg-[#111114] text-[#F7F0E7] px-6 border-t border-[#F7F0E7]/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-sans tracking-[0.32em] uppercase text-[#C98F9A] mb-3 block">
            {lang === "vi" ? scene07.label : scene07.labelEn}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F7F0E7] leading-tight mb-4 text-balance">
            {lang === "vi" ? scene07.title : scene07.titleEn}
          </h2>
          <p className="text-base sm:text-lg font-sans text-[#F7F0E7]/75 font-light mb-6">
            {lang === "vi" ? scene07.subtitle : scene07.subtitleEn}
          </p>
          <BotanicalDivider />
        </motion.div>

        {/* 2-Column Layout: Controls & Live Card Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Column 1: Configuration Form */}
          <div className="lg:col-span-6 bg-[#18121a] p-6 sm:p-8 rounded-2xl border border-[#F7F0E7]/10 space-y-6 shadow-xl">
            {/* 1. Recipient & Sender Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="recipient-name"
                  className="block text-xs font-sans tracking-widest uppercase text-[#D4B47A] mb-2"
                >
                  {lang === "vi" ? "1. Tên bạn nữ / Người nhận" : "1. Recipient Name"}
                </label>
                <input
                  id="recipient-name"
                  type="text"
                  maxLength={50}
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={
                    lang === "vi" ? "Ví dụ: Minh Anh, Lan Khuê..." : "e.g. Minh Anh, Linh..."
                  }
                  className="w-full bg-[#111114] border border-[#F7F0E7]/15 rounded-xl px-4 py-3 text-sm text-[#F7F0E7] placeholder-[#F7F0E7]/30 focus:outline-none focus:border-[#D4B47A] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="sender-name"
                  className="block text-xs font-sans tracking-widest uppercase text-[#D4B47A] mb-2"
                >
                  {lang === "vi" ? "Người gửi / Tập thể" : "From / Sender"}
                </label>
                <input
                  id="sender-name"
                  type="text"
                  maxLength={40}
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={
                    lang === "vi" ? "Ví dụ: Các bạn nam 12A..." : "e.g. The Boys of Class 12A..."
                  }
                  className="w-full bg-[#111114] border border-[#F7F0E7]/15 rounded-xl px-4 py-3 text-sm text-[#F7F0E7] placeholder-[#F7F0E7]/30 focus:outline-none focus:border-[#D4B47A] transition-colors"
                />
              </div>
            </div>

            {/* 2. Relationship Selector */}
            <div>
              <label className="block text-xs font-sans tracking-widest uppercase text-[#D4B47A] mb-2">
                {lang === "vi" ? "2. Mối quan hệ" : "2. Relationship"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {scene07.relationships.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => {
                      setRelationshipId(rel.id);
                      soundscape.playInteractionChime("soft");
                    }}
                    className={`px-3.5 py-2.5 text-xs font-sans rounded-xl border text-left transition-all cursor-pointer whitespace-nowrap truncate ${
                      relationshipId === rel.id
                        ? "bg-[#D4B47A]/20 border-[#D4B47A] text-[#F7F0E7] font-medium shadow-sm"
                        : "bg-[#111114]/60 border-[#F7F0E7]/10 text-[#F7F0E7]/70 hover:border-[#F7F0E7]/25"
                    }`}
                  >
                    {lang === "vi" ? rel.label : rel.englishLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Tone Selector */}
            <div>
              <label className="block text-xs font-sans tracking-widest uppercase text-[#D4B47A] mb-2">
                {lang === "vi" ? "3. Giọng điệu lời chúc" : "3. Message Tone"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {scene07.tones.map((tone) => (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => {
                      setToneId(tone.id);
                      soundscape.playInteractionChime("soft");
                    }}
                    className={`p-3.5 text-xs font-sans rounded-xl border text-left transition-all cursor-pointer ${
                      toneId === tone.id
                        ? "bg-[#351C2A]/70 border-[#D4B47A] text-[#F7F0E7]"
                        : "bg-[#111114]/60 border-[#F7F0E7]/10 text-[#F7F0E7]/70 hover:border-[#F7F0E7]/25"
                    }`}
                  >
                    <div className="font-medium text-[#D4B47A] mb-0.5">
                      {lang === "vi" ? tone.label : tone.englishLabel}
                    </div>
                    <div className="text-[11px] text-[#F7F0E7]/55 font-light">
                      {lang === "vi" ? tone.description : tone.englishDescription}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Card Paper Theme */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase text-[#D4B47A] mb-2">
                <Palette className="w-3.5 h-3.5" />
                <span>{lang === "vi" ? "4. Chất liệu thiệp" : "4. Card Aesthetic"}</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    id: "ivory" as CardThemeId,
                    labelVi: "Giấy Kem Cổ Điển",
                    labelEn: "Warm Ivory",
                  },
                  {
                    id: "burgundy" as CardThemeId,
                    labelVi: "Đỏ Burgundy",
                    labelEn: "Royal Burgundy",
                  },
                  {
                    id: "rose" as CardThemeId,
                    labelVi: "Hồng Mờ Thơ Mộng",
                    labelEn: "Velvet Rose",
                  },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setCardTheme(t.id)}
                    className={`px-3 py-2 text-xs font-sans rounded-xl border text-center transition-all cursor-pointer whitespace-nowrap truncate ${
                      cardTheme === t.id
                        ? "border-[#D4B47A] bg-[#D4B47A]/20 text-[#F7F0E7] font-medium"
                        : "border-[#F7F0E7]/10 bg-[#111114]/60 text-[#F7F0E7]/65 hover:border-[#F7F0E7]/25"
                    }`}
                  >
                    {lang === "vi" ? t.labelVi : t.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Message Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="personal-message"
                  className="text-xs font-sans tracking-widest uppercase text-[#D4B47A]"
                >
                  {lang === "vi" ? "5. Nội dung lời chúc" : "5. Personal Message"}
                </label>
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-[#C98F9A] hover:text-[#D4B47A] transition-colors cursor-pointer"
                  title={lang === "vi" ? "Tải lại mẫu câu" : "Regenerate preset"}
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{lang === "vi" ? "Đổi mẫu gợi ý" : "Reset Preset"}</span>
                </button>
              </div>
              <textarea
                id="personal-message"
                rows={5}
                maxLength={600}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#111114] border border-[#F7F0E7]/15 rounded-xl p-4 text-base font-serif leading-relaxed text-[#F7F0E7] focus:outline-none focus:border-[#D4B47A] transition-colors resize-none"
              />
              <div className="flex justify-between items-center text-[11px] font-mono tabular-nums text-[#F7F0E7]/45 mt-1.5">
                <span>
                  {lang === "vi"
                    ? "Soạn thảo tự do hoặc chỉnh sửa từ gợi ý"
                    : "Write freely or customize the suggested tribute"}
                </span>
                <span>{message.length} / 600</span>
              </div>
            </div>
          </div>

          {/* Column 2: Live Editorial Greeting Card Preview + Personalized Link Generator */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-6">
            <div
              id="printable-greeting-card"
              className={`rounded-2xl p-8 sm:p-11 shadow-[0_30px_80px_rgba(0,0,0,0.65)] border-2 relative overflow-hidden transition-colors duration-500 ${activeTheme.wrapper}`}
            >
              {/* Inner Decorative Hairline Frame */}
              <div
                className={`pointer-events-none absolute inset-3 border rounded-xl ${activeTheme.border}`}
              />

              {/* Top Right Stamp */}
              <div className="relative z-10 flex items-center justify-between pb-6 border-b mb-6 border-current/10">
                <div>
                  <span
                    className={`text-[10px] font-sans tracking-[0.26em] uppercase block mb-1.5 font-semibold ${activeTheme.kicker}`}
                  >
                    {lang === "vi"
                      ? "THIỆP CHÚC MỪNG · VIETNAMESE WOMEN'S DAY"
                      : "TRIBUTE CARD · VIETNAMESE WOMEN'S DAY"}
                  </span>
                  <h3 className={`text-2xl sm:text-3xl font-serif ${activeTheme.title}`}>
                    {recipientName.trim()
                      ? lang === "vi"
                        ? `Gửi ${recipientName.trim()}`
                        : `To ${recipientName.trim()}`
                      : lang === "vi"
                      ? "Gửi người phụ nữ tuyệt vời"
                      : "To an Extraordinary Woman"}
                  </h3>
                </div>

                {/* Wax Seal Mini Emblem */}
                <div className="shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-[#8a2538] to-[#4d121e] border border-[#D4B47A]/60 flex items-center justify-center shadow-md">
                  <Heart className="w-4 h-4 text-[#F7F0E7] fill-[#D4B47A]/40" />
                </div>
              </div>

              {/* Message Body */}
              <div
                className={`relative z-10 min-h-[180px] font-serif text-lg sm:text-xl leading-[1.75] whitespace-pre-line mb-6 ${activeTheme.body}`}
              >
                {message ||
                  (lang === "vi"
                    ? "Hãy nhập lời chúc của bạn..."
                    : "Write your personal tribute here...")}
              </div>

              {/* Optional Sender Signature */}
              {senderName.trim() && (
                <div
                  className={`relative z-10 text-right font-serif italic text-lg mb-6 ${activeTheme.kicker}`}
                >
                  — {senderName.trim()}
                </div>
              )}

              {/* Card Footer */}
              <div
                className={`relative z-10 pt-5 border-t border-current/10 flex items-center justify-between text-xs font-sans ${activeTheme.footer}`}
              >
                <span className="font-serif italic text-sm">
                  {lang === "vi"
                    ? "Mỗi người phụ nữ là một thế giới riêng."
                    : "Every woman is a universe of her own."}
                </span>
                <span className={`font-semibold tracking-widest ${activeTheme.kicker}`}>
                  SHE IS ✦ 20.10
                </span>
              </div>
            </div>

            {/* Action Buttons for Card */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-sans tracking-wider uppercase font-medium bg-[#D4B47A] hover:bg-[#F7F0E7] text-[#111114] transition-all cursor-pointer shadow-lg whitespace-nowrap"
              >
                {copyStatus === "success" ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>{lang === "vi" ? "Đã sao chép!" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{lang === "vi" ? "Sao chép lời chúc" : "Copy Message"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadCardImage}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-sans tracking-wider uppercase font-medium border border-[#D4B47A]/60 bg-[#351C2A]/80 hover:bg-[#351C2A] text-[#F7F0E7] transition-all cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-[#D4B47A]" />
                <span>{lang === "vi" ? "Tải thiệp PNG" : "Download PNG"}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-sans tracking-wider uppercase font-medium border border-[#F7F0E7]/20 hover:border-[#D4B47A] bg-[#18121a] text-[#F7F0E7] transition-all cursor-pointer whitespace-nowrap"
              >
                <Share2 className="w-4 h-4 text-[#D4B47A]" />
                <span>{lang === "vi" ? "Chia sẻ" : "Share"}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="p-3.5 rounded-full border border-[#F7F0E7]/20 hover:border-[#D4B47A]/60 bg-[#18121a] text-[#F7F0E7]/80 hover:text-[#F7F0E7] transition-colors cursor-pointer"
                title={lang === "vi" ? "In hoặc lưu dạng PDF" : "Print or Save as PDF"}
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>

            {/* Personalized Web Link Generator Box (?to=...&from=...) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#261420] to-[#161018] border border-[#D4B47A]/35 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-sans tracking-widest uppercase text-[#D4B47A] flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5" />
                  <span>
                    {lang === "vi"
                      ? "Tạo Link Web Cá Nhân Hóa Gửi Riêng Bạn Nữ"
                      : "Create Personalized Website Link"}
                  </span>
                </span>
              </div>

              <p className="text-xs font-sans text-[#F7F0E7]/70 font-light leading-relaxed">
                {lang === "vi"
                  ? "Khi người nhận mở đường link này, toàn bộ trang web (Màn hình mở đầu, Phong bì Bức thư 20/10 và Quẻ Hoa) sẽ tự động hiện tên của bạn ấy:"
                  : "When she opens this link, the Opening Scene, the 20.10 Letter Envelope, and the Bloom Oracle will automatically display her name:"}
              </p>

              <div className="px-3.5 py-2.5 rounded-xl bg-[#111114] border border-[#F7F0E7]/10 font-mono text-xs text-[#D4B47A] truncate">
                {generatedLinkPreview}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleCopyPersonalizedLink}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase font-medium bg-[#D4B47A]/20 hover:bg-[#D4B47A] text-[#D4B47A] hover:text-[#111114] border border-[#D4B47A]/50 transition-all cursor-pointer"
                >
                  {linkCopyStatus ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>
                        {lang === "vi"
                          ? "Đã sao chép Link cá nhân hóa!"
                          : "Personalized Link Copied!"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>
                        {lang === "vi" ? "Sao chép Link tặng riêng" : "Copy Personal Link"}
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePreviewPersonalizedSite}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase text-[#F7F0E7]/85 hover:text-[#D4B47A] border border-[#F7F0E7]/15 hover:border-[#D4B47A]/40 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4B47A]" />
                  <span>
                    {lang === "vi" ? "Xem thử từ đầu trang" : "Preview from Top"}
                  </span>
                </button>
              </div>
            </div>

            {/* Feedback messages */}
            {shareStatus && (
              <p className="mt-2 text-xs font-sans text-center text-[#D4B47A]">
                {shareStatus}
              </p>
            )}
            {copyStatus === "error" && (
              <p className="mt-2 text-xs font-sans text-center text-rose-400">
                {lang === "vi"
                  ? "Không thể truy cập khay nhớ tạm. Vui lòng chọn và sao chép thủ công."
                  : "Unable to access clipboard. Please select and copy manually."}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
