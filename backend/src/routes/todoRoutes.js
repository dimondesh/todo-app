import express from "express";
import * as todoController from "../controllers/todoController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authenticateToken);

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.put("/reorder", todoController.reorderTodos);
router.patch("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
