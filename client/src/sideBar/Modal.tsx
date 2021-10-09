import { useContext } from "react";
import styled from "styled-components";

import UserContext from "../context/user";
import Avatar from "../components/Avatar";

const Modal = () => {
  const { user } = useContext(UserContext);
  console.log("here", user);
  return (
    <Container>
      <Avatar avatar={user?.avatar || ""} size={{ width: "50px", height: "50px" }} />
      <User>
        <p>{user?.username}</p>
        <span>Member</span>
      </User>
      <Info>
        <div>
          <p>1</p>
          <span>Name</span>
        </div>
        <div>
          <p>7</p>
          <span>Name</span>
        </div>
      </Info>
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

const Container = styled.div`
  width: 250px;
  height: 225px;
  border: red solid 1px;
  padding: 33px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-radius: 20px;
  text-transform: capitalize;
`;

const User = styled.div`
  width: 90%;
  padding: 15px;

  p {
    font-size: 1rem;
    font-weight: 700;
    color: #626c72;
  }
  span {
    font-size: 85%;
    font-weight: 400;
    color: #bbbbdc;
  }
  border-bottom: 1px rgb(231, 237, 242) solid;
`;
const Info = styled.div`
  display: flex;
  gap: 30px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
  span {
    color: #bbbbdc;
    font-weight: 400;
    font-size: 90%;
  }
`;

export default Modal;
