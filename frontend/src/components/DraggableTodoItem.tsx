"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  Trash2,
  GripVertical,
  CheckCircle2,
  Circle,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Todo } from "@/app/page";

interface DragItem {
  index: number;
  id: number;
  type: string;
}

interface TodoItemProps {
  todo: Todo;
  index: number;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
  onDragEnd: () => void;
  onToggle: (id: number, status: boolean) => void;
  onDelete: (id: number) => void;
}

export const DraggableTodoItem = ({
  todo,
  index,
  moveTodo,
  onDragEnd,
  onToggle,
  onDelete,
}: TodoItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem>({
    accept: "TODO_ITEM",
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveTodo(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TODO_ITEM",
    item: { id: todo.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      onDragEnd();
    },
  });

  // eslint-disable-next-line react-hooks/refs
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={cn(
        "group flex items-center justify-between p-4 rounded-xl border transition-all mb-3",
        "bg-slate-900 border-slate-800 hover:border-slate-700",
        todo.isCompleted && "opacity-50",
        isDragging && "opacity-0"
      )}
      data-handler-id={todo.id}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="text-slate-600 cursor-grab active:cursor-grabbing hover:text-slate-400">
          <GripVertical className="w-5 h-5" />
        </div>

        <button onClick={() => onToggle(todo.id, todo.isCompleted)}>
          {todo.isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          ) : (
            <Circle className="w-6 h-6 text-slate-500 hover:text-indigo-400" />
          )}
        </button>

        <div className="flex flex-col gap-1">
          <span
            className={cn(
              "font-medium text-slate-200",
              todo.isCompleted && "line-through text-slate-500"
            )}
          >
            {todo.text}
          </span>
          <div className="flex gap-2 text-xs items-center">
            <Badge
              variant="outline"
              className="border-slate-700 text-slate-400"
            >
              {todo.category}
            </Badge>
            {todo.dueDate && (
              <span
                className={cn(
                  "flex items-center",
                  new Date(todo.dueDate) < new Date() && !todo.isCompleted
                    ? "text-red-400"
                    : "text-slate-500"
                )}
              >
                <CalendarIcon className="w-3 h-3 mr-1" />
                {format(new Date(todo.dueDate), "MMM dd")}
              </span>
            )}
            <span
              className={cn(
                "font-bold px-1.5 py-0.5 rounded",
                todo.priority >= 8
                  ? "bg-red-900/30 text-red-400"
                  : todo.priority >= 5
                  ? "bg-yellow-900/30 text-yellow-400"
                  : "bg-slate-800 text-slate-400"
              )}
            >
              P{todo.priority}
            </span>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="text-slate-600 hover:text-red-400 hover:bg-slate-800"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
