import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="fixed top-20 left-6 z-40 glass-card rounded-full p-2.5 hover:scale-110 transition-all duration-300 group"
      aria-label="Back to Dashboard"
    >
      <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </button>
  );
};

export default BackButton;
