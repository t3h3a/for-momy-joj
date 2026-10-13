import { useState, useEffect } from "react";
import HelloKitty from "@/components/HelloKitty";

interface SurprisePageProps {
  onContinue: () => void;
}

export default function SurprisePage({ onContinue }: SurprisePageProps) {
  const [activated, setActivated] = useState(false);
  const [showWarning] = useState(true);
  const [heartSize, setHeartSize] = useState(60);
  const [showProceed, setShowProceed] = useState(false);

  useEffect(() => {
    if (!activated) {
      return;
    }

    let size = 60;
    const interval = setInterval(() => {
      size = size === 60 ? 80 : 60;
      setHeartSize(size);
    }, 600);

    const t = setTimeout(() => {
      setShowProceed(true);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(t);
    };
  }, [activated]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Dark overlay when activated */}
      <div
        className={`fixed inset-0 transition-all duration-1000 pointer-events-none z-10 ${
          activated ? "bg-black/70" : "bg-transparent"
        }`}
      />

      {!activated ? (
        /* Warning state */
        <div className="relative z-20 text-center max-w-md">
          <div className="mb-6">
            <HelloKitty size={120} bow="red" />
          </div>

          {showWarning && (
            <div className="animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
              <div className="glass-card glow-border rounded-3xl p-8 mb-8">
                <p
                  className="text-white font-bold mb-2"
                  style={{
                    fontFamily: "'Noto Naskh Arabic', sans-serif",
                    fontSize: "clamp(1.1rem, 5vw, 1.4rem)",
                  }}
                >
                  جنى
                </p>
                <p
                  className="text-pink-200/90 mb-4"
                  style={{
                    fontFamily: "'Noto Naskh Arabic', sans-serif",
                    fontSize: "clamp(1rem, 4vw, 1.2rem)",
                  }}
                >
                  في زر هان
                  <br />
                  بس لا تضغطي عليه 😅
                </p>

                <div className="flex items-center justify-center gap-3 my-4">
                  <span className="text-2xl animate-star-twinkle" style={{ animationDuration: "1.5s" }}>⚠️</span>
                  <p className="text-yellow-200/70 text-sm" style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}>
                    ما قلتلك تضغطي وينه
                  </p>
                  <span className="text-2xl animate-star-twinkle" style={{ animationDuration: "2s", animationDelay: "0.5s" }}>⚠️</span>
                </div>
              </div>

              <button
                data-testid="button-surprise"
                onClick={() => setActivated(true)}
                className="btn-glow w-full max-w-xs sm:w-auto text-white font-bold rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-xl animate-glow-pulse"
                style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
              >
                <span>لا تضغطي هان 😅</span>
              </button>

              <p
                className="text-pink-300/40 text-xs mt-3"
                style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
              >
                بس اضغطي لو بدك تشوفي 👀
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Activated state */
        <div className="relative z-30 text-center flex flex-col items-center gap-6">
          {/* Pulsing heart */}
          <div
            className="transition-all duration-500"
            style={{
              fontSize: `${heartSize}px`,
              filter: `drop-shadow(0 0 ${heartSize / 2}px rgba(255,100,180,0.8))`,
            }}
          >
            ❤️
          </div>

          {/* Surrounding hearts */}
          <div className="flex gap-4 text-3xl">
            {["💕", "💖", "💗", "💓", "💝"].map((h, i) => (
              <span
                key={i}
                className="animate-pulse-heart"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {h}
              </span>
            ))}
          </div>

          <HelloKitty size={100} bow="red" />

          <p
            className="text-white text-xl font-bold"
            style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
          >
            شوفي شو صار 😅❤️
          </p>

          {showProceed && (
            <button
              data-testid="button-proceed-letter"
              onClick={onContinue}
              className="btn-glow w-full max-w-xs sm:w-auto text-white font-bold rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-xl animate-fade-in-up"
              style={{
                fontFamily: "'Noto Naskh Arabic', sans-serif",
                animationFillMode: "forwards",
              }}
            >
              <span>تعالي شوفي الرسالة 💌</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
