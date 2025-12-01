"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableTodoItem } from "@/components/DraggableTodoItem";
import { CreateTodoDialog } from "@/components/CreateTodoDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, LogOut, Loader2 } from "lucide-react";
import { StaticTodoItem } from "@/components/StaticTodoItem";

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  priority: number;
  category: string;
  dueDate: string | null;
  order: number;
}

export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("manual");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else loadTodos();
  }, [router]);

  const loadTodos = async () => {
    try {
      const data = await api.getTodos();
      setTodos(data.sort((a: Todo, b: Todo) => a.order - b.order));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    loadTodos();
  };

  const moveTodo = useCallback((dragIndex: number, hoverIndex: number) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      const [movedItem] = newTodos.splice(dragIndex, 1);
      newTodos.splice(hoverIndex, 0, movedItem);
      return newTodos;
    });
  }, []);

  const handleDragEnd = async () => {
    const updates = todos.map((item, index) => ({ id: item.id, order: index }));
    await api.reorderTodos(updates);
  };

  const handleToggle = async (id: number, status: boolean) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, isCompleted: !status } : t))
    );
    await api.updateTodo(id, !status);
  };

  const handleDelete = async (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
    await api.deleteTodo(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const displayedTodos = useMemo(() => {
    let result = [...todos];

    if (search.trim()) {
      result = result.filter((t) =>
        t.text.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter === "done") result = result.filter((t) => t.isCompleted);
    if (statusFilter === "undone")
      result = result.filter((t) => !t.isCompleted);

    if (sortOrder === "priority-desc")
      result.sort((a, b) => b.priority - a.priority);
    if (sortOrder === "priority-asc")
      result.sort((a, b) => a.priority - b.priority);
    if (sortOrder === "date-asc") {
      result.sort(
        (a, b) =>
          new Date(a.dueDate || "2100-01-01").getTime() -
          new Date(b.dueDate || "2100-01-01").getTime()
      );
    }

    return result;
  }, [todos, search, statusFilter, sortOrder]);

  const isDragEnabled =
    sortOrder === "manual" && search === "" && statusFilter === "all";

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-slate-800 gap-4">
            <div className="hidden md:block">
              <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Task Manager
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Get things done, your way.
              </p>
            </div>

            <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
              <CreateTodoDialog onTaskCreated={handleTaskCreated} />

              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </header>

          <div className="flex flex-col md:flex-row gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search tasks..."
                className="pl-9 bg-slate-950 border-slate-700 focus:border-indigo-500 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-slate-950 border-slate-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="done">Completed</SelectItem>
                <SelectItem value="undone">Active</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[160px] bg-slate-950 border-slate-700">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                <SelectItem value="manual">Manual (Drag)</SelectItem>
                <SelectItem value="priority-desc">Priority High</SelectItem>
                <SelectItem value="priority-asc">Priority Low</SelectItem>
                <SelectItem value="date-asc">Due Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 min-h-[300px]">
            {displayedTodos.map((todo, index) =>
              isDragEnabled ? (
                <DraggableTodoItem
                  key={todo.id}
                  index={index}
                  todo={todo}
                  moveTodo={moveTodo}
                  onDragEnd={handleDragEnd}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ) : (
                <StaticTodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              )
            )}

            {displayedTodos.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-600 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                <p className="pb-5">No tasks found.</p>
                <CreateTodoDialog onTaskCreated={handleTaskCreated} />
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
