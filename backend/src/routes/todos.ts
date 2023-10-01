import { Router } from "express";

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";

const router = Router();

router.post("/todos", createTodo);

router.get("/todos", getTodos);

router.patch("/todos/:id", updateTodo);

router.delete("/todos/:id", deleteTodo);

export default router;
