import styled from "styled-components";
import { Link } from "react-router-dom";

import ProfileModal from "./ProfileModal";
import LoginModal from "./LoginModal";
import { useUserState, useUserUpdater } from "../../context/userContext";
import { api } from "../../api";

const logOut = async () => {
  return await api.get(`/users/logout`).then(({ data }) => data);
};

const SideBar = () => {
  const user = useUserState();
  const setUser = useUserUpdater();

  const handleClick = () => {
    try {
      logOut();
      setUser(null);
    } catch (error) {}
  };

  return (
    <Container>
      {user ? <ProfileModal user={user} /> : <LoginModal />}
      <Items>
        <Link to={{ pathname: "/" }}>
          <div>
            <i className="fas fa-users"></i>
            <span>Poeple</span>
          </div>
        </Link>
        <Link to={{ pathname: "/" }}>
          <div>
            <i className="far fa-newspaper"></i>
            <span>Activity</span>
          </div>
        </Link>
        <Link to={{ pathname: "/" }}>
          <div>
            <i className="far fa-image"></i>
            <span>Photos</span>
          </div>
        </Link>
        <Link to={{ pathname: "/" }}>
          <div>
            <i className="fab fa-github"></i>
            <span>Github</span>
          </div>
        </Link>
        {user && (
          <Link to={{ pathname: "/" }}>
            <div>
              <i className="fas fa-cog"></i>
              <span>Setting</span>
            </div>
          </Link>
        )}
        {user && (
          <div onClick={handleClick}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Log Out</span>
          </div>
        )}
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
  }
  div {
    display: block;
    color: #838daa;
    font-size: 14px;
    font-weight: 600;
    line-height: 30px;
    cursor: pointer;
  }
  i {
    display: block;
    font-size: 1.125rem;
  }

  div:hover {
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
