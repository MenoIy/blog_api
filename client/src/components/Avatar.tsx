import styled from "styled-components";

const Avatar = (props: { img: string; link?: string }) => {
  return (
    <Container>
      <a href=".">
        <img src={props.img} alt="avatar"></img>
      </a>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  margin-top: 5px;
  img {
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

export default Avatar;
