const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

interface CreateTodoData {
  text: string;
  priority: number;
  category?: string;
  dueDate?: Date;
}

export const api = {
  register: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    return data;
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    return data;
  },

  getTodos: async (params?: {
    search?: string;
    status?: string;
    sort?: string;
  }) => {
    const url = new URL(`${API_URL}/todos`);
    if (params?.search) url.searchParams.append("search", params.search);
    if (params?.status) url.searchParams.append("status", params.status);
    if (params?.sort) url.searchParams.append("sort", params.sort);

    const res = await fetch(url.toString(), { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  },

  createTodo: async (data: CreateTodoData) => {
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create");
    return res.json();
  },

  updateTodo: async (id: number, isCompleted: boolean) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ isCompleted }),
    });
    if (!res.ok) throw new Error("Failed to update");
    return res.json();
  },

  deleteTodo: async (id: number) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete");
    return res.json();
  },

  reorderTodos: async (items: { id: number; order: number }[]) => {
    await fetch(`${API_URL}/todos/reorder`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ items }),
    });
  },
};
