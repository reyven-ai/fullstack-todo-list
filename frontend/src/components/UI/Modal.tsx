import React from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "../models/types";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 7%;
  border-radius: 6px;
  padding: 1.5rem;
  width: 30rem;
  max-width: 90%;
  z-index: 10;
  background-color: #fff; /* You can set the background color here */
  margin: 1.2rem auto;
  justify-content: center;
  left: 35%;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9;
`;

export default function Modal({ title, children, onClose }: ModalProps) {
  const modalRoot = document.getElementById("modal");

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <>
      <Backdrop onClick={onClose} />
      <ModalWrapper>
        <ModalTitle>{title}</ModalTitle>
        {children}
      </ModalWrapper>
    </>,
    modalRoot
  );
}
