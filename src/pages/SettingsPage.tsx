import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingOrbs from "@/components/FloatingOrbs";
import DeepWorkOverlay from "@/components/DeepWorkOverlay";
import BackButton from "@/components/BackButton";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useDeepWork } from "@/contexts/DeepWorkContext";
import { Timer, Shield, Zap, Bell, Monitor, Save } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const { isDeepWork, toggleDeepWork } = useDeepWork();
  const [focusLength, setFocusLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [autoStart, setAutoStart] = useState(false);
  const [sound, setSound] = useState(true);
  const [extensionSync, setExtensionSync] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    toast.success("Settings saved successfully!", {
      description: `Focus: ${focusLength}m | Break: ${breakLength}m | Long break: ${longBreak}m`,
    });
  };

  return (
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
              <span className="text-gradient">Settings</span>
            </h1>
            <p className="text-muted-foreground tracking-wide">
              Customize your productivity engine
            </p>
          </div>

          <div className="space-y-6">
            {/* Timer settings */}
            <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-6">
                <Timer className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground tracking-wide">Timer Configuration</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-foreground">Focus Duration</span>
                    <span className="text-sm font-bold text-primary">{focusLength} min</span>
                  </div>
                  <Slider value={[focusLength]} onValueChange={(v) => setFocusLength(v[0])} min={10} max={60} step={5} className="w-full" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-foreground">Short Break</span>
                    <span className="text-sm font-bold text-secondary">{breakLength} min</span>
                  </div>
                  <Slider value={[breakLength]} onValueChange={(v) => setBreakLength(v[0])} min={3} max={15} step={1} className="w-full" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-foreground">Long Break</span>
                    <span className="text-sm font-bold text-success">{longBreak} min</span>
                  </div>
                  <Slider value={[longBreak]} onValueChange={(v) => setLongBreak(v[0])} min={10} max={30} step={5} className="w-full" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div>
                    <span className="text-sm text-foreground">Auto-start next session</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Automatically begin the next Pomodoro</p>
                  </div>
                  <Switch checked={autoStart} onCheckedChange={setAutoStart} />
                </div>
              </div>
            </div>

            {/* Extension sync */}
            <div className="glass-card rounded-3xl p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground tracking-wide">Extension & Focus</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-foreground">Deep Work Mode</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Block distractions globally</p>
                  </div>
                  <Switch checked={isDeepWork} onCheckedChange={toggleDeepWork} className="data-[state=checked]:bg-primary" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-foreground">Chrome Extension Sync</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Sync Deep Work state with browser extension</p>
                  </div>
                  <Switch checked={extensionSync} onCheckedChange={setExtensionSync} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-foreground">Sound Effects</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Play sounds on session completion</p>
                  </div>
                  <Switch checked={sound} onCheckedChange={setSound} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-foreground">Notifications</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Browser notifications for timer events</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </div>
            </div>

            <div className="flex justify-end animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium tracking-wide rounded-xl glow-primary hover:glow-primary-intense transition-all"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
