import styled from "styled-components";
import Modal from "../UI/Modal";
import React, { useState } from "react";
import Input from "../Create/Input";

const MainContainer = styled.div`
  display: flex;
  padding: 1% 5%;
  margin-top: 1rem;
  justify-content: space-around;
  align-items: center;

  h1 {
    font-size: 23px;
    font-weight: 700;
  }
  button {
    background-color: #0f61ef;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 6px;
    border: #0f61ef;
    font-size: 14px;
  }
`;

function MainHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <MainContainer>
      <h1>Todo List</h1>
      <button onClick={openModal}>Add to list</button>
      {isModalOpen && (
        <Modal title="" onClose={closeModal}>
          <Input onClose={closeModal} />
        </Modal>
      )}
    </MainContainer>
  );
}

export default MainHeader;
