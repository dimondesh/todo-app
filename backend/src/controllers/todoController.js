import * as todoService from "../services/todoService.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos(req.user.userId);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.user.userId, req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    await todoService.updateTodo(req.user.userId, req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await todoService.deleteTodo(req.user.userId, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const reorderTodos = async (req, res) => {
  try {
    const { items } = req.body;
    await todoService.reorderTodos(req.user.userId, items);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
