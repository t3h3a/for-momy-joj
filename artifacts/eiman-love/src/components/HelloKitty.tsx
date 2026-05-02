interface HelloKittyProps {
  size?: number;
  className?: string;
  bow?: "red" | "pink" | "purple";
}

export default function HelloKitty({ size = 120, className = "", bow = "red" }: HelloKittyProps) {
  const bowColors: Record<string, { main: string; dark: string; light: string }> = {
    red: { main: "#ff4466", dark: "#cc1133", light: "#ff88aa" },
    pink: { main: "#ff69b4", dark: "#cc3377", light: "#ffb6d9" },
    purple: { main: "#da70d6", dark: "#9932cc", light: "#f0a0f0" },
  };
  const bowColor = bowColors[bow];

  return (
    <div className={`inline-block animate-kitty-bounce kitty-face ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        {/* Body / head */}
        <ellipse cx="100" cy="115" rx="55" ry="45" fill="#fff" />
        <ellipse cx="100" cy="100" rx="65" ry="60" fill="#fff" />

        {/* Ears */}
        <polygon points="40,55 55,15 80,50" fill="#fff" />
        <polygon points="120,50 145,15 160,55" fill="#fff" />
        {/* Inner ears */}
        <polygon points="47,52 58,25 73,49" fill="#ffb6c1" />
        <polygon points="127,49 142,25 153,52" fill="#ffb6c1" />

        {/* Big bow */}
        <g className="animate-float-bow">
          {/* Left bow petal */}
          <ellipse cx="74" cy="28" rx="22" ry="14" fill={bowColor.main} transform="rotate(-15 74 28)" />
          <ellipse cx="74" cy="28" rx="14" ry="8" fill={bowColor.light} transform="rotate(-15 74 28)" opacity="0.5" />
          {/* Right bow petal */}
          <ellipse cx="118" cy="22" rx="22" ry="14" fill={bowColor.main} transform="rotate(15 118 22)" />
          <ellipse cx="118" cy="22" rx="14" ry="8" fill={bowColor.light} transform="rotate(15 118 22)" opacity="0.5" />
          {/* Bow center */}
          <circle cx="96" cy="25" r="10" fill={bowColor.dark} />
          <circle cx="96" cy="25" r="6" fill={bowColor.main} />
          <circle cx="94" cy="23" r="2" fill={bowColor.light} opacity="0.7" />
          {/* Bow tails */}
          <path d="M92,33 C85,45 75,50 70,55" stroke={bowColor.dark} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M100,33 C107,45 117,50 122,55" stroke={bowColor.dark} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Eyes */}
        <circle cx="82" cy="105" r="8" fill="#222" />
        <circle cx="118" cy="105" r="8" fill="#222" />
        {/* Eye shine */}
        <circle cx="85" cy="102" r="3" fill="#fff" />
        <circle cx="121" cy="102" r="3" fill="#fff" />
        {/* Extra sparkle */}
        <circle cx="79" cy="109" r="1.5" fill="#fff" opacity="0.5" />
        <circle cx="115" cy="109" r="1.5" fill="#fff" opacity="0.5" />

        {/* Nose */}
        <ellipse cx="100" cy="118" rx="4" ry="3" fill="#ff99aa" />

        {/* Whiskers */}
        <line x1="110" y1="112" x2="148" y2="107" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="110" y1="118" x2="148" y2="118" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="110" y1="124" x2="148" y2="129" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="90" y1="112" x2="52" y2="107" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="90" y1="118" x2="52" y2="118" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="90" y1="124" x2="52" y2="129" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" />

        {/* Blush */}
        <ellipse cx="72" cy="122" rx="12" ry="7" fill="#ffb6c1" opacity="0.5" />
        <ellipse cx="128" cy="122" rx="12" ry="7" fill="#ffb6c1" opacity="0.5" />

        {/* Sparkles around */}
        <text x="15" y="90" fontSize="16" className="animate-sparkle" style={{ animationDelay: "0s" }}>✨</text>
        <text x="165" y="90" fontSize="16" className="animate-sparkle" style={{ animationDelay: "0.5s" }}>✨</text>
        <text x="85" y="185" fontSize="14" className="animate-sparkle" style={{ animationDelay: "1s" }}>💕</text>
      </svg>
    </div>
  );
}
