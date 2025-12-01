import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    await authService.register(email, password);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
