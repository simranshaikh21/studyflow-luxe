import { useState } from "react";
import { Plus, GripVertical, Check, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type Intention = {
  id: string;
  title: string;
  completed: boolean;
  fromRoadmap?: boolean;
};

const initialIntentions: Intention[] = [
  { id: "i1", title: "Review Data Structures — Trees", completed: false, fromRoadmap: true },
  { id: "i2", title: "Complete 3 Pomodoro sessions", completed: false },
  { id: "i3", title: "Read Physics Chapter 7", completed: true },
];

const DailyIntentions = () => {
  const [intentions, setIntentions] = useState<Intention[]>(initialIntentions);
  const [newIntention, setNewIntention] = useState("");
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const addIntention = () => {
    const text = newIntention.trim();
    if (!text) return;
    setIntentions((prev) => [
      ...prev,
      { id: Date.now().toString(), title: text, completed: false },
    ]);
    setNewIntention("");
  };

  const toggleComplete = (id: string) => {
    setIntentions((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
    );
  };

  const removeIntention = (id: string) => {
    setIntentions((prev) => prev.filter((i) => i.id !== id));
  };

  const handleDragStart = (id: string) => setDraggedId(id);

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;
    setIntentions((prev) => {
      const items = [...prev];
      const dragIdx = items.findIndex((i) => i.id === draggedId);
      const dropIdx = items.findIndex((i) => i.id === targetId);
      const [removed] = items.splice(dragIdx, 1);
      items.splice(dropIdx, 0, removed);
      return items;
    });
    setDraggedId(null);
  };

  const completedCount = intentions.filter((i) => i.completed).length;

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Daily Intentions
          </h2>
          <p className="text-muted-foreground tracking-wide">
            Set your focus for today — drag to prioritize
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 md:p-8">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-foreground">
                {completedCount}/{intentions.length} completed
              </span>
            </div>
            <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${intentions.length ? (completedCount / intentions.length) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Intentions list */}
          <div className="space-y-2 mb-4">
            {intentions.map((intention) => (
              <div
                key={intention.id}
                draggable
                onDragStart={() => handleDragStart(intention.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(intention.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing group ${
                  intention.completed
                    ? "bg-muted/30 border-border/20"
                    : "bg-card/50 border-border/30 hover:border-primary/30"
                } ${draggedId === intention.id ? "opacity-50" : ""}`}
              >
                <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                <Checkbox
                  checked={intention.completed}
                  onCheckedChange={() => toggleComplete(intention.id)}
                />
                <span
                  className={`text-sm flex-1 transition-all ${
                    intention.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {intention.title}
                </span>
                {intention.fromRoadmap && (
                  <span className="text-[10px] font-semibold tracking-widest text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                    ROADMAP
                  </span>
                )}
                <button
                  onClick={() => removeIntention(intention.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            ))}
          </div>

          {/* Add new */}
          <div className="flex gap-2">
            <Input
              placeholder="Add an intention for today..."
              value={newIntention}
              onChange={(e) => setNewIntention(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addIntention()}
              className="h-10 text-sm bg-card/30 border-border/30 placeholder:text-muted-foreground/50"
            />
            <Button
              onClick={addIntention}
              size="icon"
              className="h-10 w-10 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyIntentions;
