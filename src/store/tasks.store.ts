import { create } from "zustand";

export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "active" | "completed";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

interface TasksState {
  tasks: Task[];
  filter: Filter;
  addTask: (title: string, priority: Priority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
}

export const useTasksStore = create<TasksState>()((set) => ({
  tasks: [
    { id: "1", title: "Set up the project", completed: true, priority: "high", createdAt: Date.now() - 3000 },
    { id: "2", title: "Add shadcn components", completed: true, priority: "high", createdAt: Date.now() - 2000 },
    { id: "3", title: "Wire Zustand state", completed: false, priority: "medium", createdAt: Date.now() - 1000 },
    { id: "4", title: "Deploy to production", completed: false, priority: "low", createdAt: Date.now() },
  ],
  filter: "all",

  addTask: (title, priority) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: crypto.randomUUID(), title, completed: false, priority, createdAt: Date.now() },
      ],
    }));
  },

  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
  },

  setFilter: (filter) => { set({ filter }); },

  clearCompleted: () => {
    set((state) => ({ tasks: state.tasks.filter((t) => !t.completed) }));
  },
}));
