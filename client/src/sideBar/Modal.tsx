import { useContext } from "react";
import styled from "styled-components";

import UserContext from "../context/user";
import Avatar from "../components/Avatar";

const Modal = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Avatar avatar={user!.avatar} size={{ width: "60px", height: "60px" }} />
      <User>
        <p>{user!.username}</p>
        <span>Member</span>
      </User>
      <Items></Items>
    </Container>
  );
};

const Item = ({ name, icone }: { name: string; icone: string }) => {
  return (
    <>
      <i>{name}</i>
      <span className={icone}></span>
    </>
  );
};

const Container = styled.div``;

const User = styled.div``;
const Info = styled.div``;

export default Modal;
