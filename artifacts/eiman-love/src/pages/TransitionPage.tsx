import { useEffect, useState } from "react";
import HelloKitty from "@/components/HelloKitty";

interface TransitionPageProps {
  onContinue: () => void;
}

export default function TransitionPage({ onContinue }: TransitionPageProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 2000);
    const t3 = setTimeout(() => setStep(3), 3500);
    const t4 = setTimeout(() => onContinue(), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onContinue]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Pulsing background overlay */}
      <div
        className="absolute inset-0 transition-all duration-2000"
        style={{
          background: step >= 2
            ? "radial-gradient(ellipse at center, rgba(255,105,180,0.15) 0%, transparent 70%)"
            : "transparent",
        }}
      />

      <div className="text-center max-w-lg relative z-10">
        {/* Kitty */}
        <div
          className={`mb-6 transition-all duration-700 ${step >= 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <HelloKitty size={120} bow="red" />
        </div>

        {/* First text */}
        <div
          className={`transition-all duration-700 ${step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p
            className="text-pink-200 mb-4"
            style={{
              fontFamily: "'Noto Naskh Arabic', sans-serif",
              fontSize: "clamp(1.2rem, 5vw, 1.6rem)",
            }}
          >
            طيب… خليني أحكيلك أنا شو حاس…
          </p>
        </div>

        {/* Hearts growing */}
        <div
          className={`transition-all duration-700 text-4xl flex justify-center gap-3 my-4 ${
            step >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          {["💕", "❤️", "💖", "❤️", "💕"].map((h, i) => (
            <span
              key={i}
              className="animate-pulse-heart"
              style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1.2s" }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Screen darkening transition text */}
        <div
          className={`transition-all duration-700 ${step >= 3 ? "opacity-100" : "opacity-0"}`}
        >
          <p
            className="text-white/70 text-sm"
            style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
          >
            ✨ الذكريات تنتظرك… ✨
          </p>
        </div>
      </div>
    </div>
  );
}
