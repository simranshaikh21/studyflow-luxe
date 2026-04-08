import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";
import { useDeepWork } from "@/contexts/DeepWorkContext";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export interface PomodoroTimerRef {
  startTimer: () => void;
}

const PomodoroTimer = forwardRef<PomodoroTimerRef>((_, ref) => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const { isDeepWork } = useDeepWork();

  useImperativeHandle(ref, () => ({
    startTimer: () => {
      setIsBreak(false);
      setTimeLeft(FOCUS_TIME);
      setIsRunning(true);
    },
  }));

  const totalTime = isBreak ? BREAK_TIME : FOCUS_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsRunning(false);
          if (!isBreak) setSessions((s) => s + 1);
          setIsBreak((b) => !b);
          return isBreak ? FOCUS_TIME : BREAK_TIME;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, isBreak]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(FOCUS_TIME);
  }, []);

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const secs = (timeLeft % 60).toString().padStart(2, "0");

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <section id="dashboard" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Focus Dashboard
          </h2>
          <p className="text-muted-foreground tracking-wide">
            {isDeepWork ? "🛡️ Deep Work active — distractions blocked" : "Enter deep focus and crush your goals"}
          </p>
        </div>

        <div className={`glass-card rounded-3xl p-8 md:p-12 mx-auto max-w-lg transition-all duration-700 ${isRunning ? 'animate-pulse-glow' : ''} ${isDeepWork ? 'border border-primary/20' : ''}`}>
          {/* Timer Circle */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 260 260">
              <circle cx="130" cy="130" r="120" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
              <circle
                cx="130" cy="130" r="120" fill="none"
                stroke={isBreak ? "hsl(var(--success))" : "hsl(var(--primary))"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 mb-2">
                {isBreak ? <Coffee className="w-4 h-4 text-success" /> : null}
                <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  {isBreak ? "Break" : "Focus"}
                </span>
              </div>
              <span className="text-6xl font-thin tracking-widest text-foreground tabular-nums">
                {mins}:{secs}
              </span>
              <span className="text-xs text-muted-foreground mt-2 tracking-wide">
                Session {sessions + 1}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={reset}
              className="w-12 h-12 rounded-full border-border/50 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all hover:glow-primary-intense"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setIsRunning(false);
                setIsBreak(true);
                setTimeLeft(BREAK_TIME);
              }}
              className="w-12 h-12 rounded-full border-border/50 text-muted-foreground hover:text-foreground"
            >
              <Coffee className="w-4 h-4" />
            </Button>
          </div>

          {/* Session dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i < sessions % 4 ? 'bg-primary' : 'bg-muted'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

PomodoroTimer.displayName = "PomodoroTimer";

export default PomodoroTimer;
