import { useDeepWork } from "@/contexts/DeepWorkContext";
import { Shield } from "lucide-react";

const DeepWorkOverlay = () => {
  const { isDeepWork } = useDeepWork();

  if (!isDeepWork) return null;

  return (
    <>
      {/* Pulsing border glow overlay */}
      <div className="fixed inset-0 z-40 pointer-events-none animate-pulse-glow-border" />
      
      {/* Shield indicator */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 glass-card rounded-full px-5 py-3 border border-primary/30 animate-fade-in-up glow-primary">
        <Shield className="w-5 h-5 text-primary animate-pulse" />
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-primary uppercase">
            Distraction Blocker Active
          </p>
          <p className="text-[10px] text-muted-foreground tracking-wide">
            Extension sync enabled
          </p>
        </div>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      </div>
    </>
  );
};

export default DeepWorkOverlay;
