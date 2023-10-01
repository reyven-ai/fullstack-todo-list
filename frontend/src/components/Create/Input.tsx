import React, { useState } from "react";
import styled from "styled-components";
import { Todo, InputProps } from "../models/types";

const StyledForm = styled.form`
  padding-right: 1.2rem;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.2rem;
  font-weight: bold;
  font-size: 0.8rem;
  font-family: "Quicksand", sans-serif;
  color: #414956;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.7rem;
  border-radius: 4px;
  border: 1px solid #d9e2f1;
  background-color: #fff;
  color: #414956;
  font-size: 0.8rem;
  font-family: "Quicksand", sans-serif;
  margin-bottom: 0.5rem;
`;

const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #d9e2f1;
  background-color: #fff;
  color: #414956;
  font-size: 0.8rem;
  font-family: "Quicksand", sans-serif;
  margin-bottom: 0.5rem;
`;

const ButtonWrapper = styled.p`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: 1rem;
`;

const CancelButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: transparent;
  color: black;
  border: none;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ff3c1a;
  }
`;

const AddToListButton = styled.button`
  cursor: pointer;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  background-color: #0f61ef;
  color: #fff;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0f3cef;
  }
`;

function Input({ onClose }: InputProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const createTodo = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, deadline }),
      });

      if (response.ok) {
        const newTodo: Todo = await response.json();
        setTodos([...todos, newTodo]);
        setTitle("");
        setDescription("");
        setDeadline("");
      } else {
        console.error("Failed to create todo");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <>
      <StyledForm action="">
        <StyledLabel htmlFor="title">Title</StyledLabel>
        <StyledInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <StyledLabel htmlFor="description">Description</StyledLabel>
        <StyledTextarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <StyledLabel htmlFor="deadline">Deadline</StyledLabel>
        <StyledInput
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <ButtonWrapper className="new-challenge-actions">
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <AddToListButton onClick={createTodo}>Create</AddToListButton>
        </ButtonWrapper>
      </StyledForm>
    </>
  );
}

export default Input;
