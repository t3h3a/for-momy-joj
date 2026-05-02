import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const heartEmojis = ["❤️", "💕", "💖", "💗", "💓", "💝", "🌸", "✨", "💫", "⭐"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const initialHearts: Heart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 16,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 10,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="star-field" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-float"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
