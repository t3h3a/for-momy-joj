import { useState, useEffect } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";
const letterLines = [
  "لورا حبيبتي",
  "",
  "يمكن الموقع بسيط",
  "وكلامي يمكن يبين عادي",
  "بس والله اللي بقلبي الك مش بسيط ابدا 💕",
  "",
  "كل ليلة بفكر فيك",
  "وبصلاتي دايم بدعي الك",
  "وبنهاري وبكل وقتي",
  "سواء كنت فاضي او مشغول",
  "انتي ببالي",
  "وبحبك اكثر كل يوم ❤️",
  "",
  "بشوف فيك اشي ما شفته بحياتي",
  "اشي ما توقعت يوم احسه مع حدا",
  "من اول مرة دخلتي حياتي",
  "حسيت كل اشي تغير ✨",
  "",
  "بتذكر اول مرة التقينا فيها بفري فاير",
  "ومن وقتها بلشنا نحكي شوي شوي",
  "وضفنا بعض",
  "وقعدنا نتهبل",
  "لحد ما دخلنا قروبات",
  "وارتبطنا وحبينا بعض",
  "",
  "وشوي شوي ومع الوقت",
  "ما صرتي بس حدا قريب",
  "صرتي راحتي وضحكتي",
  "واغلى اشي بحياتي 🥺💖",
  "",
  "صرت افكر فيك بكل لحظة",
  "مو بس قلبي معك",
  "حتى تفكيري كله الك",
  "بفكر اذا انتي بخير",
  "اذا مبسوطة",
  "اذا في اشي مزعلك",
  "كل اشي فيك صار يهمني ❤️",
  "",
  "لورا مهما حكيتلك",
  "مستحيل اوصفلك شو جواي",
  "وكم انا بحبك",
  "لانو جد اللي بقلبي اكثر من اي حب",
  "واكبر من اي كلام",
  "واكثر من اي اهتمام",
  "",
  "ومع كل يوم وكل لحظة",
  "حبي الك قاعد يكبر اكثر",
  "بدون ما يوقف 💫",
  "",
  "وشو ما صار",
  "انا رح اختارك دايما",
  "واحبك دايما",
  "وتضلي اغلى انسانة عندي ❤️",
  "",
  "بحبك يا احلى واجمل ام لول",
  "",
  "وبمناسبة عيد ميلادك",
  "وقبل عشرين سنة من اليوم تقريبا",
  "تحديدا ب 25 5 2006",
  "نولدت احلى واجمل انسانة على مر الوجود",
  "بضحكتها",
  "وبفرحتها",
  "وبهبلها",
  "وبكل ما يخصها",
  "وبكل اشي فيها",
  "",
  "رح تضلي يا لولو نور عيوني",
  "ودنيتي",
  "ومسكني",
  "واحلى واجمل صدفة صارت بحياتي",
  "الصدفة اللي حرفيا صارت كل حياتي ❤️",
];

interface LoveLetterPageProps {
  onContinue: () => void;
}

export default function LoveLetterPage({ onContinue }: LoveLetterPageProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setVisibleLines(current);
      if (current >= letterLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setShowGlow(true);
        }, 800);
      }
    }, 380);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4">
      {/* Glow background */}
      <div
        className={`fixed inset-0 pointer-events-none transition-all duration-2000 ${
          showGlow ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,50,120,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Top decorations */}
      <div className="flex justify-between mb-4">
        <Ribbon color="pink" />
        <HelloKitty size={80} bow="red" />
        <Ribbon color="purple" />
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <p
          className="text-pink-300/60 text-sm"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          رسالتي الك
        </p>
        <h2
          className="shimmer-text font-bold"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
          }}
        >
          💌 من القلب
        </h2>
      </div>

      {/* Letter card */}
      <div
        className={`glass-card glow-border rounded-3xl p-6 max-w-lg mx-auto mb-8 relative overflow-hidden transition-all duration-1000 ${
          showGlow ? "animate-glow-pulse" : ""
        }`}
      >
        <div className="flex justify-center gap-2 mb-4">
          {["🌸", "💖", "🌸"].map((s, i) => (
            <span key={i} className="text-pink-300/60 text-sm">
              {s}
            </span>
          ))}
        </div>

        <div className="space-y-0.5" data-testid="text-letter">
          {letterLines.slice(0, visibleLines).map((line, idx) => (
            <p
              key={idx}
              className={`transition-all duration-500 leading-relaxed ${
                idx < visibleLines - 1 ? "opacity-100" : "opacity-80"
              } ${line === "" ? "h-4" : ""} ${
                line.startsWith("لورا حبيبتي") ? "text-pink-300 font-bold text-xl" : ""
              } ${
                line.includes("احبج يا عمري") ? "text-pink-400 font-bold text-lg" : "text-white/90"
              } ${
                line.includes("رح اختارك") ? "text-pink-300 font-bold" : ""
              }`}
              style={{
                fontFamily: "'Noto Naskh Arabic', sans-serif",
                fontSize: line === "" ? undefined : "clamp(0.95rem, 4vw, 1.1rem)",
                textAlign: "right",
                direction: "rtl",
                lineHeight: 1.9,
                overflowWrap: "anywhere",
                animationFillMode: "forwards",
              }}
            >
              {line}
              {idx === visibleLines - 1 && !done && <span className="typing-cursor" />}
            </p>
          ))}
        </div>

        {done && (
          <div
            className="mt-6 text-center animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex justify-center gap-2 mb-2">
              {["💖", "💕", "❤️", "💕", "💖"].map((h, i) => (
                <span
                  key={i}
                  className="animate-pulse-heart text-xl"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {h}
                </span>
              ))}
            </div>
            <p
              className="text-pink-300/70 text-sm"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.1rem" }}
            >
              الك دايما ❤️
            </p>
          </div>
        )}
      </div>

      {done && (
        <div
          className="flex justify-center animate-fade-in-up"
          style={{ animationFillMode: "forwards" }}
        >
          <button
            data-testid="button-continue-letter"
            onClick={onContinue}
            className="btn-glow w-full max-w-xs sm:w-auto text-white font-bold rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-xl flex items-center justify-center gap-2"
            style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
          >
            <span>واصلي</span>
            <span className="animate-pulse-heart">💖</span>
          </button>
        </div>
      )}
    </div>
  );
}
