import { useState, useRef, useCallback } from "react";
import { Flame } from "lucide-react";

interface CommitScreenProps {
  onCommit: () => void;
}

const CommitScreen = ({ onCommit }: CommitScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [committed, setCommitted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = useCallback(() => {
    if (committed) return;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          setCommitted(true);
          setTimeout(onCommit, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  }, [committed, onCommit]);

  const stopHold = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (!committed) setProgress(0);
  }, [committed]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden">
      {/* Plum fill from center */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, hsl(298 36% 53%) 0%, hsl(298 36% 40%) 100%)",
          transform: `scale(${progress / 50})`,
          opacity: progress > 0 ? 1 : 0,
          transition: "transform 0.1s ease-out, opacity 0.3s",
        }}
      />

      {/* Content */}
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
          className="relative mt-4 w-40 h-40 rounded-full glass-card border-2 border-primary/30 flex items-center justify-center cursor-pointer select-none hover:scale-105 active:scale-95 transition-transform"
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
            {progress > 0 ? `${progress}%` : "Hold"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CommitScreen;
