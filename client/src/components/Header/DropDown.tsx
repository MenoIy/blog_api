import React, { SetStateAction } from "react";
import styled from "styled-components";

type DropDownProps = {
  showDropDown: React.Dispatch<SetStateAction<boolean>>;
};

const DropDown = (props: DropDownProps) => {
  return (
    <Container>
      <Body>
        <div onClick={() => console.log("Profile")}>Profile</div>
        <div onClick={() => console.log("Setting")}>Setting</div>
        <div onClick={() => console.log("logOut")}>Log Out</div>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 40px;
  top: 40px;
  font: inherit;
  font-size: 1em;
  line-height: 26px;
  font-weight: 400;
  color: #626c72;
  border-radius: 12px;
  background-color: white;
  z-index: 5;
  box-shadow: 0 35px 35px rgb(58 46 68 / 6%);
  width: 140px;
  text-align: center;
  margin-top: 20px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    cursor: pointer;
    display: block;
    margin-top: 5px;
    width: 90%;
    height: 100%;
    border-bottom: 1px solid #e7edf2;
  }
  div:hover {
    color: rgb(169, 104, 236);
  }
`;

export default DropDown;
