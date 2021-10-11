import React from "react";
import styled from "styled-components";

import Modal from "./Modal";

const SideBar = () => {
  return (
    <Container>
      <Body>
        <Logo>LOGO</Logo>
        <Modal />
      </Body>
    </Container>
  );
};

const Container = styled.div`
  max-width: 340px;
  flex: 24%;
  height: auto;

  @media screen and (max-width: 1440.6px) {
    border-color: green;
    width: 65px;
  }
  @media screen and (max-width: 767.98px) {
    display: none;
  }
  transition: width 0.75s cubic-bezier(0.685, 0.0473, 0.346, 1);
`;

const Body = styled.div`
  height: 1500px;
  background: linear-gradient(#383a45 25%, #f8f9fb 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 100%;
  max-width: 340px;
`;

const Logo = styled.div`
  color: white;
`;

export default SideBar;
