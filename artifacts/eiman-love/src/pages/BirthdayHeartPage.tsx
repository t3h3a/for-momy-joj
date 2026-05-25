import { useEffect, useMemo, useState } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";

interface BirthdayHeartPageProps {
  onReplay: () => void;
}

const particleCount = 120;

const getHeartPoint = (index: number, size: number) => {
  const t = (index / particleCount) * Math.PI * 2;
  const x = 16 * Math.sin(t) ** 3;
  const y = -(
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  );

  return {
    x: (x / 18) * size * 0.42,
    y: (y / 17) * size * 0.42,
  };
};

export default function BirthdayHeartPage({ onReplay }: BirthdayHeartPageProps) {
  const [morphed, setMorphed] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [heartSize, setHeartSize] = useState(280);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setHeartSize(Math.min(width * 0.78, height * 0.46, 340));
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const morphTimer = setTimeout(() => setMorphed(true), 2000);
    const buttonTimer = setTimeout(() => setShowButton(true), 4300);

    return () => {
      clearTimeout(morphTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, index) => {
        const angle = (index / particleCount) * Math.PI * 2;
        const radius = 18 + ((index * 29) % 100);
        const galaxyX = Math.cos(angle) * radius * 1.35;
        const galaxyY = Math.sin(angle) * radius * 0.82;
        const heart = getHeartPoint(index, heartSize);

        return {
          id: index,
          galaxyX,
          galaxyY,
          heartX: heart.x,
          heartY: heart.y,
          size: 2 + (index % 4),
          delay: (index % 16) * 0.035,
        };
      }),
    [heartSize],
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(255,105,180,0.18) 0%, rgba(218,112,214,0.08) 45%, transparent 72%)",
        }}
      />

      <div className="absolute top-0 left-0 animate-float-bow opacity-60">
        <Ribbon color="pink" />
      </div>
      <div className="absolute top-2 right-0 animate-float-bow opacity-60" style={{ animationDelay: "1s" }}>
        <Ribbon color="purple" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-md">
        <div className="mb-4 opacity-80">
          <HelloKitty size={90} bow="red" />
        </div>

        <div
          className={`birthday-particle-field relative mb-6 ${morphed ? "is-heart" : "is-galaxy"}`}
          style={{
            width: `${heartSize}px`,
            height: `${heartSize}px`,
          }}
        >
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="birthday-particle"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                transitionDelay: `${particle.delay}s`,
                transform: morphed
                  ? `translate(${particle.heartX}px, ${particle.heartY}px)`
                  : `translate(${particle.galaxyX}px, ${particle.galaxyY}px)`,
              }}
            />
          ))}
        </div>

        <h2
          className={`font-bold text-white transition-all duration-700 ${
            morphed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(2rem, 10vw, 3.4rem)",
            lineHeight: 1.1,
            textShadow: "0 0 24px rgba(255,105,180,0.65)",
            direction: "ltr",
          }}
        >
          Happy Birthday Laura
        </h2>

        {showButton && (
          <button
            data-testid="button-birthday-replay"
            onClick={onReplay}
            className="btn-glow w-full max-w-xs sm:w-auto text-white font-bold rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-xl flex items-center justify-center gap-2 mt-8 animate-fade-in-up"
            style={{
              fontFamily: "'Noto Naskh Arabic', sans-serif",
              animationFillMode: "forwards",
            }}
          >
            <span>ارجعي عيديها</span>
            <span className="animate-pulse-heart">💞</span>
          </button>
        )}
      </div>
    </div>
  );
}
