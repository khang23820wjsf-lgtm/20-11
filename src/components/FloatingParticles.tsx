import React, { useEffect, useRef } from "react";

interface FloatingParticlesProps {
  density?: "low" | "medium" | "high";
  tint?: "gold" | "rose" | "warm";
  withPetals?: boolean;
  interactive?: boolean;
  burstTrigger?: number;
  className?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  density = "medium",
  tint = "gold",
  withPetals = true,
  interactive = true,
  burstTrigger = 0,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const mouse = { x: -1000, y: -1000, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= height;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    const isMobile = window.innerWidth < 768;
    const baseCount = isMobile
      ? density === "low" ? 18 : 30
      : density === "low" ? 35 : density === "medium" ? 55 : 85;

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
      pulseSpeed: number;
      phase: number;
      kind: "dust" | "bokeh" | "petal";
      angle: number;
      spinSpeed: number;
      petalScale: number;
    }

    const particles: Particle[] = [];

    for (let i = 0; i < baseCount; i++) {
      const rand = Math.random();
      let kind: "dust" | "bokeh" | "petal" = "dust";
      if (withPetals && rand > 0.84) {
        kind = "petal";
      } else if (rand > 0.72) {
        kind = "bokeh";
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius:
          kind === "bokeh"
            ? Math.random() * 18 + 8
            : kind === "petal"
            ? Math.random() * 5 + 3.5
            : Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * (kind === "petal" ? 0.45 : 0.22),
        vy:
          kind === "petal"
            ? Math.random() * 0.35 + 0.15 // petals drift gently downward or diagonally
            : -Math.random() * 0.38 - 0.08, // dust rises toward the light
        alpha: Math.random() * 0.4 + 0.15,
        baseAlpha:
          kind === "bokeh"
            ? Math.random() * 0.07 + 0.02
            : kind === "petal"
            ? Math.random() * 0.38 + 0.2
            : Math.random() * 0.48 + 0.2,
        pulseSpeed: Math.random() * 0.025 + 0.008,
        phase: Math.random() * Math.PI * 2,
        kind,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.015,
        petalScale: Math.random() * 0.5 + 0.7,
      });
    }

    // If burstTrigger > 0, add celebratory golden petals from center
    if (burstTrigger > 0) {
      for (let i = 0; i < (isMobile ? 16 : 32); i++) {
        const theta = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.5;
        particles.push({
          x: width / 2 + (Math.random() - 0.5) * 140,
          y: height / 2 + (Math.random() - 0.5) * 80,
          radius: Math.random() * 5 + 3,
          vx: Math.cos(theta) * speed,
          vy: Math.sin(theta) * speed - 0.4,
          alpha: 0.75,
          baseAlpha: 0.55,
          pulseSpeed: 0.02,
          phase: Math.random() * Math.PI,
          kind: i % 2 === 0 ? "petal" : "dust",
          angle: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() - 0.5) * 0.03,
          petalScale: Math.random() * 0.6 + 0.7,
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle interactive golden cursor aura
      if (interactive && mouse.active) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 2, mouse.x, mouse.y, 180);
        grad.addColorStop(0, "rgba(212, 180, 122, 0.07)");
        grad.addColorStop(0.5, "rgba(201, 143, 154, 0.03)");
        grad.addColorStop(1, "rgba(17, 17, 20, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      particles.forEach((p) => {
        p.phase += p.pulseSpeed;
        p.angle += p.spinSpeed;

        // Gentle horizontal sway
        const sway = Math.sin(p.phase * 0.7) * 0.12;
        p.x += p.vx + sway;
        p.y += p.vy;

        // Gentle cursor interaction
        if (interactive && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 14000 && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 0.65;
            p.y += (dy / dist) * force * 0.65;
          }
        }

        p.alpha = p.baseAlpha + Math.sin(p.phase) * (p.kind === "bokeh" ? 0.02 : 0.15);

        // Wrap around smoothly
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        const a = Math.max(0.01, Math.min(0.9, p.alpha));

        if (p.kind === "bokeh") {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          if (tint === "rose") {
            g.addColorStop(0, `rgba(201, 143, 154, ${a})`);
          } else {
            g.addColorStop(0, `rgba(212, 180, 122, ${a})`);
          }
          g.addColorStop(1, "rgba(212, 180, 122, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === "petal") {
          // Draw delicate organic flower petal
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(p.petalScale, p.petalScale * (0.75 + 0.25 * Math.cos(p.phase)));

          ctx.beginPath();
          ctx.moveTo(0, -p.radius);
          ctx.bezierCurveTo(
            p.radius * 0.9,
            -p.radius * 0.5,
            p.radius * 0.8,
            p.radius * 0.7,
            0,
            p.radius
          );
          ctx.bezierCurveTo(
            -p.radius * 0.8,
            p.radius * 0.7,
            -p.radius * 0.9,
            -p.radius * 0.5,
            0,
            -p.radius
          );

          ctx.fillStyle =
            tint === "gold"
              ? `rgba(218, 182, 135, ${a * 0.85})`
              : `rgba(209, 152, 164, ${a * 0.85})`;
          ctx.fill();
          ctx.restore();
        } else {
          // Fine twinkling dust mote
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          if (tint === "gold") {
            ctx.fillStyle = `rgba(212, 180, 122, ${a})`;
          } else if (tint === "rose") {
            ctx.fillStyle = `rgba(201, 143, 154, ${a})`;
          } else {
            ctx.fillStyle = `rgba(247, 240, 231, ${a})`;
          }
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [density, tint, withPetals, interactive, burstTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
};
