import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingOrbs from "@/components/FloatingOrbs";
import DeepWorkOverlay from "@/components/DeepWorkOverlay";
import BackButton from "@/components/BackButton";
import ScrollToTop from "@/components/ScrollToTop";

const entries = [
  { version: "v1.0.4-beta", date: "Apr 9, 2026", changes: ["Professional footer with navigation", "Back button on sub-pages", "Scroll-to-top micro-interaction", "Light/Dark mode polish"] },
  { version: "v1.0.3-beta", date: "Apr 7, 2026", changes: ["Deep Work overlay with shield animation", "Weekly Focus analytics chart", "Daily Intentions drag-and-drop widget"] },
  { version: "v1.0.2-beta", date: "Apr 5, 2026", changes: ["Pomodoro timer with auto-start", "Exam Roadmap Kanban board", "Floating orbs background"] },
  { version: "v1.0.1-beta", date: "Apr 3, 2026", changes: ["Initial StudyFlow release", "Hero section with Bento grid", "Glassmorphism design system"] },
];

const ChangelogPage = () => (
  <div className="min-h-screen bg-background relative">
    <FloatingOrbs />
    <Navbar />
    <DeepWorkOverlay />
    <BackButton />
    <ScrollToTop />
    <div className="pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-3">
            <span className="text-gradient">Changelog</span>
          </h1>
          <p className="text-muted-foreground tracking-wide">What's new in StudyFlow</p>
        </div>

        <div className="space-y-6">
          {entries.map((entry, i) => (
            <div key={entry.version} className="glass-card rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-primary tracking-wide">{entry.version}</span>
                <span className="text-xs text-muted-foreground">{entry.date}</span>
              </div>
              <ul className="space-y-1.5">
                {entry.changes.map((c) => (
                  <li key={c} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default ChangelogPage;
