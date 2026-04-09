import Navbar from "@/components/Navbar";
import ExamRoadmap from "@/components/ExamRoadmap";
import Footer from "@/components/Footer";
import FloatingOrbs from "@/components/FloatingOrbs";
import DeepWorkOverlay from "@/components/DeepWorkOverlay";
import BackButton from "@/components/BackButton";
import ScrollToTop from "@/components/ScrollToTop";

const RoadmapPage = () => (
  <div className="min-h-screen bg-background relative">
    <FloatingOrbs />
    <Navbar />
    <DeepWorkOverlay />
    <BackButton />
    <ScrollToTop />
    <div className="pt-24">
      <ExamRoadmap />
    </div>
    <Footer />
  </div>
);

export default RoadmapPage;
