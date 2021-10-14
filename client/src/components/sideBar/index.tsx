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
            <i className="fas fa-home"></i>
            <span>Home</span>
          </div>
        </Link>
        <Link to={{ pathname: "/" }}>
          <div>
            <i className="far fa-image"></i>
            <span>Photos</span>
          </div>
        </Link>

        {user ? (
          <>
            <Link to={{ pathname: "/" }}>
              <div>
                <i className="fas fa-cog"></i>
                <span>Setting</span>
              </div>
            </Link>

            <div onClick={handleClick}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Log Out</span>
            </div>
          </>
        ) : (
          <>
            <Link to={{ pathname: "/login" }}>
              <div>
                <i className="fas fa-sign-in-alt"></i>
                <span>Log In</span>
              </div>
            </Link>
            <Link to={{ pathname: "/register" }}>
              <div>
                <i className="fas fa-user-plus"></i>
                <span>Register</span>
              </div>
            </Link>
          </>
        )}
      </Items>
    </Container>
  );
};

const Container = styled.div`
  flex: 0 0 30%;
  max-width: 340px;
  height: auto;

  background: linear-gradient(#383a45 300px, #f8f9fb 25%);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 1440.6px) {
    background: linear-gradient(#383a45 70px, #f8f9fb 70px);
    flex: 0 0 65px;
  }
  @media screen and (max-width: 767.98px) {
    position: fixed;
    top: 70px;
    width: 100%;
    background: #f8f9fb;
    max-width: 100%;
    height: 70px;
  }
`;

const Items = styled.div`
  width: 100%;
  max-width: 250px;
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
    width: 60px;
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
  }
  @media screen and (max-width: 767.98px) {
    padding: 10px 0;
    margin: auto;
    width: 100%;
    max-width: 100%;
    gap: 0;
    justify-content: space-evenly;
  }
  @media screen and (max-width: 320.6px) {
    span {
      display: none;
    }
  }
`;

const Logo = styled.div`
  color: white;
`;

export default SideBar;
