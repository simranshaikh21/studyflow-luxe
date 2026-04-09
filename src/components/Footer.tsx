import { Flame, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="py-12 px-6 border-t border-border/30">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold tracking-wider text-foreground">StudyFlow</span>
          </div>
          <p className="text-xs text-muted-foreground tracking-wide leading-relaxed">
            Built for Excellence.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Navigate</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/roadmap" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Roadmap</Link>
            <Link to="/insights" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Insights</Link>
            <Link to="/settings" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Settings</Link>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Info</h4>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">About Us</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Support</a>
            <Link to="/changelog" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Changelog</Link>
          </div>
        </div>

        {/* Desktop App */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Desktop</h4>
          <button
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-xs text-muted-foreground cursor-not-allowed opacity-70"
          >
            <Download className="w-3.5 h-3.5" />
            Download Desktop App
          </button>
          <p className="text-[10px] text-muted-foreground/60 tracking-wide">Coming Soon</p>
        </div>
      </div>

      <div className="border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-muted-foreground/50 tracking-wide">
          © {new Date().getFullYear()} StudyFlow. All rights reserved.
        </p>
        <Link to="/changelog" className="text-[10px] text-muted-foreground/40 hover:text-muted-foreground transition-colors tracking-wider">
          v1.0.4-beta
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
