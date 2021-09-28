import styled from "styled-components";

const Avatar = (props: {
  img: string;
  size?: { width: string; height: string };
}) => {
  return (
    <Container width={props.size?.width} height={props.size?.height}>
      <img src={props.img} alt="avatar"></img>
    </Container>
  );
};

const Container = styled.div<{ width?: string; height?: string }>`
  cursor: pointer;
  img {
    vertical-align: middle;
    width: ${(props) => props.width || "40px"};
    height: ${(props) => props.height || "40px"};
    border-radius: 50%;
  }
`;

export default Avatar;
