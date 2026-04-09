import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingOrbs from "@/components/FloatingOrbs";
import DeepWorkOverlay from "@/components/DeepWorkOverlay";
import BackButton from "@/components/BackButton";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";

type RoadmapDay = {
  day: number;
  topicsToCover: string;
  practiceQuiz: string;
};

const STORAGE_INPUT_KEY = "studyflow-syllabus-input";
const STORAGE_ROADMAP_KEY = "studyflow-syllabus-roadmap";

const fallbackTopics = [
  "Programming Fundamentals",
  "Data Structures",
  "Algorithms",
  "Database Systems",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Web Technologies",
  "Object-Oriented Programming",
  "Revision + Mock Tests",
];

const toRoadmap = (text: string): RoadmapDay[] => {
  const tokens = text
    .split(/\n|,|;|\.|:/g)
    .map((part) => part.trim())
    .filter((part) => part.length > 2);

  const topics = tokens.length ? tokens.slice(0, 18) : fallbackTopics;

  return Array.from({ length: 10 }).map((_, index) => {
    const topicA = topics[index % topics.length];
    const topicB = topics[(index + 4) % topics.length];
    return {
      day: index + 1,
      topicsToCover: `${topicA} and ${topicB}`,
      practiceQuiz: `Practice Quiz ${index + 1}: Core questions from ${topicA}`,
    };
  });
};

const SyllabusRoadmapPage = () => {
  const [syllabusText, setSyllabusText] = useState(() => localStorage.getItem(STORAGE_INPUT_KEY) ?? "");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapDay[]>(() => {
    const raw = localStorage.getItem(STORAGE_ROADMAP_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as RoadmapDay[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const timelineGlow = useMemo(() => (roadmap.length ? "glow-primary" : ""), [roadmap.length]);

  const handleGenerate = () => {
    const normalized = syllabusText.trim();
    localStorage.setItem(STORAGE_INPUT_KEY, normalized);
    setLoading(true);

    setTimeout(() => {
      const generated = toRoadmap(normalized);
      setRoadmap(generated);
      localStorage.setItem(STORAGE_ROADMAP_KEY, JSON.stringify(generated));
      setLoading(false);
    }, 2100);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingOrbs />
      <Navbar />
      <DeepWorkOverlay />
      <BackButton />
      <ScrollToTop />

      <main className="pt-28 pb-16 px-6">
        <div className="container mx-auto max-w-5xl space-y-8">
          <section className="glass-card rounded-3xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black text-foreground">Syllabus Roadmap</h1>
                <p className="text-sm tracking-wide text-muted-foreground">
                  Paste your CMPICA syllabus and generate a 10-day premium plan.
                </p>
              </div>
            </div>

            <textarea
              value={syllabusText}
              onChange={(event) => setSyllabusText(event.target.value)}
              placeholder="Paste your full CMPICA syllabus here..."
              className="w-full min-h-[320px] md:min-h-[380px] rounded-2xl bg-card/30 text-foreground placeholder:text-muted-foreground/60 p-4 border border-primary/55 shadow-[0_0_28px_rgba(180,97,186,0.26)] focus:outline-none focus:ring-2 focus:ring-primary/65 transition-all"
            />

            <div className="mt-5 flex justify-end">
              <Button onClick={handleGenerate} className="rounded-xl px-6 py-5 luxe-hover">
                Generate Roadmap
              </Button>
            </div>
          </section>

          <section className={`glass-card rounded-3xl p-6 md:p-8 ${timelineGlow}`}>
            {loading ? (
              <div className="min-h-[320px] flex flex-col items-center justify-center text-center">
                <motion.div
                  className="w-14 h-14 rounded-full border-2 border-primary/40 border-t-primary mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                />
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-muted-foreground tracking-wide">Analyzing your syllabus with Luxe AI...</p>
                </motion.div>
              </div>
            ) : roadmap.length ? (
              <div className="relative">
                <div className="absolute left-[18px] top-0 bottom-0 w-px bg-primary/35" />
                <div className="space-y-5">
                  {roadmap.map((entry, index) => (
                    <motion.div
                      key={entry.day}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: index * 0.03 }}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(180,97,186,0.24)" }}
                      className="relative ml-10 rounded-2xl bg-card/45 border border-[#0082be4d] p-4"
                    >
                      <span className="absolute -left-[34px] top-5 w-4 h-4 rounded-full bg-primary shadow-[0_0_14px_rgba(180,97,186,0.6)]" />
                      <h3 className="text-lg font-bold text-foreground">Day {entry.day}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="text-foreground font-medium">Topics to Cover:</span> {entry.topicsToCover}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="text-foreground font-medium">Practice Quiz:</span> {entry.practiceQuiz}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="min-h-[280px] flex flex-col items-center justify-center text-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-primary/75" />
                <p className="text-muted-foreground tracking-wide">
                  Generate your syllabus roadmap to unlock the 10-day timeline.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SyllabusRoadmapPage;
