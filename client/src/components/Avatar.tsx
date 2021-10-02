import styled from "styled-components";

type AvatarProps = {
  img: string;
  size?: {
    width: string;
    height: string;
  };
};

const Avatar = (props: AvatarProps): JSX.Element => {
  const { img, size } = props;
  return (
    <Container width={size?.width || "40px"} height={size?.height || "40px"}>
      <img src={img} alt="avatar"></img>
    </Container>
  );
};

const Container = styled.div<{ width: string; height: string }>`
  cursor: pointer;
  img {
    vertical-align: middle;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 50%;
  }
`;

export default Avatar;
