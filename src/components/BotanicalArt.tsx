import React from "react";

interface EmblemProps {
  archetypeId: string;
  className?: string;
}

export const ArchetypeEmblem: React.FC<EmblemProps> = ({ archetypeId, className = "w-12 h-12" }) => {
  switch (archetypeId) {
    case "dreamer":
      // Crescent moon, stars & blooming lotus bud
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="28" stroke="#D4B47A" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6" />
          <path
            d="M36 16C27.5 17.5 22 25.5 23.5 34C25 42.5 33 48 41.5 46.5C35.5 49.5 27.5 48 22.5 42.5C17.5 37 17.5 28.5 22.5 23C26.2 18.8 31.2 16.5 36 16Z"
            stroke="#D4B47A"
            strokeWidth="1.2"
            fill="rgba(212, 180, 122, 0.12)"
          />
          <path d="M40 22L41.5 26L45.5 27.5L41.5 29L40 33L38.5 29L34.5 27.5L38.5 26L40 22Z" fill="#D4B47A" />
          <circle cx="28" cy="14" r="1" fill="#C98F9A" />
          <circle cx="48" cy="38" r="1.2" fill="#D4B47A" />
        </svg>
      );

    case "creator":
      // Radiant sun-eye, botanical leaf & artistic arc
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="28" stroke="#D4B47A" strokeWidth="0.75" opacity="0.4" />
          <path
            d="M16 32C22 22 42 22 48 32C42 42 22 42 16 32Z"
            stroke="#D4B47A"
            strokeWidth="1.2"
            fill="rgba(201, 143, 154, 0.1)"
          />
          <circle cx="32" cy="32" r="5" stroke="#D4B47A" strokeWidth="1.2" fill="rgba(212, 180, 122, 0.25)" />
          <path d="M32 12V20M32 44V52M20 18L24 23M44 41L48 46M44 18L40 23M20 46L24 41" stroke="#D4B47A" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );

    case "scientist":
      // Atomic orbits & crystalline star
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(30 32 32)" stroke="#D4B47A" strokeWidth="1.1" opacity="0.85" />
          <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(-30 32 32)" stroke="#C98F9A" strokeWidth="1.1" opacity="0.85" />
          <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(90 32 32)" stroke="#D4B47A" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
          <circle cx="32" cy="32" r="3.5" fill="#D4B47A" />
        </svg>
      );

    case "leader":
      // Architectural arch & guiding north star
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M18 50V28C18 20.268 24.268 14 32 14C39.732 14 46 20.268 46 28V50"
            stroke="#D4B47A"
            strokeWidth="1.3"
          />
          <path
            d="M23 50V29C23 24.029 27.029 20 32 20C36.971 20 41 24.029 41 29V50"
            stroke="#C98F9A"
            strokeWidth="0.9"
            opacity="0.7"
          />
          <path d="M32 23L33.5 28.5L39 30L33.5 31.5L32 37L30.5 31.5L25 30L30.5 28.5L32 23Z" fill="#D4B47A" />
          <line x1="14" y1="50" x2="50" y2="50" stroke="#D4B47A" strokeWidth="1.2" />
        </svg>
      );

    case "explorer":
      // Celestial compass rose
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle cx="32" cy="32" r="24" stroke="#D4B47A" strokeWidth="1" opacity="0.5" />
          <circle cx="32" cy="32" r="18" stroke="#D4B47A" strokeWidth="0.75" strokeDasharray="2 3" />
          <path d="M32 10L36 28L54 32L36 36L32 54L28 36L10 32L28 28L32 10Z" stroke="#D4B47A" strokeWidth="1.2" fill="rgba(212, 180, 122, 0.12)" />
          <circle cx="32" cy="32" r="2.5" fill="#F7F0E7" />
        </svg>
      );

    case "caregiver":
      // Blooming lotus & warm halo
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <circle cx="32" cy="28" r="18" stroke="#C98F9A" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
          <path
            d="M32 16C36 23 38 30 32 42C26 30 28 23 32 16Z"
            stroke="#D4B47A"
            strokeWidth="1.2"
            fill="rgba(212, 180, 122, 0.15)"
          />
          <path
            d="M32 42C39 36 44 29 44 22C38 25 35 30 32 42Z"
            stroke="#D4B47A"
            strokeWidth="1.1"
          />
          <path
            d="M32 42C25 36 20 29 20 22C26 25 29 30 32 42Z"
            stroke="#D4B47A"
            strokeWidth="1.1"
          />
          <path d="M22 46C28 49 36 49 42 46" stroke="#C98F9A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "athlete":
      // Ascending wings / laurel wreath & flame
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path
            d="M20 46C14 38 14 26 22 18M44 46C50 38 50 26 42 18"
            stroke="#D4B47A"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M32 16C36 24 39 29 35 37C33 41 31 41 29 37C25 29 28 24 32 16Z"
            stroke="#C98F9A"
            strokeWidth="1.2"
            fill="rgba(201, 143, 154, 0.15)"
          />
          <path d="M24 48H40" stroke="#D4B47A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    default:
      // Everyday hero: botanical branch & starlight
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path d="M20 48C26 36 34 26 44 16" stroke="#D4B47A" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M28 38C24 36 22 31 25 27C29 29 30 34 28 38Z" stroke="#D4B47A" strokeWidth="1.1" fill="rgba(212, 180, 122, 0.15)" />
          <path d="M35 30C39 31 43 28 43 23C38 23 35 26 35 30Z" stroke="#C98F9A" strokeWidth="1.1" fill="rgba(201, 143, 154, 0.15)" />
          <path d="M31 43C36 45 41 42 41 37C36 37 32 39 31 43Z" stroke="#D4B47A" strokeWidth="1.1" />
          <circle cx="46" cy="14" r="2" fill="#D4B47A" />
        </svg>
      );
  }
};

export const BotanicalDivider: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
    <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#D4B47A]/50" />
    <svg viewBox="0 0 40 20" className="w-8 h-4 text-[#D4B47A]" fill="none">
      <path d="M20 2L22.5 8.5L29 10L22.5 11.5L20 18L17.5 11.5L11 10L17.5 8.5L20 2Z" fill="currentColor" opacity="0.85" />
      <circle cx="4" cy="10" r="1.2" fill="currentColor" opacity="0.5" />
      <circle cx="36" cy="10" r="1.2" fill="currentColor" opacity="0.5" />
    </svg>
    <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#D4B47A]/50" />
  </div>
);
