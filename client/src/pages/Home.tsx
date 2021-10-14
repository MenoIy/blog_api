import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Posts from "../components/posts/";
import styled from "styled-components";
import Peoples from "../components/Peoples";
import SideBar from "../components/sideBar";
import Header from "../components/Header/";
import Users from "../components/Users";

const Home = () => {
  const { username } = useParams<{ username?: string }>();

  return (
    <Container>
      <Header />
      <Body>
        <SideBar />
        <Content>
          {username === "poeple" ? <Users /> : <Posts username={username} />}
          <Peoples />
        </Content>
      </Body>
    </Container>
  );
};

const Container = styled.div``;

const Body = styled.div`
  width: 100%;
  font-family: "Nunito Sans", Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #626c72;
  display: flex;
  height: calc(100vh);
`;

const Content = styled.div`
  margin-top: 70px;
  flex: 1 1 70%;
  display: flex;

  border-top: 1px solid #e7edf2;
  @media screen and (max-width: 767.98px) {
    margin-top: 140px;
  }
`;

export default Home;
