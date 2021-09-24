import Posts from "../components/Posts";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <Body>
        <Posts />
      </Body>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Body = styled.div`
  display: flex;
`;

export default Home;
