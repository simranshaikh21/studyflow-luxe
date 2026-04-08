import { Flame } from "lucide-react";

const Footer = () => (
  <footer className="py-12 px-6 border-t border-border/30">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Flame className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium tracking-wider text-muted-foreground">StudyFlow</span>
      </div>
      <p className="text-xs text-muted-foreground tracking-wide">
        Built for students who mean business.
      </p>
    </div>
  </footer>
);

export default Footer;
