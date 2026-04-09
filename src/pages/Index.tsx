import { useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PomodoroTimer, { PomodoroTimerRef } from "@/components/PomodoroTimer";
import WeeklyFocus from "@/components/WeeklyFocus";
import DailyIntentions from "@/components/DailyIntentions";
import ExamRoadmap from "@/components/ExamRoadmap";
import Footer from "@/components/Footer";
import FloatingOrbs from "@/components/FloatingOrbs";
import DeepWorkOverlay from "@/components/DeepWorkOverlay";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const timerRef = useRef<PomodoroTimerRef>(null);

  const handleStartStudying = useCallback(() => {
    const dashboardEl = document.getElementById("dashboard");
    if (dashboardEl) {
      dashboardEl.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        timerRef.current?.startTimer();
      }, 800);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingOrbs />
      <Navbar />
      <DeepWorkOverlay />
      <ScrollToTop />
      <HeroSection onStartStudying={handleStartStudying} />
      <PomodoroTimer ref={timerRef} />
      <WeeklyFocus />
      <DailyIntentions />
      <ExamRoadmap />
      <Footer />
    </div>
  );
};

export default Index;
