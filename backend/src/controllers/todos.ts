import { RequestHandler } from "express";

// import { Todo } from "../models/todo";
import pool from "../database/db";

export const createTodo: RequestHandler = async (req, res, next) => {
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
};

export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM todo");
    const todos = result.rows;

    res.json({ todos });
  } catch (error) {
    next(error);
  }
};

export const updateTodo: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { title: string }).title;
  const updatedDescription = (req.body as { description: string }).description;
  const updatedDeadline = new Date(req.body.deadline);

  try {
    const checkResult = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [todoId]
    );

    if (checkResult.rowCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updateResult = await pool.query(
      "UPDATE todo SET title = $1, description = $2, deadline = $3 WHERE todo_id = $4 RETURNING *",
      [updatedText, updatedDescription, updatedDeadline, todoId]
    );

    const updatedTodo = updateResult.rows[0];

    res.json({ message: "Updated!", updatedTodo });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
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
};

// export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
//   const todoId = req.params.id;

//   const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

//   if (todoIndex < 0) {
//     return res.status(404).json({ message: "Todo not found" });
//   }

//   TODOS.splice(todoIndex, 1);

//   res.json({ message: "Todo deleted!" });
// };

// export const createTodo: RequestHandler = (req, res, next) => {
//   const text = (req.body as { text: string }).text;
//   const newTodo = new Todo(Math.random().toString(), text);

//   TODOS.push(newTodo);

//   res.status(201).json({ message: "Created the todo.", createTodo: newTodo });
// };

// export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
//   const todoId = req.params.id;

//   const updatedText = (req.body as { text: string }).text;

//   const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

//   if (todoIndex < 0) {
//     throw new Error("Could not find todo!");
//   }

//   TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

//   res.json({ message: "Updated!", updateTodo: TODOS[todoIndex] });
// };

// export const deleteTodo: RequestHandler = (req, res, next) => {
//   const todoId = req.params.id;
//   const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

//   if (todoIndex < 0) {
//     throw new Error("Could not find todo!");
//   }

//   TODOS.splice(todoIndex, 1);

//   res.json({ message: "Todo deleted!" });
// };

// const TODOS: Todo[] = [];
// export const createTodo: RequestHandler = (req, res, next) => {
//   const title = (req.body as { title: string }).title;

//   const newTodo = new Todo(
//     Math.random().toString(),
//     title,
//     req.body.description,
//     new Date(req.body.deadline)
//   );

//   TODOS.push(newTodo);

//   res.status(201).json({ message: "Created the todo.", createTodo: newTodo });
// };

// export const getTodos: RequestHandler = (req, res, next) => {
//   res.json({ todos: TODOS });
// };

// export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
//   const todoId = req.params.id;
//   const updatedText = (req.body as { title: string }).title;
//   const updatedDescription = (req.body as { description: string }).description;
//   const updatedDeadline = new Date(req.body.deadline);

//   const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

//   if (todoIndex < 0) {
//     return res.status(404).json({ message: "Todo not found" });
//   }

//   TODOS[todoIndex].title = updatedText;
//   TODOS[todoIndex].description = updatedDescription;
//   TODOS[todoIndex].deadline = updatedDeadline;

//   res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
// };
