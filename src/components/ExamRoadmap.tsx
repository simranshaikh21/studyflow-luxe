import { useState } from "react";
import { Plus, GripVertical, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Task = { id: string; title: string };
type Column = { id: string; title: string; tasks: Task[] };

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Study",
    tasks: [
      { id: "1", title: "Linear Algebra Ch. 4" },
      { id: "2", title: "Organic Chemistry — Reactions" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    tasks: [
      { id: "3", title: "Data Structures — Trees" },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      { id: "4", title: "Physics — Thermodynamics" },
    ],
  },
  {
    id: "done",
    title: "Mastered",
    tasks: [
      { id: "5", title: "Calculus II — Integrals" },
    ],
  },
];

const columnColors: Record<string, string> = {
  todo: "bg-muted-foreground/20",
  progress: "bg-secondary/20",
  review: "bg-success/20",
  done: "bg-primary/20",
};

const ExamRoadmap = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newTask, setNewTask] = useState<Record<string, string>>({});
  const [draggedTask, setDraggedTask] = useState<{ colId: string; taskId: string } | null>(null);

  const addTask = (colId: string) => {
    const text = newTask[colId]?.trim();
    if (!text) return;
    setColumns((cols) =>
      cols.map((c) =>
        c.id === colId
          ? { ...c, tasks: [...c.tasks, { id: Date.now().toString(), title: text }] }
          : c
      )
    );
    setNewTask((prev) => ({ ...prev, [colId]: "" }));
  };

  const removeTask = (colId: string, taskId: string) => {
    setColumns((cols) =>
      cols.map((c) =>
        c.id === colId ? { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) } : c
      )
    );
  };

  const handleDragStart = (colId: string, taskId: string) => {
    setDraggedTask({ colId, taskId });
  };

  const handleDrop = (targetColId: string) => {
    if (!draggedTask || draggedTask.colId === targetColId) {
      setDraggedTask(null);
      return;
    }
    setColumns((cols) => {
      const sourceCol = cols.find((c) => c.id === draggedTask.colId)!;
      const task = sourceCol.tasks.find((t) => t.id === draggedTask.taskId)!;
      return cols.map((c) => {
        if (c.id === draggedTask.colId) return { ...c, tasks: c.tasks.filter((t) => t.id !== draggedTask.taskId) };
        if (c.id === targetColId) return { ...c, tasks: [...c.tasks, task] };
        return c;
      });
    });
    setDraggedTask(null);
  };

  return (
    <section id="roadmap" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Exam Roadmap
          </h2>
          <p className="text-muted-foreground tracking-wide">
            Drag topics across stages as you master them
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => (
            <div
              key={col.id}
              className="glass-card rounded-2xl p-4 min-h-[300px] flex flex-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${columnColors[col.id]}`} />
                  <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
                    {col.title}
                  </h3>
                </div>
                <Badge variant="secondary" className="text-[10px] bg-muted text-muted-foreground border-0 px-2">
                  {col.tasks.length}
                </Badge>
              </div>

              <div className="flex-1 space-y-2 mb-3">
                {col.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(col.id, task.id)}
                    className="flex items-center gap-2 p-3 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all cursor-grab active:cursor-grabbing group"
                  >
                    <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                    <span className="text-sm text-foreground flex-1 truncate">{task.title}</span>
                    {col.id === "done" && (
                      <Check className="w-3.5 h-3.5 text-success shrink-0" />
                    )}
                    <button
                      onClick={() => removeTask(col.id, task.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add topic..."
                  value={newTask[col.id] || ""}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, [col.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addTask(col.id)}
                  className="h-9 text-sm bg-card/30 border-border/30 placeholder:text-muted-foreground/50"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => addTask(col.id)}
                  className="h-9 w-9 shrink-0 text-muted-foreground hover:text-primary"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamRoadmap;
