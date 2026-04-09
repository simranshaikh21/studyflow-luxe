import { useDeepWork } from "@/contexts/DeepWorkContext";
import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@/components/ui/switch";
import { Brain, Flame, Shield, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/insights", label: "Insights" },
  { to: "/settings", label: "Settings" },
];

const Navbar = () => {
  const { isDeepWork, toggleDeepWork } = useDeepWork();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:glow-primary transition-all">
            <Flame className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-wider text-foreground">
            StudyFlow
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors tracking-wide ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-500 ${isDeepWork ? 'glass-card glow-primary border border-primary/30' : 'glass-card'}`}>
            <Shield className={`w-4 h-4 transition-colors ${isDeepWork ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
            <span className="text-xs font-medium tracking-wider text-muted-foreground hidden sm:inline">
              DEEP WORK
            </span>
            <Switch
              checked={isDeepWork}
              onCheckedChange={toggleDeepWork}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <Brain className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
