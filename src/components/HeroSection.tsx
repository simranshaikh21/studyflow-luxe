import { ArrowRight, Clock, Target, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Focus Hours", value: "127h", icon: Clock, change: "+12%" },
  { label: "Tasks Done", value: "284", icon: Target, change: "+8%" },
  { label: "Streak", value: "14 days", icon: Zap, change: "Best!" },
  { label: "Efficiency", value: "94%", icon: TrendingUp, change: "+3%" },
];

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 px-6 bg-gradient-hero overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6 border border-border/50">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Your study engine
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-foreground">Master your</span>
            <br />
            <span className="text-gradient">flow state.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            The premium productivity suite designed for students who refuse to settle. Track focus, crush exams, and build unstoppable habits.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium tracking-wide rounded-xl glow-primary transition-all hover:glow-primary-intense">
            Start Studying
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group cursor-default"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-semibold tracking-widest text-success bg-success/10 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground tracking-wide mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
