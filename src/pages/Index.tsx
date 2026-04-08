import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PomodoroTimer from "@/components/PomodoroTimer";
import ExamRoadmap from "@/components/ExamRoadmap";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PomodoroTimer />
      <ExamRoadmap />
      <Footer />
    </div>
  );
};

export default Index;
