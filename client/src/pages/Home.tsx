import Posts from "../components/posts/";
import styled from "styled-components";
import Peoples from "../components/Peoples";

const Home = () => {
  return (
    <Container>
      <Header />
      <Body>
        <SideBar />
        <Content>
          <Posts />
          <Peoples />
        </Content>
      </Body>
    </Container>
  );
};

const Container = styled.div`
  height: auto;
`;

const Body = styled.div`
  width: 100%;
  font-family: "Nunito Sans", Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #626c72;
  display: flex;
  margin-top: 60px;
`;

const SideBar = styled.div`
  max-width: 260px;
  width: 20%;
  border: solid red 1px;
  @media screen and (max-width: 1440.6px) {
    border-color: green;
    width: 65px;
  }
  @media screen and (max-width: 767.98px) {
    display: none;
  }
  transition: width 0.75s cubic-bezier(0.685, 0.0473, 0.346, 1);
`;

const Header = styled.div`
  border: solid 1px blue;
  height: 60px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: red;
  z-index: 4;
`;

const Content = styled.div`
  display: flex;
  flex: 80%;
`;

export default Home;
