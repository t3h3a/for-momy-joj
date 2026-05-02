import { useState, useEffect } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";

interface EndingPageProps {
  onReplay: () => void;
}

export default function EndingPage({ onReplay }: EndingPageProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1500);
    const t3 = setTimeout(() => setStep(3), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Glowing background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,50,120,0.15) 0%, rgba(180,0,255,0.08) 50%, transparent 70%)",
        }}
      />

      {/* Decorative ribbons */}
      <div className="absolute top-0 left-0 animate-float-bow opacity-70">
        <Ribbon color="pink" />
      </div>
      <div
        className="absolute top-2 right-0 animate-float-bow opacity-70"
        style={{ animationDelay: "1s" }}
      >
        <Ribbon color="purple" />
      </div>
      <div
        className="absolute bottom-10 left-4 animate-float-bow opacity-50"
        style={{ animationDelay: "2s" }}
      >
        <Ribbon color="purple" />
      </div>
      <div
        className="absolute bottom-10 right-4 animate-float-bow opacity-50"
        style={{ animationDelay: "0.5s" }}
      >
        <Ribbon color="pink" />
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* Big Kitty */}
        <div
          className={`mb-6 transition-all duration-700 ${
            step >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <HelloKitty size={150} bow="red" />
        </div>

        {/* Main ending text */}
        <div
          className={`transition-all duration-700 mb-4 ${
            step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="shimmer-text font-bold mb-2"
            style={{
              fontFamily: "'Playfair Display', 'Noto Naskh Arabic', serif",
              fontSize: "clamp(2rem, 8vw, 3.5rem)",
              lineHeight: 1.2,
            }}
          >
            راما...
          </h2>
          <p
            className="text-white font-bold"
            style={{
              fontFamily: "'Noto Naskh Arabic', sans-serif",
              fontSize: "clamp(1.2rem, 5vw, 1.6rem)",
            }}
          >
            هاي بس البداية
          </p>
        </div>

        {/* Hearts divider */}
        <div
          className={`flex justify-center gap-3 my-5 text-2xl transition-all duration-700 ${
            step >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          {["💖", "❤️", "💕", "❤️", "💖"].map((h, i) => (
            <span
              key={i}
              className="animate-pulse-heart"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.4s",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Sub text */}
        <div
          className={`transition-all duration-700 mb-8 ${
            step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p
            className="text-pink-200/80"
            style={{
              fontFamily: "'Noto Naskh Arabic', sans-serif",
              fontSize: "clamp(1rem, 4vw, 1.2rem)",
            }}
          >
             ورحلتنا لسه طويلة بحبك ❤️

          </p>
        </div>

        {/* Sparkle row */}
        <div
          className={`flex justify-center gap-3 mb-8 transition-all duration-700 ${
            step >= 3 ? "opacity-100" : "opacity-0"
          }`}
        >
          {["🌸", "✨", "💫", "✨", "🌸"].map((s, i) => (
            <span
              key={i}
              className="animate-star-twinkle text-xl"
              style={{
                animationDuration: `${1.5 + i * 0.3}s`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Replay button */}
        <div
          className={`transition-all duration-700 ${
            step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <button
            data-testid="button-replay"
            onClick={onReplay}
            className="btn-glow w-full max-w-xs sm:w-auto text-white font-bold rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-xl flex items-center justify-center gap-2 mx-auto"
            style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
          >
            <span>ارجعي عيديها</span>
            <span className="animate-pulse-heart">💞</span>
          </button>
        </div>

        {/* Bottom Kitties */}
        <div className="flex justify-center gap-4 mt-10">
          <HelloKitty size={55} bow="pink" />
          <div className="flex flex-col justify-center">
            <span className="text-3xl animate-pulse-heart">❤️</span>
          </div>
          <HelloKitty size={55} bow="purple" />
        </div>

        {/* Final note */}
        <div
          className={`mt-4 transition-all duration-700 ${
            step >= 3 ? "opacity-100" : "opacity-0"
          }`}
        >
          <p
            className="text-pink-300/50 text-xs"
            style={{
              fontFamily: "'Noto Naskh Arabic', sans-serif",
              fontSize: "0.9rem",
            }}
          >
            بحبك دايما ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
