import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 glass-card rounded-full p-3 hover:scale-110 hover:glow-primary transition-all duration-300 animate-fade-in-up"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4 text-primary" />
    </button>
  );
};

export default ScrollToTop;
