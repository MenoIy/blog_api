import Posts from "../components/Posts";
import styled from "styled-components";
import Peoples from "../components/Peoples";

const Home = () => {
  return (
    <Container>
      <Body>
        <Posts />
        <Peoples />
      </Body>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  font-family: "Nunito Sans", Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #626c72;
`;

const Body = styled.div`
  display: flex;
`;

export default Home;
