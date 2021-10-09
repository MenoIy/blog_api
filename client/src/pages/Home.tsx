import Posts from "../components/posts/";
import styled from "styled-components";
import Peoples from "../components/Peoples";
import SideBar from "../sideBar/";

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
