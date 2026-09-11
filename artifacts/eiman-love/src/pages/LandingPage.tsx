import { useState, useEffect } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 700);
    const t2 = setTimeout(() => setShowButton(true), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleStart = () => {
    setClicked(true);
    setTimeout(onStart, 600);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Decorative ribbons top */}
      <div className="absolute top-0 left-0 animate-float-bow opacity-70" style={{ animationDelay: "0s" }}>
        <Ribbon color="pink" />
      </div>
      <div className="absolute top-4 right-0 animate-float-bow opacity-70" style={{ animationDelay: "1s" }}>
        <Ribbon color="purple" />
      </div>
      <div className="absolute bottom-10 left-4 animate-float-bow opacity-50" style={{ animationDelay: "2s" }}>
        <Ribbon color="pink" />
      </div>
      <div className="absolute bottom-10 right-4 animate-float-bow opacity-50" style={{ animationDelay: "0.5s" }}>
        <Ribbon color="purple" />
      </div>

      {/* Hello Kitty decoration */}
      <div
        className="mb-4 opacity-0 animate-fade-in-up"
        style={{ animationDelay: "0s", animationFillMode: "forwards" }}
      >
        <HelloKitty size={140} bow="red" />
      </div>

      {/* Decorative stars line */}
      <div className="flex gap-2 mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
        {["✦", "✨", "💕", "✨", "✦"].map((s, i) => (
          <span
            key={i}
            className="text-pink-300 animate-star-twinkle"
            style={{ animationDuration: `${1.5 + i * 0.3}s`, animationDelay: `${i * 0.2}s` }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Main title */}
      <div
        className="opacity-0 animate-fade-in-up"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        <h1 className="text-center mb-2">
          <span
            className="shimmer-text hero-title font-bold"
            style={{
              fontFamily: "'Playfair Display', 'Dancing Script', serif",
              fontSize: "clamp(2.5rem, 10vw, 5rem)",
              lineHeight: 1.2,
              display: "block",
              textShadow: "0 0 40px rgba(255,105,180,0.5)",
            }}
          >
            سيدرا
          </span>
          <span
            className="text-pink-300 font-bold"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.5rem, 6vw, 3rem)",
              display: "block",
            }}
          >
            عندي شي صغير الك ❤️
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <div
        className={`mt-4 transition-all duration-700 ${showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <p
          className="text-center text-pink-200/80"
          style={{
            fontFamily: "'Noto Naskh Arabic', sans-serif",
            fontSize: "clamp(1rem, 4vw, 1.3rem)",
          }}
        >
          بس لازم تمشي معي خطوة خطوة
        </p>
      </div>

      {/* Sparkle row */}
      <div className="flex gap-3 my-6">
        {["💖", "🌸", "💫", "🌸", "💖"].map((s, i) => (
          <span
            key={i}
            className="animate-star-twinkle text-xl"
            style={{ animationDuration: `${1.2 + i * 0.4}s`, animationDelay: `${i * 0.3}s` }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Start button */}
      <div
        className={`mt-2 transition-all duration-700 ${showButton ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-90"}`}
      >
        <button
          data-testid="button-start"
          onClick={handleStart}
          disabled={clicked}
          className={`btn-glow w-full max-w-xs sm:w-auto text-white font-bold rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-xl relative overflow-hidden group ${clicked ? "opacity-70 scale-95" : ""}`}
          style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>يلا نشوف</span>
            <span className="animate-pulse-heart">💕</span>
          </span>
          {/* Ripple effect on click */}
          {clicked && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-full h-full rounded-full bg-white/20 animate-ping" />
            </span>
          )}
        </button>
      </div>

      {/* Bottom Kitty with different bow */}
      <div className="mt-8 flex gap-4 sm:gap-6 items-center">
        <HelloKitty size={60} bow="pink" className="opacity-60" />
        <span className="text-pink-300/60 text-2xl animate-pulse-heart">💕</span>
        <HelloKitty size={60} bow="purple" className="opacity-60" />
      </div>
    </div>
  );
}
