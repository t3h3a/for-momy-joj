import { useState, useCallback, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StarField from "@/components/StarField";
import FloatingHearts from "@/components/FloatingHearts";
import LandingPage from "@/pages/LandingPage";
import QuestionsPage from "@/pages/QuestionsPage";
import TransitionPage from "@/pages/TransitionPage";
import MemoriesPage from "@/pages/MemoriesPage";
import SurprisePage from "@/pages/SurprisePage";
import LoveLetterPage from "@/pages/LoveLetterPage";
import BirthdayHeartPage from "@/pages/BirthdayHeartPage";
import EndingPage from "@/pages/EndingPage";

const queryClient = new QueryClient();

type Stage =
  | "landing"
  | "questions"
  | "transition"
  | "memories"
  | "surprise"
  | "letter"
  | "birthday"
  | "ending";

function App() {
  const [stage, setStage] = useState<Stage>("landing");
  const [transitioning, setTransitioning] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const goTo = useCallback((next: Stage) => {
    setTransitioning(true);
    setTimeout(() => {
      setStage(next);
      setTransitioning(false);
    }, 300);
  }, []);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}until-i-found-you.mp4`);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;

    const tryPlay = async () => {
      try {
        await audio.play();
        setAudioPlaying(true);
        return true;
      } catch {
        setAudioPlaying(false);
        return false;
      }
    };

    void tryPlay();

    const unlockAudio = async () => {
      const started = await tryPlay();
      if (!started) {
        return;
      }

      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setAudioPlaying(true);
      } catch {
        setAudioPlaying(false);
      }
      return;
    }

    audio.pause();
    setAudioPlaying(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="night-sky min-h-screen relative"
        style={{ direction: "rtl" }}
      >
        {/* Fixed background elements */}
        <StarField />
        <FloatingHearts />

        <button
          type="button"
          onClick={() => void toggleAudio()}
          className="fixed left-3 bottom-3 z-40 btn-glow rounded-full px-4 py-2 text-sm text-white font-bold"
          style={{ fontFamily: "'Noto Naskh Arabic', sans-serif" }}
        >
          {audioPlaying ? "ايقاف الصوت" : "تشغيل الصوت"}
        </button>

        {/* Page transition overlay */}
        <div
          className={`fixed inset-0 bg-black z-50 pointer-events-none transition-opacity duration-300 ${
            transitioning ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Page content */}
        <div className={`relative z-10 transition-opacity duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}>
          {stage === "landing" && (
            <LandingPage onStart={() => goTo("questions")} />
          )}
          {stage === "questions" && (
            <QuestionsPage onComplete={() => goTo("transition")} />
          )}
          {stage === "transition" && (
            <TransitionPage onContinue={() => goTo("memories")} />
          )}
          {stage === "memories" && (
            <MemoriesPage onContinue={() => goTo("surprise")} />
          )}
          {stage === "surprise" && (
            <SurprisePage onContinue={() => goTo("letter")} />
          )}
          {stage === "letter" && (
            <LoveLetterPage onContinue={() => goTo("birthday")} />
          )}
          {stage === "birthday" && (
            <BirthdayHeartPage onReplay={() => goTo("landing")} />
          )}
          {stage === "ending" && (
            <EndingPage onReplay={() => goTo("landing")} />
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
