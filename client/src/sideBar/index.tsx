import React from "react";
import styled from "styled-components";

import Modal from "./Modal";

const SideBar = () => {
  return (
    <Container>
      <Modal />
    </Container>
  );
};

const Container = styled.div`
  max-width: 260px;
  width: 20%;
  border: solid red 1px;
  @media screen and (max-width: 1440.6px) {
    border-color: green;
    width: 65px;
  }
  @media screen and (max-width: 767.98px) {
    display: none;
  }
  transition: width 0.75s cubic-bezier(0.685, 0.0473, 0.346, 1);
`;

export default SideBar;
