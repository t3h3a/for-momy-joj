import { useState, useEffect } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";
const memories = [
  {
    id: 1,
    icon: "💭",
    title: "اول مره حسيت انك مختلفة",
    text: "راما شوفي بصراحة انا حكيتلك قبل هيك اني مش كثير مع البنات وغالبا بتجاهل الكل .... بس من اول ما شفتك ذوقك باللبس مشيتك طريقتك بالحكي كلامك .... كل اشي فيكي خلاني احس بشعور غريب بس بنفس الوقت كثير حلو .... حسيت انك مش زي اي حدا مر علي بحياتي",
    color: "from-pink-500/20 to-rose-500/10",
    borderColor: "border-pink-400/30",
    bow: "pink" as const,
  },
  {
    id: 2,
    icon: "🤍",
    title: "اول مره ضحكت من قلبي معك",
    text: "هاي مستحيل انساها عنجد .... لما كان ابن اختك بتمسخر عليك وقلتيلي دروح انيكو .... وقتها ضحكت من قلبي بدون ما احس ضحكة صافية .... ومن وقتها وانا بحب وجودي معك لانه بيريحني وبخليني اضحك",
    color: "from-purple-500/20 to-violet-500/10",
    borderColor: "border-purple-400/30",
    bow: "purple" as const,
  },
  {
    id: 3,
    icon: "💌",
    title: "اول موقف خلاني اتعلق فيك",
    text: "اول مرة حكيتيلي فيها عنك وعن وجعك وزعلك .... يمكن تشوفيني غريب شوي بس انا بحب هالاشي .... بحب لما الشخص اللي بحبه يحكيلي شو جواه بدون ما يخبي .... وقتها بحس اني قريب منك اكثر وبصير بدي اكون جنبك .... اوقف معك واشوفك تضحكي بعد الزعل .... ويمكن هاد السبب اللي خلاني اتعلق فيك اكثر",
    color: "from-fuchsia-500/20 to-pink-500/10",
    borderColor: "border-fuchsia-400/30",
    bow: "red" as const,
  },
];

interface MemoriesPageProps {
  onContinue: () => void;
}

export default function MemoriesPage({ onContinue }: MemoriesPageProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timers = memories.map((_, idx) =>
      setTimeout(() => {
        setVisibleCards((prev) => new Set([...prev, idx]));
      }, 300 + idx * 260),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4">
      {/* Top decoration */}
      <div className="flex justify-between items-center mb-6">
        <Ribbon color="pink" />
        <div className="text-center">
          <HelloKitty size={80} bow="pink" />
        </div>
        <Ribbon color="purple" />
      </div>

      {/* Section title */}
      <div
        className="text-center mb-8 animate-fade-in-up"
        style={{ animationFillMode: "forwards" }}
      >
        <p
          className="text-pink-300/60 text-sm mb-1"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          ذكرياتنا
        </p>
        <h2
          className="shimmer-text font-bold"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
          }}
        >
          لحظات علقت بقلبي 💕
        </h2>
        <div className="flex justify-center gap-2 mt-2">
          {["✦", "❤️", "✦"].map((s, i) => (
            <span key={i} className="text-pink-400/70 text-sm">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Memory cards */}
      <div className="max-w-lg mx-auto space-y-5">
        {memories.map((memory, idx) => (
          <div
            key={memory.id}
            data-idx={idx}
            data-testid={`card-memory-${memory.id}`}
            className={`memory-card glass-card rounded-3xl p-6 border bg-gradient-to-br ${memory.color} ${memory.borderColor} transition-all duration-700 ${
              visibleCards.has(idx)
                ? "opacity-100 translate-x-0 translate-y-0"
                : idx % 2 === 0
                  ? "opacity-0 -translate-x-8"
                  : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: "rgba(255,105,180,0.15)",
                    border: "1px solid rgba(255,105,180,0.3)",
                  }}
                >
                  {memory.icon}
                </div>
              </div>

              <div className="flex-1 text-right">
                <h3
                  className="text-white font-bold mb-2"
                  style={{
                    fontFamily: "'Noto Naskh Arabic', sans-serif",
                    fontSize: "clamp(0.95rem, 4vw, 1.1rem)",
                  }}
                >
                  {memory.title}
                </h3>
                <p
                  className="text-pink-200/80 leading-relaxed"
                  style={{
                    fontFamily: "'Noto Naskh Arabic', sans-serif",
                    fontSize: "clamp(0.85rem, 3.5vw, 1rem)",
                  }}
                >
                  {memory.text}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-3 opacity-60">
              <HelloKitty size={35} bow={memory.bow} />
            </div>
          </div>
        ))}
      </div>

      {/* Continue button */}
      <div className="flex justify-center mt-10">
        <button
          data-testid="button-continue-memories"
          onClick={onContinue}
          className="btn-glow w-full max-w-xs sm:w-auto text-white font-bold rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-xl flex items-center justify-center gap-2"
          style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
        >
          <span>تابعي معي</span>
          <span className="animate-pulse-heart">💖</span>
        </button>
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center gap-4 mt-8 opacity-40">
        <HelloKitty size={45} bow="pink" />
        <HelloKitty size={45} bow="purple" />
        <HelloKitty size={45} bow="red" />
      </div>
    </div>
  );
}
