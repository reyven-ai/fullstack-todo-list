import styled from "styled-components";
import React, { useState } from "react";
import { Todo, UpdateFormProps } from "../models/types";

// type InputProps = {
//   onClose: () => void;

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

const Update: React.FC<UpdateFormProps> = ({ todo, onUpdate, onClose }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(todo);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [deadline, setDeadline] = useState(todo.deadline);

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/todos${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          deadline,
        }),
      });

      if (response.ok) {
        onUpdate(selectedTodo?.todo_id ?? "", {
          title,
          description,
          deadline,
        });
      } else {
        console.error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <>
      <StyledForm>
        <StyledLabel htmlFor="title">Title</StyledLabel>
        <StyledInput
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <StyledLabel htmlFor="description">Description</StyledLabel>
        <StyledTextarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <StyledLabel htmlFor="deadline">Deadline</StyledLabel>
        <StyledInput
          type="date"
          name="deadline"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <ButtonWrapper className="new-challenge-actions">
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <AddToListButton
            onClick={() => selectedTodo && handleUpdate(selectedTodo.todo_id)}
          >
            Update
          </AddToListButton>
        </ButtonWrapper>
      </StyledForm>
    </>
  );
};

export default Update;
