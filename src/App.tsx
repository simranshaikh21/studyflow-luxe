import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DeepWorkProvider } from "@/contexts/DeepWorkContext";
import Index from "./pages/Index.tsx";
import RoadmapPage from "./pages/RoadmapPage.tsx";
import SyllabusRoadmapPage from "./pages/SyllabusRoadmapPage.tsx";
import InsightsPage from "./pages/InsightsPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import ChangelogPage from "./pages/ChangelogPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DeepWorkProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/syllabus-roadmap" element={<SyllabusRoadmapPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DeepWorkProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
