import { useState } from "react";
import styled from "styled-components";

import Avatar from "../Avatar";
import { useUserState } from "../../context/userContext";
import Search from "./Search";
import DropDown from "./DropDown";

const Header = () => {
  const [showDropDowm, setShowDropDown] = useState<boolean>(false);
  const user = useUserState();

  return (
    <Container>
      <Search />
      <div onClick={() => setShowDropDown((prev) => !prev)}>
        <Avatar avatar={user ? user.avatar : ""} />
      </div>
      {showDropDowm && <DropDown showDropDown={setShowDropDown} />}
    </Container>
  );
};

const Container = styled.div`
  height: 70px;
  position: fixed;
  font-family: "Nunito Sans", Arial, sans-serif;
  font-weight: 600;
  top: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 400px;
  padding-right: 40px;
  @media screen and (max-width: 1440.6px) {
    padding-left: 100px;
  }
  @media screen and (max-width: 767.98px) {
    padding-left: 30px;
  }
`;

export default Header;
