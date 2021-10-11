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
  flex: 0 0 30%;
  max-width: 340px;
  height: auto;

  @media screen and (max-width: 1440.6px) {
    flex: 0 0 65px;
  }
  @media screen and (max-width: 767.98px) {
    display: none;
  }
  transition: flex 0.75s cubic-bezier(0.685, 0.0473, 0.346, 1);
  background: linear-gradient(#383a45 300px, #f8f9fb 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  color: white;
`;

export default SideBar;
