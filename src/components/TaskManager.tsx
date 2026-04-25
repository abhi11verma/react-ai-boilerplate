import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type Filter, type Priority, type Task, useTasksStore } from "@/store/tasks.store";

const PRIORITY_STYLES: Record<Priority, string> = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-primary/10 text-primary border-primary/20",
  low: "bg-muted text-muted-foreground border-border",
};

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

function TaskRow({ task }: { task: Task }) {
  const { toggleTask, deleteTask } = useTasksStore();

  return (
    <div className="flex items-center gap-3 py-3">
      <Checkbox
        id={task.id}
        checked={task.completed}
        onCheckedChange={() => { toggleTask(task.id); }}
      />
      <label
        htmlFor={task.id}
        className={cn(
          "flex-1 cursor-pointer text-sm",
          task.completed && "line-through text-muted-foreground"
        )}
      >
        {task.title}
      </label>
      <Badge variant="outline" className={cn("text-xs capitalize", PRIORITY_STYLES[task.priority])}>
        {task.priority}
      </Badge>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-destructive"
        onClick={() => { deleteTask(task.id); }}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

function AddTaskForm() {
  const addTask = useTasksStore((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTask(trimmed, priority);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => { setTitle(e.target.value); }}
        className="flex-1"
      />
      <select
        value={priority}
        onChange={(e) => { setPriority(e.target.value as Priority); }}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <Button type="submit" disabled={!title.trim()}>
        Add
      </Button>
    </form>
  );
}

export function TaskManager() {
  const { tasks, filter, setFilter, clearCompleted } = useTasksStore();

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Task Manager</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Zustand + shadcn/ui example
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardHeader className="pb-1 pt-4">
            <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <span className="text-2xl font-bold text-foreground">{tasks.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-4">
            <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <span className="text-2xl font-bold text-primary">{activeCount}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-1 pt-4">
            <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Done
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <span className="text-2xl font-bold text-muted-foreground">{completedCount}</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <AddTaskForm />

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {FILTERS.map(({ label, value }) => (
                <Button
                  key={value}
                  variant={filter === value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => { setFilter(value); }}
                >
                  {label}
                </Button>
              ))}
            </div>
            {completedCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={clearCompleted}
              >
                Clear done
              </Button>
            )}
          </div>

          <div className="min-h-[120px]">
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {filter === "completed" ? "No completed tasks yet." : "Nothing here. Add a task above."}
              </p>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
