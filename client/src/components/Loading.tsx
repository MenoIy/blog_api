import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Container>
      <Loader>
        <div></div>
        <div></div>
        <div></div>
      </Loader>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: auto;
  background-color: rgb(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const animation = keyframes`
  0% {
    top: 50px;
    left: 50px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0%;
    left: 0%;
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}`;

const Loader = styled.div`
  width: 112px;
  height: 112px;
  position: relative;
  padding: 0;
  div {
    margin: 0px;
    position: absolute;
    border: 6px solid #c2229a;
    opacity: 1;
    border-radius: 50%;
    animation: ${animation} 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.5s;
  }
  div:nth-child(3) {
    animation-delay: -1s;
  }
`;

export default Loading;
