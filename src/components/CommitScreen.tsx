import { useState, useRef, useCallback } from "react";
import { Flame } from "lucide-react";
import confetti from "canvas-confetti";

interface CommitScreenProps {
  onCommit: () => void;
}

const CommitScreen = ({ onCommit }: CommitScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [committed, setCommitted] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = useCallback(() => {
    if (committed || intervalRef.current) return;
    setIsHolding(true);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          setCommitted(true);
          setIsHolding(false);
          confetti({
            particleCount: 180,
            spread: 90,
            startVelocity: 45,
            scalar: 1.1,
            origin: { y: 0.65 },
            colors: ["#b461ba", "#0082be", "#ffd166", "#ffffff"],
          });
          setTimeout(onCommit, 720);
          return 100;
        }
        return prev + 1.5;
      });
    }, 24);
  }, [committed, onCommit]);

  const stopHold = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsHolding(false);
    if (!committed) setProgress(0);
  }, [committed]);

  const overlayOpacity = Math.min(0.78, 0.08 + progress * 0.007);
  const glowScale = 0.76 + (progress / 100) * 2.15;
  const glowOpacity = 0.2 + (progress / 100) * 0.55;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        committed ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#0B0E14" }}
    >
      {/* Soft plum glow that expands like a ripple while holding */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at center, rgba(180, 97, 186, 0.55) 0%, rgba(180, 97, 186, 0.28) 24%, rgba(180, 97, 186, 0.1) 46%, rgba(180, 97, 186, 0) 74%)",
          transform: `scale(${glowScale})`,
          opacity: glowOpacity,
          transition: "transform 0.18s ease-out, opacity 0.22s ease-out",
        }}
      />

      {/* Full-screen luxe overlay as hold nears completion */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(180, 97, 186, 1)",
          opacity: overlayOpacity,
        }}
      />

      <div
        className={`relative z-10 flex flex-col items-center gap-8 transition-all duration-500 ${
          committed ? "opacity-0 scale-110" : "opacity-100"
        }`}
      >
        <Flame className="w-12 h-12 text-primary animate-pulse" />
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground text-center">
          Commit to <span className="text-gradient">Productivity</span>
        </h1>
        <p className="text-muted-foreground text-sm tracking-wide max-w-md text-center">
          Hold the button to begin your focused study session
        </p>

        {/* Hold button */}
        <button
          onMouseDown={startHold}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={startHold}
          onTouchEnd={stopHold}
          className={`relative mt-4 w-40 h-40 rounded-full glass-card border-2 border-primary/30 flex items-center justify-center cursor-pointer select-none transition-transform duration-150 ${
            isHolding ? "scale-105" : "scale-100"
          }`}
        >
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="72" fill="none" stroke="hsl(298 36% 53% / 0.15)" strokeWidth="4" />
            <circle
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="hsl(298, 36%, 53%)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 72}`}
              strokeDashoffset={`${2 * Math.PI * 72 * (1 - progress / 100)}`}
              className="transition-all duration-100"
            />
          </svg>
          <span className="text-lg font-bold tracking-widest uppercase text-primary">
            {progress > 0 ? `${Math.round(progress)}%` : "Hold to Commit"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CommitScreen;
