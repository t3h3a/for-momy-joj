import { useState } from "react";
import HelloKitty from "@/components/HelloKitty";
import Ribbon from "@/components/Ribbon";

const questions = [
  {
    id: 1,
    text: "راما… تتذكري أول مرة حكينا فيها ",
    emoji: "💬",
    choices: [
      { emoji: "😅", text: "أكيد" },
      { emoji: "🤔", text: "يمكن" },
      { emoji: "😂", text: "لا، بس حسّيتها غير" },
    ],
  },
  {
    id: 2,
    text: "وقتها… كنتي تتوقعي توصل علاقتنا لهدرجة؟",
    emoji: "🌙",
    choices: [
      { emoji: "😳", text: "لا " },
      { emoji: "😊", text: "يمكن شوي" },
      { emoji: "❤️", text: "اه كان عندي إحساس" },
    ],
  },
  {
    id: 3,
    text: "برايك مين فينا طاح أول؟",
    emoji: "💘",
    choices: [
      { emoji: "😏", text: "أنا" },
      { emoji: "😌", text: "إنت" },
      { emoji: "😂", text: "خلنا نقول كلنا" },
    ],
  },
  {
    id: 4,
    text: "شو أكثر شي تحبيه فينا؟",
    emoji: "💕",
    choices: [
      { emoji: "💬", text: "سوالفنا" },
      { emoji: "😂", text: "ضحكتنا" },
      { emoji: "❤️", text: "اهتمامنا ببعض" },
    ],
  },
  {
    id: 5,
    text: "لو حبنا كان مكان… وين تتخيليه؟",
    emoji: "🌌",
    choices: [
      { emoji: "🌊", text: "بحر هادي" },
      { emoji: "🌆", text: "مدينة هادية" },
      { emoji: "🌌", text: "عالم النا لحالنا" },
    ],
  },
  {
    id: 6,
    text: "بصراحة… أنا شو أمثّل الك؟",
    emoji: "🫶",
    choices: [
      { emoji: "❤️", text: "كل شي" },
      { emoji: "💖", text: "كثير" },
      { emoji: "🫶", text: "شخص مهم كثير" },
    ],
  },
];

const answersApiUrl =
  import.meta.env.VITE_ANSWERS_API_URL ?? "/api/question-answers";

const submitAnswers = async (selectedIndexes: number[]) => {
  const payload = {
    submittedAt: new Date().toISOString(),
    answers: selectedIndexes.map((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const choice = question.choices[answerIndex];

      return {
        questionId: question.id,
        question: question.text,
        answerIndex,
        answer: choice.text,
      };
    }),
  };

  const response = await fetch(answersApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit answers: ${response.status}`);
  }
};

interface QuestionsPageProps {
  onComplete: () => void;
}

export default function QuestionsPage({ onComplete }: QuestionsPageProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  const handleChoice = (idx: number) => {
    if (selected !== null || animating) return;
    const nextAnswers = [...answers, idx];

    setSelected(idx);
    setShowHearts(true);
    setAnswers(nextAnswers);

    setTimeout(() => {
      setShowHearts(false);
      setAnimating(true);
      setTimeout(() => {
        if (currentQ + 1 >= questions.length) {
          void submitAnswers(nextAnswers).catch((error) => {
            console.error("Failed to submit question answers", error);
          });
          onComplete();
        } else {
          setCurrentQ((q) => q + 1);
          setSelected(null);
          setAnimating(false);
        }
      }, 400);
    }, 800);
  };

  const bowTypes: Array<"red" | "pink" | "purple"> = ["red", "pink", "purple", "red", "pink", "purple"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Top decorations */}
      <div className="absolute top-0 left-2 opacity-50">
        <Ribbon color="pink" />
      </div>
      <div className="absolute top-2 right-2 opacity-50">
        <Ribbon color="purple" />
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-pink-300/70 text-sm" style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}>
            سؤال {currentQ + 1} من {questions.length}
          </span>
          <span className="text-pink-300/70 text-sm">
            {"💕".repeat(currentQ + 1)}
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progress + (100 / questions.length)}%`,
              background: "linear-gradient(90deg, #ff69b4, #da70d6, #ff69b4)",
            }}
          />
        </div>
      </div>

      {/* Kitty */}
      <div className="mb-4">
        <HelloKitty size={90} bow={bowTypes[currentQ]} />
      </div>

      {/* Question card */}
      <div
        className={`glass-card glow-border rounded-3xl p-6 w-full max-w-md mb-6 transition-all duration-400 ${
          animating ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        {/* Question emoji */}
        <div className="text-center text-4xl mb-3 animate-star-twinkle" style={{ animationDuration: "2s" }}>
          {question.emoji}
        </div>

        {/* Question text */}
        <p
          className="text-center text-white font-bold mb-6 leading-relaxed"
          style={{
            fontFamily: "'Noto Naskh Arabic', sans-serif",
            fontSize: "clamp(1.1rem, 5vw, 1.4rem)",
          }}
          data-testid="text-question"
        >
          {question.text}
        </p>

        {/* Choices */}
        <div className="flex flex-col gap-3">
          {question.choices.map((choice, idx) => (
            <button
              key={idx}
              data-testid={`button-choice-${idx}`}
              onClick={() => handleChoice(idx)}
              className={`choice-btn glass-card rounded-2xl py-3 px-5 flex items-center gap-3 border transition-all duration-300 ${
                selected === idx
                  ? "selected border-pink-400 bg-pink-500/20"
                  : "border-white/10 hover:border-pink-400/40"
              }`}
            >
              <span className="text-2xl">{choice.emoji}</span>
              <span
                className="text-white/90 font-medium flex-1 text-right"
                style={{ fontFamily: "'Noto Naskh Arabic', sans-serif", fontSize: "clamp(0.9rem, 4vw, 1.1rem)" }}
              >
                {choice.text}
              </span>
              {selected === idx && (
                <span className="text-pink-400 animate-scale-in">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mini hearts explosion on selection */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {["💕", "❤️", "💖", "💗", "💓"].map((h, i) => (
            <span
              key={i}
              className="absolute text-2xl animate-fade-in-up"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
                animationDuration: "0.8s",
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Decorative small kitties */}
      <div className="flex gap-4 mt-4 opacity-40">
        <HelloKitty size={40} bow="pink" />
        <HelloKitty size={40} bow="purple" />
        <HelloKitty size={40} bow="red" />
      </div>
    </div>
  );
}
