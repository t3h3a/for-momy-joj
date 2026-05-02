interface RibbonProps {
  color?: "pink" | "purple";
  className?: string;
}

export default function Ribbon({ color = "pink", className = "" }: RibbonProps) {
  const colors = {
    pink: { main: "#ff69b4", dark: "#cc2266", light: "#ffb6d9", mid: "#ff4499" },
    purple: { main: "#da70d6", dark: "#9932cc", light: "#f0a0f0", mid: "#cc44cc" },
  };
  const c = colors[color];

  return (
    <div className={`inline-block ${className}`}>
      <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="160" height="80">
        {/* Left ribbon petal */}
        <path d="M80,40 C60,10 10,5 5,35 C0,65 50,70 80,40Z" fill={c.main} />
        <path d="M80,40 C65,18 25,15 15,35 C5,55 45,62 80,40Z" fill={c.light} opacity="0.4" />
        
        {/* Right ribbon petal */}
        <path d="M80,40 C100,10 150,5 155,35 C160,65 110,70 80,40Z" fill={c.main} />
        <path d="M80,40 C95,18 135,15 145,35 C155,55 115,62 80,40Z" fill={c.light} opacity="0.4" />

        {/* Left tail */}
        <path d="M80,40 C70,50 55,55 40,65 C35,68 38,72 42,70 C55,63 72,58 80,45Z" fill={c.dark} />
        {/* Right tail */}
        <path d="M80,40 C90,50 105,55 120,65 C125,68 122,72 118,70 C105,63 88,58 80,45Z" fill={c.dark} />

        {/* Center knot */}
        <circle cx="80" cy="40" r="10" fill={c.dark} />
        <circle cx="80" cy="40" r="6" fill={c.mid} />
        <circle cx="77" cy="37" r="2.5" fill={c.light} opacity="0.7" />
      </svg>
    </div>
  );
}
