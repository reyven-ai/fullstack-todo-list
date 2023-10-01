import React, { useEffect, useState } from "react";
import { Todo } from "../models/types";
import styled from "styled-components";
import Update from "../Edit/Update";
import Modal from "../UI/Modal";

const ListContainer = styled.div`
  table {
    width: 50%;
    border-collapse: collapse;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }

  th,
  td {
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  button {
    background-color: #ff0000;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }

  button:hover {
    background-color: #cc0000;
  }
`;

function List() {
  // TODO: move all logic to a custom hook
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const closeModal = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      // TODO: start using tanstack query instead
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();

      if (Array.isArray(data.todos)) {
        setTodos(data.todos);
      } else {
        console.error("Invalid data received:", data);
        setTodos([]);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/todos${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.todo_id.toString() !== id));
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdate = (id: string, updatedTodo: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
    setSelectedTodo(null);
  };

  const editTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const cancelUpdate = () => {
    setSelectedTodo(null);
  };

  return (
    <ListContainer>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.deadline}</td>
              <td>
                <button onClick={() => editTodo(todo)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteTodo(todo.todo_id.toString())}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTodo && (
        <Modal title="" onClose={closeModal}>
          <Update
            todo={selectedTodo}
            onUpdate={handleUpdate}
            onClose={cancelUpdate}
          />
        </Modal>
      )}
    </ListContainer>
  );
}

export default List;
