import prisma from "../lib/prisma.js";
export const getAllTodos = async (userId) => {
  return await prisma.todo.findMany({
    where: { authorId: userId },
    orderBy: { order: "asc" },
  });
};

export const createTodo = async (userId, data) => {
  const lastTodo = await prisma.todo.findFirst({
    where: { authorId: userId },
    orderBy: { order: "desc" },
  });
  const newOrder = lastTodo ? lastTodo.order + 1 : 0;

  return await prisma.todo.create({
    data: {
      text: data.text,
      priority: Number(data.priority),
      category: data.category || "General",
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      order: newOrder,
      authorId: userId,
    },
  });
};

export const reorderTodos = async (userId, items) => {
  const transaction = items.map((item) =>
    prisma.todo.update({
      where: { id: item.id, authorId: userId },
      data: { order: item.order },
    })
  );
  return await prisma.$transaction(transaction);
};

export const updateTodo = async (userId, todoId, data) => {
  const result = await prisma.todo.updateMany({
    where: { id: Number(todoId), authorId: userId },
    data: { isCompleted: data.isCompleted },
  });
  if (result.count === 0) throw new Error("Not found");
  return true;
};

export const deleteTodo = async (userId, todoId) => {
  const result = await prisma.todo.deleteMany({
    where: { id: Number(todoId), authorId: userId },
  });
  if (result.count === 0) throw new Error("Not found");
  return true;
};
