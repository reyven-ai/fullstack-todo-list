import pool from "../database/db";
import { TodoEntity } from "./todos.type";

type UpdateTodoPayload = {
  updatedText: string;
  updatedDescription: string;
  updatedDeadline: Date;
};

export const getTodo = async (todoId: string): Promise<TodoEntity | null> => {
  // First, check that there is a todo present
  const todoResult = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
    todoId,
  ]);

  // If no todo — return null;
  if (todoResult.rowCount === 0) {
    return null;
  }

  if (todoResult.rowCount > 1) {
    console.warn("FOUND MORE THAN 1 TODOS, WOOPS", { todoId });
  }

  return todoResult.rows[0];
};

export const getTodos = async (): Promise<TodoEntity[]> => {
  const result = await pool.query("SELECT * FROM todo");
  const todos = result.rows;

  return todos;
};

export const updateTodo = async (
  todoId: string,
  updatePayload: UpdateTodoPayload
): Promise<TodoEntity | null> => {
  const { updatedText, updatedDescription, updatedDeadline } = updatePayload;

  const updateResult = await pool.query(
    "UPDATE todo SET title = $1, description = $2, deadline = $3 WHERE todo_id = $4 RETURNING *",
    [updatedText, updatedDescription, updatedDeadline, todoId]
  );

  const updatedTodo = updateResult.rows[0];

  return updatedTodo;
};
