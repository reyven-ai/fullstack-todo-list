import { Router } from "express";

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";
import pool from "../database/db";
import * as todosRepository from "./todos.repository";

const router = Router();

router.post("/todos", async (req, res, next) => {
  const title = (req.body as { title: string }).title;
  const description = req.body.description;
  const deadline = new Date(req.body.deadline);

  try {
    const result = await pool.query(
      "INSERT INTO todo (title, description, deadline) VALUES ($1, $2, $3) RETURNING *",
      [title, description, deadline]
    );

    const newTodo = result.rows[0];
    res.status(201).json({ message: "Created the todo.", createTodo: newTodo });
  } catch (error) {
    next(error);
  }
});

router.get("/todos", async (req, res, next) => {
  try {
    const todos = await todosRepository.getTodos();

    res.json({ todos });
  } catch (error) {
    next(error);
  }
});

router.patch("/todos/:id", async (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { title: string }).title;
  const updatedDescription = (req.body as { description: string }).description;
  const updatedDeadline = new Date(req.body.deadline);

  try {
    const todo = await todosRepository.getTodo(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodo = await todosRepository.updateTodo(todoId, {
      updatedText,
      updatedDescription,
      updatedDeadline,
    });

    res.json({ message: "Updated!", updatedTodo });
  } catch (error) {
    next(error);
  }
});

router.delete("/todos/:id", async (req, res, next) => {
  const todoId = req.params.id;

  try {
    const checkResult = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [todoId]
    );

    if (checkResult.rowCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [todoId]);

    res.json({ message: "Todo deleted!" });
  } catch (error) {
    next(error);
  }
});

export default router;
