import styled from "styled-components";
import { Link } from "react-router-dom";

import ProfileModal from "./ProfileModal";
import LoginModal from "./LoginModal";
import { useUserState } from "../../context/userContext";

const SideBar = () => {
  const user = useUserState();

  return (
    <Container>
      {user ? <ProfileModal user={user} /> : <LoginModal />}
      <Items>
        <Link to={{ pathname: "/" }}>
          <i className="fas fa-users"></i>
          <span>Poeple</span>
        </Link>
        <Link to={{ pathname: "/" }}>
          <i className="far fa-newspaper"></i>
          <span>Activity</span>
        </Link>
        <Link to={{ pathname: "/" }}>
          <i className="far fa-image"></i>
          <span>Photos</span>
        </Link>
        <Link to={{ pathname: "/" }}>
          <i className="fab fa-github"></i>
          <span>Github</span>
        </Link>
      </Items>
    </Container>
  );
};

const Container = styled.div`
  flex: 0 0 30%;
  max-width: 340px;
  height: auto;

  @media screen and (max-width: 1440.6px) {
    background: linear-gradient(#383a45 70px, #f8f9fb 70px);
    flex: 0 0 65px;
  }
  @media screen and (max-width: 767.98px) {
    display: none;
  }
  background: linear-gradient(#383a45 300px, #f8f9fb 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Items = styled.div`
  width: 80%;
  max-width: 250px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 33px 0px;
  gap: 60px;

  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 30px;
  a {
    text-decoration: none;
    display: block;
    color: #838daa;
    font-size: 14px;
    font-weight: 600;
    line-height: 30px;
  }
  i {
    display: block;
    font-size: 1.125rem;
  }
  a {
    cursor: pointer;
  }

  a:hover {
    color: #8224e3;
  }
  @media screen and (max-width: 1440.6px) {
    margin-top: 90px;
    gap: 45px;

    span {
      display: none;
    }
  }
`;

const Logo = styled.div`
  color: white;
`;

export default SideBar;
