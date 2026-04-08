import Navbar from "@/components/Navbar";
import ExamRoadmap from "@/components/ExamRoadmap";
import Footer from "@/components/Footer";
import FloatingOrbs from "@/components/FloatingOrbs";
import DeepWorkOverlay from "@/components/DeepWorkOverlay";

const RoadmapPage = () => (
  <div className="min-h-screen bg-background relative">
    <FloatingOrbs />
    <Navbar />
    <DeepWorkOverlay />
    <div className="pt-24">
      <ExamRoadmap />
    </div>
    <Footer />
  </div>
);

export default RoadmapPage;
